/**
 * সাইটের অ্যাবসোলিউট URL (SEO, og:image, canonical, sitemap-এর জন্য)।
 * ভার্সেলে ডিপ্লয় করলে প্রজেক্টের ডোমেইন স্বয়ংক্রিয়ভাবে ধরা পড়ে।
 * নিজস্ব ডোমেইন ব্যবহার করলে Vercel Environment Variable-এ
 * NEXT_PUBLIC_SITE_URL = https://আপনার-ডোমেইন.com  বসিয়ে দিন।
 */
const fromEnv =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "");

export const siteUrl =
  fromEnv || (process.env.NODE_ENV === "production" ? "https://emon-enterprise.vercel.app" : "http://localhost:3000");

export function absolute(path = "/"): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${siteUrl.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
}
