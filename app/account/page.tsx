import type { Metadata } from "next";
import { site } from "@/lib/site";
import { AccountView } from "@/components/account-view";

export const metadata: Metadata = {
  title: "আমার অ্যাকাউন্ট",
  description: `${site.name} — আপনার অর্ডারের তালিকা, ডেলিভারি আপডেট ও অ্যাকাউন্টের তথ্য।`,
  robots: { index: false, follow: true },
};

export default function AccountPage() {
  return <AccountView />;
}
