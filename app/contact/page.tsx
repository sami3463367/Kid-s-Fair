import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { bdt, toBn } from "@/lib/format";
import { ContactForm } from "@/components/contact-form";
import {
  ClockIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  TruckIcon,
  WhatsappIcon,
} from "@/components/icons";
import { chatMessage, waLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "যোগাযোগ",
  description: `${site.name} — ${toBn(site.phoneDisplay)} নম্বরে কল বা হোয়াটসঅ্যাপে মেসেজ দিন। ঠিকানা: ${site.address}`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="shell py-6 sm:py-9">
      <nav aria-label="ব্রেডক্রাম্ব" className="text-[12px] font-semibold text-muted">
        <Link href="/" className="transition hover:text-brand-700">
          হোম
        </Link>
        <span aria-hidden> / </span>
        <span className="text-ink">যোগাযোগ</span>
      </nav>

      <h1 className="mt-2 text-[1.6rem] leading-tight sm:text-[2rem]">
        কথা বলুন — আমরা {site.hours.replace("প্রতিদিন ", "")} পর্যন্ত আছি
      </h1>
      <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-muted">
        অর্ডার, ডেলিভারি স্ট্যাটাস, হোলসেল রেট বা সাইজ নির্বাচন — যেকোনো বিষয়ে লিখুন। সাধারণত{" "}
        {toBn(15)} মিনিটের মধ্যে উত্তর দিয়ে দেই।
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            icon: WhatsappIcon,
            title: "হোয়াটসঅ্যাপ",
            value: toBn(site.phoneDisplay),
            note: "সবচেয়ে দ্রুত উত্তর এখানেই",
            href: waLink(chatMessage()),
            external: true,
            tone: "wa",
          },
          {
            icon: PhoneIcon,
            title: "ফোন কল",
            value: toBn(site.phoneDisplay),
            note: "দোকান খোলা থাকলেই ধরা হয়",
            href: `tel:${site.phoneDial}`,
            tone: "brand",
          },
          {
            icon: PinIcon,
            title: "দোকানের ঠিকানা",
            value: site.addressShort,
            note: "দোকানে এসে সরাসরিও কিনতে পারেন",
            href: null,
            tone: "brand",
          },
          {
            icon: ClockIcon,
            title: "সময়",
            value: site.hours.replace("প্রতিদিন ", ""),
            note: "শুক্রবারও খোলা",
            href: null,
            tone: "brand",
          },
        ].map((card) => {
          const inner = (
            <>
              <span
                className={`grid h-10 w-10 place-items-center rounded-xl ${
                  card.tone === "wa" ? "bg-wa-tint text-wa-dark" : "bg-brand-50 text-brand-700"
                }`}
              >
                <card.icon className="h-5 w-5" />
              </span>
              <p className="mt-3 text-[12px] font-bold uppercase tracking-wide text-muted">{card.title}</p>
              <p className="mt-1 text-[15px] font-extrabold leading-tight">{card.value}</p>
              <p className="mt-1.5 text-[12px] leading-snug text-muted">{card.note}</p>
            </>
          );
          return card.href ? (
            <a
              key={card.title}
              href={card.href}
              target={card.external ? "_blank" : undefined}
              rel={card.external ? "noopener noreferrer" : undefined}
              className="card p-4 transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lift"
            >
              {inner}
            </a>
          ) : (
            <div key={card.title} className="card p-4">
              {inner}
            </div>
          );
        })}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.3fr_1fr] lg:items-start">
        <ContactForm />

        <div className="space-y-3">
          <div className="card p-5">
            <h2 className="text-[1.05rem] font-extrabold">দোকান ও শোরুম</h2>
            <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{site.address}</p>
            <div className="mt-3 overflow-hidden rounded-2xl border border-line">
              <div className="grid-lines relative aspect-[4/3] bg-gradient-to-br from-brand-50 via-white to-canvas">
                <div className="absolute inset-0 grid place-items-center text-center">
                  <div>
                    <span className="mx-auto grid h-11 w-11 place-items-center rounded-full bg-brand-700 text-white shadow-lift">
                      <PinIcon className="h-5 w-5" />
                    </span>
                    <p className="mt-2.5 text-[13px] font-bold">{site.name}</p>
                    <p className="text-[11.5px] text-muted">{site.addressShort}</p>
                  </div>
                </div>
              </div>
            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                site.address,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline btn-sm mt-3 w-full"
            >
              ম্যাপে দেখুন
            </a>
          </div>

          <div className="card p-5">
            <h2 className="flex items-center gap-2 text-[1.05rem] font-extrabold">
              <TruckIcon className="h-5 w-5 text-brand-700" />
              ডেলিভারি এক নজরে
            </h2>
            <ul className="mt-2.5 space-y-2 text-[13px] text-muted">
              <li className="flex justify-between gap-2 border-b border-dashed border-line pb-2">
                <span>ঢাকার ভিতরে</span>
                <span className="font-bold text-ink">{bdt(site.delivery.insideDhaka)}</span>
              </li>
              <li className="flex justify-between gap-2 border-b border-dashed border-line pb-2">
                <span>ঢাকার বাইরে</span>
                <span className="font-bold text-ink">{bdt(site.delivery.outsideDhaka)}</span>
              </li>
              <li className="flex justify-between gap-2">
                <span>{bdt(site.delivery.freeOver)}+ অর্ডারে</span>
                <span className="font-bold text-brand-700">ফ্রি</span>
              </li>
            </ul>
            <Link href="/help#delivery" className="btn-soft btn-sm mt-3 w-full">
              বিস্তারিত নীতিমালা
            </Link>
          </div>

          <div className="rounded-2xl border border-line bg-white p-5">
            <h2 className="text-[15px] font-extrabold">ইমেইল</h2>
            <a
              href={`mailto:${site.email}`}
              className="mt-2 inline-flex items-center gap-2 text-[13.5px] font-bold text-brand-700"
            >
              <MailIcon className="h-4 w-4" />
              {site.email}
            </a>
            <p className="mt-2 text-[12px] leading-relaxed text-muted">
              কোটেশন, চাহিদাপত্র বা অফিসিয়াল চিঠির জন্য ইমেইল করুন — {toBn(2)} কর্মদিবসের মধ্যে উত্তর
              পাবেন।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
