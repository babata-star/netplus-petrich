"use client";

import { useRef, type MouseEvent } from "react";

/**
 * Проследява позицията на мишката върху елемент и я записва
 * в CSS променливи --mx/--my (в %) за spotlight border ефект.
 */
export function useSpotlight<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  const onMouseMove = (e: MouseEvent<T>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return { ref, onMouseMove };
}
