import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { ButtonLink } from "@/components/ui/Button";
import { CheckIcon } from "@/components/icons/Icons";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "PricingPage" });
  return { title: t("title"), description: t("subtitle") };
}

// Заместващи данни (според бележката в плана)
const INTERNET_PLANS = [
  { speed: "100/100", price: "10", popular: false },
  { speed: "300/300", price: "15", popular: true },
  { speed: "500/500", price: "18", popular: false },
  { speed: "1000/1000", price: "20", popular: false },
];

const TV_PLANS = [
  { name: { bg: "GDN Базов", en: "GDN Basic" }, price: "6" },
  { name: { bg: "GDN Пълен", en: "GDN Full" }, price: "9" },
];

const COMBOS = [
  {
    name: { bg: "Интернет + ТВ", en: "Internet + TV" },
    price: "18",
    save: "2",
    includes: { bg: "300/300 Mbps + GDN Базов", en: "300/300 Mbps + GDN Basic" },
  },
  {
    name: { bg: "Премиум Комбо", en: "Premium Combo" },
    price: "25",
    save: "4",
    includes: {
      bg: "1000/1000 Mbps + GDN Пълен + UNITV",
      en: "1000/1000 Mbps + GDN Full + UNITV",
    },
  },
];

export default async function PricingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("PricingPage");
  const tm = await getTranslations("Misc");
  const lang = locale === "en" ? "en" : "bg";

  return (
    <>
      <PageHero
        title={t("title")}
        subtitle={t("subtitle")}
        breadcrumbs={[{ label: t("title") }]}
      />

      {/* Оптичен интернет */}
      <Section tone="white">
        <h2 className="text-2xl font-extrabold text-ink-900 sm:text-3xl">
          {t("internetTitle")}
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {INTERNET_PLANS.map((p) => (
            <div
              key={p.speed}
              className={`relative flex flex-col rounded-3xl border bg-white p-6 transition-all ${
                p.popular
                  ? "border-brand-500 shadow-glow"
                  : "border-ink-100 hover:border-brand-200"
              }`}
            >
              {p.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-500 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-white">
                  {t("popular")}
                </span>
              )}
              <div className="text-center">
                <div className="text-2xl font-extrabold text-brand-600">
                  {p.speed}
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-ink-400">
                  {tm("speed")}
                </div>
              </div>
              <div className="mt-5 flex items-baseline justify-center gap-1">
                <span className="text-3xl font-extrabold text-ink-900">
                  {p.price}
                </span>
                <span className="text-sm font-semibold text-ink-500">
                  {tm("currency")} {tm("perMonth")}
                </span>
              </div>
              <ButtonLink
                href="/request"
                variant={p.popular ? "primary" : "outline"}
                size="sm"
                className="mt-5 w-full"
              >
                {t("choose")}
              </ButtonLink>
            </div>
          ))}
        </div>
      </Section>

      {/* Телевизия + Комбо */}
      <Section tone="muted">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* ТВ */}
          <div>
            <h2 className="text-2xl font-extrabold text-ink-900 sm:text-3xl">
              {t("tvTitle")}
            </h2>
            <div className="mt-6 space-y-4">
              {TV_PLANS.map((plan) => (
                <div
                  key={plan.name[lang]}
                  className="flex items-center justify-between rounded-2xl border border-ink-100 bg-white p-5"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                      <CheckIcon className="h-3.5 w-3.5" />
                    </span>
                    <span className="font-semibold text-ink-900">
                      {plan.name[lang]}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-extrabold text-ink-900">
                      {plan.price}
                    </span>
                    <span className="text-sm text-ink-500">
                      {" "}
                      {tm("currency")}
                      {tm("perMonth")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Комбо */}
          <div>
            <h2 className="text-2xl font-extrabold text-ink-900 sm:text-3xl">
              {t("comboTitle")}
            </h2>
            <div className="mt-6 space-y-4">
              {COMBOS.map((c) => (
                <div
                  key={c.name[lang]}
                  className="relative overflow-hidden rounded-2xl border border-brand-200 bg-gradient-to-br from-white to-brand-50 p-5"
                >
                  <span className="absolute right-4 top-4 rounded-full bg-accent-500 px-2.5 py-1 text-[0.65rem] font-bold text-white">
                    -{c.save} {tm("currency")}
                  </span>
                  <h3 className="font-bold text-ink-900">{c.name[lang]}</h3>
                  <p className="mt-1 text-sm text-ink-500">
                    {c.includes[lang]}
                  </p>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-2xl font-extrabold text-ink-900">
                      {c.price}
                    </span>
                    <span className="text-sm text-ink-500">
                      {tm("currency")}
                      {tm("perMonth")}
                    </span>
                  </div>
                  <ButtonLink
                    href="/request"
                    variant="primary"
                    size="sm"
                    className="mt-4"
                  >
                    {t("choose")}
                  </ButtonLink>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Бележка */}
        <p className="mt-10 rounded-2xl bg-ink-100/60 p-4 text-center text-xs text-ink-500">
          ℹ️ {t("note")} {t("activationNote")}
        </p>
      </Section>
    </>
  );
}
