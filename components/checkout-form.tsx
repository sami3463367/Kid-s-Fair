"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { bdt, toBn } from "@/lib/format";
import { site } from "@/lib/site";
import { districts, zoneOptions } from "@/lib/locations";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/lib/toast";
import { orderMessage, waLink, type Zone } from "@/lib/whatsapp";
import {
  CheckIcon,
  CopyIcon,
  LockIcon,
  ShieldIcon,
  TruckIcon,
  WhatsappIcon,
} from "./icons";

type FormState = {
  name: string;
  phone: string;
  district: string;
  thana: string;
  address: string;
  note: string;
  payment: "cod" | "bkash" | "nagad";
};

const DRAFT_KEY = "ee.checkout-draft.v1";

const emptyForm: FormState = {
  name: "",
  phone: "",
  district: "ঢাকা",
  thana: "",
  address: "",
  note: "",
  payment: "cod",
};

export function CheckoutForm() {
  const { lines, totals, zone, setZone, clear, hydrated } = useCart();
  const { user, placeOrder, ready } = useAuth();
  const { push } = useToast();
  const router = useRouter();

  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState | "thana", string>>>({});
  const [submitting, setSubmitting] = useState(false);

  // লগইন করা থাকলে তথ্য আগে থেকেই বসিয়ে দিন
  useEffect(() => {
    if (!ready || !user) return;
    setForm((f) => ({
      ...f,
      name: f.name || user.name,
      phone: f.phone || user.phone,
    }));
  }, [user, ready]);

  // আগের ড্রাফট থাকলে ফিরিয়ে দিন
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(DRAFT_KEY);
      if (raw) setForm((f) => ({ ...f, ...(JSON.parse(raw) as Partial<FormState>) }));
    } catch {
      /* উপেক্ষা */
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(DRAFT_KEY, JSON.stringify(form));
    } catch {
      /* উপেক্ষা */
    }
  }, [form]);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  const message = useMemo(
    () =>
      orderMessage({
        lines,
        totals,
        zone,
        payment: form.payment,
        customer: {
          name: form.name,
          phone: form.phone,
          address: form.address,
          district: form.district,
          thana: form.thana,
          note: form.note,
        },
      }),
    [lines, totals, zone, form],
  );

  const validate = (): boolean => {
    const next: typeof errors = {};
    if (form.name.trim().length < 3) next.name = "আপনার পুরো নাম লিখুন (কমপক্ষে ৩ অক্ষর)";
    const digits = form.phone.replace(/\D/g, "").replace(/^880/, "0");
    if (!/^01[3-9]\d{8}$/.test(digits))
      next.phone = `${toBn(11)} ডিজিটের সঠিক মোবাইল নম্বর দিন — যেমন ${toBn("01XXX-XXXXXX")}`;
    if (form.address.trim().length < 10)
      next.address = "সম্পূর্ণ ঠিকানা লিখুন — বাসা/রোড, গ্রাম বা মহল্লাসহ";
    if (form.thana.trim().length < 2) next.thana = "থানা / পোস্ট অফিস লিখুন";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (lines.length === 0) {
      push("কার্ট খালি — আগে পণ্য যোগ করুন", { tone: "error" });
      return;
    }
    if (!validate()) {
      push("লাল চিহ্নিত ঘরগুলো ঠিক করে আবার চেষ্টা করুন", { tone: "error" });
      const first = document.querySelector<HTMLElement>("[data-error='true']");
      first?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setSubmitting(true);
    const order = placeOrder({
      lines,
      subtotal: totals.subtotal,
      delivery: totals.delivery,
      total: totals.total,
      zone,
      payment: form.payment,
      customer: {
        name: form.name.trim(),
        phone: form.phone.replace(/\D/g, "").replace(/^880/, "0"),
        address: form.address.trim(),
        district: form.district,
        thana: form.thana.trim(),
        note: form.note.trim() || undefined,
      },
    });

    const finalMessage = orderMessage({
      lines,
      totals,
      zone,
      payment: form.payment,
      customer: order.customer,
      orderId: order.id,
    });

    window.open(waLink(finalMessage), "_blank", "noopener,noreferrer");
    try {
      window.localStorage.removeItem(DRAFT_KEY);
    } catch {
      /* উপেক্ষা */
    }
    clear();
    push("অর্ডার হোয়াটসঅ্যাপে পাঠানো হয়েছে", { icon: "✅" });
    router.push(`/order-success?id=${order.id}`);
  };

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(message);
      push("অর্ডারের বিবরণ কপি হয়েছে — যেকোনো জায়গায় পেস্ট করুন", { icon: "📋" });
    } catch {
      push("কপি করা যায়নি — ব্রাউজারের অনুমতি দেখুন", { tone: "error" });
    }
  };

  if (!hydrated) {
    return (
      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-3.5">
          <div className="skeleton h-52 w-full rounded-2xl" />
          <div className="skeleton h-64 w-full rounded-2xl" />
        </div>
        <div className="skeleton h-80 w-full rounded-2xl" />
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 rounded-3xl border border-dashed border-line bg-white px-6 py-12 text-center">
        <span className="text-3xl" aria-hidden>
          🧾
        </span>
        <h1 className="text-[1.3rem]">চেকআউটের জন্য কার্ট খালি</h1>
        <p className="max-w-xs text-[13.5px] leading-relaxed text-muted">
          আগে পণ্য যোগ করুন, তারপর চেকআউট করুন।
        </p>
        <Link href="/products" className="btn-primary">
          পণ্য দেখুন
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="grid gap-4 lg:grid-cols-[1.5fr_1fr] lg:items-start">
      <div className="space-y-3.5">
        <section className="card p-4">
          <h2 className="flex items-center gap-2 text-[15px] font-extrabold">
            <span className="grid h-6 w-6 place-items-center rounded-lg bg-brand-700 text-[11px] font-black text-white">
              {toBn(1)}
            </span>
            গ্রাহকের তথ্য
          </h2>
          {!user ? (
            <p className="mt-2 rounded-xl bg-canvas px-3 py-2 text-[12.5px] text-muted">
              অ্যাকাউন্ট ছাড়াই অর্ডার করা যায়। তবুও অর্ডার হিস্ট্রি চাইলে{" "}
              <Link href="/register" className="font-bold text-brand-700 underline decoration-dotted">
                ১ মিনিটে অ্যাকাউন্ট খুলুন
              </Link>
              ।
            </p>
          ) : null}

          <div className="mt-3.5 grid gap-3 sm:grid-cols-2">
            <Field
              label="আপনার নাম"
              required
              error={errors.name}
              value={form.name}
              onChange={(v) => set("name", v)}
              placeholder="যেমন: মো: রাকিব হাসান"
              autoComplete="name"
            />
            <Field
              label="মোবাইল নম্বর"
              required
              error={errors.phone}
              value={form.phone}
              onChange={(v) => set("phone", v)}
              placeholder={toBn("01XXXXXXXXX")}
              inputMode="tel"
              autoComplete="tel"
              hint={`কুরিয়ার কল করার জন্য এই নম্বরেই যোগাযোগ করা হবে — ফরম্যাট ${toBn("01XXX-XXXXXX")}`}
            />
          </div>
        </section>

        <section className="card p-4">
          <h2 className="flex items-center gap-2 text-[15px] font-extrabold">
            <span className="grid h-6 w-6 place-items-center rounded-lg bg-brand-700 text-[11px] font-black text-white">
              {toBn(2)}
            </span>
            ডেলিভারি ঠিকানা
          </h2>

          <div className="mt-3.5 grid gap-2 sm:grid-cols-2">
            {zoneOptions.map((z) => (
              <button
                key={z.id}
                type="button"
                onClick={() => setZone(z.id as Zone)}
                aria-pressed={zone === z.id}
                className={`rounded-2xl border p-3 text-left transition active:scale-[0.99] ${
                  zone === z.id ? "border-brand-600 bg-brand-50/70" : "border-line hover:border-brand-200"
                }`}
              >
                <span className="flex items-center gap-2">
                  <TruckIcon className={`h-5 w-5 ${zone === z.id ? "text-brand-700" : "text-muted"}`} />
                  <span className="text-[13.5px] font-extrabold">{z.title}</span>
                  {zone === z.id ? <CheckIcon className="ml-auto h-4 w-4 text-brand-700" /> : null}
                </span>
                <span className="mt-1.5 block text-[11.5px] leading-snug text-muted">{z.note}</span>
                <span className="mt-2 block text-[12.5px] font-bold text-brand-800">
                  {totals.freeDelivery
                    ? "ডেলিভারি ফ্রি"
                    : `চার্জ ${bdt(z.id === "inside" ? site.delivery.insideDhaka : site.delivery.outsideDhaka)}`}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-3.5 grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="label">জেলা</span>
              <select
                value={form.district}
                onChange={(e) => set("district", e.target.value)}
                className="input h-11"
              >
                {districts.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              {form.district === "অন্যান্য জেলা" ? (
                <span className="hint">তালিকায় না থাকলে ঠিকানার লাইনে জেলার নাম লিখে দিন।</span>
              ) : null}
            </label>
            <Field
              label="থানা / পোস্ট অফিস"
              required
              error={errors.thana}
              value={form.thana}
              onChange={(v) => set("thana", v)}
              placeholder="যেমন: মিরপুর ১০"
            />
          </div>

          <label className="mt-3 block">
            <span className="label">সম্পূর্ণ ঠিকানা</span>
            <textarea
              value={form.address}
              onChange={(e) => set("address", e.target.value)}
              data-error={errors.address ? "true" : undefined}
              placeholder="বাসা / হোল্ডিং, রোড, গ্রাম বা মহল্লা, ল্যান্ডমার্ক"
              className={`input ${errors.address ? "input-error" : ""}`}
            />
            {errors.address ? <span className="err">{errors.address}</span> : null}
          </label>

          <label className="mt-3 block">
            <span className="label">মন্তব্য (ঐচ্ছিক)</span>
            <input
              value={form.note}
              onChange={(e) => set("note", e.target.value)}
              placeholder="যেমন: বিকালে কল করবেন / নির্দিষ্ট রঙ চাই"
              className="input h-11"
            />
          </label>
        </section>

        <section className="card p-4">
          <h2 className="flex items-center gap-2 text-[15px] font-extrabold">
            <span className="grid h-6 w-6 place-items-center rounded-lg bg-brand-700 text-[11px] font-black text-white">
              {toBn(3)}
            </span>
            পেমেন্ট পদ্ধতি
          </h2>
          <div className="mt-3.5 grid gap-2">
            {[
              {
                id: "cod" as const,
                title: "ক্যাশ অন ডেলিভারি",
                note: "পণ্য হাতে পেয়ে কুরিয়ারকে টাকা দিন — সবচেয়ে জনপ্রিয়",
                icon: "💵",
              },
              {
                id: "bkash" as const,
                title: `bKash — ${toBn(site.bkashNumber)}`,
                note: `পার্সোনাল নম্বরে ${bdt(totals.total)} সেন্ড মানি করে ট্রানজেকশন আইডি হোয়াটসঅ্যাপে পাঠান`,
                icon: "📱",
              },
              {
                id: "nagad" as const,
                title: `Nagad — ${toBn(site.nagadNumber)}`,
                note: "অগ্রিম পেমেন্ট করলে ডেলিভারি প্রায়শই দ্রুত হয়",
                icon: "📲",
              },
            ].map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => set("payment", p.id)}
                aria-pressed={form.payment === p.id}
                className={`flex items-start gap-3 rounded-2xl border p-3 text-left transition active:scale-[0.99] ${
                  form.payment === p.id
                    ? "border-brand-600 bg-brand-50/70"
                    : "border-line hover:border-brand-200"
                }`}
              >
                <span aria-hidden className="text-xl leading-none">
                  {p.icon}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[13.5px] font-extrabold">{p.title}</span>
                  <span className="mt-0.5 block text-[11.5px] leading-snug text-muted">{p.note}</span>
                </span>
                <span
                  className={`mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full border-2 ${
                    form.payment === p.id ? "border-brand-600" : "border-line"
                  }`}
                >
                  {form.payment === p.id ? <span className="h-2 w-2 rounded-full bg-brand-600" /> : null}
                </span>
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* ───────── সাইড সারাংশ ───────── */}
      <aside className="space-y-3 lg:sticky lg:top-24">
        <div className="card p-4">
          <h2 className="text-[15px] font-extrabold">অর্ডার সারাংশ</h2>
          <ul className="mt-3 space-y-2.5">
            {lines.map(({ product, qty }) => (
              <li key={product.slug} className="flex gap-2.5">
                <span className="relative h-12 w-14 shrink-0 overflow-hidden rounded-lg bg-canvas">
                  <Image src={product.images[0].src} alt="" fill sizes="56px" className="object-contain p-0.5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[12.5px] font-bold">{product.name}</span>
                  <span className="block text-[11.5px] text-muted">
                    {bdt(product.price)} × {toBn(qty)}
                  </span>
                </span>
                <span className="text-[12.5px] font-extrabold">{bdt(product.price * qty)}</span>
              </li>
            ))}
          </ul>

          <dl className="mt-3.5 space-y-1.5 border-t border-dashed border-line pt-3 text-[13px]">
            <div className="flex justify-between">
              <dt className="text-muted">পণ্যের দাম</dt>
              <dd className="font-bold">{bdt(totals.subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">ডেলিভারি চার্জ</dt>
              <dd className="font-bold">
                {totals.delivery === 0 ? <span className="text-brand-700">ফ্রি</span> : bdt(totals.delivery)}
              </dd>
            </div>
            <div className="flex items-end justify-between border-t border-line pt-2.5">
              <dt className="text-[14px] font-extrabold">সর্বমোট</dt>
              <dd className="font-display text-[1.25rem] font-extrabold leading-none text-brand-800">
                {bdt(totals.total)}
              </dd>
            </div>
          </dl>

          <button type="submit" disabled={submitting} className="btn-primary btn-lg btn-block mt-4">
            {submitting ? "পাঠানো হচ্ছে…" : "অর্ডার কনফার্ম করুন"}
            {!submitting ? <WhatsappIcon className="h-[18px] w-[18px]" /> : null}
          </button>
          <button type="button" onClick={copyMessage} className="btn-outline btn-sm btn-block mt-2">
            <CopyIcon className="h-4 w-4" />
            অর্ডারের বিবরণ কপি করুন
          </button>

          <p className="mt-2.5 flex items-start gap-1.5 text-[11.5px] leading-snug text-muted">
            <LockIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-700" />
            বাটনে চাপ দিলে আপনার মোবাইলে হোয়াটসঅ্যাপ খুলে যাবে এবং তথ্যসহ বার্তা আগে থেকেই লেখা
            থাকবে — শুধু সেন্ড চাপুন।
          </p>
        </div>

        <div className="card flex items-start gap-2.5 p-4">
          <ShieldIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" />
          <p className="text-[12px] leading-snug text-muted">
            {site.name} — যোগাযোগ: {toBn(site.phoneDisplay)} • {site.hours}
            <br />
            ঠিকানা: {site.address}
          </p>
        </div>
      </aside>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  required,
  error,
  hint,
  type = "text",
  inputMode,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  hint?: string;
  type?: string;
  inputMode?: "text" | "tel" | "numeric" | "email";
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="label">
        {label} {required ? <span className="text-danger">*</span> : null}
      </span>
      <input
        type={type}
        value={value}
        inputMode={inputMode}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        data-error={error ? "true" : undefined}
        aria-invalid={Boolean(error)}
        className={`input h-11 ${error ? "input-error" : ""}`}
      />
      {error ? <span className="err">{error}</span> : hint ? <span className="hint">{hint}</span> : null}
    </label>
  );
}
