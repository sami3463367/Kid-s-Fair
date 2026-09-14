import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { bdt, toBn } from "@/lib/format";
import { whyUs } from "@/lib/content";
import { products } from "@/lib/products";
import { Reveal } from "@/components/reveal";
import { Section, SectionHeading } from "@/components/section";
import { ProductCard } from "@/components/product-card";
import {
  CheckIcon,
  PhoneIcon,
  ShieldIcon,
  TruckIcon,
  WhatsappIcon,
} from "@/components/icons";
import { chatMessage, waLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "আমাদের কথা",
  description: `${site.name} — মিরপুরের ছোট্ট এক দোকান থেকে সারা দেশে স্টেইনলেস স্টিলের কাপড় শুকানোর হ্যাঙ্গার পৌঁছে দেওয়ার গল্প।`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <Image
          src="/hero/lifestyle-balcony.jpg"
          alt="বারান্দায় ঝোলানো স্টেইনলেস স্টিলের হ্যাঙ্গার"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-45"
        />
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/85 via-ink/75 to-ink/90"
          aria-hidden
        />
        <div className="shell relative py-10 sm:py-14">
          <nav aria-label="ব্রেডক্রাম্ব" className="text-[12px] font-semibold text-white/70">
            <Link href="/" className="transition hover:text-white">
              হোম
            </Link>
            <span aria-hidden> / </span>
            <span className="text-white">আমাদের কথা</span>
          </nav>
          <p className="eyebrow mt-4 !text-white/70">
            <span aria-hidden>🤝</span> {toBn(2019)} সাল থেকে
          </p>
          <h1 className="mt-2.5 max-w-2xl text-[1.7rem] leading-tight sm:text-[2.4rem] lg:text-[2.75rem]">
            {site.tagline}
          </h1>
          <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-white/85 sm:text-[15px]">
            {site.subline} — এই এক লাইনটাই আমাদের পুরো কাজ। বাংলাদেশের রোদ-বৃষ্টি আর ছোট
            ফ্ল্যাটের বারান্দা মাথায় রেখে আমরা এমন হ্যাঙ্গার বেছে নিই, যা বছরের পর বছর মরিচা ছাড়াই চলে।
          </p>
          <div className="mt-5 grid gap-2 sm:grid-cols-3">
            {site.stats.map((s, i) => (
              <Reveal
                key={s.label}
                delay={i * 70}
                className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-sm"
              >
                <p className="font-display text-[1.5rem] font-black leading-none">{s.value}</p>
                <p className="mt-1 text-[12.5px] text-white/80">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-5 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          <div>
            <SectionHeading
              align="left"
              eyebrow={<span aria-hidden>📖</span>}
              title="একটা হ্যাঙ্গার কেন এত বড় ব্যাপার হয়ে গেল"
            />
            <div className="mt-4 space-y-3 text-[14px] leading-[1.8] text-muted">
              <p>
                {toBn(2019)} সালে মিরপুর ১০-এর একটা ছোট দোকানে আমাদের যাত্রা। শুরুতে
                দিনে পনেরো-বিশটা হ্যাঙ্গার বিক্রি হতো, বেশিরভাগ কাস্টমারই পাড়ার মানুষ। সমস্যাটা
                সবসময় একটাই — বাজারের প্লাস্টিকের হ্যাঙ্গার এক সিজনেই ভেঙে যায়, আর লোহার তা
                মরিচা দিয়ে কাপড়ে দাগ লাগিয়ে দেয়।
              </p>
              <p>
                সেই সমাধানেই আমরা SKB হ্যাঙ্গার — স্টেইনলেস স্টিলের ফ্রেম, শক্ত স্প্রিং
                ক্লিপ আর ভেজা কাপড়ের ওজন সহ্য করার মতো ডিজাইন — সবার সামনে নিয়ে আসি। প্রথমে
                কয়েকটা ইউনিট দিয়ে শুরু, আজ সারা দেশের {toBn(64)} জেলায় আমাদের পণ্য পৌঁছে যায়।
              </p>
              <p>
                আমরা বিশ্বাস করি, বাড়তি জিনিস কেনার দরকার নেই — একটা ভালো হ্যাঙ্গারই বছরের পর
                বছর কাজ দিয়ে যায়। তাই দামের তুলনায় গুণমানটা সবসময় এগিয়ে রাখার চেষ্টা করি, আর
                অর্ডারের সময় কাকে কোন মডেল লাগবে তা বুঝিয়ে দিই।
              </p>
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {[
                "প্রতিটি লট হাতে নিয়ে চেক করা হয়",
                "ভুল মডেল পাঠানোর দায় আমরা নিই",
                "হোয়াটসঅ্যাপে সরাসরি দোকানের সাথে কথা",
                "হোলসেল ও রিসেলার রেট উপলব্ধ",
              ].map((t) => (
                <p key={t} className="flex items-start gap-2 rounded-xl border border-line bg-white px-3.5 py-2.5 text-[13px]">
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                  {t}
                </p>
              ))}
            </div>
          </div>

          <Reveal className="space-y-3">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-canvas">
              <Image
                src="/hero/lifestyle-laundry.jpg"
                alt="লন্ড্রিতে সার সাজানো স্টেইনলেস হ্যাঙ্গার"
                fill
                sizes="(min-width: 1024px) 46rem, 100vw"
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-square overflow-hidden rounded-2xl border border-line bg-canvas">
                <Image
                  src="/hero/detail-clips.jpg"
                  alt="স্টেইনলেস ক্লিপের ক্লোজ-আপ"
                  fill
                  sizes="(min-width: 1024px) 23rem, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-between rounded-2xl bg-brand-700 p-4 text-white">
                <p className="text-[12.5px] font-bold uppercase tracking-wide text-white/75">আমাদের প্রতিশ্রুতি</p>
                <p className="font-display text-[1.2rem] font-extrabold leading-snug">
                  মরিচা পড়লে আমরা দায় নিব — {toBn(6)} মাসের রাস্ট-ফ্রি ওয়ারেন্টি।
                </p>
                <Link href="/help#warranty" className="btn-outline btn-sm w-full bg-white/10 text-white hover:bg-white/20">
                  শর্তাবলি দেখুন
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="!pt-0">
        <SectionHeading
          eyebrow={<span aria-hidden>🛠️</span>}
          title="যেভাবে কাজ করি"
          subtitle="দোকান থেকে আপনার বারান্দা পর্যন্ত — প্রতিটি ধাপে আমাদের দায়িত্ব।"
        />
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: ShieldIcon,
              t: "সোর্সিং",
              d: "গ্রেড-৩০৪ স্টেইনলেস শিট আর ভারতীয় SKB মেশিন থেকেই পণ্য নিই — হালকা বা নকল জিনিস রাখি না।",
            },
            {
              icon: CheckIcon,
              t: "কোয়ালিটি চেক",
              d: "প্রতিটি বক্স খুলে ক্লিপের স্প্রিং, জয়েন্ট আর ফিনিশিং হাতে দেখে নিই।",
            },
            {
              icon: TruckIcon,
              t: "প্যাকিং ও ডেলিভারি",
              d: "বাবল র‍্যাপ + কার্টনে এমনভাবে প্যাক করি যাতে ট্রানজিটে বাঁকা না হয়।",
            },
            {
              icon: WhatsappIcon,
              t: "অন্য সার্ভিস",
              d: "ডেলিভারির পরেও অ্যাডভাইজারি — সাইজ, ফোল্ডিং বা রিপ্লেসমেন্টেও পাশে থাকি।",
            },
          ].map((step, i) => (
            <Reveal key={step.t} delay={i * 70} className="card p-4">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-700">
                <step.icon className="h-5 w-5" />
              </span>
              <p className="mt-3 flex items-center gap-2 text-[14.5px] font-extrabold">
                <span className="font-display text-[12.5px] font-black text-brand-500">
                  {toBn(i + 1)}
                </span>
                {step.t}
              </p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{step.d}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="!pt-0">
        <div className="grid gap-3 lg:grid-cols-[1fr_1fr]">
          {whyUs.slice(0, 2).map((item, i) => (
            <Reveal key={item.title} delay={i * 80} className="card h-full p-5">
              <p className="text-[15px] font-extrabold">{item.title}</p>
              <p className="mt-1 text-[13px] leading-relaxed text-muted">{item.text}</p>
              <p className="mt-3 inline-flex items-center gap-2 rounded-xl bg-brand-50 px-3 py-2 text-[12.5px] font-bold text-brand-800">
                <span aria-hidden>{item.icon}</span>
                {site.name}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="!pt-0" id="products">
        <SectionHeading
          eyebrow={<span aria-hidden>🏷️</span>}
          title="আমাদের পুরো কালেকশন"
          subtitle={`মাত্র ${toBn(products.length)} টি মডেল — কিন্তু প্রতিটি বাছাই করা।`}
          action={
            <Link href="/products" className="btn-outline btn-sm">
              সব পণ্য
            </Link>
          }
        />
        <div className="mt-5 grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4">
          {products.map((p, i) => (
            <Reveal key={p.slug} delay={i * 60}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="!pt-0">
        <div className="relative overflow-hidden rounded-3xl bg-brand-700 px-5 py-8 text-white sm:px-8 sm:py-10">
          <div className="absolute inset-0 grid-lines opacity-30" aria-hidden />
          <div className="relative flex flex-wrap items-center justify-between gap-4">
            <div className="max-w-xl">
              <h2 className="text-[1.3rem] leading-tight sm:text-[1.6rem]">
                দোকানে আসতে চান? নাকি ফোনেই অর্ডার করবেন?
              </h2>
              <p className="mt-2 text-[13.5px] leading-relaxed text-white/85">
                {site.address} — {site.hours}। অনলাইনে অর্ডার করলে {bdt(site.delivery.freeOver)}+ এ
                ফ্রি ডেলিভারি।
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <a href={waLink(chatMessage())} target="_blank" rel="noopener noreferrer" className="btn-wa btn-lg">
                <WhatsappIcon className="h-5 w-5" />
                হোয়াটসঅ্যাপে লিখুন
              </a>
              <a href={`tel:${site.phoneDial}`} className="btn-outline btn-lg bg-white/10 text-white hover:bg-white/20">
                <PhoneIcon className="h-4 w-4" />
                কল করুন
              </a>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
