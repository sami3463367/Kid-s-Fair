"use client";

import { useState } from "react";
import { toBn } from "@/lib/format";
import { ChevronDownIcon } from "./icons";

export function Accordion({
  items,
  defaultOpen = -1,
}: {
  items: { q: string; a: string }[];
  defaultOpen?: number;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center gap-3 px-4 py-4 text-left transition hover:bg-canvas/60"
            >
              <span
                className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg text-[13px] font-black transition ${
                  isOpen ? "bg-brand-700 text-white" : "bg-brand-50 text-brand-700"
                }`}
              >
                {toBn(i + 1)}
              </span>
              <span className="flex-1 text-[14.5px] font-bold leading-snug">{item.q}</span>
              <ChevronDownIcon
                className={`h-5 w-5 shrink-0 text-muted transition-transform duration-300 ${
                  isOpen ? "rotate-180 text-brand-700" : ""
                }`}
              />
            </button>
            <div
              className={`grid transition-all duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-4 pb-4 pl-[3.75rem] text-[13.5px] leading-relaxed text-muted">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
