"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { STORAGE_KEYS, makeOrderId, readJSON, writeJSON } from "./storage";
import type { CartLine } from "./whatsapp";

export type User = {
  id: string;
  name: string;
  phone: string;
  email: string;
  createdAt: string;
};

type StoredUser = User & { pass: string };

export type OrderItem = { slug: string; name: string; price: number; qty: number };

export type Order = {
  id: string;
  createdAt: string;
  items: OrderItem[];
  subtotal: number;
  delivery: number;
  total: number;
  zone: "inside" | "outside";
  payment: "cod" | "bkash" | "nagad";
  status: string;
  userId: string | null;
  customer: {
    name: string;
    phone: string;
    address: string;
    district: string;
    thana: string;
    note?: string;
  };
};

export type NewOrder = {
  lines: CartLine[];
  subtotal: number;
  delivery: number;
  total: number;
  zone: "inside" | "outside";
  payment: "cod" | "bkash" | "nagad";
  customer: Order["customer"];
};

type AuthContextValue = {
  user: User | null;
  orders: Order[];
  ready: boolean;
  register: (input: {
    name: string;
    phone: string;
    email: string;
    password: string;
  }) => { ok: boolean; error?: string };
  login: (identifier: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;
  placeOrder: (order: NewOrder) => Order;
};

const AuthContext = createContext<AuthContextValue | null>(null);

/** খুব সহজ হ্যাশ — শুধু ডেমো, আসল প্রোডাকশনে সার্ভার সাইড অথেন্টিকেশন দরকার */
function demoHash(input: string): string {
  let h = 5381;
  for (let i = 0; i < input.length; i++) {
    h = (h * 33) ^ input.charCodeAt(i);
  }
  return `d${(h >>> 0).toString(36)}`;
}

const normalizePhone = (v: string) => v.replace(/[^\d+]/g, "").replace(/^\+88/, "0");

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const storedUser = readJSON<User | null>(STORAGE_KEYS.user, null);
    setUser(storedUser);
    const all = readJSON<Order[]>(STORAGE_KEYS.orders, []);
    setOrders(
      storedUser
        ? all.filter((o) => o.userId === storedUser.id || !o.userId)
        : all.filter((o) => !o.userId),
    );
    setReady(true);
  }, []);

  const persistUsers = (list: StoredUser[]) => writeJSON(STORAGE_KEYS.users, list);

  const register = useCallback<AuthContextValue["register"]>((input) => {
    const name = input.name.trim();
    const phone = normalizePhone(input.phone);
    const email = input.email.trim().toLowerCase();

    if (name.length < 3) return { ok: false, error: "পুরো নাম কমপক্ষে ৩ অক্ষরের লিখুন" };
    if (!/^01[3-9]\d{8}$/.test(phone))
      return { ok: false, error: "সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন ০১৭XXXXXXXX)" };
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return { ok: false, error: "ইমেইল ঠিক নেই — আবার লিখুন" };
    if (input.password.length < 6)
      return { ok: false, error: "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে" };

    const users = readJSON<StoredUser[]>(STORAGE_KEYS.users, []);
    if (users.some((u) => u.phone === phone))
      return { ok: false, error: "এই মোবাইল নম্বরে আগেই অ্যাকাউন্ট খোলা হয়েছে — লগইন করুন" };

    const created: StoredUser = {
      id: `u-${Date.now().toString(36)}`,
      name,
      phone,
      email,
      createdAt: new Date().toISOString(),
      pass: demoHash(input.password),
    };
    persistUsers([...users, created]);
    const { pass: _pass, ...publicUser } = created;
    void _pass;
    setUser(publicUser);
    writeJSON(STORAGE_KEYS.user, publicUser);
    return { ok: true };
  }, []);

  const login = useCallback<AuthContextValue["login"]>((identifier, password) => {
    const id = identifier.trim().toLowerCase();
    if (!id) return { ok: false, error: "মোবাইল নম্বর বা ইমেইল লিখুন" };
    const users = readJSON<StoredUser[]>(STORAGE_KEYS.users, []);
    const phone = normalizePhone(id);
    const found = users.find((u) => u.phone === phone || u.email === id);
    if (!found) return { ok: false, error: "এই নম্বর/ইমেইলে কোনো অ্যাকাউন্ট পাওয়া যায়নি" };
    if (found.pass !== demoHash(password)) return { ok: false, error: "পাসওয়ার্ড মিলছে না" };
    const { pass: _pass, ...publicUser } = found;
    void _pass;
    setUser(publicUser);
    writeJSON(STORAGE_KEYS.user, publicUser);
    const all = readJSON<Order[]>(STORAGE_KEYS.orders, []);
    setOrders(all.filter((o) => o.userId === publicUser.id || !o.userId));
    return { ok: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setOrders(readJSON<Order[]>(STORAGE_KEYS.orders, []).filter((o) => !o.userId));
    writeJSON(STORAGE_KEYS.user, null);
  }, []);

  const placeOrder = useCallback<AuthContextValue["placeOrder"]>(
    (input) => {
      const order: Order = {
        id: makeOrderId(),
        createdAt: new Date().toISOString(),
        items: input.lines.map((l) => ({
          slug: l.product.slug,
          name: l.product.name,
          price: l.product.price,
          qty: l.qty,
        })),
        subtotal: input.subtotal,
        delivery: input.delivery,
        total: input.total,
        zone: input.zone,
        payment: input.payment,
        status: "হোয়াটসঅ্যাপে পাঠানো হয়েছে — কনফার্মেশনের অপেক্ষায়",
        userId: user?.id ?? null,
        customer: input.customer,
      };
      const all = readJSON<Order[]>(STORAGE_KEYS.orders, []);
      writeJSON(STORAGE_KEYS.orders, [order, ...all]);
      setOrders((prev) => [order, ...prev]);
      return order;
    },
    [user],
  );

  const value = useMemo(
    () => ({ user, orders, ready, register, login, logout, placeOrder }),
    [user, orders, ready, register, login, logout, placeOrder],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth অবশ্যই <AuthProvider> এর ভেতরে ব্যবহার করতে হবে");
  return ctx;
}
