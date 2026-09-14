import type { MetadataRoute } from "next";
import { products } from "@/lib/products";
import { absolute } from "@/lib/urls";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absolute("/"), changeFrequency: "daily", priority: 1 },
    { url: absolute("/products"), changeFrequency: "daily", priority: 0.9 },
    { url: absolute("/about"), changeFrequency: "monthly", priority: 0.5 },
    { url: absolute("/contact"), changeFrequency: "monthly", priority: 0.6 },
    { url: absolute("/help"), changeFrequency: "monthly", priority: 0.6 },
  ];

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: absolute(`/products/${p.slug}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: p.tags.includes("bestseller") ? 0.9 : 0.8,
  }));

  // কার্ট / চেকআউট / অ্যাকাউন্ট সার্চ ইঞ্জিনে যাবে না (robots.ts-এও ব্লক করা)
  return [...staticRoutes, ...productRoutes];
}
