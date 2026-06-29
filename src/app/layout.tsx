import type { ReactNode } from "react";

/**
 * Корен (root) layout — pass-through.
 * Тъй като използваме i18n routing през [locale], <html> тагът се рендерира
 * в app/[locale]/layout.tsx, за да може lang атрибутът да следва активния локал.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
