"use client";

import { useEffect, useState } from "react";
import { ArrowUpIcon } from "./icons";

export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="উপরে ফিরে যান"
      className={`fixed bottom-[calc(var(--bottom-nav-h)+env(safe-area-inset-bottom,0px)+4.5rem)] right-3.5 z-30 grid h-10 w-10 place-items-center rounded-full border border-line bg-white/95 text-ink shadow-card backdrop-blur transition-all duration-300 active:scale-90 lg:bottom-24 lg:right-5 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <ArrowUpIcon className="h-5 w-5" />
    </button>
  );
}
