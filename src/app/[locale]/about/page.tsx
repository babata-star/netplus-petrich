import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/Section";
import { CtaSection } from "@/components/home/CtaSection";
import {
  GlobeIcon,
  ShieldIcon,
  GaugeIcon,
} from "@/components/icons/Icons";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AboutPage" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("AboutPage");

  const values = [
    {
      Icon: GlobeIcon,
      title: t("v1Title"),
      desc: t("v1Desc"),
      color: "text-brand-600 bg-brand-50",
    },
    {
      Icon: ShieldIcon,
      title: t("v2Title"),
      desc: t("v2Desc"),
      color: "text-accent-600 bg-accent-50",
    },
    {
      Icon: GaugeIcon,
      title: t("v3Title"),
      desc: t("v3Desc"),
      color: "text-ink-600 bg-ink-100",
    },
  ];

  const stats = [
    { value: "10+", label: t("stat1") },
    { value: "1000+", label: t("stat2") },
    { value: "100%", label: t("stat3") },
    { value: "24/7", label: t("stat4") },
  ];

  return (
    <>
      <PageHero
        title={t("title")}
        subtitle={t("subtitle")}
        breadcrumbs={[{ label: t("title") }]}
      />

      {/* История + Мисия */}
      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.18em] text-brand-600">
              {t("storyTitle")}
            </span>
            <h2 className="text-2xl font-extrabold text-ink-900 sm:text-3xl">
              {t("storyTitle")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-600">
              {t("story")}
            </p>
          </div>
          <div className="relative">
            <div className="sticky top-24 overflow-hidden rounded-3xl bg-brand-gradient p-8 text-white shadow-soft">
              <div className="absolute inset-0 bg-grid-dark opacity-40" />
              <div className="relative">
                <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.18em] text-brand-200">
                  {t("missionTitle")}
                </span>
                <p className="text-xl font-medium leading-relaxed">
                  &ldquo;{t("mission")}&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Статистики */}
      <Section tone="ink">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-4xl font-extrabold text-brand-300 sm:text-5xl">
                {s.value}
              </div>
              <div className="mt-2 text-sm font-medium uppercase tracking-wider text-ink-200">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Ценности */}
      <Section tone="muted">
        <SectionHeading title={t("valuesTitle")} align="center" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {values.map((v) => (
            <div
              key={v.title}
              className="rounded-3xl border border-ink-100 bg-white p-7"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${v.color}`}
              >
                <v.Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-ink-900">
                {v.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <CtaSection />
    </>
  );
}
