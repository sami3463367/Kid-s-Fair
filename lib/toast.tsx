"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

type Toast = { id: number; text: string; tone: "success" | "info" | "error"; icon?: string };

type ToastContextValue = {
  push: (text: string, opts?: { tone?: Toast["tone"]; icon?: string }) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

let counter = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const push = useCallback<ToastContextValue["push"]>((text, opts) => {
    counter += 1;
    const toast: Toast = {
      id: counter,
      text,
      tone: opts?.tone ?? "success",
      icon: opts?.icon,
    };
    setToasts((prev) => [...prev.slice(-2), toast]);
  }, []);

  useEffect(() => {
    if (toasts.length === 0) return;
    const timer = window.setTimeout(() => {
      setToasts((prev) => prev.slice(1));
    }, 2600);
    return () => window.clearTimeout(timer);
  }, [toasts]);

  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      <div
        className="pointer-events-none fixed inset-x-0 top-3 z-[80] flex flex-col items-center gap-2 px-4"
        role="status"
        aria-live="polite"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`animate-sheet-up pointer-events-auto flex w-full max-w-sm items-center gap-2.5 rounded-2xl border px-4 py-3 text-sm font-semibold shadow-lift backdrop-blur ${
              t.tone === "error"
                ? "border-danger/25 bg-white/95 text-danger"
                : t.tone === "info"
                  ? "border-line bg-white/95 text-ink"
                  : "border-brand-200 bg-white/95 text-brand-800"
            }`}
          >
            <span aria-hidden className="text-base leading-none">
              {t.icon ?? (t.tone === "error" ? "⚠️" : "✅")}
            </span>
            <span className="leading-snug">{t.text}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast অবশ্যই <ToastProvider> এর ভেতরে ব্যবহার করতে হবে");
  return ctx;
}
