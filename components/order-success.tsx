"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { bdt, bnDateTime, toBn } from "@/lib/format";
import { site } from "@/lib/site";
import { STORAGE_KEYS, readJSON } from "@/lib/storage";
import type { Order } from "@/lib/auth";
import { orderMessage, waLink } from "@/lib/whatsapp";
import { getProduct } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { CheckIcon, CopyIcon, HomeIcon, PhoneIcon, TruckIcon, WhatsappIcon } from "./icons";

export function OrderSuccess() {
  const params = useSearchParams();
  const id = params.get("id");
  const { lines, totals } = useCart();
  const [order, setOrder] = useState<Order | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const all = readJSON<Order[]>(STORAGE_KEYS.orders, []);
    const found = id ? all.find((o) => o.id === id) : all[0];
    setOrder(found ?? null);
  }, [id]);

  const copy = async () => {
    if (!order) return;
    const text = orderMessage({
      lines: order.items.map((it) => ({ product: getProduct(it.slug)!, qty: it.qty })),
      totals: {
        subtotal: order.subtotal,
        delivery: order.delivery,
        total: order.total,
        freeDelivery: order.delivery === 0,
        remainingForFree: 0,
      },
      zone: order.zone,
      payment: order.payment,
      customer: order.customer,
      orderId: order.id,
    });
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="shell py-8 sm:py-12">
      <div className="mx-auto max-w-2xl">
        <div className="card overflow-hidden">
          <div className="relative overflow-hidden bg-gradient-to-br from-brand-700 to-ink px-5 py-8 text-center text-white sm:px-8">
            <div className="absolute inset-0 grid-lines opacity-25" aria-hidden />
            <span className="relative mx-auto grid h-16 w-16 place-items-center rounded-full bg-wa shadow-[0_16px_32px_-16px_rgba(37,211,102,0.9)]">
              <CheckIcon className="h-9 w-9" />
            </span>
            <h1 className="relative mt-4 text-[1.45rem] leading-tight sm:text-[1.75rem]">
              অর্ডার পাঠানো হয়েছে 🎉
            </h1>
            <p className="relative mx-auto mt-2 max-w-md text-[13.5px] leading-relaxed text-white/80">
              আপনার অর্ডারটি হোয়াটসঅ্যাপে চলে গেছে। আমরা সাধারণত {toBn(30)} মিনিটের মধ্যে কল বা
              মেসেজে কনফার্ম করব — চিন্তার কোনো কারণ নেই।
            </p>
          </div>

          {order ? (
            <div className="p-4 sm:p-5">
              <div className="flex flex-wrap items-center gap-2 rounded-2xl bg-canvas px-3.5 py-3">
                <div>
                  <p className="text-[11.5px] font-bold uppercase tracking-wide text-muted">অর্ডার আইডি</p>
                  <p className="font-display text-[1.05rem] font-extrabold leading-tight">{order.id}</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-[11.5px] font-bold uppercase tracking-wide text-muted">সময়</p>
                  <p className="text-[12.5px] font-bold">{bnDateTime(order.createdAt)}</p>
                </div>
              </div>

              <ul className="mt-3.5 divide-y divide-line rounded-2xl border border-line">
                {order.items.map((it) => (
                  <li key={it.slug} className="flex items-center gap-2.5 px-3.5 py-2.5 text-[13px]">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-brand-50 text-[11px] font-black text-brand-700">
                      {toBn(it.qty)}
                    </span>
                    <Link
                      href={`/products/${it.slug}`}
                      className="min-w-0 flex-1 truncate font-bold transition hover:text-brand-700"
                    >
                      {getProduct(it.slug)?.name ?? it.name}
                    </Link>
                    <span className="font-extrabold">{bdt(it.price * it.qty)}</span>
                  </li>
                ))}
              </ul>

              <dl className="mt-3.5 space-y-1.5 text-[13.5px]">
                <div className="flex justify-between">
                  <dt className="text-muted">পণ্যের দাম</dt>
                  <dd className="font-bold">{bdt(order.subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted">ডেলিভারি চার্জ</dt>
                  <dd className="font-bold">
                    {order.delivery === 0 ? <span className="text-brand-700">ফ্রি</span> : bdt(order.delivery)}
                  </dd>
                </div>
                <div className="flex items-end justify-between border-t border-dashed border-line pt-2.5">
                  <dt className="text-[14px] font-extrabold">সর্বমোট</dt>
                  <dd className="font-display text-[1.3rem] font-extrabold leading-none text-brand-800">
                    {bdt(order.total)}
                  </dd>
                </div>
              </dl>

              <div className="mt-3.5 grid gap-2 rounded-2xl bg-canvas/70 p-3.5 text-[12.5px] sm:grid-cols-2">
                <p>
                  <span className="block font-bold text-muted">গ্রাহক</span>
                  {order.customer.name} • {toBn(order.customer.phone)}
                </p>
                <p>
                  <span className="block font-bold text-muted">ঠিকানা</span>
                  {order.customer.address}, {order.customer.thana}, {order.customer.district}
                </p>
                <p>
                  <span className="block font-bold text-muted">পেমেন্ট</span>
                  {order.payment === "cod"
                    ? "ক্যাশ অন ডেলিভারি"
                    : order.payment === "bkash"
                      ? "bKash"
                      : "Nagad"}
                </p>
                <p>
                  <span className="block font-bold text-muted">ডেলিভারি সময়</span>
                  {order.zone === "inside" ? site.delivery.insideDays : site.delivery.outsideDays}
                </p>
              </div>

              <div className="mt-4 grid gap-2 sm:grid-cols-3">
                <a
                  href={waLink(
                    `অর্ডার #${order.id} কনফার্ম করে ডেলিভারির আপডেট দিন প্লিজ।\nগ্রাহক: ${order.customer.name} • ${toBn(order.customer.phone)}`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-wa"
                >
                  <WhatsappIcon className="h-4 w-4" />
                  আবার মনে করিয়ে দিন
                </a>
                <button type="button" onClick={copy} className="btn-outline">
                  <CopyIcon className="h-4 w-4" />
                  {copied ? "কপি হয়েছে ✅" : "বিবরণ কপি করুন"}
                </button>
                <a href={`tel:${site.phoneDial}`} className="btn-outline">
                  <PhoneIcon className="h-4 w-4" />
                  ফোন করুন
                </a>
              </div>
            </div>
          ) : (
            <div className="p-5 text-center">
              <p className="text-[13.5px] text-muted">
                এই ডিভাইসে কোনো অর্ডারের রেকর্ড পাওয়া যায়নি। অর্ডার হোয়াটসঅ্যাপে পাঠানো হলেও
                রেকর্ড দেখতে চাইলে অ্যাকাউন্টে লগইন করে আবার চেষ্টা করুন।
              </p>
              <Link href="/products" className="btn-primary mt-4">
                পণ্য দেখুন
              </Link>
            </div>
          )}

          <div className="border-t border-line bg-canvas/50 p-4 sm:p-5">
            <h2 className="text-[14.5px] font-extrabold">এরপর যা হবে</h2>
            <ol className="mt-2.5 space-y-2 text-[13px] text-muted">
              {[
                "আমরা আপনার নম্বরে কল বা হোয়াটসঅ্যাপে মেসেজ দিয়ে অর্ডার নিশ্চিত করব",
                "পণ্য চেক করে বাবল র‍্যাপ + কার্টনে প্যাক করা হবে",
                `ডেলিভারি: ঢাকার ভিতরে ${site.delivery.insideDays}, বাইরে ${site.delivery.outsideDays}`,
                "পণ্য হাতে পেয়ে দেখে-শুনে টাকা দিবেন — পছন্দ না হলে ফেরত দিতে পারবেন",
              ].map((t, i) => (
                <li key={t} className="flex items-start gap-2.5">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-lg bg-brand-700 text-[10.5px] font-black text-white">
                    {toBn(i + 1)}
                  </span>
                  {t}
                </li>
              ))}
            </ol>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href="/products" className="btn-primary btn-sm">
                আরও কিনতে চাই
              </Link>
              <Link href="/account#orders" className="btn-soft btn-sm">
                <TruckIcon className="h-4 w-4" />
                অর্ডার ট্র্যাক করুন
              </Link>
              <Link href="/" className="btn-outline btn-sm">
                <HomeIcon className="h-4 w-4" />
                হোমে ফিরে যান
              </Link>
            </div>
            {lines.length > 0 ? (
              <p className="mt-3 text-[12px] text-muted">
                আপনার কার্টে এখনও {toBn(lines.length)} টি পণ্য আছে (মোট {bdt(totals.total)}) — নতুন
                অর্ডার করতে চাইলে সেগুলো রেখেই চেকআউট করুন।
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
