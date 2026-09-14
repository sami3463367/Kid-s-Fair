"use client";

import { useState } from "react";
import { bdt, discountPercent, toBn } from "@/lib/format";
import type { Product } from "@/lib/products";
import { quickOrderMessage, waLink } from "@/lib/whatsapp";
import { useCart } from "@/lib/cart";
import { useToast } from "@/lib/toast";
import { QtyStepper } from "./qty-stepper";
import { CartIcon, CheckIcon, PhoneIcon, TruckIcon, WhatsappIcon } from "./icons";
import { site } from "@/lib/site";

export function ProductBuyBox({ product }: { product: Product }) {
  const { add, openDrawer } = useCart();
  const { push } = useToast();
  const [qty, setQty] = useState(1);
  const off = discountPercent(product.price, product.oldPrice);
  const soldOut = product.stock <= 0;
  const total = product.price * qty;

  return (
    <div className="card p-4 sm:p-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-[1.9rem] font-extrabold leading-none text-brand-800 sm:text-[2.1rem]">
              {bdt(product.price)}
            </span>
            {product.oldPrice ? (
              <span className="text-[15px] font-semibold text-muted line-through">
                {bdt(product.oldPrice)}
              </span>
            ) : null}
            {off ? (
              <span className="badge bg-deal text-white">-{toBn(off)}%</span>
            ) : null}
          </div>
          <p className="mt-1.5 text-[12.5px] font-semibold text-muted">{product.unitLabel}</p>
          {product.oldPrice ? (
            <p className="mt-1 inline-flex items-center gap-1 rounded-lg bg-deal-light px-2 py-1 text-[12px] font-bold text-deal-dark">
              <CheckIcon className="h-3.5 w-3.5" />
              {bdt(product.oldPrice - product.price)} সাশ্রয়
            </p>
          ) : null}
        </div>
        <div className="text-right">
          {soldOut ? (
            <span className="badge bg-danger/10 text-danger">স্টক শেষ</span>
          ) : (
            <span className="badge bg-brand-50 text-brand-700">
              স্টকে আছে ({toBn(product.stock)} টি)
            </span>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <div>
          <span className="label">পরিমাণ</span>
          <QtyStepper
            value={qty}
            onChange={setQty}
            min={1}
            max={Math.max(1, product.stock)}
            label="পরিমাণ"
          />
        </div>
        <div className="ml-auto text-right">
          <span className="label text-right">সর্বমোট</span>
          <p className="font-display text-lg font-extrabold leading-none">{bdt(total)}</p>
        </div>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <a
          href={waLink(quickOrderMessage(product, qty))}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-wa btn-lg"
        >
          <WhatsappIcon className="h-5 w-5" />
          হোয়াটসঅ্যাপে অর্ডার করুন
        </a>
        <button
          type="button"
          disabled={soldOut}
          onClick={() => {
            add(product.slug, qty);
            push(`${toBn(qty)} টি ${product.name} কার্টে যোগ হয়েছে`, { icon: "🛒" });
            openDrawer();
          }}
          className="btn-primary btn-lg"
        >
          <CartIcon className="h-5 w-5" />
          কার্টে যোগ করুন
        </button>
      </div>

      <p className="mt-2.5 text-center text-[11.5px] text-muted">
        অ্যাডভান্স পেমেন্ট লাগবে না • পণ্য হাতে পেয়ে টাকা দিন • পছন্দ না হলে {toBn(7)} দিনে রিটার্ন
      </p>

      <div className="mt-4 grid gap-2 border-t border-line pt-4 sm:grid-cols-3">
        <div className="flex items-start gap-2">
          <TruckIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" />
          <span className="text-[12px] leading-snug">
            <span className="block font-bold">ঢাকায় {site.delivery.insideDays}</span>
            <span className="block text-muted">বাইরে {site.delivery.outsideDays}</span>
          </span>
        </div>
        <div className="flex items-start gap-2">
          <span aria-hidden className="mt-0.5 text-lg leading-none">
            💵
          </span>
          <span className="text-[12px] leading-snug">
            <span className="block font-bold">ক্যাশ অন ডেলিভারি</span>
            <span className="block text-muted">{bdt(site.delivery.insideDhaka)} / {bdt(site.delivery.outsideDhaka)}</span>
          </span>
        </div>
        <div className="flex items-start gap-2">
          <PhoneIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" />
          <span className="text-[12px] leading-snug">
            <span className="block font-bold">সরাসরি কথা বলুন</span>
            <a href={`tel:${site.phoneDial}`} className="block text-brand-700 underline decoration-dotted">
              {toBn(site.phoneDisplay)}
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
