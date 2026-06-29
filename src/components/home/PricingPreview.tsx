import { useTranslations } from "next-intl";
import { Section, SectionHeading } from "@/components/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { CheckIcon, ArrowRightIcon } from "@/components/icons/Icons";

/**
 * Пакети с заместващи цени — ще се попълнят с реалните тарифи.
 */
const PLANS = [
  {
    name: "Старт",
    nameEn: "Start",
    speed: "100",
    price: "10",
    features: {
      bg: ["100/100 Mbps", "Оптична връзка (GPON)", "Без такса активация", "Поддръжка 24/7"],
      en: ["100/100 Mbps", "Fiber (GPON)", "No activation fee", "24/7 support"],
    },
    popular: false,
  },
  {
    name: "Оптимален",
    nameEn: "Optimal",
    speed: "300",
    price: "15",
    features: {
      bg: ["300/300 Mbps", "Оптична връзка (GPON)", "Статичен IP (опц.)", "Приоритетна поддръжка"],
      en: ["300/300 Mbps", "Fiber (GPON)", "Static IP (opt.)", "Priority support"],
    },
    popular: true,
  },
  {
    name: "Премиум",
    nameEn: "Premium",
    speed: "1000",
    price: "20",
    features: {
      bg: ["1000/1000 Mbps", "Оптична връзка (GPON)", "Статичен IP", "Приоритет + мониторинг"],
      en: ["1000/1000 Mbps", "Fiber (GPON)", "Static IP", "Priority + monitoring"],
    },
    popular: false,
  },
];

export function PricingPreview({ locale }: { locale: string }) {
  const t = useTranslations("PricingPreview");
  const lang = locale === "en" ? "en" : "bg";

  return (
    <Section tone="white">
      <SectionHeading
        eyebrow={t("subtitle")}
        title={t("title")}
        align="center"
      />

      <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
        {PLANS.map((plan, i) => (
          <Reveal key={plan.name} delay={i * 120} className="h-full">
            <div
              className={`relative flex h-full flex-col rounded-3xl border p-8 transition-all duration-300 ${
                plan.popular
                  ? "border-brand-500 bg-white shadow-glow lg:-translate-y-3 lg:scale-[1.03]"
                  : "border-ink-100 bg-white hover:border-brand-200 hover:shadow-soft"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-ink-900 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-400" />
                  {t("popular")}
                </span>
              )}

              {/* Име + скорост — еднаква височина за alignment */}
              <div className="flex h-14 items-baseline justify-between">
                <h3 className="text-lg font-bold text-ink-900">
                  {lang === "en" ? plan.nameEn : plan.name}
                </h3>
                <span className="text-sm font-bold text-brand-600">
                  {plan.speed} Mbps
                </span>
              </div>

              {/* Цена — еднаква височина */}
              <div className="flex h-20 items-baseline gap-1">
                <span className="text-sm text-ink-400">{t("from")}</span>
                <span
                  className="text-5xl font-extrabold tracking-tight text-ink-900"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {plan.price}
                </span>
                <span className="text-sm font-semibold text-ink-500">
                  {t("currency")} {t("perMonth")}
                </span>
              </div>

              <div className="my-6 h-px bg-ink-100" />

              {/* Характеристики */}
              <ul className="flex-1 space-y-3">
                {plan.features[lang].map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2.5 text-sm font-medium text-ink-700"
                  >
                    <span
                      className={`flex h-5 w-5 flex-none items-center justify-center rounded-full ${
                        plan.popular
                          ? "bg-brand-500 text-white"
                          : "bg-brand-50 text-brand-600"
                      }`}
                    >
                      <CheckIcon className="h-3 w-3" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* Бутон — pinned bottom за чиста линия */}
              <ButtonLink
                href="/request"
                variant={plan.popular ? "primary" : "outline"}
                size="md"
                className="mt-7 w-full"
              >
                {t("choose")}
              </ButtonLink>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-10 text-center">
        <ButtonLink
          href="/pricing"
          variant="ghost"
          size="md"
          className="inline-flex"
        >
          {t("viewAll")}
          <ArrowRightIcon className="h-4 w-4" />
        </ButtonLink>
      </div>
    </Section>
  );
}

export default PricingPreview;
