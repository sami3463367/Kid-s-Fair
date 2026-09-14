import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eefbf6",
          100: "#d4f5e8",
          200: "#aae9d4",
          300: "#72d7b9",
          400: "#3cbf98",
          500: "#16a17c",
          600: "#068366",
          700: "#046653",
          800: "#075143",
          900: "#084337",
          950: "#01261f",
        },
        deal: {
          light: "#fff6e5",
          DEFAULT: "#f59e0b",
          dark: "#b45309",
        },
        wa: {
          DEFAULT: "#25d366",
          dark: "#0f9d4e",
          tint: "#e8f9ef",
        },
        line: "#e2eae7",
        canvas: "#f3f7f5",
        muted: "#5f6f6a",
        ink: "#0a211b",
        danger: "#e11d48",
      },
      fontFamily: {
        sans: [
          "Hind Siliguri",
          "Noto Sans Bengali",
          "Anek Bangla",
          "SolaimanLipi",
          "Vrinda",
          "Nirmala UI",
          "Bangla MN",
          "Kohinoor Bangla",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
        display: [
          "Anek Bangla",
          "Hind Siliguri",
          "Noto Sans Bengali",
          "system-ui",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 1px 2px rgba(6,40,34,0.05), 0 14px 30px -22px rgba(6,40,34,0.28)",
        lift: "0 10px 20px -10px rgba(6,40,34,0.18), 0 30px 60px -30px rgba(6,40,34,0.35)",
        bar: "0 -6px 24px -18px rgba(6,40,34,0.55)",
        fab: "0 10px 24px -8px rgba(15,157,78,0.55)",
      },
      borderRadius: {
        "4xl": "1.75rem",
        "5xl": "2.25rem",
      },
      maxWidth: {
        shell: "78rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "sheet-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-left": {
          "0%": { opacity: "0", transform: "translateX(28px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.85)", opacity: "0.7" },
          "70%": { transform: "scale(1.6)", opacity: "0" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        pop: {
          "0%": { transform: "scale(0.8)" },
          "60%": { transform: "scale(1.12)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        "fade-up": "fade-up .5s cubic-bezier(.22,.61,.36,1) both",
        "sheet-up": "sheet-up .32s cubic-bezier(.22,.61,.36,1) both",
        "slide-left": "slide-left .3s cubic-bezier(.22,.61,.36,1) both",
        marquee: "marquee 26s linear infinite",
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(.4,0,.6,1) infinite",
        shimmer: "shimmer 1.6s infinite",
        pop: "pop .32s ease-out",
      },
      backgroundSize: {
        grid: "28px 28px",
      },
    },
  },
  plugins: [],
};

export default config;
