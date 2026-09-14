"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toBn } from "@/lib/format";
import {
  filterAndSort,
  filterOptions,
  sortOptions,
  type FilterKey,
  type SortKey,
} from "@/lib/products";
import { ProductCard } from "./product-card";
import { Reveal } from "./reveal";
import { SearchIcon, CloseIcon, SparkleIcon } from "./icons";

export function ProductsExplorer({
  initialQuery = "",
  initialFilter = "all",
  initialSort = "featured",
}: {
  initialQuery?: string;
  initialFilter?: FilterKey;
  initialSort?: SortKey;
}) {
  const router = useRouter();
  const params = useSearchParams();
  const [query, setQuery] = useState(initialQuery);
  const [filter, setFilter] = useState<FilterKey>(initialFilter);
  const [sort, setSort] = useState<SortKey>(initialSort);
  const inputRef = useRef<HTMLInputElement>(null);

  // ?q= / ?filter= / ?sort= বদলালে ফর্মে বসিয়ে দিন (ফুটার লিংক থেকে এলে)
  useEffect(() => {
    const q = params.get("q");
    const f = params.get("filter");
    const s = params.get("sort");
    if (q !== null) setQuery(q);
    if (f && filterOptions.some((o) => o.value === f)) setFilter(f as FilterKey);
    if (s && sortOptions.some((o) => o.value === s)) setSort(s as SortKey);
  }, [params]);

  const list = useMemo(() => filterAndSort({ query, filter, sort }), [query, filter, sort]);

  // প্রথমবার পেজে ঢুকলে ?q= থাকলে সার্চে ফোকাস
  useEffect(() => {
    if (params.get("q") && inputRef.current) {
      const id = window.setTimeout(() => inputRef.current?.focus(), 400);
      return () => window.clearTimeout(id);
    }
  }, [params]);

  const sync = (next: { q?: string; filter?: FilterKey; sort?: SortKey }) => {
    const search = new URLSearchParams();
    const q = next.q ?? query;
    const f = next.filter ?? filter;
    const s = next.sort ?? sort;
    if (q.trim()) search.set("q", q.trim());
    if (f !== "all") search.set("filter", f);
    if (s !== "featured") search.set("sort", s);
    const qs = search.toString();
    router.replace(qs ? `/products?${qs}` : "/products", { scroll: false });
  };

  return (
    <div>
      <div className="sticky top-[3.5rem] z-20 -mx-4 border-b border-line bg-canvas/95 px-4 py-3 backdrop-blur sm:top-[4rem] sm:mx-0 sm:rounded-2xl sm:border sm:px-3.5 sm:shadow-card">
        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
          <label className="relative flex-1">
            <span className="sr-only">পণ্য খুঁজুন</span>
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                sync({ q: e.target.value });
              }}
              placeholder="হ্যাঙ্গার, মডেল বা ক্লিপ সংখ্যা লিখুন…"
              className="input h-11 pl-10 pr-9 text-[14px]"
            />
            {query ? (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  sync({ q: "" });
                }}
                aria-label="সার্চ মুছুন"
                className="absolute right-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-lg text-muted transition hover:bg-canvas active:scale-90"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            ) : null}
          </label>

          <label className="relative sm:w-52">
            <span className="sr-only">সাজান</span>
            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value as SortKey);
                sync({ sort: e.target.value as SortKey });
              }}
              className="input h-11 appearance-none pr-9 text-[14px] font-semibold"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <span aria-hidden className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted">
              ▾
            </span>
          </label>
        </div>

        <div className="mt-2.5 flex gap-2 overflow-x-auto no-scrollbar sm:mt-3">
          {filterOptions.map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() => {
                setFilter(o.value);
                sync({ filter: o.value });
              }}
              className={`chip ${filter === o.value ? "chip-active" : ""}`}
              aria-pressed={filter === o.value}
            >
              {o.icon ? <span aria-hidden>{o.icon}</span> : null}
              {o.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <p className="text-[13px] font-semibold text-muted">
          {toBn(list.length)} টি পণ্য পাওয়া গেছে
          {query ? (
            <>
              {" "}
              — “<span className="text-ink">{query}</span>”
            </>
          ) : null}
        </p>
        <span className="inline-flex items-center gap-1.5 text-[12px] font-bold text-brand-700">
          <SparkleIcon className="h-3.5 w-3.5" />
          স্টক সীমিত — আজই অর্ডার করুন
        </span>
      </div>

      {list.length === 0 ? (
        <div className="mt-6 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-line bg-white px-6 py-14 text-center">
          <span className="text-4xl" aria-hidden>
            🔍
          </span>
          <p className="text-[15px] font-bold">এই নামে কোনো পণ্য খুঁজে পাওয়া যায়নি</p>
          <p className="max-w-sm text-[13px] text-muted">
            স্পেলিং দেখে নিন বা খালি করে আবার খুঁজুন। প্রয়োজনে হোলসেল অর্ডারের জন্য সরাসরি
            হোয়াটসঅ্যাপে লিখুন।
          </p>
          <button
            type="button"
            className="btn-primary btn-sm"
            onClick={() => {
              setQuery("");
              setFilter("all");
              sync({ q: "", filter: "all" });
            }}
          >
            সব পণ্য দেখুন
          </button>
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((p, i) => (
            <Reveal key={p.slug} delay={Math.min(i, 6) * 55}>
              <ProductCard product={p} priority={i < 2} compact={list.length > 4} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
