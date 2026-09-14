"use client";

import type { ReactNode } from "react";
import { CartProvider } from "@/lib/cart";
import { AuthProvider } from "@/lib/auth";
import { ToastProvider } from "@/lib/toast";

/** সব ক্লায়েন্ট কনটেক্সট এক জায়গায় — লেআউট থেকেই র‍্যাপ করা হয় */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <AuthProvider>
        <CartProvider>{children}</CartProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
