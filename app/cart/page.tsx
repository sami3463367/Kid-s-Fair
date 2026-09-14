import type { Metadata } from "next";
import { site } from "@/lib/site";
import { CartView } from "@/components/cart-view";

export const metadata: Metadata = {
  title: "কার্ট",
  description: `${site.name} — আপনার কার্টের পণ্য দেখে চেকআউটে যান বা সরাসরি হোয়াটসঅ্যাপে অর্ডার পাঠান।`,
  robots: { index: false, follow: true },
};

export default function CartPage() {
  return <CartView />;
}
