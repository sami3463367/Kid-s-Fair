import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { bdt } from "@/lib/format";
import { CheckoutForm } from "@/components/checkout-form";
import { CheckIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "চেকআউট",
  description: `${site.name} — নাম, মোবাইল ও ঠিকানা দিয়ে হোয়াটসঅ্যাপে অর্ডার কনফার্ম করুন। ক্যাশ অন ডেলিভারি, ${bdt(
    site.delivery.freeOver,
  )}+ অর্ডারে ফ্রি ডেলিভারি।`,
  robots: { index: false, follow: true },
};

export default function CheckoutPage() {
  return (
    <div className="shell py-6 sm:py-8">
      <nav aria-label="ব্রেডক্রাম্ব" className="text-[12px] font-semibold text-muted">
        <Link href="/" className="transition hover:text-brand-700">
          হোম
        </Link>
        <span aria-hidden> / </span>
        <Link href="/cart" className="transition hover:text-brand-700">
          কার্ট
        </Link>
        <span aria-hidden> / </span>
        <span className="text-ink">চেকআউট</span>
      </nav>

      <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-[1.5rem] leading-tight sm:text-[1.85rem]">অর্ডার শেষ করার পেজ</h1>
          <p className="mt-1.5 max-w-xl text-[13.5px] leading-relaxed text-muted">
            নিচের ফর্মটি পূরণ করলে অর্ডারের সব তথ্যসহ একটি হোয়াটসঅ্যাপ বার্তা তৈরি হবে — শুধু সেন্ড
            চাপলেই অর্ডার চলে আসবে আমার কাছে।
          </p>
        </div>
        <ul className="flex flex-wrap gap-2">
          {[
            "ক্যাশ অন ডেলিভারি",
            `ডেলিভারি ${bdt(site.delivery.insideDhaka)} থেকে`,
            `${bdt(site.delivery.freeOver)}+ অর্ডারে ফ্রি`,
          ].map((t) => (
            <li
              key={t}
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-2.5 py-1.5 text-[11.5px] font-bold text-ink/80"
            >
              <CheckIcon className="h-3.5 w-3.5 text-brand-600" />
              {t}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5">
        <CheckoutForm />
      </div>
    </div>
  );
}
