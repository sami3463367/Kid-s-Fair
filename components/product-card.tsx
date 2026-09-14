"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { bdt, discountPercent, toBn } from "@/lib/format";
import type { Product } from "@/lib/products";
import { quickOrderMessage, waLink } from "@/lib/whatsapp";
import { useCart } from "@/lib/cart";
import { useToast } from "@/lib/toast";
import { BoltIcon, CartIcon, WhatsappIcon } from "./icons";
import { RatingLine } from "./stars";

export function ProductCard({
  product,
  priority = false,
  compact = false,
}: {
  product: Product;
  priority?: boolean;
  compact?: boolean;
}) {
  const { add, qtyOf } = useCart();
  const { push } = useToast();
  const [busy, setBusy] = useState(false);
  const off = discountPercent(product.price, product.oldPrice);
  const inCart = qtyOf(product.slug);
  const lowStock = product.stock > 0 && product.stock <= 10;

  const handleAdd = () => {
    setBusy(true);
    add(product.slug, 1);
    push(`${product.name} কার্টে যোগ হয়েছে`, { icon: "🛒" });
    window.setTimeout(() => setBusy(false), 380);
  };

  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lift ${
        product.isCombo ? "ring-1 ring-deal/25" : ""
      }`}
    >
      <div className="absolute right-3 top-3 z-10 flex flex-col items-end gap-1.5">
        {off ? (
          <span className="badge bg-deal text-white shadow-sm">-{toBn(off)}%</span>
        ) : null}
        {product.badgeLabel ? (
          <span className="badge bg-ink/85 text-white backdrop-blur">{product.badgeLabel}</span>
        ) : null}
      </div>

      <Link
        href={`/products/${product.slug}`}
        className="relative block overflow-hidden bg-gradient-to-br from-white via-canvas to-brand-50/60"
        aria-label={`${product.name} বিস্তারিত দেখুন`}
      >
        <div className="relative aspect-[4/5] w-full">
          <Image
            src={product.images[0].src}
            alt={product.images[0].alt}
            fill
            sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 22vw"
            priority={priority}
            loading={priority ? undefined : "lazy"}
            className="object-contain p-2.5 transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </div>
        {lowStock ? (
          <span className="absolute bottom-2 left-2 badge bg-danger/10 text-danger">
            স্টক প্রায় শেষ ({toBn(product.stock)} টি)
          </span>
        ) : null}
      </Link>

      <div className={`flex flex-1 flex-col p-3.5 ${compact ? "sm:p-3" : "sm:p-4"}`}>
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-brand-700">
          <span className="rounded-md bg-brand-50 px-1.5 py-0.5">মডেল {product.model}</span>
          <span className="text-muted/70">• {toBn(product.clipCount)} ক্লিপ</span>
        </div>

        <h3 className="mt-2 text-[15px] font-bold leading-snug sm:text-base">
          <Link href={`/products/${product.slug}`} className="transition hover:text-brand-700">
            <span className="line-clamp-2">{product.name}</span>
          </Link>
        </h3>

        {!compact ? (
          <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-muted">
            {product.summary}
          </p>
        ) : null}

        <div className="mt-2.5 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-[17px] font-extrabold text-brand-800 sm:text-lg">
                {bdt(product.price)}
              </span>
              {product.oldPrice ? (
                <span className="text-[13px] font-semibold text-muted line-through">
                  {bdt(product.oldPrice)}
                </span>
              ) : null}
            </div>
            <span className="text-[11px] font-semibold text-muted">{product.unitLabel}</span>
          </div>
          <RatingLine rating={product.rating} count={product.reviewsCount} />
        </div>

        <div className="mt-3.5 grid grid-cols-1 gap-2 sm:grid-cols-[1fr_auto]">
          <a
            href={waLink(quickOrderMessage(product, 1))}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wa btn-sm rounded-xl"
          >
            <WhatsappIcon className="h-4 w-4" />
            হোয়াটসঅ্যাপে অর্ডার
          </a>
          <button
            type="button"
            onClick={handleAdd}
            className={`btn-outline btn-sm rounded-xl ${busy ? "animate-pop" : ""}`}
            aria-label={`${product.name} কার্টে যোগ করুন`}
          >
            {inCart > 0 ? (
              <>
                <BoltIcon className="h-4 w-4 text-deal" />
                কার্টে {toBn(inCart)}
              </>
            ) : (
              <>
                <CartIcon className="h-4 w-4" />
                কার্টে যোগ
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
