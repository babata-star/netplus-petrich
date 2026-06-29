import type { SVGProps } from "react";

/** Икони (inline SVG, stroke-based, currentColor) — без външни зависимости. */

type IconProps = SVGProps<SVGSVGElement>;

const defaultProps = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function FiberIcon(props: IconProps) {
  return (
    <svg {...defaultProps} {...props}>
      {/* оптичен възел — точки свързани с линии */}
      <circle cx="5" cy="12" r="2" />
      <circle cx="19" cy="5" r="2" />
      <circle cx="19" cy="19" r="2" />
      <path d="M7 12h6a4 4 0 0 0 4-4V7" />
      <path d="M7 12h6a4 4 0 0 1 4 4v2" />
    </svg>
  );
}

export function TvIcon(props: IconProps) {
  return (
    <svg {...defaultProps} {...props}>
      <rect x="2" y="4" width="20" height="14" rx="2" />
      <path d="m7 22 5-4 5 4" />
    </svg>
  );
}

export function InteractiveTvIcon(props: IconProps) {
  return (
    <svg {...defaultProps} {...props}>
      <rect x="2" y="4" width="14" height="12" rx="2" />
      <path d="M8 20h4" />
      <circle cx="19" cy="14" r="3" />
      <path d="M19 13v2M18 14h2" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...defaultProps} {...props}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...defaultProps} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...defaultProps} {...props}>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...defaultProps} {...props}>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg {...defaultProps} {...props}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg {...defaultProps} {...props}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...defaultProps} {...props}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 6 10-6" />
    </svg>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <svg {...defaultProps} {...props}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <svg {...defaultProps} {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

export function TicketIcon(props: IconProps) {
  return (
    <svg {...defaultProps} {...props}>
      <path d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4z" />
      <path d="M13 5v14" strokeDasharray="2 2" />
    </svg>
  );
}

export function BellIcon(props: IconProps) {
  return (
    <svg {...defaultProps} {...props}>
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <svg {...defaultProps} {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function StarIcon(props: IconProps) {
  return (
    <svg {...defaultProps} fill="currentColor" stroke="none" {...props}>
      <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 18.9 5.9 21.4l1.4-6.8L2.2 9.9l6.9-.8z" />
    </svg>
  );
}

export function BoltIcon(props: IconProps) {
  return (
    <svg {...defaultProps} {...props}>
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

export function PortalIcon(props: IconProps) {
  return (
    <svg {...defaultProps} {...props}>
      <path d="M4 4h16v4H4zM4 12h10v8H4zM18 12h2v8h-2z" />
    </svg>
  );
}

export function MessageIcon(props: IconProps) {
  return (
    <svg {...defaultProps} {...props}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

export function GaugeIcon(props: IconProps) {
  return (
    <svg {...defaultProps} {...props}>
      <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
      <path d="M13.4 10.6 19 5" />
      <path d="M3.34 19a10 10 0 1 1 17.32 0" />
    </svg>
  );
}

export function GlobeIcon(props: IconProps) {
  return (
    <svg {...defaultProps} {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

export function ChatIcon(props: IconProps) {
  return (
    <svg {...defaultProps} {...props}>
      <path d="M14 9a2 2 0 0 1-2 2H6l-3 3V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2z" />
      <path d="M14 9h4a2 2 0 0 1 2 2v9l-3-3h-4a2 2 0 0 1-2-2" />
    </svg>
  );
}

export function Plus(props: IconProps) {
  return (
    <svg {...defaultProps} {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function TrashIcon(props: IconProps) {
  return (
    <svg {...defaultProps} {...props}>
      <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}
