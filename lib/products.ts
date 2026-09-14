/**
 * ─────────────────────────────────────────────────────────────
 *  পণ্যের সব তথ্য এখানে (একটাই জায়গা)।
 *  দাম, নাম, বিবরণ, ছবি, স্টক — সব এখান থেকে এডিট করুন।
 *  নোট: স্পেসিফিকেশন ও রিভিউগুলোর কিছু তথ্য ডেমোর জন্য বসানো,
 *  আসল তথ্য দিয়ে রিপ্লেস করে নিলেই হবে।
 * ─────────────────────────────────────────────────────────────
 */

export type ProductImage = { src: string; alt: string };
export type Spec = { label: string; value: string };
export type Review = {
  name: string;
  location: string;
  rating: number;
  date: string;
  text: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  model: string;
  brand: string;
  price: number;
  oldPrice?: number;
  unitLabel: string;
  badgeLabel?: string;
  summary: string;
  description: string[];
  highlights: string[];
  specs: Spec[];
  images: ProductImage[];
  rating: number;
  reviewsCount: number;
  reviews: Review[];
  stock: number;
  clipCount: number;
  widthCm: number;
  createdAt: string;
  isCombo?: boolean;
  tags: string[];
};

const BASE = "SKB স্টেইনলেস স্টিল — মরিচা ধরে না, বাঁকে না, দীর্ঘস্থায়ী।";

