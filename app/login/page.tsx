import type { Metadata } from "next";
import { site } from "@/lib/site";
import { LoginForm } from "@/components/auth-forms";

export const metadata: Metadata = {
  title: "লগইন",
  description: `${site.name} — আপনার অ্যাকাউন্টে লগইন করুন এবং অর্ডারের আপডেট দেখুন।`,
  robots: { index: false, follow: true },
};

export default function LoginPage() {
  return (
    <div className="shell py-8 sm:py-12">
      <LoginForm />
    </div>
  );
}
