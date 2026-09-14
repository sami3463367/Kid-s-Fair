"use client";

import Link from "next/link";
import { bdt, bnDateTime, toBn } from "@/lib/format";
import { site } from "@/lib/site";
import { useAuth } from "@/lib/auth";
import { useCart } from "@/lib/cart";
import { useToast } from "@/lib/toast";
import { chatMessage, waLink } from "@/lib/whatsapp";
import { getProduct } from "@/lib/products";
import {
  CartIcon,
  CheckIcon,
  LockIcon,
  PhoneIcon,
  ShieldIcon,
  TruckIcon,
  WhatsappIcon,
} from "./icons";

export function AccountView() {
  const { user, orders, ready, logout } = useAuth();
  const { openDrawer, count, add } = useCart();
  const { push } = useToast();

  if (!ready) {
    return (
      <div className="shell py-10">
        <div className="skeleton h-40 w-full" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="shell py-10 sm:py-14">
        <div className="mx-auto max-w-md rounded-3xl border border-line bg-white p-6 text-center shadow-card sm:p-8">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-700">
            <LockIcon className="h-7 w-7" />
          </span>
          <h1 className="mt-4 text-[1.5rem] leading-tight">লগইন প্রয়োজন</h1>
          <p className="mx-auto mt-2 max-w-xs text-[13.5px] leading-relaxed text-muted">
            অ্যাকাউন্ট দেখতে লগইন করুন বা নতুন অ্যাকাউন্ট খুলুন। অর্ডারের তালিকা, ডেলিভারি আপডেট ও
            সাশ্রয়ী অফার এখানেই পাবেন।
          </p>
          <div className="mt-5 grid grid-cols-2 gap-2.5">
            <Link href="/login" className="btn-outline btn-lg">
              লগইন
            </Link>
            <Link href="/register" className="btn-primary btn-lg">
              রেজিস্টার
            </Link>
          </div>
          <a
            href={waLink(chatMessage())}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wa btn-sm mt-3 w-full"
          >
            <WhatsappIcon className="h-4 w-4" />
            অ্যাকাউন্ট ছাড়াই অর্ডার করুন
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="shell py-6 sm:py-8">
      <nav aria-label="ব্রেডক্রাম্ব" className="text-[12px] font-semibold text-muted">
        <Link href="/" className="transition hover:text-brand-700">
          হোম
        </Link>
        <span aria-hidden> / </span>
        <span className="text-ink">আমার অ্যাকাউন্ট</span>
      </nav>

      <div className="mt-3 card overflow-hidden">
        <div className="flex flex-wrap items-center gap-3 bg-gradient-to-br from-brand-800 to-ink p-4 text-white sm:p-5">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/10 font-display text-xl font-black backdrop-blur">
            {user.name.slice(0, 1)}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[11.5px] font-bold uppercase tracking-wide text-white/70">স্বাগতম</p>
            <h1 className="truncate text-[1.25rem] leading-tight">{user.name}</h1>
            <p className="mt-0.5 text-[12.5px] text-white/80">
              {toBn(user.phone)} {user.email ? `• ${user.email}` : ""}
            </p>
          </div>
          <div className="flex gap-2">
            <a href={`tel:${site.phoneDial}`} className="btn-outline btn-sm bg-white/10 text-white hover:bg-white/20">
              <PhoneIcon className="h-4 w-4" />
              কল
            </a>
            <button
              type="button"
              onClick={() => {
                logout();
                push("লগআউট হয়েছে", { tone: "info", icon: "👋" });
              }}
              className="btn-outline btn-sm bg-white/10 text-white hover:bg-white/20"
            >
              লগআউট
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 divide-x divide-line border-t border-line text-center">
          {[
            { label: "মোট অর্ডার", value: toBn(orders.length) },
            { label: "চলমান অর্ডার", value: toBn(orders.filter((o) => o.status.includes("কনফার্মেশন")).length) },
            { label: "সঞ্চয়", value: bdt(orders.reduce((n, o) => n + Math.max(0, (o.subtotal * 0.12) | 0), 0)) },
          ].map((s) => (
            <div key={s.label} className="px-2 py-3">
              <p className="font-display text-[1.05rem] font-extrabold leading-none">{s.value}</p>
              <p className="mt-1 text-[11.5px] text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.6fr_1fr] lg:items-start">
        <section id="orders" className="scroll-mt-28">
          <h2 className="text-[1.05rem] font-extrabold">আমার অর্ডারসমূহ</h2>
          {orders.length === 0 ? (
            <div className="mt-3 rounded-2xl border border-dashed border-line bg-white px-5 py-10 text-center">
              <span className="text-3xl" aria-hidden>
                📦
              </span>
              <p className="mt-2.5 text-[14.5px] font-bold">এখনো কোনো অর্ডার করা হয়নি</p>
              <p className="mx-auto mt-1.5 max-w-sm text-[13px] leading-relaxed text-muted">
                প্রথম অর্ডার করতে পণ্য দেখুন — {bdt(site.delivery.freeOver)}+ অর্ডারে ডেলিভারি ফ্রি।
              </p>
              <Link href="/products" className="btn-primary btn-sm mt-4">
                কেনাকাটা শুরু করুন
              </Link>
            </div>
          ) : (
            <ul className="mt-3 space-y-2.5">
              {orders.map((o) => (
                <li key={o.id} className="card p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="badge bg-canvas text-ink">অর্ডার #{o.id}</span>
                    <span className="text-[11.5px] font-semibold text-muted">{bnDateTime(o.createdAt)}</span>
                    <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-deal-light px-2 py-1 text-[11px] font-bold text-deal-dark">
                      <span className="h-1.5 w-1.5 rounded-full bg-deal" aria-hidden />
                      {o.status}
                    </span>
                  </div>
                  <ul className="mt-3 divide-y divide-line rounded-xl bg-canvas/50 px-3">
                    {o.items.map((it) => (
                      <li key={it.slug} className="flex items-center gap-2 py-2 text-[13px]">
                        <Link
                          href={`/products/${it.slug}`}
                          className="min-w-0 flex-1 truncate font-bold transition hover:text-brand-700"
                        >
                          {getProduct(it.slug)?.name ?? it.name}
                        </Link>
                        <span className="text-muted">× {toBn(it.qty)}</span>
                        <span className="w-20 text-right font-extrabold">{bdt(it.price * it.qty)}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 text-[12.5px]">
                    <span className="text-muted">
                      ডেলিভারি: {o.zone === "inside" ? "ঢাকার ভিতরে" : "ঢাকার বাইরে"} •{" "}
                      {o.delivery === 0 ? "ফ্রি" : bdt(o.delivery)}
                    </span>
                    <span className="text-[14px] font-extrabold text-brand-800">{bdt(o.total)}</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <a
                      href={waLink(
                        `অর্ডার #${o.id} এর স্ট্যাটাস জানতে চাই।\nনাম: ${o.customer.name}\nমোট: ${bdt(o.total)}`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-wa btn-sm"
                    >
                      <WhatsappIcon className="h-4 w-4" />
                      স্ট্যাটাস জানুন
                    </a>
                    <button
                      type="button"
                      className="btn-outline btn-sm"
                      onClick={() => {
                        o.items.forEach((it) => add(it.slug, it.qty));
                        openDrawer();
                        push("আগের অর্ডারের পণ্য কার্টে যোগ হয়েছে", { icon: "🛒" });
                      }}
                    >
                      <CartIcon className="h-4 w-4" />
                      আবার অর্ডার করুন
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <aside className="space-y-3">
          <div className="card p-4">
            <h3 className="text-[14.5px] font-extrabold">সংরক্ষিত ঠিকানা</h3>
            <div className="mt-2.5 rounded-xl bg-canvas/60 p-3 text-[13px] leading-relaxed">
              <p className="font-bold">{user.name}</p>
              <p className="mt-0.5 text-muted">{toBn(user.phone)}</p>
              <p className="mt-1.5 text-muted">
                অর্ডারের সময় দেওয়া ঠিকানা এখানে যুক্ত হবে — চেকআউট ফর্ম পূরণ করলেই আপনার ঠিকানা
                মনে রাখা হবে।
              </p>
              <Link href="/checkout" className="btn-soft btn-sm mt-3">
                চেকআউটে যান
              </Link>
            </div>
          </div>

          <div className="card p-4">
            <h3 className="flex items-center gap-2 text-[14.5px] font-extrabold">
              <TruckIcon className="h-5 w-5 text-brand-700" />
              ডেলিভারি আপডেট
            </h3>
            <ul className="mt-2.5 space-y-2 text-[12.5px] text-muted">
              <li className="flex items-start gap-2">
                <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                অর্ডার কনফার্ম হওয়ার পর ফোন বা হোয়াটসঅ্যাপে কুরিয়ার নম্বর পাবেন
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                পণ্য পাঠানোর আগে প্রতিটি হ্যাঙ্গার চেক করে প্যাক করা হয়
              </li>
              <li className="flex items-start gap-2">
                <ShieldIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                ডেফেক্ট পেলে {toBn(7)} দিনে রিটার্ন — খরচ আমরা বহন করি
              </li>
            </ul>
            <p className="mt-3 rounded-xl bg-canvas px-3 py-2 text-[12px] text-muted">
              কার্টে এখন {toBn(count)} টি পণ্য আছে।
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
