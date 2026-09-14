/**
 * ছোট হেল্পার স্ক্রিপ্ট — লোগো থেকে favicon / PWA আইকন বানায় এবং সব ছোটো করে কম্প্রেস করে।
 * চালানোর নিয়ম:  node tools/make-icons.mjs
 * (সাধারণ ডেপ্লয়মেন্টের জন্য এটি চালানো বাধ্যতামূলক নয় — রেপোতে তৈরি আইকনগুলো আগে থেকেই আছে।)
 */
import sharp from "sharp";
import { readdirSync } from "node:fs";

const LOGO = "public/brand/logo-icon.png";

async function icons() {
  await sharp(LOGO).resize(512, 512, { fit: "cover" }).png({ quality: 90 }).toFile("public/brand/logo.png");
  await sharp(LOGO).resize(128, 128, { fit: "cover" }).png().toFile("public/brand/logo-mark.png");
  await sharp(LOGO).resize(192, 192, { fit: "cover" }).flatten({ background: "#04614f" }).png().toFile("public/icons/icon-192.png");
  await sharp(LOGO).resize(512, 512, { fit: "cover" }).flatten({ background: "#04614f" }).png().toFile("public/icons/icon-512.png");
  await sharp(LOGO).resize(180, 180, { fit: "cover" }).flatten({ background: "#04614f" }).png().toFile("app/apple-icon.png");
  await sharp(LOGO).resize(64, 64, { fit: "cover" }).png().toFile("app/icon.png");
}

async function compressJpgs() {
  const dirs = ["public/hero", "public/products"];
  for (const dir of dirs) {
    for (const f of readdirSync(dir).filter((n) => n.endsWith(".jpg"))) {
      const path = `${dir}/${f}`;
      await sharp(path)
        .resize({ width: 1200, withoutEnlargement: true })
        .jpeg({ quality: 78, mozjpeg: true, progressive: true })
        .toFile(`${path}.tmp.jpg`);
      const { renameSync, statSync } = await import("node:fs");
      renameSync(`${path}.tmp.jpg`, path);
      console.log(`${path} -> ${Math.round(statSync(path).size / 1024)} KB`);
    }
  }
}

await icons();
await compressJpgs();
console.log("done");
