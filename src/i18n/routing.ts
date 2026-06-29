import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // Локали: български (по подразбиране) и английски
  locales: ["bg", "en"],
  defaultLocale: "bg",
  // Не показвай defaultLocale в URL (по-чисти URL-и: / вместо /bg)
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
