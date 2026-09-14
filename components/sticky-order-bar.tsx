"use client";

import { useEffect, useState } from "react";
import { bdt, discountPercent, toBn } from "@/lib/format";
import type { Product } from "@/lib/products";
import { quickOrderMessage, waLink } from "@/lib/whatsapp";
import { useCart } from "@/lib/cart";
import { useToast } from "@/lib/toast";
import { CartIcon, WhatsappIcon } from "./icons";

/** মোবাইলে সবসময় দেখা যায় এমন 'অর্ডার করুন' বার (পণ্যের পেজে) */
export function StickyOrderBar({ product }: { product: Product }) {
  const { add } = useCart();
  const { push } = useToast();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("order-bar-on", show);
    return () => document.body.classList.remove("order-bar-on");
  }, [show]);

  const off = discountPercent(product.price, product.oldPrice);

  return (
    <div
      className={`fixed inset-x-0 bottom-[calc(var(--bottom-nav-h)+env(safe-area-inset-bottom,0px))] z-30 border-t border-line bg-white/95 px-3 py-2.5 shadow-bar backdrop-blur-xl transition-transform duration-300 lg:hidden ${
        show ? "translate-y-0" : "translate-y-[130%]"
      }`}
    >
      <div className="flex items-center gap-2.5">
        <div className="min-w-0 flex-1">
          <p className="truncate text-[12.5px] font-bold leading-tight">{product.name}</p>
          <p className="mt-0.5 flex items-center gap-1.5 leading-none">
            <span className="text-[15px] font-extrabold text-brand-800">{bdt(product.price)}</span>
            {product.oldPrice ? (
              <span className="text-[11.5px] font-semibold text-muted line-through">
                {bdt(product.oldPrice)}
              </span>
            ) : null}
            {off ? <span className="badge bg-deal-light text-deal-dark">-{toBn(off)}%</span> : null}
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            add(product.slug, 1);
            push("কার্টে যোগ হয়েছে", { icon: "🛒" });
          }}
          aria-label="কার্টে যোগ করুন"
          className="btn-outline btn-sm shrink-0 rounded-xl px-2.5"
        >
          <CartIcon className="h-[18px] w-[18px]" />
        </button>
        <a
          href={waLink(quickOrderMessage(product, 1))}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-wa btn-sm shrink-0 rounded-xl px-3"
        >
          <WhatsappIcon className="h-[18px] w-[18px]" />
          অর্ডার করুন
        </a>
      </div>
    </div>
  );
}
