import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, getRelated, products } from "@/lib/products";
import { site } from "@/lib/site";
import { bdt, discountPercent, toBn } from "@/lib/format";
import { absolute } from "@/lib/urls";
import { ProductGallery } from "@/components/product-gallery";
import { ProductBuyBox } from "@/components/product-buy-box";
import { ProductTabs } from "@/components/product-tabs";
import { ProductCard } from "@/components/product-card";
import { StickyOrderBar } from "@/components/sticky-order-bar";
import { SectionHeading } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { CheckIcon, ChevronRightIcon, ShieldIcon } from "@/components/icons";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "পণ্য পাওয়া যায়নি" };
  return {
    title: product.name,
    description: `${product.summary} দাম ${bdt(product.price)} • ${site.name} • সারাদেশে ক্যাশ অন ডেলিভারি।`,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: `${product.name} — ${bdt(product.price)}`,
      description: product.summary,
      images: [{ url: product.images[0].src, width: 1200, height: 655, alt: product.name }],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = getRelated(product.slug, 4);
  const off = discountPercent(product.price, product.oldPrice);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images.map((i) => absolute(i.src)),
    description: product.summary,
    sku: `SKB-${product.model}`,
    brand: { "@type": "Brand", name: product.brand },
    offers: {
      "@type": "Offer",
      url: absolute(`/products/${product.slug}`),
      priceCurrency: "BDT",
      price: product.price,
      availability:
        product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingDestination: { "@type": "AdminArea", name: "Bangladesh" },
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewsCount,
    },
  };

  return (
    <div className="shell py-5 sm:py-7">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav aria-label="ব্রেডক্রাম্ব" className="flex items-center gap-1 text-[12px] font-semibold text-muted">
        <Link href="/" className="transition hover:text-brand-700">
          হোম
        </Link>
        <ChevronRightIcon className="h-3.5 w-3.5" />
        <Link href="/products" className="transition hover:text-brand-700">
          পণ্য
        </Link>
        <ChevronRightIcon className="h-3.5 w-3.5" />
        <span className="truncate text-ink">{product.name}</span>
      </nav>

      <div className="mt-3.5 grid gap-5 lg:grid-cols-2 lg:gap-8">
        <div>
          <ProductGallery images={product.images} name={product.name} />

          <div className="mt-3 flex flex-wrap gap-2">
            {product.badgeLabel ? (
              <span className="badge bg-brand-50 text-brand-700">⭐ {product.badgeLabel}</span>
            ) : null}
            {off ? <span className="badge bg-deal text-white">-{toBn(off)}% ছাড়</span> : null}
            <span className="badge border border-line bg-white text-muted">
              {toBn(product.clipCount)} ক্লিপ • {toBn(product.widthCm)} সেমি
            </span>
            {product.isCombo ? (
              <span className="badge border border-deal/30 bg-deal-light text-deal-dark">
                🎁 কম্বো প্যাক
              </span>
            ) : null}
          </div>
        </div>

        <div>
          <p className="text-[12.5px] font-bold uppercase tracking-wide text-brand-700">
            {product.brand} • মডেল {product.model}
          </p>
          <h1 className="mt-1.5 text-[1.5rem] leading-tight sm:text-[1.85rem]">{product.name}</h1>
          <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{product.summary}</p>

          <div className="mt-4">
            <ProductBuyBox product={product} />
          </div>

          <div className="mt-3.5 grid gap-2 sm:grid-cols-2">
            {product.highlights.slice(0, 4).map((h) => (
              <div
                key={h}
                className="flex items-start gap-2 rounded-xl border border-line bg-white px-3 py-2.5 text-[13px] font-semibold"
              >
                <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                {h}
              </div>
            ))}
          </div>

          <div className="mt-3 flex items-center gap-2.5 rounded-2xl border border-brand-200 bg-brand-50/70 px-3.5 py-3">
            <ShieldIcon className="h-6 w-6 shrink-0 text-brand-700" />
            <p className="text-[12.5px] font-semibold leading-snug text-brand-900">
              {toBn(6)} মাস রাস্ট-ফ্রি ওয়ারেন্টি — মরিচা ধরলে বা জয়েন্ট নড়িলে আমরা বদলে দিব।{" "}
              <Link href="/help#warranty" className="underline decoration-dotted">
                শর্তাবলি
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.25fr_1fr] lg:gap-6">
        <ProductTabs product={product} />
        <aside className="space-y-3">
          <div className="card p-4">
            <h2 className="text-[15px] font-extrabold">সাইজ নির্বাচনের সহায়তা</h2>
            <ul className="mt-3 space-y-2.5">
              {[
                { t: "জায়গা কম (বাথরুম/রান্নাঘর)", v: "SKB ২০১ — ৪৫ সেমি" },
                { t: "ছোট বারান্দা, ৩-৪ সদস্য", v: "SKB ২০২ — ৬০ সেমি" },
                { t: "ছাদ / বড় বারান্দা, চাদর-মেয়ো", v: "SKB ২০৪ — ৭৫ সেমি" },
              ].map((row) => (
                <li key={row.t} className="rounded-xl bg-canvas/60 px-3 py-2.5">
                  <p className="text-[12.5px] font-bold text-muted">{row.t}</p>
                  <p className="mt-0.5 text-[13.5px] font-extrabold text-brand-800">{row.v}</p>
                </li>
              ))}
            </ul>
            <Link href="/contact" className="btn-soft btn-sm mt-3 w-full">
              সাইজ মিলিয়ে নিতে যোগাযোগ করুন
            </Link>
          </div>

          <div className="card p-4">
            <h2 className="text-[15px] font-extrabold">কেন সরাসরি আমাদের থেকে?</h2>
            <ul className="mt-2.5 space-y-2 text-[13px] text-muted">
              {[
                "রিটেইল দোকানের চেয়ে কম দাম, কারণ আমরা সরাসরি সাপ্লাই দিই",
                "প্রতিটি পণ্য পাঠানোর আগে চেক করে প্যাক করা হয়",
                "হোলসেল অর্ডারে আলাদা রেট — ১০ পিস থেকে",
                "অর্ডারের যেকোনো আপডেট হোয়াটসঅ্যাপেই পাঠানো হয়",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {related.length > 0 ? (
        <section className="mt-10">
          <SectionHeading
            eyebrow={<span aria-hidden>🧺</span>}
            title="আপনার পছন্দ হতে পারে"
            subtitle="একই ধরনের আরও হ্যাঙ্গার ও কম্বো অফার"
          />
          <div className="mt-5 grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-4">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 60}>
                <ProductCard product={p} compact />
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}

      <StickyOrderBar product={product} />
    </div>
  );
}
