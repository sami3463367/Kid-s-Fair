"use client";

/**
 * localStorage হেল্পার — কার্ট, অ্যাকাউন্ট ও অর্ডার এই ব্রাউজারেই থেকে যায়।
 * (এটি ডেমো: আসল সার্ভার/ডেটাবেস ছাড়াই ক্লায়েন্টেই সব সংরক্ষণ করা হয়।)
 */

export const STORAGE_KEYS = {
  cart: "ee.cart.v1",
  user: "ee.user.v1",
  users: "ee.users.v1",
  orders: "ee.orders.v1",
} as const;

export const isBrowser = () => typeof window !== "undefined";

export function readJSON<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeJSON(key: string, value: unknown): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* প্রাইভেট মোড/কোটা ফুল — চুপচাপ উপেক্ষা */
  }
}

export function removeKey(key: string): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    /* উপেক্ষা */
  }
}

/** অর্ডার আইডি বানায়: EE-20260914-4F7A */
export function makeOrderId(): string {
  const d = new Date();
  const ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(
    d.getDate(),
  ).padStart(2, "0")}`;
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `EE-${ymd}-${rand}`;
}
