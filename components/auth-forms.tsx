"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { site } from "@/lib/site";
import { toBn } from "@/lib/format";
import { ArrowRightIcon, LockIcon, ShieldIcon, UserIcon, WhatsappIcon } from "./icons";
import { chatMessage, waLink } from "@/lib/whatsapp";

/** ?next= ঠিকানাটি শুধু ক্লায়েন্টে পড়া হয় — তাই সাইটটি পুরোপুরি স্ট্যাটিক থাকে */
function nextRoute() {
  try {
    const next = new URLSearchParams(window.location.search).get("next");
    return next && next.startsWith("/") ? next : "/account";
  } catch {
    return "/account";
  }
}

export function RegisterForm() {
  const { register } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const set = (key: keyof typeof form, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setError(null);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      setError("দুটি পাসওয়ার্ড মিলছে না");
      return;
    }
    setBusy(true);
    const result = register({
      name: form.name,
      phone: form.phone,
      email: form.email,
      password: form.password,
    });
    setBusy(false);
    if (!result.ok) {
      setError(result.error ?? "অ্যাকাউন্ট খোলা যায়নি");
      return;
    }
    router.push(nextRoute());
  };

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="text-center">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-brand-700 text-white shadow-[0_12px_24px_-14px_rgba(4,102,83,0.9)]">
          <UserIcon className="h-6 w-6" />
        </span>
        <h1 className="mt-3.5 text-[1.5rem] leading-tight">নতুন অ্যাকাউন্ট</h1>
        <p className="mt-1.5 text-[13.5px] text-muted">
          মাত্র {toBn(1)} মিনিটেই খুলে ফেলুন আপনার অ্যাকাউন্ট — অর্ডার হিস্ট্রি ও দ্রুত চেকআউটের সুবিধা পান।
        </p>
      </div>

      <form onSubmit={submit} noValidate className="card mt-5 space-y-3 p-4 sm:p-5">
        <Field label="পুরো নাম" required>
          <input
            className="input h-11"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="যেমন: মো: ইমোন আহাম্মদ"
            autoComplete="name"
          />
        </Field>
        <Field label="মোবাইল নম্বর" required hint={`লগইনের জন্য এই নম্বরই ব্যবহার হবে — ফরম্যাট ${toBn("01XXX-XXXXXX")}`}>
          <input
            className="input h-11"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            inputMode="tel"
            autoComplete="tel"
            placeholder={toBn("01XXX-XXXXXX")}
          />
        </Field>
        <Field label="ইমেইল (ঐচ্ছিক)">
          <input
            className="input h-11"
            type="email"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
          />
        </Field>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="পাসওয়ার্ড" required>
            <input
              className="input h-11"
              type="password"
              value={form.password}
              onChange={(e) => set("password", e.target.value)}
              placeholder={toBn("6") + " অক্ষর বা তার বেশি"}
              autoComplete="new-password"
            />
          </Field>
          <Field label="পাসওয়ার্ড আবার">
            <input
              className="input h-11"
              type="password"
              value={form.confirm}
              onChange={(e) => set("confirm", e.target.value)}
              placeholder="আবার লিখুন"
              autoComplete="new-password"
            />
          </Field>
        </div>

        {error ? (
          <p className="rounded-xl bg-danger/10 px-3 py-2.5 text-[12.5px] font-bold text-danger">
            {error}
          </p>
        ) : null}

        <button type="submit" disabled={busy} className="btn-primary btn-lg btn-block">
          {busy ? "তৈরি হচ্ছে…" : "অ্যাকাউন্ট খুলুন"}
          {!busy ? <ArrowRightIcon className="h-4 w-4" /> : null}
        </button>

        <p className="text-center text-[13px] text-muted">
          আগে থেকেই অ্যাকাউন্ট আছে?{" "}
          <Link href="/login" className="font-bold text-brand-700 underline decoration-dotted">
            লগইন করুন
          </Link>
        </p>
      </form>

      <div className="mt-4 flex items-start gap-2.5 rounded-2xl border border-line bg-white p-3.5">
        <ShieldIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" />
        <p className="text-[12px] leading-snug text-muted">
          এটি ডেমো — তথ্য শুধু আপনার ব্রাউজারেই (localStorage) সংরক্ষিত হয়, কোনো সার্ভারে যায় না।{" "}
          {site.name} এর আসল অর্ডার প্রসেস সম্পূর্ণ হোয়াটসঅ্যাপে।
        </p>
      </div>
      <a href={waLink(chatMessage())} target="_blank" rel="noopener noreferrer" className="btn-wa btn-sm btn-block mt-3">
        <WhatsappIcon className="h-4 w-4" />
        অ্যাকাউন্ট ছাড়াই হোয়াটসঅ্যাপে অর্ডার করুন
      </a>
    </div>
  );
}

export function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const result = login(identifier, password);
    if (!result.ok) {
      setError(result.error ?? "লগইন করা যায়নি");
      return;
    }
    router.push(nextRoute());
  };

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="text-center">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-brand-700 text-white">
          <LockIcon className="h-6 w-6" />
        </span>
        <h1 className="mt-3.5 text-[1.5rem] leading-tight">লগইন করুন</h1>
        <p className="mt-1.5 text-[13.5px] text-muted">
          মোবাইল নম্বর বা ইমেইল দিয়ে ঢুকে পড়ুন — অর্ডারের আপডেট এখানেই পাবেন।
        </p>
      </div>

      <form onSubmit={submit} noValidate className="card mt-5 space-y-3 p-4 sm:p-5">
        <Field label="মোবাইল নম্বর বা ইমেইল" required>
          <input
            className="input h-11"
            value={identifier}
            onChange={(e) => {
              setIdentifier(e.target.value);
              setError(null);
            }}
            placeholder={toBn("01XXX-XXXXXX") + " / ইমেইল"}
            autoComplete="username"
          />
        </Field>
        <Field label="পাসওয়ার্ড" required>
          <input
            className="input h-11"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(null);
            }}
            placeholder="আপনার পাসওয়ার্ড"
            autoComplete="current-password"
          />
        </Field>

        {error ? (
          <p className="rounded-xl bg-danger/10 px-3 py-2.5 text-[12.5px] font-bold text-danger">{error}</p>
        ) : null}

        <button type="submit" className="btn-primary btn-lg btn-block">
          লগইন
          <ArrowRightIcon className="h-4 w-4" />
        </button>

        <p className="text-center text-[13px] text-muted">
          নতুন কাস্টমার?{" "}
          <Link href="/register" className="font-bold text-brand-700 underline decoration-dotted">
            অ্যাকাউন্ট খুলুন
          </Link>
        </p>
        <p className="border-t border-dashed border-line pt-3 text-center text-[12.5px] text-muted">
          অ্যাকাউন্ট ছাড়াও অর্ডার করা যায় —{" "}
          <Link href="/products" className="font-bold text-brand-700">
            সরাসরি কেনাকাটা করুন
          </Link>
        </p>
      </form>
    </div>
  );
}

function Field({
  label,
  children,
  required,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="label">
        {label} {required ? <span className="text-danger">*</span> : null}
      </span>
      {children}
      {hint ? <span className="hint">{hint}</span> : null}
    </label>
  );
}
