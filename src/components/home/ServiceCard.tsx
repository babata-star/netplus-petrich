"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useSpotlight } from "@/lib/useSpotlight";
import {
  FiberIcon,
  TvIcon,
  InteractiveTvIcon,
  CheckIcon,
  ArrowRightIcon,
} from "@/components/icons/Icons";
import { cn } from "@/lib/utils";

type ServiceKey = "gpon" | "gdn" | "unitv";

const META: Record<
  ServiceKey,
  {
    Icon: typeof FiberIcon;
    gradient: string;
    glow: string;
    tag: string;
  }
> = {
  gpon: {
    Icon: FiberIcon,
    gradient: "from-brand-400 to-brand-700",
    glow: "group-hover:shadow-[0_20px_60px_-15px_rgba(0,180,216,0.5)]",
    tag: "GPON",
  },
  gdn: {
    Icon: TvIcon,
    gradient: "from-ink-500 to-ink-800",
    glow: "group-hover:shadow-[0_20px_60px_-15px_rgba(20,48,77,0.5)]",
    tag: "GDN",
  },
  unitv: {
    Icon: InteractiveTvIcon,
    gradient: "from-accent-400 to-accent-600",
    glow: "group-hover:shadow-[0_20px_60px_-15px_rgba(255,159,10,0.5)]",
    tag: "UNITV",
  },
};

export function ServiceCard({ serviceKey }: { serviceKey: ServiceKey }) {
  const t = useTranslations("ServicesPreview");
  const { ref, onMouseMove } = useSpotlight<HTMLAnchorElement>();
  const meta = META[serviceKey];
  const points = t.raw(`${serviceKey}.points`) as string[];

  return (
    <Link
      ref={ref as never}
      onMouseMove={onMouseMove as never}
      href={`/services/${serviceKey}`}
      className={cn(
        "spotlight group relative flex flex-col overflow-hidden rounded-3xl border border-ink-100 bg-white p-8 transition-all duration-500 hover:-translate-y-1.5",
        meta.glow
      )}
    >
      {/* Декоративно число в горния десен ъгъл */}
      <span className="pointer-events-none absolute right-6 top-5 font-display text-6xl font-extrabold text-ink-50 transition-colors duration-500 group-hover:text-brand-50">
        0{serviceKey === "gpon" ? 1 : serviceKey === "gdn" ? 2 : 3}
      </span>

      {/* Икона */}
      <div
        className={cn(
          "relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg",
          meta.gradient
        )}
      >
        <div className="absolute inset-0 rounded-2xl bg-grid-dark opacity-30" />
        <meta.Icon className="relative h-8 w-8" />
      </div>

      <span className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-brand-600">
        {meta.tag}
      </span>
      <h3 className="mt-1.5 text-xl font-bold text-ink-900">
        {t(`${serviceKey}.title`)}
      </h3>
      <p className="mt-2.5 text-sm leading-relaxed text-ink-500">
        {t(`${serviceKey}.desc`)}
      </p>

      {/* Предимства */}
      <ul className="mt-6 flex-1 space-y-2.5">
        {points.map((p) => (
          <li
            key={p}
            className="flex items-center gap-2.5 text-sm font-medium text-ink-700"
          >
            <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-brand-50 text-brand-600">
              <CheckIcon className="h-3 w-3" />
            </span>
            {p}
          </li>
        ))}
      </ul>

      {/* Научи повече — pinned bottom */}
      <span className="mt-7 inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-brand-700 transition-all group-hover:gap-2.5">
        {t("learnMore")}
        <ArrowRightIcon className="h-4 w-4" />
      </span>
    </Link>
  );
}

export default ServiceCard;
