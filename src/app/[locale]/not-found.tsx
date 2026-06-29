import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/Button";

export default function LocaleNotFound() {
  const t = useTranslations("NotFound");

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-5 py-20 text-center">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">
        404
      </p>
      <h1 className="mt-3 text-3xl font-extrabold text-ink-900 sm:text-4xl">
        {t("title")}
      </h1>
      <p className="mt-3 max-w-md text-ink-500">{t("desc")}</p>
      <ButtonLink href="/" variant="primary" size="md" className="mt-6">
        {t("home")}
      </ButtonLink>
    </div>
  );
}
