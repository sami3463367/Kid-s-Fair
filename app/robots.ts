import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/urls";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/cart", "/checkout", "/order-success", "/account", "/login", "/register"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
