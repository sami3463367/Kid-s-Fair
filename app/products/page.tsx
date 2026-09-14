import Link from "next/link";
import { Suspense } from "react";
import type { Metadata } from "next";
import { products } from "@/lib/products";
import { site } from "@/lib/site";
import { bdt, toBn } from "@/lib/format";
import { ProductsExplorer } from "@/components/products-explorer";
import { PageSkeleton } from "@/components/page-skeleton";

export const metadata: Metadata = {
  title: "সব পণ্য",
  description: `${site.name} — SKB স্টেইনলেস স্টিল ড্রাইং হ্যাঙ্গার, কম্বো অফার ও হোলসেল রেট। দাম ${bdt(
    Math.min(...products.map((p) => p.price)),
  )} থেকে শুরু, সারাদেশে ক্যাশ অন ডেলিভারি।`,
  keywords: ["SKB হ্যাঙ্গার দাম", "স্টিল হ্যাঙ্গার", "ড্রাইং হ্যাঙ্গার", "হ্যাঙ্গার অর্ডার"],
  alternates: { canonical: "/products" },
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const pick = (key: string) => {
    const value = sp[key];
    return typeof value === "string" ? value : undefined;
  };
  const lowest = Math.min(...products.map((p) => p.price));

  return (
    <div className="shell py-6 sm:py-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <nav aria-label="ব্রেডক্রাম্ব" className="text-[12px] font-semibold text-muted">
            <Link href="/" className="transition hover:text-brand-700">
              হোম
            </Link>
            <span aria-hidden> / </span>
            <span className="text-ink">সব পণ্য</span>
          </nav>
          <h1 className="mt-2 text-[1.6rem] leading-tight sm:text-[2rem]">
            SKB স্টেইনলেস স্টিল হ্যাঙ্গার
          </h1>
          <p className="mt-1.5 max-w-xl text-[13.5px] leading-relaxed text-muted">
            মোট {toBn(products.length)} টি অপশন • শুরু {bdt(lowest)} থেকে • অরিজিনাল SKB পণ্য,
            নিরাপদ প্যাকেজিং
          </p>
        </div>
        <Link
          href="/products?filter=combo"
          className="badge border border-deal/30 bg-deal-light text-deal-dark"
        >
          🔥 কম্বো নিলে আরও সাশ্রয়
        </Link>
      </div>

      <div className="mt-5">
        <Suspense fallback={<PageSkeleton />}>
          <ProductsExplorer
            initialQuery={pick("q") ?? ""}
            initialFilter={(pick("filter") as never) ?? "all"}
            initialSort={(pick("sort") as never) ?? "featured"}
          />
        </Suspense>
      </div>
    </div>
  );
}
