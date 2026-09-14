import type { Metadata, Viewport } from "next";
import { site } from "@/lib/site";
import { siteUrl as canonicalBase } from "@/lib/urls";
import "./globals.css";
import { Providers } from "@/components/providers";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { CartDrawer } from "@/components/cart-drawer";
import { BackToTop } from "@/components/back-to-top";

export const metadata: Metadata = {
  metadataBase: new URL(canonicalBase),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "SKB হ্যাঙ্গার",
    "স্টেইনলেস স্টিল হ্যাঙ্গার",
    "কাপড় শুকানোর হ্যাঙ্গার",
    "ড্রাইং হ্যাঙ্গার দাম",
    "হ্যাঙ্গার কিনতে চাই",
    "ইমোন এন্টারপ্রাইজ",
    "Emon Enterprise",
    "Bangladesh hanger shop",
  ],
  authors: [{ name: site.name }],
  creator: site.nameEn,
  openGraph: {
    type: "website",
    locale: "bn_BD",
    url: canonicalBase,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [
      {
        url: "/hero/hero-hangers.jpg",
        width: 1200,
        height: 655,
        alt: site.tagline,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: ["/hero/hero-hangers.jpg"],
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/brand/logo-mark.png", type: "image/png", sizes: "128x128" },
      { url: "/icons/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/brand/logo.png", type: "image/png", sizes: "512x512" }],
  },
  formatDetection: { telephone: true, address: true, email: true },
  category: "shopping",
};

export const viewport: Viewport = {
  themeColor: "#046653",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  colorScheme: "light",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: site.name,
  alternateName: site.nameEn,
  description: site.description,
  telephone: site.phoneDial,
  email: site.email,
  priceRange: "৳৳৳",
  image: `${canonicalBase}/hero/hero-hangers.jpg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address,
    addressCountry: "BD",
  },
  openingHours: "Mo-Su 09:00-22:00",
  sameAs: [site.facebook],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn" dir="ltr">
      <head>
        {/* ফন্ট — নেট না থাকলেও সিস্টেম বাংলা ফন্টে ঠিকই দেখাবে */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anek+Bangla:wght@500;600;700;800&family=Hind+Siliguri:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-dvh bg-canvas font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-bold"
        >
          মূল কনটেন্টে যান
        </a>
        <Providers>
          <SiteHeader />
          <main id="main-content" className="min-h-dvh" tabIndex={-1}>
            {children}
          </main>
          <SiteFooter />
          <div className="h-[calc(var(--bottom-nav-h)+env(safe-area-inset-bottom,0px))] lg:hidden" />
          <MobileBottomNav />
          <WhatsAppFloat />
          <CartDrawer />
          <BackToTop />
        </Providers>
      </body>
    </html>
  );
}
