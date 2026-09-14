"use client";

import { MinusIcon, PlusIcon } from "./icons";
import { parseBnInt, toBn } from "@/lib/format";

export function QtyStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  size = "md",
  label = "পরিমাণ",
}: {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
  label?: string;
}) {
  const btn =
    size === "sm"
      ? "h-8 w-8"
      : "h-10 w-10";
  return (
    <div
      className={`inline-flex items-center gap-1 rounded-xl border border-line bg-white p-1 ${
        size === "sm" ? "" : "gap-1.5"
      }`}
    >
      <button
        type="button"
        aria-label={`${label} কমান`}
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
        className={`${btn} grid place-items-center rounded-lg text-ink transition active:scale-90 disabled:opacity-35 hover:bg-canvas`}
      >
        <MinusIcon className="h-4 w-4" />
      </button>
      <input
        type="text"
        inputMode="numeric"
        aria-label={label}
        value={toBn(value)}
        onChange={(e) => {
          const n = parseBnInt(e.target.value);
          if (n !== null) onChange(Math.min(max, Math.max(min, n)));
        }}
        className={`text-center text-sm font-bold tabular-nums outline-none ${
          size === "sm" ? "w-7" : "w-10"
        }`}
      />
      <button
        type="button"
        aria-label={`${label} বাড়ান`}
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
        className={`${btn} grid place-items-center rounded-lg bg-brand-50 text-brand-700 transition active:scale-90 disabled:opacity-35 hover:bg-brand-100`}
      >
        <PlusIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
