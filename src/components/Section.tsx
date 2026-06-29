import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Props = {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: "white" | "muted" | "ink" | "brand" | "ash";
  containerClassName?: string;
};

const tones = {
  white: "bg-white",
  muted: "bg-ink-50/60",
  ink: "bg-ink-900 text-white",
  brand: "bg-brand-gradient text-white",
  ash: "bg-ash-50",
};

/** Стандартна вертикална секция. */
export function Section({
  id,
  children,
  className,
  tone = "white",
  containerClassName,
}: Props) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-20 sm:py-24 lg:py-28",
        tones[tone],
        className
      )}
    >
      <div
        className={cn(
          "relative mx-auto w-full max-w-7xl px-5 sm:px-8",
          containerClassName
        )}
      >
        {children}
      </div>
    </section>
  );
}

/** Заглавие на секция. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  tone = "dark",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  tone?: "dark" | "light";
}) {
  const isLight = tone === "light";
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left"
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em]",
            isLight ? "text-brand-300" : "text-brand-600"
          )}
        >
          <span
            className={cn(
              "h-px w-6",
              isLight ? "bg-brand-300/50" : "bg-brand-500/40"
            )}
          />
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "text-3xl font-extrabold tracking-tight sm:text-4xl",
          isLight ? "text-white" : "text-ink-900"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed sm:text-lg",
            isLight ? "text-ink-100/75" : "text-ink-500"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default Section;
