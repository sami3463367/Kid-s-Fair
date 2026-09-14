/**
 * tools/bn-digits.mjs — স্ট্রিং লিটারেলের ভেতরের সব ইংরেজি সংখ্যা কে বাংলায় বদলে দেয়।
 * ("4-5 সদস্য" → "৪-৫ সদস্য")। কোডের সংখ্যা (rating: 5) অক্ষুণ্ন থাকে,
 * আর ${...} এর ভেতরের কোডও বদলায় না (সেখানে লিখিত বাংলা সংখ্যা থাকলে তা থাকে)।
 *
 * ব্যবহার: node tools/bn-digits.mjs lib/content.ts
 */
import { readFileSync, writeFileSync } from "node:fs";

const BN = Array.from({ length: 10 }, (_x, i) => String.fromCodePoint(0x9e6 + i));

const files = process.argv.slice(2);
if (files.length === 0) {
  console.error("ফাইল পাথ দিন — node tools/bn-digits.mjs lib/content.ts");
  process.exit(1);
}

for (const file of files) {
  const src = readFileSync(file, "utf8");
  let out = "";
  let changes = 0;

  let inString = null; // '"', "'" বা "`"
  let braceStack = []; // টেমপ্লেট ${} এর গভীরতা
  let prev = "";

  for (let i = 0; i < src.length; i += 1) {
    const ch = src[i];
    const next = src[i + 1];

    if (!inString) {
      // কমেন্ট উপেক্ষা (লাইন ধরে এগিয়ে যান)
      if (ch === "/" && next === "/") {
        const end = src.indexOf("\n", i);
        const stop = end === -1 ? src.length : end;
        out += src.slice(i, stop);
        i = stop - 1;
        prev = "\n";
        continue;
      }
      if (ch === "/" && next === "*") {
        const end = src.indexOf("*/", i + 2);
        const stop = end === -1 ? src.length : end + 2;
        out += src.slice(i, stop);
        i = stop - 1;
        prev = " ";
        continue;
      }
      if (ch === '"' || ch === "'" || ch === "`") {
        inString = ch;
        out += ch;
        prev = ch;
        continue;
      }
      out += ch;
      prev = ch;
      continue;
    }

    // স্ট্রিং-এর ভেতরে
    if (prev === "\\") {
      out += ch;
      prev = ch;
      continue;
    }
    if (inString === "`" && ch === "$" && next === "{") {
      braceStack.push("tpl");
      out += "${";
      i += 1;
      prev = "{";
      continue;
    }
    if (inString === "`" && braceStack.length > 0) {
      // ${} এর ভেতরের কোড — শুধু বন্ধ হওয়া পর্যন্ত কপি
      if (ch === "{") braceStack.push("{");
      if (ch === "}") {
        braceStack.pop();
        out += ch;
        prev = ch;
        continue;
      }
      // ভেতরের স্ট্রিং হ্যান্ডেল করা জরুরি নয় — কপি করি, কিন্তু কোট দেখলে সাবধানে থাকি
      if (ch === '"' || ch === "'" || ch === "`") {
        // ভেতরের লিটারেল শেষ হওয়া পর্যন্ত কপি
        const q = ch;
        let j = i + 1;
        let inner = q;
        while (j < src.length) {
          const c = src[j];
          inner += c;
          j += 1;
          if (c === q && inner[inner.length - 2] !== "\\") break;
        }
        out += inner;
        i = j - 1;
        prev = q;
        continue;
      }
      out += ch;
      prev = ch;
      continue;
    }
    if (ch === inString) {
      inString = null;
      out += ch;
      prev = ch;
      continue;
    }
    if (/[0-9]/.test(ch)) {
      out += BN[Number(ch)];
      changes += 1;
      prev = ch;
      continue;
    }
    out += ch;
    prev = ch;
  }

  writeFileSync(file, out);
  console.log(`${file}: ${changes} টি অঙ্ক বদলেছে`);
}
