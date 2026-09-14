"use client";

import { useEffect, useState } from "react";
import { toBn } from "@/lib/format";

/** আজকের রাত ১২টা পর্যন্ত কাউন্টডাউন (অফার শেষ হওয়ার সময়) */
export function DealCountdown({ className = "" }: { className?: string }) {
  const [left, setLeft] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const end = new Date(now);
      end.setHours(23, 59, 59, 999);
      const diff = Math.max(0, end.getTime() - now.getTime());
      setLeft({
        h: Math.floor(diff / 3_600_000),
        m: Math.floor((diff % 3_600_000) / 60_000),
        s: Math.floor((diff % 60_000) / 1000),
      });
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const pad = (n: number) => toBn(String(n).padStart(2, "0"));

  const units = [
    { value: pad(left.h), label: "ঘণ্টা" },
    { value: pad(left.m), label: "মিনিট" },
    { value: pad(left.s), label: "সেকেন্ড" },
  ];

  return (
    <div className={`flex items-end gap-2 ${className}`} role="timer" aria-live="off">
      {units.map((u, i) => (
        <span key={u.label} className="flex items-end gap-2">
          <span className="flex flex-col items-center gap-1">
            <span className="grid min-w-[2.5rem] place-items-center rounded-lg bg-ink/90 px-1.5 py-1 text-[15px] font-black tabular-nums text-white">
              {u.value}
            </span>
            <span className="text-[10.5px] font-bold text-muted">{u.label}</span>
          </span>
          {i < units.length - 1 ? (
            <span className="pb-5 font-black text-ink/40">:</span>
          ) : null}
        </span>
      ))}
    </div>
  );
}
