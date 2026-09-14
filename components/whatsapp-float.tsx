"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { bdt } from "@/lib/format";
import { chatMessage, waLink } from "@/lib/whatsapp";
import { CloseIcon, WhatsappIcon } from "./icons";

/**
 * ভাসমান হোয়াটসঅ্যাপ অর্ডার বাটন — মোবাইলে বটম নেভের ঠিক উপরে,
 * ডেস্কটপে ডানদিকে নিচে। প্রথমবার ছোট একটি সূচনা নোট দেখায়।
 */
export function WhatsAppFloat() {
  const [note, setNote] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const seen = window.localStorage.getItem("ee.wa-note-seen");
      if (!seen) {
        const t = window.setTimeout(() => setNote(true), 2600);
        return () => window.clearTimeout(t);
      }
    } catch {
      setNote(true);
    }
  }, []);

  const dismiss = () => {
    setNote(false);
    try {
      window.localStorage.setItem("ee.wa-note-seen", "1");
    } catch {
      /* উপেক্ষা */
    }
  };

  return (
    <div className="wa-fab fixed right-3.5 z-40 flex flex-col items-end gap-2 sm:right-5">
      {note ? (
        <div className="animate-sheet-up relative max-w-[15rem] rounded-2xl rounded-br-md border border-line bg-white p-3 pr-8 text-[12.5px] font-semibold leading-snug shadow-lift">
          <button
            type="button"
            onClick={dismiss}
            aria-label="নোটিশ বন্ধ করুন"
            className="absolute right-1.5 top-1.5 grid h-6 w-6 place-items-center rounded-lg text-muted transition hover:bg-canvas"
          >
            <CloseIcon className="h-3.5 w-3.5" />
          </button>
          🧺 সরাসরি হোয়াটসঅ্যাপে অর্ডার করুন — ডেলিভারি {bdt(site.delivery.insideDhaka)} থেকে শুরু, পণ্য হাতে পেয়ে টাকা দিন।
        </div>
      ) : null}

      <a
        href={waLink(chatMessage())}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="হোয়াটসঅ্যাপে অর্ডার করুন"
        className={`group relative grid h-[56px] w-[56px] place-items-center rounded-full bg-wa text-white shadow-fab transition-all duration-300 hover:h-14 hover:w-14 active:scale-95 ${
          mounted ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
      >
        <span className="absolute inset-0 animate-pulse-ring rounded-full bg-wa/45" aria-hidden />
        <WhatsappIcon className="relative h-8 w-8" />
        <span className="pointer-events-none absolute right-[64px] hidden whitespace-nowrap rounded-xl bg-ink px-3 py-2 text-[12.5px] font-bold text-white opacity-0 shadow-lift transition-all duration-300 group-hover:opacity-100 sm:block">
          হোয়াটসঅ্যাপে অর্ডার করুন
        </span>
      </a>
    </div>
  );
}
