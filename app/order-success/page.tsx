import type { Metadata } from "next";
import { Suspense } from "react";
import { site } from "@/lib/site";
import { OrderSuccess } from "@/components/order-success";

export const metadata: Metadata = {
  title: "অর্ডার কনফার্ম",
  description: `${site.name} — আপনার অর্ডারটি পাঠানো হয়েছে। অর্ডার আইডি, বিবরণ ও পরবর্তী ধাপ এখানে দেখে নিন।`,
  robots: { index: false, follow: false },
};

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="shell py-12"><div className="skeleton h-72 w-full" /></div>}>
      <OrderSuccess />
    </Suspense>
  );
}
