import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { bdt, toBn } from "@/lib/format";
import { faqs, deliveryTable } from "@/lib/content";
import { products } from "@/lib/products";
import { Accordion } from "@/components/accordion";
import { Section, SectionHeading } from "@/components/section";
import {
  ChatIcon,
  CheckIcon,
  PhoneIcon,
  ReturnIcon,
  ShieldIcon,
  TruckIcon,
  WhatsappIcon,
} from "@/components/icons";
import { chatMessage, waLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "সহায়তা ও নীতিমালা",
  description: `${site.name} — ডেলিভারি, রিটার্ন, ওয়ারেন্টি, প্রাইভেসি ও সাইজ নির্বাচনের সম্পূর্ণ গাইড।`,
  alternates: { canonical: "/help" },
};

export default function HelpPage() {
  return (
    <>
      <Section className="!py-7 sm:!py-9">
        <nav aria-label="ব্রেডক্রাম্ব" className="text-[12px] font-semibold text-muted">
          <Link href="/" className="transition hover:text-brand-700">
            হোম
          </Link>
          <span aria-hidden> / </span>
          <span className="text-ink">সহায়তা</span>
        </nav>
        <h1 className="mt-2 text-[1.6rem] leading-tight sm:text-[2rem]">
          যেকোনো জিজ্ঞাসার উত্তর এখানে
        </h1>
        <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-muted">
          ডেলিভারি, রিটার্ন, ওয়ারেন্টি বা সাইজ নির্বাচন — সবকিছুর স্পষ্ট নিয়ম। যা না পান, তা
          হোয়াটসঅ্যাপে জিজ্ঞেস করলেই হবে।
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {[
            { href: "#delivery", label: "ডেলিভারি" },
            { href: "#returns", label: "রিটার্ন" },
            { href: "#warranty", label: "ওয়ারেন্টি" },
            { href: "#sizes", label: "সাইজ গাইড" },
            { href: "#privacy", label: "প্রাইভেসি" },
            { href: "#faq", label: "সাধারণ জিজ্ঞাসা" },
          ].map((chip) => (
            <a key={chip.href} href={chip.href} className="chip">
              {chip.label}
            </a>
          ))}
        </div>
      </Section>

      <Section id="delivery" className="!pt-0">
        <SectionHeading
          eyebrow={<><TruckIcon className="h-3.5 w-3.5" /> ডেলিভারি</>}
          title="সারাদেশে ডেলিভারি"
          subtitle={`${bdt(site.delivery.freeOver)} বা তার বেশি অর্ডারে সারাদেশে ডেলিভারি চার্জ ফ্রি।`}
        />
        <div className="mt-5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {deliveryTable.map((row) => (
            <div key={row.zone} className="card p-4">
              <p className="text-[13.5px] font-extrabold">{row.zone}</p>
              <p className="mt-2 font-display text-[1.1rem] font-extrabold leading-none text-brand-800">
                {row.charge}
              </p>
              <p className="mt-2 text-[12.5px] text-muted">{row.time}</p>
              <p className="mt-1 text-[12px] font-semibold text-brand-700">{row.note}</p>
            </div>
          ))}
        </div>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {[
            "অর্ডার কনফার্ম করার পর কুরিয়ার বা রাইডার শেয়ারিং থেকে ফোন আসবে",
            "ঢাকার ভিতরে বেশিরভাগ ক্ষেত্রে আমাদের নিজস্ব রাইডার দিয়েই পাঠানো হয়",
            "পার্সেলের ট্র্যাকিং নম্বর হোয়াটসঅ্যাপে পাঠিয়ে দেওয়া হয়",
            "ঠিকানা অস্পষ্ট হলে ডেলিভারি একদিন পিছোতে পারে — তাই যথাসম্ভব বিস্তারিত লিখুন",
          ].map((t) => (
            <li key={t} className="flex items-start gap-2 rounded-xl border border-line bg-white px-3.5 py-3 text-[13px]">
              <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
              {t}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="returns" className="!pt-0">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="card h-full p-5">
            <h2 className="flex items-center gap-2 text-[1.05rem] font-extrabold">
              <ReturnIcon className="h-5 w-5 text-brand-700" />
              রিটার্ন ও এক্সচেঞ্জ ({toBn(7)} দিন)
            </h2>
            <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted">
              পণ্য হাতে পাওয়ার {toBn(7)} দিনের মধ্যে নিচের শর্তে রিটার্ন বা বদল করা যায়:
            </p>
            <ul className="mt-3 space-y-2 text-[13px]">
              {[
                "পণ্যে ম্যানুফ্যাকচারিং ডিফেক্ট থাকলে (ফ্রেম বাঁকা, ক্লিপ ভাঙা, ওয়েল্ড নড়ল)",
                "আমাদের ভুলে ভিন্ন মডেল বা কম পিস পাঠানো হলে",
                "প্যাকেজিং এমনভাবে খোলা হয়েছে যাতে পণ্য বিক্রিযোগ্য অবস্থায় থাকে",
                "ব্যবহার, পড়ে যাওয়া বা নিজের ভুল সাইজ কেনার ক্ষেত্রে রিটার্ন প্রযোজ্য নয়",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
            <a href={waLink(chatMessage())} target="_blank" rel="noopener noreferrer" className="btn-wa btn-sm mt-4">
              <WhatsappIcon className="h-4 w-4" />
              রিটার্নের আবেদন করুন
            </a>
          </div>

          <div id="warranty" className="card h-full scroll-mt-24 p-5">
            <h2 className="flex items-center gap-2 text-[1.05rem] font-extrabold">
              <ShieldIcon className="h-5 w-5 text-brand-700" />
              ওয়ারেন্টি নীতি
            </h2>
            <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted">
              প্রতিটি SKB হ্যাঙ্গারে রাস্ট-ফ্রি ওয়ারেন্টি আছে — {toBn(6)} মাস, আর হেভি-ডিউটি মডেলে {toBn(12)}{" "}
              মাস।
            </p>
            <div className="mt-3 overflow-hidden rounded-xl border border-line">
              <table className="w-full text-left text-[13px]">
                <tbody className="divide-y divide-line">
                  {[
                    { a: "মরিচা বা কালো দাগ", b: "ফ্রি রিপ্লেসমেন্ট" },
                    { a: "জয়েন্ট নড়ে ওঠা", b: "ফ্রি রিপ্লেসমেন্ট" },
                    { a: "স্প্রিং ক্লিপ দুর্বল", b: "ক্লিপ বদলে দেওয়া হয়" },
                    { a: "অ্যাক্সিডেন্টাল ভাঙন", b: "খরচ সাপেক্ষে সার্ভিস" },
                  ].map((row) => (
                    <tr key={row.a} className="odd:bg-canvas/40">
                      <th scope="row" className="px-3.5 py-2.5 font-bold text-muted">
                        {row.a}
                      </th>
                      <td className="px-3.5 py-2.5 font-semibold">{row.b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 flex items-start gap-2 text-[12.5px] text-muted">
              <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
              দাবির জন্য পণ্যের ছবি, অর্ডার আইডি ও মোবাইল নম্বর হোয়াটসঅ্যাপে পাঠান — {toBn(48)} ঘণ্টার
              মধ্যে সমাধান পাবেন।
            </p>
          </div>
        </div>
      </Section>

      <Section id="sizes" className="!pt-0">
        <SectionHeading
          eyebrow={<span aria-hidden>📏</span>}
          title="সাইজ গাইড — কোন মডেল কোথায় বসবে"
          subtitle="জায়গার মাপ না জেনে কিনলে পরে দুঃখ করার কিছু নেই — নিচের টেবিলটি দেখে নিন।"
        />
        <div className="mt-5 overflow-x-auto card">
          <table className="w-full min-w-[34rem] text-left text-[13px]">
            <thead className="bg-canvas/70 text-[11.5px] uppercase tracking-wide text-muted">
              <tr>
                <th className="px-4 py-3 font-bold">মডেল</th>
                <th className="px-4 py-3 font-bold">ক্লিপ</th>
                <th className="px-4 py-3 font-bold">প্রস্থ</th>
                <th className="px-4 py-3 font-bold">সর্বোচ্চ লোড</th>
                <th className="px-4 py-3 font-bold">উপযুক্ত জায়গা</th>
                <th className="px-4 py-3 text-right font-bold">দাম</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line bg-white">
              {products
                .filter((p) => !p.isCombo)
                .map((p) => (
                  <tr key={p.slug} className="transition hover:bg-brand-50/40">
                    <td className="px-4 py-3">
                      <Link href={`/products/${p.slug}`} className="font-extrabold transition hover:text-brand-700">
                        {p.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 font-semibold">{toBn(p.clipCount)}</td>
                    <td className="px-4 py-3 font-semibold">{toBn(p.widthCm)} সেমি</td>
                    <td className="px-4 py-3 text-muted">
                      {p.specs.find((s) => s.label === "সর্বোচ্চ লোড")?.value ?? "-"}
                    </td>
                    <td className="px-4 py-3 text-muted">
                      {p.widthCm <= 45
                        ? "বাথরুম, ছোট রুম"
                        : p.widthCm <= 60
                          ? "বারান্দা, করিডোর"
                          : "ছাদ, বড় বারান্দা"}
                    </td>
                    <td className="px-4 py-3 text-right font-extrabold text-brand-800">{bdt(p.price)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="privacy" className="!pt-0">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="card h-full p-5">
            <h2 className="flex items-center gap-2 text-[1.05rem] font-extrabold">
              <ChatIcon className="h-5 w-5 text-brand-700" />
              প্রাইভেসি পলিসি (সংক্ষেপে)
            </h2>
            <ul className="mt-3 space-y-2.5 text-[13px] leading-relaxed text-muted">
              <li>
                এই ডেমো সাইটে কোনো সার্ভার বা ডেটাবেস নেই — আপনার কার্ট, অ্যাকাউন্ট ও অর্ডারের তথ্য
                শুধু আপনার ব্রাউজারেই (localStorage) সংরক্ষিত থাকে।
              </li>
              <li>
                চেকআউটে দেওয়া নাম, মোবাইল ও ঠিকানা শুধু অর্ডার পাঠানোর জন্য হোয়াটসঅ্যাপে যায়; আমরা
                সেটি ডেলিভারি ছাড়া অন্য কাজে ব্যবহার করি না।
              </li>
              <li>
                কোনো ট্র্যাকিং পিক্সেল, থার্ড-পার্টি অ্যাড বা ফেসবুক পিক্সেল এই সাইটে নেই — আপনার
                ব্রাউজিং ডেটা কোথাও পাচার হয় না।
              </li>
              <li>
                তথ্য মুছে ফেলতে চাইলে ব্রাউজারের সাইট ডেটা সেটিংস থেকে পরিষ্কার করুন, অথবা
                হোয়াটসঅ্যাপে জানান — আমরা আমাদের রেকর্ড থেকে সরিয়ে দিব।
              </li>
            </ul>
          </div>
          <div className="card flex h-full flex-col justify-between p-5">
            <div>
              <h2 className="text-[1.05rem] font-extrabold">তবুও কিছু জানার আছে?</h2>
              <p className="mt-2 text-[13.5px] leading-relaxed text-muted">
                সরাসরি কথা বলে সব দ্রুত সম্ভব। দোকান {site.hours.replace("প্রতিদিন ", "")} পর্যন্ত খোলা
                থাকে।
              </p>
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <a href={waLink(chatMessage())} target="_blank" rel="noopener noreferrer" className="btn-wa">
                <WhatsappIcon className="h-4 w-4" />
                {toBn(site.phoneDisplay)}
              </a>
              <a href={`tel:${site.phoneDial}`} className="btn-outline">
                <PhoneIcon className="h-4 w-4" />
                কল করুন
              </a>
            </div>
            <p className="mt-3 text-[12px] text-muted">{site.address}</p>
          </div>
        </div>
      </Section>

      <Section id="faq" className="!pt-0">
        <SectionHeading
          eyebrow={<><ChatIcon className="h-3.5 w-3.5" /> FAQ</>}
          title="সাধারণ জিজ্ঞাসা"
          subtitle={`আরও প্রশ্ন থাকলে ${site.name} এর হোয়াটসঅ্যাপে লিখুন — উত্তর দিতে দেরি হয় না।`}
        />
        <div className="mt-5 max-w-3xl">
          <Accordion items={faqs.map((f) => ({ q: f.q, a: f.a }))} defaultOpen={0} />
        </div>
      </Section>
    </>
  );
}
