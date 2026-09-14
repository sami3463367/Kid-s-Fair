"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { site } from "@/lib/site";
import { toBn } from "@/lib/format";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";
import { chatMessage, waLink } from "@/lib/whatsapp";
import {
  CartIcon,
  ChatIcon,
  CloseIcon,
  HomeIcon,
  GridIcon,
  MenuIcon,
  PhoneIcon,
  SearchIcon,
  UserIcon,
  WhatsappIcon,
} from "./icons";

const navLinks = [
  { href: "/", label: "হোম", icon: HomeIcon },
  { href: "/products", label: "সব পণ্য", icon: GridIcon },
  { href: "/products?filter=combo", label: "কম্বো অফার", icon: CartIcon },
  { href: "/about", label: "আমাদের কথা", icon: ChatIcon },
  { href: "/contact", label: "যোগাযোগ", icon: PhoneIcon },
];

export function SiteHeader() {
  const { count, openDrawer } = useCart();
  const { user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [q, setQ] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const submitSearch = (e: FormEvent) => {
    e.preventDefault();
    const term = q.trim();
    router.push(term ? `/products?q=${encodeURIComponent(term)}` : "/products");
  };

  return (
    <header className="sticky top-0 z-50">
      {/* ঘোষণা বার */}
      <div className="relative overflow-hidden bg-ink py-1.5 text-white">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap pl-4 text-[11.5px] font-semibold tracking-tight sm:text-xs">
          {[...site.marquee, ...site.marquee].map((line, i) => (
            <span key={i} className="opacity-95" aria-hidden={i >= site.marquee.length}>
              {line}
            </span>
          ))}
        </div>
      </div>

      <div
        className={`border-b transition-all duration-300 ${
          scrolled
            ? "border-line bg-white/90 shadow-[0_10px_30px_-24px_rgba(6,40,34,0.6)] backdrop-blur-xl"
            : "border-transparent bg-white/80 backdrop-blur-md"
        }`}
      >
        <div className="shell flex h-14 items-center gap-2 sm:h-16 sm:gap-3">
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
            aria-expanded={menuOpen}
            className="tap-target -ml-1.5 grid place-items-center rounded-xl text-ink transition hover:bg-canvas active:scale-90 lg:hidden"
          >
            {menuOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>

          <Link href="/" className="flex items-center gap-2.5" aria-label={`${site.name} — হোম`}>
            <span className="relative grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-full ring-1 ring-brand-200 sm:h-10 sm:w-10">
              <Image src="/brand/logo-mark.png" alt="" width={40} height={40} className="h-full w-full object-cover" priority />
            </span>
            <span className="leading-none">
              <span className="block font-display text-[15px] font-extrabold tracking-tight sm:text-[17px]">
                {site.name}
              </span>
              <span className="mt-1 hidden text-[11px] font-semibold text-brand-700 sm:block">
                {site.tagline}
              </span>
            </span>
          </Link>

          <nav className="ml-5 hidden items-center gap-0.5 lg:flex" aria-label="প্রধান মেনু">
            {navLinks.map((link) => {
              const active =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href.split("?")[0]) && link.href !== "/";
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-lg px-3 py-2 text-[13.5px] font-bold transition ${
                    active ? "bg-brand-50 text-brand-800" : "text-muted hover:bg-canvas hover:text-ink"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-1.5">
            <form onSubmit={submitSearch} className="hidden xl:block" role="search">
              <label className="relative block">
                <span className="sr-only">পণ্য খুঁজুন</span>
                <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="হ্যাঙ্গার খুঁজুন…"
                  className="h-10 w-52 rounded-xl border border-line bg-canvas/60 pl-9 pr-3 text-sm outline-none transition focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
                />
              </label>
            </form>

            <Link
              href="/products"
              aria-label="পণ্য খুঁজুন"
              className="tap-target grid place-items-center rounded-xl text-ink transition hover:bg-canvas active:scale-90 xl:hidden"
            >
              <SearchIcon className="h-[22px] w-[22px]" />
            </Link>

            <Link
              href={user ? "/account" : "/login"}
              aria-label={user ? "আমার অ্যাকাউন্ট" : "লগইন / অ্যাকাউন্ট খুলুন"}
              className="tap-target relative grid place-items-center rounded-xl text-ink transition hover:bg-canvas active:scale-90"
            >
              <UserIcon className="h-[22px] w-[22px]" />
              {user ? (
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-brand-500 ring-2 ring-white" />
              ) : null}
            </Link>

            <button
              type="button"
              onClick={openDrawer}
              aria-label={`কার্ট খুলুন — ${toBn(count)} টি পণ্য`}
              className="tap-target relative grid place-items-center rounded-xl text-ink transition hover:bg-canvas active:scale-90"
            >
              <CartIcon className="h-[22px] w-[22px]" />
              <CartBadge count={count} />
            </button>

            <a
              href={waLink(chatMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wa btn-sm ml-1 hidden sm:inline-flex"
            >
              <WhatsappIcon className="h-4 w-4" />
              অর্ডার করুন
            </a>
          </div>
        </div>
      </div>

      {/* মোবাইল মেনু */}
      {menuOpen ? (
        <div className="lg:hidden">
          <button
            type="button"
            aria-label="মেনু বন্ধ করুন"
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 top-0 z-40 h-screen w-screen cursor-default bg-ink/45 backdrop-blur-[2px]"
          />
          <div className="relative z-50 animate-sheet-up border-b border-line bg-white px-4 pb-5 pt-2 shadow-lift">
            <nav className="grid gap-1" aria-label="মোবাইল মেনু">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-2.5 py-3 text-[15px] font-bold transition active:scale-[0.99] hover:bg-canvas"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-50 text-brand-700">
                    <link.icon className="h-5 w-5" />
                  </span>
                  {link.label}
                </Link>
              ))}
              <Link
                href={user ? "/account" : "/register"}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 rounded-xl px-2.5 py-3 text-[15px] font-bold transition active:scale-[0.99] hover:bg-canvas"
              >
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-50 text-brand-700">
                  <UserIcon className="h-5 w-5" />
                </span>
                {user ? "আমার অ্যাকাউন্ট" : "অ্যাকাউন্ট খুলুন"}
              </Link>
            </nav>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <a href={waLink(chatMessage())} target="_blank" rel="noopener noreferrer" className="btn-wa">
                <WhatsappIcon className="h-4 w-4" />
                হোয়াটসঅ্যাপ
              </a>
              <a href={`tel:${site.phoneDial}`} className="btn-outline">
                <PhoneIcon className="h-4 w-4" />
                {toBn(site.phoneDisplay)}
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function CartBadge({ count }: { count: number }) {
  if (count <= 0) return null;
  return (
    <span
      key={count}
      className="absolute -right-0.5 -top-0.5 grid h-[18px] min-w-[18px] animate-pop place-items-center rounded-full bg-deal px-1 text-[10px] font-black leading-none text-white ring-2 ring-white"
    >
      {toBn(count)}
    </span>
  );
}
