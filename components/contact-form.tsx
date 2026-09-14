"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/lib/site";
import { toBn } from "@/lib/format";
import { waLink } from "@/lib/whatsapp";
import { useToast } from "@/lib/toast";
import { WhatsappIcon } from "./icons";

export function ContactForm() {
  const { push } = useToast();
  const [form, setForm] = useState({ name: "", phone: "", topic: "অর্ডার সংক্রান্ত", message: "" });
  const [error, setError] = useState<string | null>(null);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (form.name.trim().length < 3) return setError("আপনার নাম লিখুন");
    const digits = form.phone.replace(/\D/g, "").replace(/^880/, "0");
    if (!/^01[3-9]\d{8}$/.test(digits)) return setError("সঠিক মোবাইল নম্বর লিখুন");
    if (form.message.trim().length < 5) return setError("কী জানতে চান, একটু বিস্তারিত লিখুন");
    setError(null);
    const text = [
      `📩 *যোগাযোগ — ${site.name} ওয়েবসাইট*`,
      "",
      `নাম: ${form.name.trim()}`,
      `মোবাইল: ${digits}`,
      `বিষয়: ${form.topic}`,
      "",
      form.message.trim(),
    ].join("\n");
    window.open(waLink(text), "_blank", "noopener,noreferrer");
    push("আপনার বার্তা হোয়াটসঅ্যাপে প্রস্তুত — সেন্ড চাপুন", { icon: "💬" });
  };

  return (
    <form onSubmit={submit} noValidate className="card space-y-3 p-4 sm:p-5">
      <h2 className="text-[1.05rem] font-extrabold">ফর্ম পূরণ করে পাঠান</h2>
      <p className="text-[13px] leading-relaxed text-muted">
        নিচের তথ্যগুলো লিখলে হোয়াটসঅ্যাপে একটি প্রস্তুত বার্তা খুলে যাবে — শুধু সেন্ড চাপলেই হবে।
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="label">
            আপনার নাম <span className="text-danger">*</span>
          </span>
          <input
            className="input h-11"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="যেমন: সাবিহা রহমান"
            autoComplete="name"
          />
        </label>
        <label className="block">
          <span className="label">
            মোবাইল নম্বর <span className="text-danger">*</span>
          </span>
          <input
            className="input h-11"
            inputMode="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder={toBn("01XXX-XXXXXX")}
            autoComplete="tel"
          />
        </label>
      </div>

      <label className="block">
        <span className="label">বিষয়</span>
        <select
          className="input h-11"
          value={form.topic}
          onChange={(e) => setForm({ ...form, topic: e.target.value })}
        >
          {["অর্ডার সংক্রান্ত", "ডেলিভারি স্ট্যাটাস", "রিটার্ন / ওয়ারেন্টি", "হোলসেল ও রিসেল", "অন্যান্য"].map(
            (t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ),
          )}
        </select>
      </label>

      <label className="block">
        <span className="label">
          বার্তা <span className="text-danger">*</span>
        </span>
        <textarea
          className="input"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="আপনার প্রয়োজন, পছন্দের মডেল ও পরিমাণ লিখুন"
        />
      </label>

      {error ? (
        <p className="rounded-xl bg-danger/10 px-3 py-2.5 text-[12.5px] font-bold text-danger">{error}</p>
      ) : null}

      <button type="submit" className="btn-wa btn-lg btn-block">
        <WhatsappIcon className="h-5 w-5" />
        বার্তা পাঠান
      </button>
      <p className="text-center text-[11.5px] text-muted">
        কোনো তথ্য সার্ভারে জমা হয় না — সব কিছু আপনার হোয়াটসঅ্যাপ থেকেই আসে।
      </p>
    </form>
  );
}
