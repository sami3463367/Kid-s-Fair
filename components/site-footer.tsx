import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { bdt, toBn } from "@/lib/format";
import { chatMessage, waLink } from "@/lib/whatsapp";
import {
  CashIcon,
  ClockIcon,
  FacebookIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  ReturnIcon,
  ShieldIcon,
  TruckIcon,
  WhatsappIcon,
} from "./icons";

const quickLinks = [
  { href: "/products", label: "সব পণ্য" },
  { href: "/products?filter=combo", label: "কম্বো অফার" },
  { href: "/cart", label: "আমার কার্ট" },
  { href: "/checkout", label: "চেকআউট" },
  { href: "/account", label: "অ্যাকাউন্ট" },
  { href: "/account#orders", label: "অর্ডার ট্র্যাক" },
];

const helpLinks = [
  { href: "/help#delivery", label: "ডেলিভারি তথ্য" },
  { href: "/help#returns", label: "রিটার্ন ও এক্সচেঞ্জ" },
  { href: "/help#warranty", label: "ওয়ারেন্টি নীতি" },
  { href: "/help#privacy", label: "প্রাইভেসি পলিসি" },
  { href: "/about", label: "আমাদের সম্পর্কে" },
  { href: "/contact", label: "যোগাযোগ" },
];

export function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-line bg-white">
      <div className="shell py-9">
        {/* ট্রাস্ট ব্যাজ */}
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {[
            { icon: CashIcon, title: "ক্যাশ অন ডেলিভারি", note: "পণ্য হাতে পেয়ে টাকা দিন" },
            { icon: TruckIcon, title: "দ্রুত ডেলিভারি", note: `ঢাকায় ${site.delivery.insideDays}` },
            { icon: ShieldIcon, title: "১০০% অরিজিনাল", note: "SKB অথেনটিক পণ্যের গ্যারান্টি" },
            { icon: ReturnIcon, title: "৭ দিনের রিটার্ন", note: "ডেফেক্ট হলে বদলে দেওয়া হয়" },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl border border-line bg-canvas/60 p-3">
              <f.icon className="h-5 w-5 text-brand-700" />
              <p className="mt-2 text-[13px] font-bold leading-tight">{f.title}</p>
              <p className="mt-1 text-[11.5px] leading-snug text-muted">{f.note}</p>
            </div>
          ))}
        </div>

        <div className="mt-9 grid gap-8 md:grid-cols-[1.4fr_1fr_1fr] lg:gap-12">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center overflow-hidden rounded-full ring-1 ring-brand-200">
                <Image src="/brand/logo-mark.png" alt="" width={40} height={40} className="h-full w-full object-cover" />
              </span>
              <span>
                <span className="block font-display text-[17px] font-extrabold leading-none">
                  {site.name}
                </span>
                <span className="mt-1 block text-[11.5px] font-semibold text-brand-700">
                  {site.nameEn}
                </span>
              </span>
            </Link>
            <p className="mt-3 max-w-sm text-[13.5px] leading-relaxed text-muted">
              {site.description}
            </p>
            <a
              href={waLink(chatMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wa mt-4"
            >
              <WhatsappIcon className="h-4 w-4" />
              হোয়াটসঅ্যাপে অর্ডার করুন
            </a>
          </div>

          <div>
            <h3 className="text-[13px] font-extrabold uppercase tracking-wide text-ink">কেনাকাটা</h3>
            <ul className="mt-3 space-y-2 text-[13.5px]">
              {quickLinks.map((l) => (
                <li key={l.href + l.label}>
                  <Link href={l.href} className="text-muted transition hover:text-brand-700">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[13px] font-extrabold uppercase tracking-wide text-ink">সহায়তা</h3>
            <ul className="mt-3 space-y-2 text-[13.5px]">
              {helpLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-muted transition hover:text-brand-700">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 grid gap-2.5 rounded-2xl border border-line bg-canvas/60 p-4 sm:grid-cols-3">
          <a href={`tel:${site.phoneDial}`} className="flex items-start gap-2.5">
            <PhoneIcon className="mt-0.5 h-[18px] w-[18px] shrink-0 text-brand-700" />
            <span>
              <span className="block text-[11.5px] font-semibold text-muted">ফোন / হোয়াটসঅ্যাপ</span>
              <span className="block text-[13.5px] font-bold">{toBn(site.phoneDisplay)}</span>
            </span>
          </a>
          <div className="flex items-start gap-2.5">
            <PinIcon className="mt-0.5 h-[18px] w-[18px] shrink-0 text-brand-700" />
            <span>
              <span className="block text-[11.5px] font-semibold text-muted">দোকানের ঠিকানা</span>
              <span className="block text-[13.5px] font-bold">{site.address}</span>
            </span>
          </div>
          <div className="flex items-start gap-2.5">
            <ClockIcon className="mt-0.5 h-[18px] w-[18px] shrink-0 text-brand-700" />
            <span>
              <span className="block text-[11.5px] font-semibold text-muted">খোলা থাকে</span>
              <span className="block text-[13.5px] font-bold">{site.hours}</span>
            </span>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center gap-3 border-t border-line pt-5 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-[12.5px] text-muted">
            © {toBn(new Date().getFullYear())} {site.name} — সর্বস্বত্ব সংরক্ষিত। ডেলিভারি চার্জ{" "}
            {bdt(site.delivery.insideDhaka)} থেকে শুরু।
          </p>
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-semibold text-muted">পেমেন্ট:</span>
            {["bKash", "Nagad", "ক্যাশ অন ডেলিভারি"].map((m) => (
              <span key={m} className="badge border border-line bg-white text-ink">
                {m}
              </span>
            ))}
            <a
              href={site.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ফেসবুক পেজ"
              className="grid h-8 w-8 place-items-center rounded-lg border border-line text-muted transition hover:border-brand-300 hover:text-brand-700"
            >
              <FacebookIcon className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${site.email}`}
              aria-label="ইমেইল পাঠান"
              className="grid h-8 w-8 place-items-center rounded-lg border border-line text-muted transition hover:border-brand-300 hover:text-brand-700"
            >
              <MailIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        <p className="mt-4 rounded-xl bg-canvas px-3 py-2 text-center text-[11.5px] leading-relaxed text-muted">
          এটি একটি ডেমো ওয়েবসাইট — অর্ডারগুলো হোয়াটসঅ্যাপে যায় এবং কার্ট/অ্যাকাউন্টের তথ্য আপনার
          ব্রাউজারেই সংরক্ষিত থাকে।
        </p>
      </div>
    </footer>
  );
}
