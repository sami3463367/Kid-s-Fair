"use client";

import Image from "next/image";
import Link from "next/link";
import { bdt, toBn } from "@/lib/format";
import { site } from "@/lib/site";
import { useCart } from "@/lib/cart";
import { useToast } from "@/lib/toast";
import { cartOrderMessage, waLink } from "@/lib/whatsapp";
import { QtyStepper } from "./qty-stepper";
import { zoneOptions } from "@/lib/locations";
import {
  ArrowRightIcon,
  CartIcon,
  CheckIcon,
  TrashIcon,
  TruckIcon,
  WhatsappIcon,
} from "./icons";

export function CartView() {
  const { lines, count, totals, setQty, remove, clear, zone, setZone, hydrated } = useCart();
  const { push } = useToast();

  if (!hydrated) {
    return (
      <div className="shell py-8">
        <div className="skeleton h-9 w-56 rounded-xl" />
        <div className="mt-5 grid gap-4 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-2.5">
            {[0, 1].map((i) => (
              <div key={i} className="skeleton h-28 w-full rounded-2xl" />
            ))}
          </div>
          <div className="skeleton h-80 w-full rounded-2xl" />
        </div>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="shell py-14">
        <div className="mx-auto flex max-w-md flex-col items-center gap-4 rounded-3xl border border-dashed border-line bg-white px-6 py-12 text-center">
          <span className="grid h-16 w-16 place-items-center rounded-2xl bg-canvas text-3xl" aria-hidden>
            🧺
          </span>
          <h1 className="text-[1.35rem] leading-tight">আপনার কার্ট খালি</h1>
          <p className="max-w-xs text-[13.5px] leading-relaxed text-muted">
            পছন্দের SKB হ্যাঙ্গার কার্টে যোগ করে অর্ডার শুরু করুন। সাইজ না জানা থাকলে আমরা বলে দিব।
          </p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Link href="/products" className="btn-primary">
              কেনাকাটা শুরু করুন
            </Link>
            <Link href="/help#sizes" className="btn-outline">
              সাইজ গাইড দেখুন
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const progress = Math.min(100, Math.round((totals.subtotal / site.delivery.freeOver) * 100));

  return (
    <div className="shell py-6 sm:py-8">
      <nav aria-label="ব্রেডক্রাম্ব" className="text-[12px] font-semibold text-muted">
        <Link href="/" className="transition hover:text-brand-700">
          হোম
        </Link>
        <span aria-hidden> / </span>
        <span className="text-ink">কার্ট</span>
      </nav>

      <h1 className="mt-2 flex items-center gap-2.5 text-[1.5rem] leading-tight sm:text-[1.85rem]">
        <CartIcon className="h-6 w-6 text-brand-700" />
        আপনার কার্ট
        <span className="badge bg-brand-50 text-brand-700">{toBn(count)} টি পণ্য</span>
      </h1>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.5fr_1fr] lg:items-start">
        <div className="space-y-2.5">
          {lines.map(({ product, qty }) => (
            <div key={product.slug} className="card flex gap-3 p-3 sm:p-3.5">
              <Link
                href={`/products/${product.slug}`}
                className="relative h-[74px] w-[92px] shrink-0 overflow-hidden rounded-xl bg-canvas sm:h-24 sm:w-28"
              >
                <Image
                  src={product.images[0].src}
                  alt={product.images[0].alt}
                  fill
                  sizes="112px"
                  className="object-contain p-1"
                />
              </Link>
              <div className="min-w-0 flex-1">
                <div className="flex items-start gap-2">
                  <Link
                    href={`/products/${product.slug}`}
                    className="text-[14px] font-bold leading-snug transition hover:text-brand-700"
                  >
                    {product.name}
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      remove(product.slug);
                      push("কার্ট থেকে পণ্যটি সরানো হয়েছে", { tone: "info", icon: "🗑️" });
                    }}
                    aria-label={`${product.name} সরান`}
                    className="ml-auto grid h-8 w-8 shrink-0 place-items-center rounded-lg text-muted transition hover:bg-danger/10 hover:text-danger active:scale-90"
                  >
                    <TrashIcon className="h-[18px] w-[18px]" />
                  </button>
                </div>
                <p className="mt-1 text-[12px] font-semibold text-muted">
                  {bdt(product.price)} / পিস • {product.unitLabel}
                </p>
                <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2">
                  <QtyStepper
                    size="sm"
                    value={qty}
                    min={1}
                    max={Math.max(1, product.stock)}
                    onChange={(next) => setQty(product.slug, next)}
                  />
                  <div className="text-right">
                    <p className="font-display text-[17px] font-extrabold leading-none text-brand-800">
                      {bdt(product.price * qty)}
                    </p>
                    {qty > 1 ? (
                      <p className="mt-1 text-[11px] text-muted">
                        {toBn(qty)} × {bdt(product.price)}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <Link href="/products" className="btn-ghost btn-sm">
              ← আরও কিনতে চাই
            </Link>
            <button
              type="button"
              onClick={() => {
                clear();
                push("কার্ট খালি করা হয়েছে", { tone: "info", icon: "🧹" });
              }}
              className="btn-ghost btn-sm text-danger hover:bg-danger/10"
            >
              কার্ট খালি করুন
            </button>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24">
          <div className="card p-4">
            <h2 className="text-[15px] font-extrabold">অর্ডার সারাংশ</h2>

            <div className="mt-3.5 grid gap-1.5">
              <span className="label">ডেলিভারি এলাকা</span>
              <div className="grid gap-1.5">
                {zoneOptions.map((z) => (
                  <button
                    key={z.id}
                    type="button"
                    onClick={() => setZone(z.id)}
                    className={`flex items-start gap-2.5 rounded-xl border px-3 py-2.5 text-left transition active:scale-[0.99] ${
                      zone === z.id
                        ? "border-brand-600 bg-brand-50/70"
                        : "border-line hover:border-brand-200"
                    }`}
                    aria-pressed={zone === z.id}
                  >
                    <span
                      className={`mt-0.5 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full border-2 ${
                        zone === z.id ? "border-brand-600" : "border-line"
                      }`}
                    >
                      {zone === z.id ? <span className="h-2 w-2 rounded-full bg-brand-600" /> : null}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[13px] font-bold">
                        {z.title} •{" "}
                        {totals.freeDelivery
                          ? "ফ্রি"
                          : bdt(z.id === "inside" ? site.delivery.insideDhaka : site.delivery.outsideDhaka)}
                      </span>
                      <span className="mt-0.5 block text-[11.5px] leading-snug text-muted">
                        {z.id === "inside"
                          ? `সময়: ${site.delivery.insideDays}`
                          : `সময়: ${site.delivery.outsideDays}`}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {!totals.freeDelivery ? (
              <div className="mt-3 rounded-xl bg-canvas px-3 py-2.5">
                <p className="text-[12px] font-bold">
                  আর {bdt(totals.remainingForFree)} যোগ করলেই ডেলিভারি ফ্রি 🎉
                </p>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line">
                  <div
                    className="h-full rounded-full bg-brand-500 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            ) : (
              <p className="mt-3 flex items-center gap-1.5 rounded-xl bg-brand-50 px-3 py-2.5 text-[12px] font-bold text-brand-800">
                <CheckIcon className="h-4 w-4" /> অভিনন্দন! এই অর্ডারে ডেলিভারি ফ্রি
              </p>
            )}

            <dl className="mt-3.5 space-y-1.5 border-t border-dashed border-line pt-3 text-[13.5px]">
              <div className="flex justify-between">
                <dt className="text-muted">পণ্যের দাম</dt>
                <dd className="font-bold">{bdt(totals.subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="flex items-center gap-1.5 text-muted">
                  <TruckIcon className="h-4 w-4" /> ডেলিভারি চার্জ
                </dt>
                <dd className="font-bold">
                  {totals.delivery === 0 ? <span className="text-brand-700">ফ্রি</span> : bdt(totals.delivery)}
                </dd>
              </div>
              <div className="flex items-end justify-between border-t border-line pt-2.5">
                <dt className="text-[14px] font-extrabold">সর্বমোট</dt>
                <dd className="font-display text-[1.3rem] font-extrabold leading-none text-brand-800">
                  {bdt(totals.total)}
                </dd>
              </div>
            </dl>

            <div className="mt-4 grid gap-2">
              <Link href="/checkout" className="btn-primary btn-lg btn-block">
                চেকআউটে যান
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <a
                href={waLink(cartOrderMessage({ lines, totals, zone }))}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wa btn-block"
              >
                <WhatsappIcon className="h-[18px] w-[18px]" />
                তথ্য দিয়ে হোয়াটসঅ্যাপে পাঠান
              </a>
            </div>
            <p className="mt-2.5 text-center text-[11.5px] leading-snug text-muted">
              অ্যাডভান্স পেমেন্ট লাগবে না। অর্ডার কনফার্ম করার পর আমরা ফোন করে ঠিকানা নিশ্চিত করব।
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
