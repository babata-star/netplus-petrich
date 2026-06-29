import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/Button";
import { COMPANY } from "@/components/layout/Footer";
import { ArrowRightIcon, PhoneIcon } from "@/components/icons/Icons";
import { telHref } from "@/lib/utils";

export function CtaSection() {
  const t = useTranslations("CtaSection");

  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      {/* Mesh градиент + noise */}
      <div className="absolute inset-0 bg-brand-gradient" />
      <div className="absolute inset-0 bg-noise" />
      <div className="absolute inset-0 bg-grid-dark opacity-30" />
      {/* Декоративни glow петна */}
      <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-brand-400/20 blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-accent-500/15 blur-3xl" />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-5 text-center text-white sm:px-8">
        <span className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-400" />
          НЕТПЮС ПЕТРИЧ
        </span>
        <h2 className="max-w-2xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
          {t("title")}
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-100/85 sm:text-lg">
          {t("subtitle")}
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink
            href="/request"
            variant="primary"
            size="lg"
            className="w-full sm:w-auto"
          >
            {t("button")}
            <ArrowRightIcon className="h-5 w-5" />
          </ButtonLink>
          <a
            href={telHref(COMPANY.phone)}
            className="glass inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-3.5 text-base font-semibold text-white transition-all hover:bg-white/15 sm:w-auto"
          >
            <PhoneIcon className="h-5 w-5" />
            {t("call")}: {COMPANY.phone}
          </a>
        </div>
      </div>
    </section>
  );
}

export default CtaSection;
