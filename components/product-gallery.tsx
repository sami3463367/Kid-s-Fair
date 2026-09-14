"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { ProductImage } from "@/lib/products";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "./icons";

/** মোবাইল-ফার্স্ট গ্যালারি: সোয়াইপ + থাম্বনেইল + ট্যাপ করে জুম */
export function ProductGallery({ images, name }: { images: ProductImage[]; name: string }) {
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(false);

  useEffect(() => {
    if (!zoom) return;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoom(false);
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [zoom, images.length]);

  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + images.length) % images.length);

  return (
    <>
      <div className="relative overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-white via-canvas to-brand-50/70">
        <div
          data-gallery-track
          className="flex snap-x snap-mandatory overflow-x-auto no-scrollbar scroll-smooth"
          onScroll={(e) => {
            const el = e.currentTarget;
            const next = Math.round(el.scrollLeft / el.clientWidth);
            if (next !== index) setIndex(next);
          }}
          role="group"
          aria-label="পণ্যের ছবি"
        >
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setZoom(true)}
              className="relative aspect-[4/5] w-full shrink-0 snap-center cursor-zoom-in"
              aria-label={`${name} — ছবি ${i + 1} বড় করে দেখুন`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 46vw"
                priority={i === 0}
                className="object-contain p-4"
              />
            </button>
          ))}
        </div>

        {images.length > 1 ? (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="আগের ছবি"
              className="absolute left-2 top-1/2 hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-line bg-white/90 text-ink shadow-sm transition hover:bg-white sm:grid"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="পরের ছবি"
              className="absolute right-2 top-1/2 hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-line bg-white/90 text-ink shadow-sm transition hover:bg-white sm:grid"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-white/85 px-2.5 py-1.5 shadow-sm backdrop-blur">
              {images.map((img, i) => (
                <span
                  key={img.src}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "w-5 bg-brand-700" : "w-1.5 bg-line"
                  }`}
                />
              ))}
            </div>
            <span className="absolute right-3 top-3 rounded-full bg-white/85 px-2 py-1 text-[11px] font-bold text-muted backdrop-blur">
              ছবিতে ট্যাপ করে জুম করুন
            </span>
          </>
        ) : null}
      </div>

      {images.length > 1 ? (
        <div className="mt-2.5 flex gap-2 overflow-x-auto no-scrollbar">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={(event) => {
                setIndex(i);
                (event.currentTarget as HTMLElement).scrollIntoView({ block: "nearest" });
                const track = document.querySelector("[data-gallery-track]") as HTMLElement | null;
                if (track) track.scrollTo({ left: i * track.clientWidth, behavior: "smooth" });
              }}
              className={`relative h-16 w-20 shrink-0 overflow-hidden rounded-xl border-2 bg-white transition ${
                i === index ? "border-brand-600" : "border-line opacity-75 hover:opacity-100"
              }`}
              aria-label={`ছবি ${i + 1} দেখুন`}
            >
              <Image src={img.src} alt="" fill sizes="80px" className="object-contain p-1" />
            </button>
          ))}
        </div>
      ) : null}

      {zoom ? (
        <div
          className="fixed inset-0 z-[90] flex flex-col bg-ink/95 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`${name} এর ছবি`}
        >
          <div className="flex items-center justify-between px-4 py-3 text-white">
            <span className="text-sm font-bold">
              {name} — {index + 1}/{images.length}
            </span>
            <button
              type="button"
              onClick={() => setZoom(false)}
              aria-label="ছবি বন্ধ করুন"
              className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 transition hover:bg-white/20 active:scale-90"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>
          <div className="relative flex flex-1 items-center justify-center overflow-hidden px-2 pb-6">
            <Image
              src={images[index].src}
              alt={images[index].alt}
              fill
              sizes="100vw"
              className="object-contain p-4"
            />
            {images.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="আগের ছবি"
                  className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/25 active:scale-90"
                >
                  <ChevronLeftIcon className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="পরের ছবি"
                  className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/25 active:scale-90"
                >
                  <ChevronRightIcon className="h-6 w-6" />
                </button>
              </>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