export const products: Product[] = [
  {
    id: "p-201",
    slug: "skb-hanger-201",
    name: "SKB হ্যাঙ্গার ২০১",
    model: "২০১",
    brand: "SKB",
    price: 3500,
    oldPrice: 4000,
    unitLabel: "প্রতি পিস • ফুল সেট",
    badgeLabel: "সবচেয়ে জনপ্রিয়",
    summary: "৬টি ক্লিপসহ কমপ্যাক্ট সাইজ — বাথরুম ও ছোট বারান্দার জন্য পারফেক্ট।",
    description: [
      "ছোট পরিবার, রুমে বা বাথরুমে জায়গা কম — সবাইয়ের জন্যই বানানো এই মডেল। ৬টি শক্ত স্প্রিং ক্লিপে টাওয়েল, বাচ্চাদের জামা-কাপড়, মৌজা থেকে শুরু করে ছোট চাদর পর্যন্ত একসাথে শুকিয়ে যাবে।",
      "১৬ গেজের রাউন্ড স্টেইনলেস টিউব আর ৩৬০° ঘোরা সুইভেল হুকের কারণে হ্যাঙ্গারটা বাতাসে দুললেও কাপড় পড়ে যায় না। মিরর পলিশ ফিনিশ — বারবার ধোয়া সত্ত্বেও কালো দাগ বা মরিচা আসে না।",
      BASE,
    ],
    highlights: [
      "৬টি হেভি-ডিউটি স্প্রিং ক্লিপ — শক্ত করে ধরে রাখে",
      "কম্প্যাক্ট ৪৫ সেমি প্রস্থ, ছোট জায়গায়ও ফিট",
      "৩৬০° সুইভেল হুক, দড়িতে সহজেই ঝুলানো যায়",
      "মিরর পলিশ স্টেইনলেস — মরিচা ও কালো দাগ মুক্ত",
      "প্রতি ক্লিপে প্রায় ১.৫ কেজি পর্যন্ত কাপড়",
      "বাবল র‍্যাপ করে কার্টনে প্যাক করে পাঠানো হয়",
    ],
    specs: [
      { label: "মডেল", value: "SKB ২০১" },
      { label: "ক্লিপ সংখ্যা", value: "৬টি স্প্রিং ক্লিপ" },
      { label: "প্রস্থ", value: "৪৫ সেমি (১৮ ইঞ্চি)" },
      { label: "টিউব", value: "১৬ গেজ রাউন্ড স্টেইনলেস স্টিল" },
      { label: "হুক", value: "৩৬০° সুইভেল, ৭ সেমি খোলা" },
      { label: "সর্বোচ্চ লোড", value: "প্রায় ৮ কেজি" },
      { label: "নেট ওজন", value: "৬৫০ গ্রাম" },
      { label: "ফিনিশ", value: "মিরর পলিশ (স্টিল সিলভার)" },
      { label: "উপযোগী", value: "টাওয়েল, ছোট জামা, বাচ্চাদের কাপড়, মৌজা" },
      { label: "ওয়ারেন্টি", value: "৬ মাস রাস্ট-ফ্রি রিপ্লেসমেন্ট" },
    ],
    images: [
      { src: "/products/skb-201.jpg", alt: "SKB হ্যাঙ্গার ২০১ — ৬ ক্লিপ স্টেইনলেস স্টিল ড্রাইং হ্যাঙ্গার" },
      { src: "/products/skb-201-detail.jpg", alt: "SKB হ্যাঙ্গার ২০১ — ক্লিপ ও ওয়েল্ডিং ডিটেইলস" },
      { src: "/products/skb-201-lifestyle.jpg", alt: "SKB হ্যাঙ্গার ২০১ বাথরুমে ব্যবহারের ছবি" },
    ],
    rating: 4.9,
    reviewsCount: 84,
    reviews: [
      {
        name: "রাকিবুল হাসান",
        location: "মিরপুর, ঢাকা",
        rating: 5,
        date: "২৮ আগস্ট ২০২৬",
        text: "আগে প্লাস্টিকের হ্যাঙ্গার নিতাম, ৬ মাসেই ভেঙে যেত। এটা ১ বছর ধরে ব্যবহার করছি, একদম নতুনের মতো। ছোট বাচ্চাদের কাপড়ের জন্য দারুণ।",
      },
      {
        name: "সাবিনা ইয়াসমিন",
        location: "চট্টগ্রাম",
        rating: 5,
        date: "১২ আগস্ট ২০২৬",
        text: "প্যাকিং একদম ঠিক ছিল, ডেলিভারিতে কোনো ডেন্ট পড়েনি। ক্লিপগুলো খুব শক্ত, জোরে বাতাসেও কাপড় পড়ে না।",
      },
      {
        name: "তানভীর আহমেদ",
        location: "সিলেট",
        rating: 4,
        date: "৩০ জুলাই ২০২৬",
        text: "মান ভালো। তবে জায়গা বেশি হলে ২০৪ মডেল নেওয়া বুদ্ধিমানের কাজ হবে।",
      },
    ],
    stock: 38,
    clipCount: 6,
    widthCm: 45,
    createdAt: "2026-06-18",
    tags: ["bestseller", "compact"],
  },
  {
    id: "p-202",
    slug: "skb-hanger-202",
    name: "SKB হ্যাঙ্গার ২০২",
    model: "২০২",
    brand: "SKB",
    price: 3500,
    oldPrice: 4200,
    unitLabel: "প্রতি পিস • ফুল সেট",
    badgeLabel: "আজকের হট ডিল",
    summary: "১০ ক্লিপ + ২ রাড — সংসারের প্রতিদিনের কাপড় শুকানোর সবচেয়ে বেস্ট সেলার সাইজ।",
    description: [
      "পরিবারের প্রতিদিনের শার্ট-প্যান্ট, টি-শার্ট, বেডশিট আর টাওয়েল — সবকিছু এক হ্যাঙ্গারেই জায়গা মতো শুকিয়ে যাবে। ১০টি ক্লিপের পাশাপাশি দুটি আলাদা রাড আছে, তাই ভাঁজ করেও কাপড় ঝুলানো যায়।",
      "৬০ সেমি প্রস্থের এই মডেলটি বারান্দা, ছাদ বা করিডোরের রডে সহজেই ফিট করে। টিউবের জয়েন্টগুলো আরগন ওয়েল্ড করা, তাই বছরের পর বছর দুললেও জোড়া নাড়ে না।",
      BASE,
    ],
    highlights: [
      "১০টি শক্ত ক্লিপ + ২টি অতিরিক্ত রাড",
      "৬০ সেমি প্রস্থ — ফ্যামিলি সাইজ",
      "একসাথে প্রায় ১৫-১৮ টুকরো কাপড় শুকায়",
      "আরগন-ওয়েল্ডেড জয়েন্ট, নড়ে ওঠে না",
      "শার্ট-প্যান্ট ভাঁজ করে ঝুলানোর স্পেস",
      "হালকা, সহজে এক হাতে তোলা-নামানো যায়",
    ],
    specs: [
      { label: "মডেল", value: "SKB ২০২" },
      { label: "ক্লিপ সংখ্যা", value: "১০টি স্প্রিং ক্লিপ" },
      { label: "অতিরিক্ত রাড", value: "২টি (ভাঁজ করা কাপড়ের জন্য)" },
      { label: "প্রস্থ", value: "৬০ সেমি (২৪ ইঞ্চি)" },
      { label: "টিউব", value: "১৬ গেজ রাউন্ড স্টেইনলেস স্টিল" },
      { label: "হুক", value: "৩৬০° সুইভেল হুক" },
      { label: "সর্বোচ্চ লোড", value: "প্রায় ১২ কেজি" },
      { label: "নেট ওজন", value: "৯০০ গ্রাম" },
      { label: "ফিনিশ", value: "মিরর পলিশ (স্টিল সিলভার)" },
      { label: "ওয়ারেন্টি", value: "৬ মাস রাস্ট-ফ্রি রিপ্লেসমেন্ট" },
    ],
    images: [
      { src: "/products/skb-202.jpg", alt: "SKB হ্যাঙ্গার ২০২ — ১০ ক্লিপ স্টেইনলেস স্টিল ড্রাইং হ্যাঙ্গার" },
      { src: "/products/skb-202-lifestyle.jpg", alt: "SKB হ্যাঙ্গার ২০২ বারান্দায় কাপড় শুকানোর ছবি" },
      { src: "/products/skb-201-detail.jpg", alt: "স্টেইনলেস স্টিল ক্লিপের ক্লোজ আপ" },
    ],
    rating: 4.8,
    reviewsCount: 147,
    reviews: [
      {
        name: "নুসরাত জাহান",
        location: "উত্তরা, ঢাকা",
        rating: 5,
        date: "৫ সেপ্টেম্বর ২০২৬",
        text: "৪ সদস্যের সংসারের জন্য একদম পারফেক্ট। বিকালে ধুয়ে ঝুলিয়ে দিই, রাতেই শুকিয়ে যায়। দাম অনুযায়ী মান অনেক ভালো।",
      },
      {
        name: "মাহমুদুল হাসান",
        location: "খুলনা",
        rating: 5,
        date: "২১ আগস্ট ২০২৬",
        text: "লোড বেশি নিলেও বাঁকে না। ভাইরাল হওয়া পাতলা হ্যাঙ্গারের সাথে তুলনাই করা যাবে না।",
      },
      {
        name: "ফারহানা আক্তার",
        location: "গাজীপুর",
        rating: 4,
        date: "৯ আগস্ট ২০২৬",
        text: "ভালো প্রোডাক্ট। ক্লিপের স্প্রিং একটু শক্ত, প্রথমে মনে হলো কাপড় ছিঁড়ে যাবে — এখন অভ্যাস হয়ে গেছে।",
      },
    ],
    stock: 52,
    clipCount: 10,
    widthCm: 60,
    createdAt: "2026-07-02",
    tags: ["bestseller", "hot", "family"],
  },
  {
    id: "p-204",
    slug: "skb-hanger-204",
    name: "SKB হ্যাঙ্গার ২০৪",
    model: "২০৪",
    brand: "SKB",
    price: 4500,
    oldPrice: 5200,
    unitLabel: "প্রতি পিস • হেভি ডিউটি",
    badgeLabel: "বড় সংসারের জন্য",
    summary: "১৪ ক্লিপ + ৪ রাড, ডাবল হুক — চাদর, মেয়ো, কম্বল পর্যন্ত একসাথে শুকানোর হেভি ডিউটি মডেল।",
    description: [
      "রোদে চাদর-মেয়ো শুকাতে গিয়ে হ্যাঙ্গার ভেঙে গেছে — এই অভিজ্ঞতা সবার আছে। ২০৪ মডেলটি ঠিক সেই সমস্যার সমাধান: মোটা গেজের টিউব, ডাবল সেন্টার হুক আর ৪টি আলাদা রাড, তাই ভারী কাপড়েও নিচু হয়ে যায় না।",
      "১৪টি ক্লিপে একসাথে প্রায় ২৫-৩০ টুকরো কাপড় ধরে। ছাদ, করিডোর বা বড় বারান্দায় ব্যবহারের জন্য এটাই সবচেয়ে উপযুক্ত।",
      BASE,
    ],
    highlights: [
      "১৪টি ক্লিপ + ৪টি রাড — সবচেয়ে বেশি ক্ষমতা",
      "৭৫ সেমি প্রস্থ, মোটা টিউবে ভারী চাদরেও বাঁকবে না",
      "ডাবল সেন্টার হুক — দুই দিকে সমান ভার",
      "প্রায় ২০ কেজি পর্যন্ত লোড সহ্য করে",
      "কম্বল, চাদর, মেয়ো, বিছানার কভার — সব একসাথে",
      "ছাদ ও করিডোরের জন্য সবচেয়ে জনপ্রিয় সাইজ",
    ],
    specs: [
      { label: "মডেল", value: "SKB ২০৪" },
      { label: "ক্লিপ সংখ্যা", value: "১৪টি স্প্রিং ক্লিপ" },
      { label: "রাড", value: "৪টি (ডাবল লেয়ার)" },
      { label: "প্রস্থ", value: "৭৫ সেমি (৩০ ইঞ্চি)" },
      { label: "টিউব", value: "১৪ গেজ হেভি-ডিউটি স্টেইনলেস স্টিল" },
      { label: "হুক", value: "ডাবল সেন্টার হুক (জোড়)" },
      { label: "সর্বোচ্চ লোড", value: "প্রায় ২০ কেজি" },
      { label: "নেট ওজন", value: "১.৩ কেজি" },
      { label: "ফিনিশ", value: "মিরর পলিশ (স্টিল সিলভার)" },
      { label: "ওয়ারেন্টি", value: "১২ মাস রাস্ট-ফ্রি রিপ্লেসমেন্ট" },
    ],
    images: [
      { src: "/products/skb-204.jpg", alt: "SKB হ্যাঙ্গার ২০৪ — হেভি ডিউটি ১৪ ক্লিপ ড্রাইং হ্যাঙ্গার" },
      { src: "/products/skb-204-lifestyle.jpg", alt: "SKB হ্যাঙ্গার ২০৪ দিয়ে চাদর শুকানোর ছবি" },
      { src: "/products/skb-201-detail.jpg", alt: "স্টেইনলেস স্টিলের জয়েন্ট ও ক্লিপ ডিটেইলস" },
    ],
    rating: 4.9,
    reviewsCount: 62,
    reviews: [
      {
        name: "আব্দুল করিম",
        location: "বগুড়া",
        rating: 5,
        date: "১ সেপ্টেম্বর ২০২৬",
        text: "পুরো বাড়ির চাদর-মেয়ো একসাথে শুকাই। ২ বছরের পুরনো, এখনো চকচক করছে। দাম একটু বেশি মনে হয়েছিল, এখন বুঝছি কেন বেশি ছিল।",
      },
      {
        name: "শারমিন সুলতানা",
        location: "নারায়ণগঞ্জ",
        rating: 5,
        date: "১৮ আগস্ট ২০২৬",
        text: "ছাদের রডে ঝুলিয়েছি, ঝড়েও কিছু হয়নি। স্টিলটা সত্যিই মোটা।",
      },
    ],
    stock: 21,
    clipCount: 14,
    widthCm: 75,
    createdAt: "2026-08-11",
    tags: ["new", "heavy-duty", "family"],
  },
  {
    id: "p-combo-duo",
    slug: "skb-combo-duo",
    name: "কম্বো সেভিং: ২০১ + ২০২ (২ পিস)",
    model: "কম্বো ১",
    brand: "SKB",
    price: 6600,
    oldPrice: 7000,
    unitLabel: "২ পিস • সেভিং ৳৪০০",
    badgeLabel: "কম্বো অফার",
    summary: "ছোটটির জন্য ২০১, বড়টির জন্য ২০২ — দুটো একসাথে নিলে ৳৪০০ সেভ করুন।",
    description: [
      "বাথরুম ও বারান্দা — দুই জায়গাতেই আলাদা সাইজের হ্যাঙ্গার দরকার হয়। এই কম্বোতে সেই দুটোই একসাথে পাচ্ছেন সাশ্রয়ী দামে।",
      "কম্বোর দাম ৳৬,৫০০+ অর্ডার হওয়ায় সারাদেশে ডেলিভারি চার্জ একদম ফ্রি।",
    ],
    highlights: [
      "SKB ২০১ (৬ ক্লিপ) × ১ পিস",
      "SKB ২০২ (১০ ক্লিপ) × ১ পিস",
      "আলাদা কিনলে খরচ ৳৭,০০০, কম্বোতে ৳৬,৬০০",
      "৳৬,৫০০+ অর্ডার হওয়ায় সারাদেশে ডেলিভারি চার্জ ফ্রি",
      "একসাথে ১৬টি ক্লিপের ক্ষমতা",
    ],
    specs: [
      { label: "কম্বোতে যা থাকছে", value: "২০১ × ১টি, ২০২ × ১টি" },
      { label: "মোট ক্লিপ", value: "১৬টি" },
      { label: "সেভিং", value: "৳৪০০ + ফ্রি ডেলিভারি" },
      { label: "ডেলিভারি", value: "সারাদেশে ফ্রি" },
    ],
    images: [
      { src: "/products/combo-pack.jpg", alt: "SKB হ্যাঙ্গার কম্বো সেট — ২০১ ও ২০২ একসাথে" },
      { src: "/products/skb-201.jpg", alt: "SKB হ্যাঙ্গার ২০১" },
      { src: "/products/skb-202.jpg", alt: "SKB হ্যাঙ্গার ২০২" },
    ],
    rating: 4.9,
    reviewsCount: 31,
    reviews: [
      {
        name: "জসিম উদ্দিন",
        location: "যশোর",
        rating: 5,
        date: "২৫ আগস্ট ২০২৬",
        text: "দুটো একসাথে নেওয়ায় দামও কমেছে, ডেলিভারিও ফ্রি পেয়েছি। সবার জন্য কম্বো নেওয়ার পরামর্শ দেব।",
      },
    ],
    stock: 15,
    clipCount: 16,
    widthCm: 60,
    createdAt: "2026-08-20",
    isCombo: true,
    tags: ["combo", "value", "new"],
  },
  {
    id: "p-combo-home",
    slug: "skb-combo-full-home",
    name: "ফুল হোম সেট: ২০১ ×২ + ২০৪ ×১",
    model: "কম্বো ২",
    brand: "SKB",
    price: 11000,
    oldPrice: 11500,
    unitLabel: "৩ পিস • সেভিং ৳৫০০",
    badgeLabel: "ফ্যামিলি প্যাক",
    summary: "পুরো বাড়ির কাপড়, চাদর আর ছাদের জন্য — ৩টি হ্যাঙ্গারের সম্পূর্ণ সেট।",
    description: [
      "একটি সেটেই ছোট, মাঝারি ও বড় সাইজের হ্যাঙ্গার — ভাড়া বাসা থেকে শুরু করে তলার বাড়ি পর্যন্ত সব জায়গায় কাজে লাগবে।",
      "বড় অর্ডার হওয়ায় ঢাকার ভিতরে ও বাইরে — দুই জায়গাতেই ডেলিভারি চার্জ ফ্রি।",
    ],
    highlights: [
      "SKB ২০১ (৬ ক্লিপ) × ২ পিস",
      "SKB ২০৪ (১৪ ক্লিপ) × ১ পিস",
      "মোট ২৬টি ক্লিপের শুকানোর ক্ষমতা",
      "৳৬,৫০০+ অর্ডার হওয়ায় সারাদেশে ডেলিভারি চার্জ ফ্রি",
      "উপহার বা ভাড়া বাসার সেটআপের জন্য আদর্শ",
    ],
    specs: [
      { label: "কম্বোতে যা থাকছে", value: "২০১ × ২টি, ২০৪ × ১টি" },
      { label: "মোট ক্লিপ", value: "২৬টি" },
      { label: "সেভিং", value: "৳৫০০ + ফ্রি ডেলিভারি" },
      { label: "ডেলিভারি", value: "সারাদেশে ফ্রি" },
    ],
    images: [
      { src: "/products/combo-pack.jpg", alt: "SKB ফুল হোম সেট — তিনটি স্টেইনলেস স্টিল হ্যাঙ্গার" },
      { src: "/products/skb-204.jpg", alt: "SKB হ্যাঙ্গার ২০৪" },
      { src: "/products/skb-201.jpg", alt: "SKB হ্যাঙ্গার ২০১" },
    ],
    rating: 5,
    reviewsCount: 12,
    reviews: [
      {
        name: "মিজানুর রহমান",
        location: "রাজশাহী",
        rating: 5,
        date: "৩ সেপ্টেম্বর ২০২৬",
        text: "নতুন বাসায় উঠে পুরো সেটটা নিয়েছি। খুচরা দামের চেয়ে সস্তা পড়েছে, ডেলিভারিও ফ্রি।",
      },
    ],
    stock: 8,
    clipCount: 26,
    widthCm: 75,
    createdAt: "2026-09-01",
    isCombo: true,
    tags: ["combo", "value", "new"],
  },
];

