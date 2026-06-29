"use client";

import { type ReactNode } from "react";
import { useReveal } from "@/lib/useReveal";
import { cn } from "@/lib/utils";

/**
 * Reveal — обвива съдържание и го показва с плавна анимация при скрол.
 * staggerDelay позволява каскадно навлизане.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article" | "li";
}) {
  const { ref, visible } = useReveal();
  return (
    <Tag
      ref={ref as never}
      className={cn(
        "transition-all duration-700",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        className
      )}
      style={{
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {children}
    </Tag>
  );
}
