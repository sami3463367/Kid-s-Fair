"use client";

import { useState } from "react";
import Link from "next/link";
import { toBn } from "@/lib/format";
import { chatMessage, waLink } from "@/lib/whatsapp";
import type { Product } from "@/lib/products";
import { Stars } from "./stars";
import { CheckIcon, WhatsappIcon } from "./icons";

export function ProductTabs({ product }: { product: Product }) {
  const tabs = [
    { id: "details", label: "বিস্তারিত" },
    { id: "specs", label: "স্পেসিফিকেশন" },
    { id: "reviews", label: `রিভিউ (${toBn(product.reviewsCount)})` },
  ] as const;
  const [active, setActive] = useState<(typeof tabs)[number]["id"]>("details");

  return (
    <div className="card overflow-hidden">
      <div
        className="flex overflow-x-auto border-b border-line bg-canvas/50 no-scrollbar"
        role="tablist"
        aria-label="পণ্যের তথ্য"
      >
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            type="button"
            aria-selected={active === t.id}
            onClick={() => setActive(t.id)}
            className={`relative shrink-0 px-4 py-3.5 text-[13.5px] font-bold transition ${
              active === t.id ? "text-brand-800" : "text-muted hover:text-ink"
            }`}
          >
            {t.label}
            {active === t.id ? (
              <span className="absolute inset-x-3 bottom-0 h-[3px] rounded-t-full bg-brand-600" />
            ) : null}
          </button>
        ))}
      </div>

      <div className="p-4 sm:p-5" role="tabpanel">
        {active === "details" ? (
          <div className="space-y-4">
            {product.description.map((para, i) => (
              <p key={i} className="text-[14px] leading-relaxed text-ink/85">
                {para}
              </p>
            ))}
            <ul className="grid gap-2 sm:grid-cols-2">
              {product.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-2 rounded-xl bg-brand-50/70 px-3 py-2.5 text-[13px] font-semibold text-brand-900"
                >
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {active === "specs" ? (
          <div className="overflow-hidden rounded-xl border border-line">
            <table className="w-full text-[13.5px]">
              <tbody className="divide-y divide-line">
                {product.specs.map((s, i) => (
                  <tr key={s.label} className={i % 2 ? "bg-canvas/40" : "bg-white"}>
                    <th scope="row" className="w-[42%] px-3.5 py-2.5 text-left font-bold text-muted">
                      {s.label}
                    </th>
                    <td className="px-3.5 py-2.5 font-semibold">{s.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}

        {active === "reviews" ? (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-4 rounded-2xl bg-canvas/60 p-4">
              <div>
                <p className="font-display text-3xl font-extrabold leading-none">
                  {toBn(product.rating.toFixed(1))}
                </p>
                <Stars rating={product.rating} size={16} className="mt-1.5" />
                <p className="mt-1 text-[12px] text-muted">
                  {toBn(product.reviewsCount)} টি রিভিউ
                </p>
              </div>
              <div className="flex-1 space-y-1.5">
                {[5, 4, 3, 2, 1].map((star) => {
                  const share = star === 5 ? 0.82 : star === 4 ? 0.14 : star === 3 ? 0.04 : 0;
                  return (
                    <div key={star} className="flex items-center gap-2">
                      <span className="w-8 text-[11.5px] font-bold text-muted">{toBn(star)} ★</span>
                      <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-line">
                        <span
                          className="block h-full rounded-full bg-deal"
                          style={{ width: `${Math.round(share * 100)}%` }}
                        />
                      </span>
                      <span className="w-9 text-right text-[11.5px] text-muted">
                        {toBn(Math.round(share * product.reviewsCount))}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <ul className="space-y-2.5">
              {product.reviews.map((r) => (
                <li key={r.name} className="rounded-2xl border border-line p-3.5">
                  <div className="flex items-center gap-2.5">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-100 font-display text-[13px] font-black text-brand-800">
                      {r.name.slice(0, 1)}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-[13.5px] font-bold">{r.name}</p>
                      <p className="truncate text-[11.5px] text-muted">
                        {r.location} • {r.date}
                      </p>
                    </div>
                    <Stars rating={r.rating} size={13} className="ml-auto" />
                  </div>
                  <p className="mt-2.5 text-[13.5px] leading-relaxed text-ink/85">{r.text}</p>
                </li>
              ))}
            </ul>

            <div className="flex flex-col items-center gap-2 rounded-2xl bg-brand-50 p-4 text-center">
              <p className="text-[13.5px] font-bold text-brand-900">
                আপনার অভিজ্ঞতা জানাতে চান? নাকি পণ্য সম্পর্কে কিছু জিজ্ঞেস আছে?
              </p>
              <a
                href={waLink(chatMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wa btn-sm"
              >
                <WhatsappIcon className="h-4 w-4" />
                হোয়াটসঅ্যাপে লিখুন
              </a>
            </div>
          </div>
        ) : null}
      </div>

      <div className="border-t border-line bg-canvas/40 px-4 py-3 text-[12.5px] text-muted">
        পণ্য সম্পর্কে নিশ্চিত নাই?{" "}
        <Link href="/help" className="font-bold text-brand-700 underline decoration-dotted">
          সাধারণ জিজ্ঞাসা
        </Link>{" "}
        দেখে নিন বা সরাসরি ফোন করুন।
      </div>
    </div>
  );
}
