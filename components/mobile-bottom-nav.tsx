"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { toBn } from "@/lib/format";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";
import { CartIcon, GridIcon, HomeIcon, UserIcon } from "./icons";

export function MobileBottomNav() {
  const pathname = usePathname();
  const { count, openDrawer } = useCart();
  const { user } = useAuth();
  const [hidden, setHidden] = useState(false);

  // নিচের দিকে স্ক্রল করলে বারটি লুকিয়ে যায়, উপরে উঠলে দেখায়
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const now = window.scrollY;
      setHidden(now > last + 6 && now > 260);
      last = now;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const items = [
    { href: "/", label: "হোম", icon: HomeIcon },
    { href: "/products", label: "পণ্য", icon: GridIcon },
    { href: "/account", label: user ? "অ্যাকাউন্ট" : "লগইন", icon: UserIcon },
  ];

  return (
    <nav
      aria-label="মোবাইল নেভিগেশন"
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-bar backdrop-blur-xl transition-transform duration-300 lg:hidden ${
        hidden ? "translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="mx-auto flex h-[var(--bottom-nav-h)] max-w-shell items-stretch px-1.5">
        {items.map((item) => {
          const active =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex flex-1 flex-col items-center justify-center gap-0.5 rounded-xl text-[11px] font-bold transition active:scale-95 ${
                active ? "text-brand-700" : "text-muted"
              }`}
            >
              <item.icon className="h-[22px] w-[22px]" />
              {item.label}
              {active ? (
                <span className="absolute bottom-1 h-1 w-6 rounded-full bg-brand-500" aria-hidden />
              ) : null}
            </Link>
          );
        })}
        <button
          type="button"
          onClick={openDrawer}
          className="relative flex flex-1 flex-col items-center justify-center gap-0.5 rounded-xl text-[11px] font-bold text-muted transition active:scale-95"
          aria-label="কার্ট খুলুন"
        >
          <span className="relative">
            <CartIcon className="h-[22px] w-[22px]" />
            {count > 0 ? (
              <span className="absolute -right-2 -top-1.5 grid h-[17px] min-w-[17px] place-items-center rounded-full bg-deal px-1 text-[10px] font-black text-white">
                {toBn(count)}
              </span>
            ) : null}
          </span>
          কার্ট
        </button>
      </div>
    </nav>
  );
}
