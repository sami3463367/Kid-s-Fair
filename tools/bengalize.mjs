/**
 * হেল্পার: কোডে লেখা "§৩,৫০০§" এর মতো মার্কারকে বাংলা সংখ্যায় বদলায়।
 * (কমায় হাজার দেখানোর জন্য সংখ্যাটি যেভাবে লিখেছেন সেভাবেই বাংলা হয়।)
 * ব্যবহার: node tools/bengalize.mjs <file...>
 */
import { readFileSync, writeFileSync } from "node:fs";

const BN = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
const toBn = (s) => s.replace(/[0-9]/g, (d) => BN[+d]);

const files = process.argv.slice(2);
if (files.length === 0) {
  console.error("ফাইল পাথ দিন: node tools/bengalize.mjs lib/site.ts");
  process.exit(1);
}

for (const file of files) {
  const src = readFileSync(file, "utf8");
  const out = src.replace(/§([0-9,]+)§/g, (_m, digits) => toBn(digits));
  const count = (src.match(/§[0-9,]+§/g) || []).length;
  writeFileSync(file, out);
  console.log(`${file}: ${count} টি সংখ্যা বদলেছে`);
}
