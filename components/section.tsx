import Link from "next/link";
import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  action,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  action?: ReactNode;
}) {
  return (
    <div
      className={`flex flex-col gap-3 ${
        align === "center"
          ? "items-center text-center"
          : "sm:flex-row sm:items-end sm:justify-between"
      }`}
    >
      <div className={align === "center" ? "max-w-2xl" : "max-w-2xl"}>
        {eyebrow ? (
          <span className="eyebrow mb-2.5 inline-flex">{eyebrow}</span>
        ) : null}
        <h2 className="text-[1.45rem] leading-tight sm:text-[1.75rem]">{title}</h2>
        {subtitle ? (
          <p className="mt-2 text-[15px] leading-relaxed text-muted">{subtitle}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`section scroll-mt-20 ${className}`}>
      <div className="shell">{children}</div>
    </section>
  );
}

export function ViewAllLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1 rounded-lg px-1 py-1 text-sm font-bold text-brand-700 transition hover:gap-2 hover:text-brand-800"
    >
      {children}
      <span aria-hidden>→</span>
    </Link>
  );
}
