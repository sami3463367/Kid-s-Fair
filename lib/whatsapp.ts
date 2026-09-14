import { site } from "./site";
import { bdt, toBn } from "./format";
import type { Product } from "./products";

export type CartLine = { product: Product; qty: number };
export type Zone = "inside" | "outside";

export type Totals = {
  subtotal: number;
  delivery: number;
  total: number;
  freeDelivery: boolean;
  /** আর কত টাকা কিনলে ফ্রি ডেলিভারি */
  remainingForFree: number;
};

export function computeTotals(lines: CartLine[], zone: Zone = "inside"): Totals {
  const subtotal = lines.reduce((sum, l) => sum + l.product.price * l.qty, 0);
  const freeDelivery = subtotal > 0 && subtotal >= site.delivery.freeOver;
  const charge = zone === "inside" ? site.delivery.insideDhaka : site.delivery.outsideDhaka;
  const delivery = subtotal === 0 || freeDelivery ? 0 : charge;
  return {
    subtotal,
    delivery,
    total: subtotal + delivery,
    freeDelivery,
    remainingForFree: Math.max(0, site.delivery.freeOver - subtotal),
  };
}

/** হোয়াটসঅ্যাপ ডিপ লিংক */
export function waLink(message: string): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** শুধু কথা বোলার লিংক (হেডার/ফুটার/ফ্লোটিং বাটন) */
export const chatMessage = () =>
  [
    `আসসালামু আলাইকুম! 👋`,
    `আমি *${site.name}* এর ওয়েবসাইট থেকে এসেছি।`,
    `SKB স্টেইনলেস স্টিল ড্রাইং হ্যাঙ্গার সম্পর্কে জানতে ও অর্ডার করতে চাই।`,
  ].join("\n");

/** পণ্য কার্ড / ডিটেইল পেজের দ্রুত অর্ডার মেসেজ */
export function quickOrderMessage(product: Product, qty = 1): string {
  return [
    `🧺 *অর্ডার — ${site.name}*`,
    "",
    `পণ্য: ${product.name}`,
    `দাম: ${bdt(product.price)} × ${toBn(qty)} = ${bdt(product.price * qty)}`,
    `বিবরণ: ${product.unitLabel}`,
    `পেমেন্ট: ক্যাশ অন ডেলিভারি`,
    "",
    `আমি এই পণ্যটি অর্ডার করতে চাই। দয়া করে বিস্তারিত ও ডেলিভারি সময় জানাবেন। 🙏`,
  ].join("\n");
}

/** কার্ট / চেকআউটের সম্পূর্ণ অর্ডার মেসেজ */
export function orderMessage(opts: {
  lines: CartLine[];
  totals: Totals;
  zone: Zone;
  payment: "cod" | "bkash" | "nagad";
  customer: {
    name: string;
    phone: string;
    address: string;
    district: string;
    thana: string;
    note?: string;
  };
  orderId?: string;
}): string {
  const { lines, totals, zone, payment, customer, orderId } = opts;
  const payLabel =
    payment === "cod"
      ? "ক্যাশ অন ডেলিভারি (পণ্য হাতে পেয়ে)"
      : payment === "bkash"
        ? `bKash — ${site.bkashNumber}`
        : `Nagad — ${site.nagadNumber}`;

  const items = lines.map(
    (l, i) =>
      `${toBn(i + 1)}. ${l.product.name} — ${bdt(l.product.price)} × ${toBn(l.qty)} = ${bdt(
        l.product.price * l.qty,
      )}`,
  );

  return [
    `🧺 *নতুন অর্ডার — ${site.name}*`,
    orderId ? `অর্ডার আইডি: ${orderId}` : "",
    "",
    `*পণ্যসমূহ:*`,
    ...items,
    "",
    `পণ্যের দাম: ${bdt(totals.subtotal)}`,
    `ডেলিভারি চার্জ: ${
      totals.delivery === 0 ? "ফ্রি" : bdt(totals.delivery)
    } (${zone === "inside" ? "ঢাকার ভিতরে" : "ঢাকার বাইরে"})`,
    `*সর্বমোট: ${bdt(totals.total)}*`,
    "",
    `*গ্রাহকের তথ্য:*`,
    `নাম: ${customer.name}`,
    `মোবাইল: ${customer.phone}`,
    `ঠিকানা: ${customer.address}, ${customer.thana}, ${customer.district}`,
    `পেমেন্ট: ${payLabel}`,
    customer.note ? `মন্তব্য: ${customer.note}` : "",
    "",
    `ওয়েবসাইট থেকে অর্ডার করা হলো — অনুগ্রহ করে অর্ডারটি কনফার্ম করুন। 🙏`,
  ]
    .filter((l) => l !== "")
    .join("\n")
    .replace(/\n{3,}/g, "\n\n");
}

/** কার্ট পেজের জন্য সংক্ষিপ্ত বার্তা — ঠিকানা পরে চেকআউটে/চ্যাটে দেওয়া হয় */
export function cartOrderMessage(opts: { lines: CartLine[]; totals: Totals; zone: Zone }): string {
  const { lines, totals, zone } = opts;
  const items = lines.map(
    (l, i) =>
      `${toBn(i + 1)}. ${l.product.name} — ${bdt(l.product.price)} × ${toBn(l.qty)} = ${bdt(
        l.product.price * l.qty,
      )}`,
  );

  return [
    `🧺 *অর্ডার — ${site.name}*`,
    "",
    `*পণ্যসমূহ:*`,
    ...items,
    "",
    `পণ্যের দাম: ${bdt(totals.subtotal)}`,
    `ডেলিভারি: ${totals.delivery === 0 ? "ফ্রি" : bdt(totals.delivery)} (${
      zone === "inside" ? "ঢাকার ভিতরে" : "ঢাকার বাইরে"
    })`,
    `*সর্বমোট: ${bdt(totals.total)}*`,
    "",
    "নাম, মোবাইল ও ঠিকানা চেকআউট ফর্ম থেকে পাঠাচ্ছি — অনুগ্রহ করে অর্ডারটি কনফার্ম করুন। 🙏",
  ]
    .filter((l) => l !== "")
    .join("\n");
}
