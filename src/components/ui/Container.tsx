import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/** Центриран контейнер с максимална ширина и responsive padding. */
export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}

export default Container;
