import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { bdt, toBn } from "@/lib/format";
import { categoryTiles, getBestsellers, getCombos, products } from "@/lib/products";
import {
  deliveryTable,
  faqs,
  howToOrder,
  testimonials,
  trustItems,
  whyUs,
} from "@/lib/content";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { Section, SectionHeading, ViewAllLink } from "@/components/section";
import { Accordion } from "@/components/accordion";
import { DealCountdown } from "@/components/deal-countdown";
import { Stars } from "@/components/stars";
import {
  ArrowRightIcon,
  CheckIcon,
  PhoneIcon,
  ShieldIcon,
  SparkleIcon,
  TagIcon,
  TruckIcon,
  WhatsappIcon,
} from "@/components/icons";
import { chatMessage, waLink } from "@/lib/whatsapp";
import { absolute } from "@/lib/urls";

export default function HomePage() {
  const featured = products.slice(0, 4);
  const bestsellers = getBestsellers(3);
  const combos = getCombos();

  return (
    <>
      {/* ─────────────── হিরো ─────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/hero/hero-hangers.jpg"
            alt="স্টেইনলেস স্টিলের কাপড় শুকানোর হ্যাঙ্গার — ইমোন এন্টারপ্রাইজ"
            fill
            priority
            sizes="100vw"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/90 via-ink/80 to-ink/90" />
          <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_10%_0%,rgba(22,161,124,0.4),transparent_60%)]" />
        </div>

        <div className="shell relative pb-10 pt-9 text-white sm:pb-16 sm:pt-14">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[11.5px] font-bold backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-wa opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-wa" />
            </span>
            ক্যাশ অন ডেলিভারি — সারাদেশে
          </span>

          <h1 className="mt-4 max-w-[19ch] text-[1.9rem] font-extrabold leading-[1.2] text-shadow-hero sm:text-[2.65rem] sm:leading-[1.15]">
            আপনার পছন্দের{" "}
            <span className="bg-gradient-to-r from-brand-200 to-wa bg-clip-text text-transparent">
              স্টিল হ্যাঙ্গার
            </span>
            , এক ক্লিকেই আপনার দরজায়
          </h1>

          <p className="mt-3.5 max-w-xl text-[14.5px] leading-relaxed text-white/85 sm:text-base">
            {site.name} — SKB স্টেইনলেস স্টিল ড্রাইং হ্যাঙ্গার সরাসরি সাপ্লাইয়ার দামে। মজবুত ফ্রেম,
            মিরর পলিশ ফিনিশ, মরিচা ধরে না — আর সবচেয়ে বড় কথা, পণ্য হাতে পেয়ে টাকা দিবেন।
          </p>

          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
            <Link
              href="/products"
              className="btn-primary btn-lg bg-white text-brand-800 shadow-lift hover:bg-brand-50"
            >
              <TagIcon className="h-5 w-5" />
              কেনাকাটা শুরু করুন
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <a
              href={waLink(chatMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wa btn-lg"
            >
              <WhatsappIcon className="h-5 w-5" />
              হোয়াটসঅ্যাপে অর্ডার করুন
            </a>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-2.5 sm:mt-10 sm:max-w-lg sm:gap-4">
            {site.stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur-sm">
                <p className="font-display text-xl font-extrabold leading-none sm:text-2xl">{s.value}</p>
                <p className="mt-1.5 text-[11.5px] leading-tight text-white/75">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── ট্রাস্ট স্ট্রিপ ─────────────── */}
      <div className="border-b border-line bg-white">
        <div className="shell grid grid-cols-2 gap-2 py-3.5 sm:grid-cols-4 sm:gap-4">
          {trustItems.map((t) => (
            <div key={t.title} className="flex items-start gap-2.5">
              <span aria-hidden className="text-xl leading-none">
                {t.icon}
              </span>
              <span className="min-w-0">
                <span className="block text-[13px] font-bold leading-tight">{t.title}</span>
                <span className="mt-0.5 block text-[11.5px] leading-snug text-muted">{t.note}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ─────────────── ক্যাটাগরি ─────────────── */}
      <Section id="products-section">
        <SectionHeading
          eyebrow={<><SparkleIcon className="h-3.5 w-3.5" /> সাইজ অনুযায়ী</>}
          title="আপনার দরকারি হ্যাঙ্গারটি বেছে নিন"
          subtitle="ক্লিপ সংখ্যা ও প্রস্থ দেখে নিন — কোন সাইজ আপনার জায়গায় ঠিক বসবে, না জানা থাকলে আমরা বলে দেব।"
          action={<ViewAllLink href="/products">সব পণ্য দেখুন</ViewAllLink>}
        />
        <div className="mt-6 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
          {categoryTiles.map((tile, i) => (
            <Reveal key={tile.label} delay={i * 60}>
              <Link
                href={tile.href}
                className="group flex h-full flex-col rounded-2xl border border-line bg-white p-4 transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lift"
              >
                <span aria-hidden className="text-2xl transition-transform duration-300 group-hover:scale-110">
                  {tile.icon}
                </span>
                <span className="mt-3 text-[15px] font-extrabold leading-tight">{tile.label}</span>
                <span className="mt-1 text-[12px] font-semibold text-muted">{tile.note}</span>
                <span className="mt-3 inline-flex items-center gap-1 text-[12.5px] font-bold text-brand-700 transition-all group-hover:gap-2">
                  দেখুন <ArrowRightIcon className="h-3.5 w-3.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ─────────────── কম্বো অফার ─────────────── */}
      <div className="shell">
        <div className="overflow-hidden rounded-3xl border border-deal/30 bg-gradient-to-br from-deal-light via-white to-brand-50">
          <div className="grid gap-4 p-5 sm:p-6 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-deal px-2.5 py-1 text-[11.5px] font-black text-white">
                🔥 আজকের কম্বো অফার
              </span>
              <h2 className="mt-3 text-[1.35rem] leading-tight sm:text-[1.6rem]">
                একসাথে নিলে বেশি সাশ্রয়, উপরে ফ্রি ডেলিভারি
              </h2>
              <p className="mt-2 text-[14px] leading-relaxed text-muted">
                {bdt(site.delivery.freeOver)} বা তার বেশি অর্ডারে সারাদেশে ডেলিভারি চার্জ ফ্রি। অফারটি
                আজকের রাত পর্যন্ত।
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <DealCountdown />
                <Link href="/products?filter=combo" className="btn-deal btn-sm">
                  সব অফার দেখুন
                </Link>
              </div>
            </div>
            <ul className="grid gap-2.5">
              {combos.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/products/${c.slug}`}
                    className="flex items-center gap-3 rounded-2xl border border-white bg-white/80 p-2.5 backdrop-blur transition hover:border-deal/40 hover:bg-white"
                  >
                    <span className="relative h-14 w-16 shrink-0 overflow-hidden rounded-xl bg-canvas">
                      <Image src={c.images[0].src} alt={c.images[0].alt} fill sizes="64px" className="object-contain p-1" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13.5px] font-bold">{c.name}</span>
                      <span className="mt-0.5 flex items-baseline gap-1.5">
                        <span className="text-[15px] font-extrabold text-brand-800">{bdt(c.price)}</span>
                        <span className="text-[12px] font-semibold text-muted line-through">
                          {bdt(c.oldPrice ?? 0)}
                        </span>
                      </span>
                    </span>
                    <span className="badge shrink-0 bg-deal text-white">সেভিং</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ─────────────── ফিচার্ড পণ্য ─────────────── */}
      <Section>
        <SectionHeading
          eyebrow={<><CheckIcon className="h-3.5 w-3.5" /> বেস্ট সেলার</>}
          title="সবচেয়ে জনপ্রিয় পণ্যসমূহ"
          subtitle="প্রতিদিন হাজারো ঘরবাড়ির কাপড় শুকাচ্ছে যেসব হ্যাঙ্গার — নিচের তালিকা থেকেই সবচেয়ে বেশি অর্ডার আসে।"
          action={<ViewAllLink href="/products">সব দেখুন</ViewAllLink>}
        />
        <div className="mt-6 grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-4">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={i * 70}>
              <ProductCard product={p} priority={i < 2} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ─────────────── কেন আমরা ─────────────── */}
      <div className="bg-white py-10 sm:py-14">
        <div className="shell">
          <SectionHeading
            eyebrow={<><ShieldIcon className="h-3.5 w-3.5" /> কেন {site.name}</>}
            title="দাম কম, মান নয়"
            subtitle="আমরা শুধু হ্যাঙ্গার বিক্রি করি না — সঠিক মাপের পরামর্শ, নিরাপদ প্যাকেজিং আর দ্রুত ডেলিভারির দায়িত্বও নিই।"
          />
          <div className="mt-6 grid gap-4 lg:grid-cols-[1.15fr_1fr] lg:items-start">
            <div className="grid gap-2.5 sm:grid-cols-2">
              {whyUs.map((f, i) => (
                <Reveal key={f.title} delay={i * 60}>
                  <div className="h-full rounded-2xl border border-line bg-canvas/50 p-4 transition hover:border-brand-200 hover:bg-white">
                    <span aria-hidden className="text-2xl">
                      {f.icon}
                    </span>
                    <h3 className="mt-2.5 text-[15px] font-extrabold leading-snug">{f.title}</h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{f.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={80}>
              <div className="overflow-hidden rounded-2xl border border-line">
                <div className="relative aspect-[4/3]">
                  <Image
                    src="/products/skb-204-lifestyle.jpg"
                    alt="বড় সাইজের স্টেইনলেস স্টিল হ্যাঙ্গারে চাদর শুকাচ্ছে"
                    fill
                    sizes="(max-width: 1024px) 100vw, 46vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex items-center justify-between gap-3 bg-ink p-4 text-white">
                  <div>
                    <p className="text-[13px] font-bold leading-tight">সরাসরি সাপ্লাইয়ার থেকে</p>
                    <p className="mt-1 text-[12px] text-white/70">
                      দোকান: {site.addressShort} • খোলা {toBn(9)}টা – {toBn(22)}টা
                    </p>
                  </div>
                  <a href={`tel:${site.phoneDial}`} className="btn-outline btn-sm bg-white/10 text-white hover:bg-white/20">
                    <PhoneIcon className="h-4 w-4" />
                    কল করুন
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ─────────────── অর্ডার যেভাবে ─────────────── */}
      <Section>
        <SectionHeading
          align="center"
          eyebrow={<><TruckIcon className="h-3.5 w-3.5" /> সহজ ৪ ধাপ</>}
          title="অর্ডার করতে সারাদিন লাগে না"
          subtitle="অ্যাকাউন্ট না খুললেও অর্ডার করা যায় — শুধু নাম, নম্বর আর ঠিকানা।"
        />
        <ol className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {howToOrder.map((step, i) => (
            <Reveal key={step.title} delay={i * 70}>
              <li className="relative h-full rounded-2xl border border-line bg-white p-4 pt-9 shadow-card">
                <span className="absolute left-4 top-0 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-xl bg-brand-700 font-display text-[15px] font-black text-white shadow-[0_10px_20px_-12px_rgba(4,102,83,0.9)]">
                  {toBn(i + 1)}
                </span>
                <h3 className="text-[15px] font-extrabold">{step.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{step.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
        <div className="mt-5 flex flex-col items-center gap-2.5 sm:flex-row sm:justify-center">
          <Link href="/products" className="btn-primary btn-lg">
            এখনই পছন্দের হ্যাঙ্গার নিন
          </Link>
          <a href={waLink(chatMessage())} target="_blank" rel="noopener noreferrer" className="btn-outline btn-lg">
            <WhatsappIcon className="h-5 w-5 text-wa-dark" />
            আগে কিছু জিজ্ঞেস করব
          </a>
        </div>
      </Section>

      {/* ─────────────── রিভিউ ─────────────── */}
      <div className="bg-white py-10 sm:py-14">
        <div className="shell">
          <SectionHeading
            eyebrow={<span aria-hidden>⭐</span>}
            title="কাস্টমাররা যা বলছেন"
            subtitle={`গড় রেটিং ${toBn("4.9")} / ${toBn(5)} — ${toBn(
              products.reduce((n, p) => n + p.reviewsCount, 0),
            )}+ রিভিউ থেকে।`}
            action={
              <ViewAllLink href="/products">
                পণ্যের রিভিউ দেখুন
              </ViewAllLink>
            }
          />
          <div className="mt-6 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 60}>
                <figure className="flex h-full flex-col rounded-2xl border border-line bg-canvas/40 p-4">
                  <Stars rating={t.rating} size={15} />
                  <blockquote className="mt-2.5 flex-1 text-[13.5px] leading-relaxed text-ink/85">
                    “{t.text}”
                  </blockquote>
                  <figcaption className="mt-3.5 flex items-center gap-2.5 border-t border-line pt-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-100 font-display text-[13px] font-black text-brand-800">
                      {t.name.slice(0, 1)}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-[13px] font-bold">{t.name}</span>
                      <span className="block truncate text-[11.5px] text-muted">
                        {t.location} • {t.bought}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ─────────────── ডেলিভারি টেবিল ─────────────── */}
      <Section>
        <div className="grid gap-5 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow={<><TruckIcon className="h-3.5 w-3.5" /> ডেলিভারি</>}
              title="সারাদেশে ডেলিভারি, চার্জ স্বচ্ছ"
              subtitle="লুকানো খরচ নেই। অর্ডার কনফার্মের আগেই আপনি ডেলিভারি চার্জ ও সময় জেনে যাবেন।"
            />
            <div className="mt-5 card overflow-hidden">
              <table className="w-full text-left text-[13px]">
                <thead className="bg-canvas/70 text-[11.5px] uppercase tracking-wide text-muted">
                  <tr>
                    <th className="px-3.5 py-2.5 font-bold">এলাকা</th>
                    <th className="px-3.5 py-2.5 font-bold">চার্জ</th>
                    <th className="px-3.5 py-2.5 font-bold">সময়</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {deliveryTable.map((row) => (
                    <tr key={row.zone} className="align-top">
                      <td className="px-3.5 py-2.5">
                        <span className="block font-bold">{row.zone}</span>
                        <span className="block text-[11.5px] text-muted">{row.note}</span>
                      </td>
                      <td className="whitespace-nowrap px-3.5 py-2.5 font-bold text-brand-800">
                        {row.charge}
                      </td>
                      <td className="whitespace-nowrap px-3.5 py-2.5 text-muted">{row.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ─────────────── FAQ ─────────────── */}
          <div>
            <SectionHeading
              eyebrow={<span aria-hidden>💬</span>}
              title="সাধারণ জিজ্ঞাসা"
              subtitle="যেসব প্রশ্ন প্রতিদিন আসে, তার উত্তর এক জায়গায়।"
            />
            <div className="mt-5">
              <Accordion items={[...faqs].slice(0, 5).map((f) => ({ q: f.q, a: f.a }))} defaultOpen={0} />
            </div>
            <Link href="/help" className="btn-soft mt-3 w-full">
              আরও প্রশ্ন ও উত্তর দেখুন
            </Link>
          </div>
        </div>
      </Section>

      {/* ─────────────── শেষ CTA ─────────────── */}
      <div className="shell pb-12">
        <div className="relative overflow-hidden rounded-3xl bg-ink p-6 text-white sm:p-9">
          <div className="absolute inset-0 grid-lines opacity-30" aria-hidden />
          <div className="absolute -right-10 -top-16 h-56 w-56 rounded-full bg-brand-500/25 blur-2xl" aria-hidden />
          <div className="relative max-w-xl">
            <h2 className="text-[1.4rem] leading-tight sm:text-[1.75rem]">
              আজই অর্ডার করুন — কালকের রোদে কাপড় শুকানোর অপেক্ষা না
            </h2>
            <p className="mt-2.5 text-[14px] leading-relaxed text-white/75">
              স্টক সীমিত। অফার শেষ হওয়ার আগেই নিয়ে নিন — যেকোনো সমস্যায় সরাসরি হোয়াটসঅ্যাপে কথা
              বলুন, আমরা সমাধান দেব।
            </p>
            <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
              <Link href="/products" className="btn-primary btn-lg bg-white text-brand-800 hover:bg-brand-50">
                পণ্য দেখুন
              </Link>
              <a href={waLink(chatMessage())} target="_blank" rel="noopener noreferrer" className="btn-wa btn-lg">
                <WhatsappIcon className="h-5 w-5" />
                অর্ডার করুন ({toBn(site.phoneDisplay)})
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* স্কিমা: বেস্ট সেলার পণ্য */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: `${site.name} — পণ্যসমূহ`,
            itemListElement: bestsellers.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: p.name,
              url: `${canonicalProductUrl(p.slug)}`,
            })),
          }),
        }}
      />
    </>
  );
}

function canonicalProductUrl(slug: string) {
  return absolute(`/products/${slug}`);
}