/* ── হেল্পার ফাংশন ─────────────────────────────────────────── */

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getBestsellers(limit = 3): Product[] {
  return products.filter((p) => p.tags.includes("bestseller")).slice(0, limit);
}

export function getNewArrivals(limit = 4): Product[] {
  return [...products]
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
    .slice(0, limit);
}

export function getCombos(): Product[] {
  return products.filter((p) => p.isCombo);
}

export function getRelated(slug: string, limit = 3): Product[] {
  const current = getProduct(slug);
  if (!current) return products.slice(0, limit);
  const rest = products
    .filter((p) => p.slug !== slug)
    .sort((a, b) => {
      const score = (p: Product) =>
        p.tags.filter((t) => current.tags.includes(t)).length * 10 +
        (p.isCombo === current.isCombo ? 1 : 0);
      return score(b) - score(a);
    });
  return rest.slice(0, limit);
}

export type SortKey = "featured" | "price-asc" | "price-desc" | "discount" | "rating";

export const sortOptions: { value: SortKey; label: string }[] = [
  { value: "featured", label: "ফিচার্ড" },
  { value: "price-asc", label: "দাম: কম → বেশি" },
  { value: "price-desc", label: "দাম: বেশি → কম" },
  { value: "discount", label: "সর্বোচ্চ ছাড়" },
  { value: "rating", label: "সেরা রেটিং" },
];

