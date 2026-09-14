import type { Metadata } from "next";
import { site } from "@/lib/site";
import { RegisterForm } from "@/components/auth-forms";

export const metadata: Metadata = {
  title: "অ্যাকাউন্ট খুলুন",
  description: `${site.name} — মাত্র এক মিনিটে অ্যাকাউন্ট খুলুন, অর্ডার হিস্ট্রি ও দ্রুত চেকআউটের সুবিধা নিন।`,
  robots: { index: false, follow: true },
};

export default function RegisterPage() {
  return (
    <div className="shell py-8 sm:py-12">
      <RegisterForm />
    </div>
  );
}
