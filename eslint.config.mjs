import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts"],
  },
  {
    rules: {
      // App Router-এ app/layout.tsx-এ <link> দিয়ে ফন্ট যুক্ত করাটাই প্রমিত
      // নিয়ম — পেজ-ভিত্তিক ফন্ট নিয়ে এই রুলটির আপত্তি এখানে প্রযোজ্য নয়।
      "@next/next/no-page-custom-font": "off",
    },
  },
];

export default eslintConfig;