export type FilterKey = "all" | "single" | "combo" | "in-stock";

export const filterOptions: { value: FilterKey; label: string; icon: string }[] = [
  { value: "all", label: "সব পণ্য", icon: "🧺" },
  { value: "single", label: "একক হ্যাঙ্গার", icon: "" },
  { value: "combo", label: "কম্বো অফার", icon: "🎁" },
  { value: "in-stock", label: "স্টকে আছে", icon: "✅" },
];

export function filterAndSort(opts: {
  query?: string;
  filter?: FilterKey;
  sort?: SortKey;
}): Product[] {
  const { query = "", filter = "all", sort = "featured" } = opts;
  const q = query.trim().toLowerCase();

  let list = products.filter((p) => {
    if (filter === "single" && p.isCombo) return false;
    if (filter === "combo" && !p.isCombo) return false;
    if (filter === "in-stock" && p.stock <= 0) return false;
    if (!q) return true;
    const haystack = [p.name, p.summary, p.model, p.brand, ...p.tags, ...p.highlights]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });

  const discountOf = (p: Product) =>
    p.oldPrice ? (p.oldPrice - p.price) / p.oldPrice : 0;

  list = [...list];
  switch (sort) {
    case "price-asc":
      list.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      list.sort((a, b) => b.price - a.price);
      break;
    case "discount":
      list.sort((a, b) => discountOf(b) - discountOf(a));
      break;
    case "rating":
      list.sort((a, b) => b.rating - a.rating || b.reviewsCount - a.reviewsCount);
      break;
    default:
      list.sort(
        (a, b) =>
          Number(b.tags.includes("bestseller")) - Number(a.tags.includes("bestseller")) ||
          b.reviewsCount - a.reviewsCount,
      );
  }
  return list;
}

/** হোম পেজের 'ক্যাটাগরি' স্ট্রিপ */
export const categoryTiles = [
  { icon: "🧺", label: "ছোট সাইজ", note: "৬ ক্লিপ • ৪৫ সেমি", href: "/products?filter=all&q=২০১" },
  { icon: "👕", label: "ফ্যামিলি সাইজ", note: "১০ ক্লিপ • ৬০ সেমি", href: "/products?filter=all&q=২০২" },
  { icon: "🛏️", label: "হেভি ডিউটি", note: "১৪ ক্লিপ • ৭৫ সেমি", href: "/products?filter=all&q=২০৪" },
  { icon: "🎁", label: "কম্বো অফার", note: "সেভিং + ফ্রি ডেলিভারি", href: "/products?filter=combo" },
] as const;
