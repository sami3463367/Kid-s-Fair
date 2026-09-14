import Link from "next/link";
import { site } from "@/lib/site";
import { chatMessage, waLink } from "@/lib/whatsapp";
import { HomeIcon, WhatsappIcon } from "@/components/icons";

export default function NotFound() {
  return (
    <div className="shell grid min-h-[60vh] place-items-center py-12">
      <div className="text-center">
        <p className="font-display text-[4.5rem] font-black leading-none text-brand-600/25 sm:text-[7rem]">
          ৪০৪
        </p>
        <h1 className="mt-1 text-[1.5rem] leading-tight sm:text-[1.85rem]">
          পেজটি খুঁজে পাওয়া যায়নি
        </h1>
        <p className="mx-auto mt-2.5 max-w-md text-[14px] leading-relaxed text-muted">
          লিংকটি সম্ভবত বদলে গেছে বা পণ্যটি এখন ক্যাটালগে নেই। চিন্তা করবেন না — নিচের বাটন থেকে
          পণ্য দেখে নিন, অথবা সরাসরি হোয়াটসঅ্যাপে লিখুন।
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-2.5">
          <Link href="/products" className="btn-primary btn-lg">
            সব পণ্য দেখুন
          </Link>
          <Link href="/" className="btn-outline btn-lg">
            <HomeIcon className="h-4 w-4" />
            হোম পেজ
          </Link>
          <a
            href={waLink(chatMessage())}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wa btn-lg"
          >
            <WhatsappIcon className="h-5 w-5" />
            {site.name}
          </a>
        </div>
      </div>
    </div>
  );
}
