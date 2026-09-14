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
import { getProduct, type Product } from "./products";
import { STORAGE_KEYS, readJSON, writeJSON } from "./storage";
import { computeTotals, type CartLine, type Totals, type Zone } from "./whatsapp";

export type CartItem = { slug: string; qty: number };

type CartContextValue = {
  items: CartItem[];
  lines: (CartLine & { product: Product })[];
  count: number;
  totals: Totals;
  hydrated: boolean;
  drawerOpen: boolean;
  lastAdded: string | null;
  add: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
  qtyOf: (slug: string) => number;
  openDrawer: () => void;
  closeDrawer: () => void;
  setZone: (zone: Zone) => void;
  zone: Zone;
};

const CartContext = createContext<CartContextValue | null>(null);

const MAX_QTY = 99;

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<string | null>(null);
  const [zone, setZone] = useState<Zone>("inside");

  // প্রথম লোডে ব্রাউজার থেকে কার্ট পড়া
  useEffect(() => {
    setItems(readJSON<CartItem[]>(STORAGE_KEYS.cart, []));
    setHydrated(true);
  }, []);

  // অন্য ট্যাব থেকে আপডেট হলে সিঙ্ক করা
  useEffect(() => {
    if (!hydrated) return;
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEYS.cart) {
        setItems(readJSON<CartItem[]>(STORAGE_KEYS.cart, []));
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [hydrated]);

  useEffect(() => {
    if (hydrated) writeJSON(STORAGE_KEYS.cart, items);
  }, [items, hydrated]);

  // ড্রয়ার খোলা থাকলে পেজ স্ক্রল বন্ধ
  useEffect(() => {
    if (!hydrated) return;
    document.documentElement.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [drawerOpen, hydrated]);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawerOpen]);

  const add = useCallback((slug: string, qty = 1) => {
    const product = getProduct(slug);
    if (!product) return;
    setItems((prev) => {
      const found = prev.find((i) => i.slug === slug);
      const max = Math.max(1, Math.min(product.stock, MAX_QTY));
      if (found) {
        return prev.map((i) =>
          i.slug === slug ? { ...i, qty: Math.min(max, i.qty + qty) } : i,
        );
      }
      return [...prev, { slug, qty: Math.min(max, qty) }];
    });
    setLastAdded(slug);
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    const product = getProduct(slug);
    const cap = product ? Math.max(1, Math.min(product.stock, MAX_QTY)) : MAX_QTY;
    const next = Math.max(1, Math.min(cap, Math.round(qty || 1)));
    setItems((prev) => prev.map((i) => (i.slug === slug ? { ...i, qty: next } : i)));
  }, []);

  const remove = useCallback((slug: string) => {
    setItems((prev) => prev.filter((i) => i.slug !== slug));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const lines = useMemo(
    () =>
      items
        .map((i) => {
          const product = getProduct(i.slug);
          return product ? { product, qty: i.qty } : null;
        })
        .filter((l): l is CartLine & { product: Product } => Boolean(l)),
    [items],
  );

  const totals = useMemo(() => computeTotals(lines, zone), [lines, zone]);
  const count = useMemo(() => lines.reduce((n, l) => n + l.qty, 0), [lines]);

  const value: CartContextValue = {
    items,
    lines,
    count,
    totals,
    hydrated,
    drawerOpen,
    lastAdded,
    add,
    setQty,
    remove,
    clear,
    qtyOf: (slug: string) => items.find((i) => i.slug === slug)?.qty ?? 0,
    openDrawer: () => setDrawerOpen(true),
    closeDrawer: () => setDrawerOpen(false),
    setZone,
    zone,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart অবশ্যই <CartProvider> এর ভেতরে ব্যবহার করতে হবে");
  return ctx;
}
