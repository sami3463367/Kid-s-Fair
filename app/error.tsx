"use client";

import Link from "next/link";
import { useEffect } from "react";
import { site } from "@/lib/site";
import { chatMessage, waLink } from "@/lib/whatsapp";
import { RefreshIcon, WhatsappIcon } from "@/components/icons";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // ডেমো সাইট — শুধু কনসোলে রাখা হচ্ছে, কোনো এক্সটার্নাল সার্ভিসে পাঠানো হয় না
    console.error(error);
  }, [error]);

  return (
    <div className="shell grid min-h-[60vh] place-items-center py-12">
      <div className="card w-full max-w-lg p-6 text-center sm:p-8">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-deal-light text-3xl">
          <span aria-hidden>⚠️</span>
        </span>
        <h1 className="mt-4 text-[1.4rem] leading-tight">কিছু একটা গড়বড় হয়ে গেছে</h1>
        <p className="mx-auto mt-2 max-w-sm text-[13.5px] leading-relaxed text-muted">
          পেজটি লোড করা যায়নি। একবার রিফ্রেশ করে দেখুন — তবুও সমস্যা হলে সরাসরি হোয়াটসঅ্যাপে
          অর্ডার করে ফেলুন, {site.name} সবসময় খোলা আছে।
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-2.5">
          <button type="button" onClick={reset} className="btn-primary btn-lg">
            <RefreshIcon className="h-4 w-4" />
            আবার চেষ্টা করুন
          </button>
          <a
            href={waLink(chatMessage())}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wa btn-lg"
          >
            <WhatsappIcon className="h-5 w-5" />
            হোয়াটসঅ্যাপে লিখুন
          </a>
          <Link href="/products" className="btn-outline btn-lg">
            পণ্য দেখুন
          </Link>
        </div>
      </div>
    </div>
  );
}
