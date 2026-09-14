"use client";

import Image from "next/image";
import Link from "next/link";
import { bdt, toBn } from "@/lib/format";
import { useCart } from "@/lib/cart";
import { quickOrderMessage, waLink } from "@/lib/whatsapp";
import { CartIcon, CloseIcon, TrashIcon, WhatsappIcon } from "./icons";
import { QtyStepper } from "./qty-stepper";

export function CartDrawer() {
  const { drawerOpen, closeDrawer, lines, totals, count, setQty, remove } = useCart();

  if (!drawerOpen) return null;

  return (
    <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label="কার্ট">
      <button
        type="button"
        aria-label="কার্ট বন্ধ করুন"
        onClick={closeDrawer}
        className="absolute inset-0 h-full w-full cursor-default bg-ink/45 backdrop-blur-[2px] transition-opacity"
      />
      <div className="absolute inset-x-0 bottom-0 flex max-h-[88vh] animate-sheet-up flex-col rounded-t-3xl bg-white shadow-lift sm:inset-y-0 sm:left-auto sm:right-0 sm:max-h-none sm:w-[27rem] sm:animate-slide-left sm:rounded-l-3xl sm:rounded-tr-none">
        <div className="flex items-center gap-3 border-b border-line px-4 py-3.5">
          <h2 className="flex items-center gap-2 text-[17px] font-extrabold">
            <CartIcon className="h-5 w-5 text-brand-700" />
            আপনার কার্ট
            <span className="badge bg-brand-50 text-brand-700">{toBn(count)} টি পণ্য</span>
          </h2>
          <button
            type="button"
            onClick={closeDrawer}
            aria-label="বন্ধ করুন"
            className="ml-auto grid h-9 w-9 place-items-center rounded-xl text-muted transition hover:bg-canvas active:scale-90"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 py-14 text-center">
            <span className="grid h-16 w-16 place-items-center rounded-2xl bg-canvas text-3xl" aria-hidden>
              🧺
            </span>
            <p className="text-[15px] font-bold">আপনার কার্ট খালি</p>
            <p className="max-w-[16rem] text-[13px] text-muted">
              পছন্দের SKB হ্যাঙ্গার কার্টে যোগ করে অর্ডার শুরু করুন।
            </p>
            <Link href="/products" onClick={closeDrawer} className="btn-primary mt-1">
              কেনাকাটা শুরু করুন
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-2.5 overflow-y-auto px-4 py-3.5">
              {lines.map(({ product, qty }) => (
                <div
                  key={product.slug}
                  className="flex gap-3 rounded-2xl border border-line bg-white p-2.5"
                >
                  <Link
                    href={`/products/${product.slug}`}
                    onClick={closeDrawer}
                    className="relative h-[68px] w-[84px] shrink-0 overflow-hidden rounded-xl bg-canvas"
                  >
                    <Image
                      src={product.images[0].src}
                      alt={product.images[0].alt}
                      fill
                      sizes="84px"
                      className="object-contain p-1"
                    />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start gap-2">
                      <p className="line-clamp-2 text-[13.5px] font-bold leading-snug">
                        {product.name}
                      </p>
                      <button
                        type="button"
                        onClick={() => remove(product.slug)}
                        aria-label={`${product.name} কার্ট থেকে সরান`}
                        className="ml-auto grid h-7 w-7 shrink-0 place-items-center rounded-lg text-muted transition hover:bg-danger/10 hover:text-danger active:scale-90"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-1.5 flex items-center justify-between gap-2">
                      <QtyStepper
                        size="sm"
                        value={qty}
                        min={1}
                        max={Math.max(1, product.stock)}
                        onChange={(next) => setQty(product.slug, next)}
                      />
                      <span className="text-sm font-extrabold text-brand-800">
                        {bdt(product.price * qty)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              <a
                href={waLink(quickOrderMessage(lines[0].product, lines[0].qty))}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-soft mt-1 w-full text-[13px]"
              >
                <WhatsappIcon className="h-4 w-4 text-wa-dark" />
                কার্টের পণ্য হোয়াটসঅ্যাপে পাঠান
              </a>
            </div>

            <div className="border-t border-line bg-canvas/70 px-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] pt-3.5 sm:pb-5">
              <dl className="space-y-1 text-[13.5px]">
                <div className="flex justify-between">
                  <dt className="text-muted">পণ্যের দাম</dt>
                  <dd className="font-bold">{bdt(totals.subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted">ডেলিভারি</dt>
                  <dd className="font-bold">
                    {totals.freeDelivery ? (
                      <span className="text-brand-700">ফ্রি 🎉</span>
                    ) : (
                      bdt(totals.delivery)
                    )}
                  </dd>
                </div>
                {!totals.freeDelivery && totals.remainingForFree > 0 ? (
                  <p className="rounded-xl bg-deal-light px-2.5 py-2 text-[12px] font-semibold text-deal-dark">
                    আর {bdt(totals.remainingForFree)} যোগ করলেই ডেলিভারি একদম ফ্রি!
                  </p>
                ) : null}
                <div className="flex justify-between border-t border-dashed border-line pt-2 text-[15px]">
                  <dt className="font-extrabold">সর্বমোট</dt>
                  <dd className="font-extrabold text-brand-800">{bdt(totals.total)}</dd>
                </div>
              </dl>
              <div className="mt-3 grid gap-2">
                <Link href="/checkout" onClick={closeDrawer} className="btn-primary btn-lg btn-block">
                  চেকআউট করুন
                </Link>
                <Link href="/cart" onClick={closeDrawer} className="btn-outline btn-block">
                  কার্ট পেজ দেখুন
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
