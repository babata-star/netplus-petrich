import Link from "next/link";

/**
 * Лого на НЕТПЮС.
 * Концепция: стилизирана буква "N" от три възела на оптична мрежа (GPON),
 * с вграден плюс (+) символ — "net" + "plus".
 */
export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      role="img"
      aria-label="НЕТПЮС"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="netplus-g" x1="0" y1="0" x2="48" y2="48">
          <stop offset="0%" stopColor="#0a2540" />
          <stop offset="55%" stopColor="#0a4a6b" />
          <stop offset="100%" stopColor="#00b4d8" />
        </linearGradient>
      </defs>
      {/* заоблен квадрат — фон на иконката */}
      <rect x="1" y="1" width="46" height="46" rx="13" fill="url(#netplus-g)" />
      {/* буква N, изчертана като 3 възела свързани с линии */}
      <path
        d="M14 34 V15 L34 33 V14"
        stroke="#ffffff"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.95"
      />
      {/* възли (точки) */}
      <circle cx="14" cy="34" r="3.2" fill="#67dcf4" />
      <circle cx="34" cy="14" r="3.2" fill="#ff9f0a" />
      {/* плюс (+) — "plus" */}
      <path
        d="M33 28 v7 M29.5 31.5 h7"
        stroke="#ff9f0a"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo({
  className = "",
  withText = true,
  href = "/",
}: {
  className?: string;
  withText?: boolean;
  href?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2.5 ${className}`}
      aria-label="НЕТПЮС ПЕТРИЧ — начало"
    >
      <LogoMark className="h-9 w-9 transition-transform duration-300 group-hover:scale-105" />
      {withText && (
        <span className="flex flex-col leading-none">
          <span className="text-lg font-extrabold tracking-tight text-ink-900">
            НЕТПЮС
          </span>
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-brand-600">
            Петрич
          </span>
        </span>
      )}
    </Link>
  );
}

export default Logo;
