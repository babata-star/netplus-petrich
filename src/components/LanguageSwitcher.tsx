"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useTransition } from "react";
import { cn } from "@/lib/utils";

/**
 * Превключвател на език БГ/EN.
 * Използва next-intl хелпъри — запазва текущия path и само сменя локала.
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("LanguageSwitcher");

  const switchTo = (next: "bg" | "en") => {
    if (next === locale) return;
    startTransition(() => {
      // next-intl router.replace автоматично изгражда URL-а с правилния
      // локален префикс и запазва текущия path.
      router.replace(pathname, { locale: next });
      router.refresh();
    });
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-ink-200 bg-white p-0.5 text-xs font-semibold",
        className
      )}
      role="group"
      aria-label={t("label")}
    >
      <button
        type="button"
        onClick={() => switchTo("bg")}
        disabled={isPending}
        aria-pressed={locale === "bg"}
        className={cn(
          "rounded-full px-3 py-1 transition-colors",
          locale === "bg"
            ? "bg-ink-900 text-white"
            : "text-ink-600 hover:text-ink-900"
        )}
      >
        BG
      </button>
      <button
        type="button"
        onClick={() => switchTo("en")}
        disabled={isPending}
        aria-pressed={locale === "en"}
        className={cn(
          "rounded-full px-3 py-1 transition-colors",
          locale === "en"
            ? "bg-ink-900 text-white"
            : "text-ink-600 hover:text-ink-900"
        )}
      >
        EN
      </button>
    </div>
  );
}

export default LanguageSwitcher;
