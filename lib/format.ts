/**
 * বাংলা সংখ্যা, টাকা ও তারিখ ফরম্যাট করার হেল্পার।
 */

const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"] as const;

/** 3500 -> ৩,৫০০  |  "12 pcs" -> "১২ pcs" */
export function toBn(value: string | number): string {
  return String(value).replace(/[0-9]/g, (d) => BN_DIGITS[Number(d)]);
}

/** বাংলা (বা ইংরেজি) অঙ্কের ইনপুটকে সংখ্যায় বদলায় — ইনপুট ফিল্ডের জন্য */
export function parseBnInt(input: string): number | null {
  const ascii = input
    .replace(/[\u09e6-\u09ef]/g, (d) => String(d.charCodeAt(0) - 0x9e6))
    .replace(/[^\d]/g, "");
  if (ascii === "") return null;
  return Number(ascii);
}

/** ইংরেজি সংখ্যাকে হাজার কমা দিয়ে বাংলা সংখ্যায় */
export function bnNumber(value: number): string {
  return toBn(new Intl.NumberFormat("en-US").format(value));
}

/** 3500 -> ৳৩,৫০০ */
export function bdt(value: number): string {
  return `৳${bnNumber(value)}`;
}

/** ৩,৫০০ থেকে ৪,০০০ টাকার মধ্যে কত শতাংশ ছাড় */
export function discountPercent(price: number, oldPrice?: number): number | null {
  if (!oldPrice || oldPrice <= price) return null;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}

const BN_MONTHS = [
  "জানুয়ারি",
  "ফেব্রুয়ারি",
  "মার্চ",
  "এপ্রিল",
  "মে",
  "জুন",
  "জুলাই",
  "আগস্ট",
  "সেপ্টেম্বর",
  "অক্টোবর",
  "নভেম্বর",
  "ডিসেম্বর",
] as const;

/** ১৪ সেপ্টেম্বর ২০২৬, রাত ৯:১৫ */
export function bnDateTime(input: Date | number | string): string {
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return "";
  const hours24 = d.getHours();
  const meridiem =
    hours24 < 5
      ? "রাত"
      : hours24 < 12
        ? "সকাল"
        : hours24 < 16
          ? "দুপুর"
          : hours24 < 19
            ? "বিকাল"
            : "রাত";
  const h12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${toBn(d.getDate())} ${BN_MONTHS[d.getMonth()]} ${toBn(d.getFullYear())}, ${meridiem} ${toBn(`${h12}:${mm}`)}`;
}

/** শুধু তারিখ: ১৪ সেপ্টেম্বর ২০২৬ */
export function bnDate(input: Date | number | string): string {
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return "";
  return `${toBn(d.getDate())} ${BN_MONTHS[d.getMonth()]} ${toBn(d.getFullYear())}`;
}
