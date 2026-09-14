import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
  "aria-hidden": true,
};

export function WhatsappIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.86 9.86 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm0 18.02h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.11.82.83-3.03-.2-.31a8.16 8.16 0 0 1-1.26-4.37c0-4.54 3.7-8.23 8.24-8.23a8.23 8.23 0 0 1 0 16.45Zm4.52-6.15c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.44.13-.16.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.16 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.16 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29Z" />
    </svg>
  );
}

export function CartIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <path d="M3 4h2l1.6 10.2a2 2 0 0 0 2 1.8h7.3a2 2 0 0 0 2-1.6L21 8H6.2" />
      <circle cx="10" cy="20" r="1.4" />
      <circle cx="17" cy="20" r="1.4" />
    </svg>
  );
}

export function UserIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <circle cx="12" cy="8.5" r="3.6" />
      <path d="M4.8 20a7.4 7.4 0 0 1 14.4 0" />
    </svg>
  );
}

export function HomeIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <path d="M4 10.5 12 4l8 6.5" />
      <path d="M6 9.8V20h12V9.8" />
      <path d="M10 20v-5h4v5" />
    </svg>
  );
}

export function GridIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <rect x="3.5" y="3.5" width="7" height="7" rx="2" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="2" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="2" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="2" />
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </svg>
  );
}

export function StarIcon({ half = false, ...props }: IconProps & { half?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      {half && (
        <defs>
          <linearGradient id="half-star">
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="transparent" />
          </linearGradient>
        </defs>
      )}
      <path
        d="m12 3.6 2.5 5.1 5.6.8-4 4 .9 5.6-5-2.7-5 2.7.9-5.6-4-4 5.6-.8z"
        fill={half ? "url(#half-star)" : "currentColor"}
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function MinusIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <path d="M5 12h14" />
    </svg>
  );
}

export function TrashIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <path d="M4.5 7h15M9 7V5.2A1.2 1.2 0 0 1 10.2 4h3.6A1.2 1.2 0 0 1 15 5.2V7" />
      <path d="M6.5 7l.8 11.1A2 2 0 0 0 9.3 20h5.4a2 2 0 0 0 2-1.9L17.5 7" />
      <path d="M10.5 11v5M13.5 11v5" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <path d="m6 9.5 6 6 6-6" />
    </svg>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <path d="m9.5 6 6 6-6 6" />
    </svg>
  );
}

export function ChevronLeftIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <path d="m14.5 6-6 6 6 6" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowUpIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <path d="M12 20V4M6 10l6-6 6 6" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <path d="M4 7h16M4 12h16M4 17h10" />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <path d="M6.5 3.5h2.2l1.3 3.2-1.7 1.4a10.6 10.6 0 0 0 5.3 5.3l1.4-1.7 3.2 1.3v2.2a2.5 2.5 0 0 1-2.7 2.5C10.4 18.7 5.3 13.6 4 7.2a2.5 2.5 0 0 1 2.5-3.7Z" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
      <path d="m4.5 8 7.5 4.6L19.5 8" />
    </svg>
  );
}

export function PinIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <path d="M12 21s6.5-6.1 6.5-11a6.5 6.5 0 1 0-13 0C5.5 14.9 12 21 12 21Z" />
      <circle cx="12" cy="10" r="2.4" />
    </svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <path d="M12 3.2l7 2.6v5.4c0 4.4-2.9 7.6-7 9.6-4.1-2-7-5.2-7-9.6V5.8z" />
      <path d="m9 12 2.2 2.2L15.4 10" />
    </svg>
  );
}

export function TruckIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <path d="M3 6.5h9.5v9H3zM12.5 9.5h4l3 3v3h-7z" />
      <circle cx="6.5" cy="18" r="1.6" />
      <circle cx="16.5" cy="18" r="1.6" />
    </svg>
  );
}

export function ReturnIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <path d="M4 9h10.5A5.5 5.5 0 0 1 20 14.5v0A5.5 5.5 0 0 1 14.5 20H8" />
      <path d="m7.5 5.5-3.5 3.5 3.5 3.5" />
    </svg>
  );
}

export function CashIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <rect x="3" y="6.5" width="18" height="11" rx="2.2" />
      <circle cx="12" cy="12" r="2.6" />
      <path d="M6.5 12h.01M17.5 12h.01" />
    </svg>
  );
}

export function CopyIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <rect x="9" y="9" width="11" height="11" rx="2.2" />
      <path d="M15.5 6.2A2.2 2.2 0 0 0 13.3 4H6.2A2.2 2.2 0 0 0 4 6.2v7.1A2.2 2.2 0 0 0 6.2 15.5" />
    </svg>
  );
}

export function BoltIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M13.2 2 4.8 13.4h5.1L9.4 22l8.6-11.9h-5.4z" />
    </svg>
  );
}

export function SparkleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 2.5l1.9 5.1 5.1 1.9-5.1 1.9L12 16.5l-1.9-5.1L5 9.5l5.1-1.9zM18.5 15l.9 2.4 2.4.9-2.4.9-.9 2.4-.9-2.4-2.4-.9 2.4-.9z" />
    </svg>
  );
}

export function TagIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <path d="M12.6 3.5H20v7.4l-8.6 8.6a1.8 1.8 0 0 1-2.6 0l-5.3-5.3a1.8 1.8 0 0 1 0-2.6z" />
      <circle cx="16.4" cy="7.2" r="1.4" />
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M13.5 21v-7.4h2.5l.4-2.9h-2.9V8.9c0-.8.2-1.4 1.4-1.4h1.6V4.9c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2v2.1H7.5v2.9H10V21z" />
    </svg>
  );
}

export function HangerIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <path d="M12 8.2a2.1 2.1 0 1 1 2.1-2.1" />
      <path d="M12 8.2v1.6L3.6 16a1.6 1.6 0 0 0 .9 2.9h15a1.6 1.6 0 0 0 .9-2.9L12 9.8" />
    </svg>
  );
}

export function LockIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <rect x="5" y="10.5" width="14" height="9.5" rx="2.2" />
      <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" />
    </svg>
  );
}

export function ChatIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <path d="M20 12.5A6.5 6.5 0 0 1 13.5 19H8l-4 2.5.9-3.3A6.5 6.5 0 0 1 6.5 8.5 6.5 6.5 0 0 1 13.5 15" />
      <path d="M20 8.5A6.5 6.5 0 0 0 6.6 5.6" />
    </svg>
  );
}

export function RefreshIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <path d="M20 12a8 8 0 1 1-2.6-5.9" />
      <path d="M20 4.2V9h-4.8" />
    </svg>
  );
}
