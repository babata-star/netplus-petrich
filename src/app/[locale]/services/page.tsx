import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { CtaSection } from "@/components/home/CtaSection";
import {
  FiberIcon,
  TvIcon,
  InteractiveTvIcon,
  CheckIcon,
  ArrowRightIcon,
} from "@/components/icons/Icons";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ServicesPage" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ServicesPage");
  const ts = await getTranslations("Services");
  const tp = await getTranslations("ServicesPreview");

  const services = [
    {
      slug: "gpon",
      label: ts("gpon"),
      title: tp("gpon.title"),
      desc: tp("gpon.desc"),
      Icon: FiberIcon,
      gradient: "from-brand-500 to-brand-700",
      points: tp.raw("gpon.points") as string[],
    },
    {
      slug: "gdn",
      label: ts("gdn"),
      title: tp("gdn.title"),
      desc: tp("gdn.desc"),
      Icon: TvIcon,
      gradient: "from-ink-600 to-ink-800",
      points: tp.raw("gdn.points") as string[],
    },
    {
      slug: "unitv",
      label: ts("unitv"),
      title: tp("unitv.title"),
      desc: tp("unitv.desc"),
      Icon: InteractiveTvIcon,
      gradient: "from-accent-400 to-accent-600",
      points: tp.raw("unitv.points") as string[],
    },
  ];

  return (
    <>
      <PageHero
        title={t("title")}
        subtitle={t("subtitle")}
        breadcrumbs={[{ label: t("title") }]}
      />

      <Section tone="white">
        <div className="grid gap-8 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group flex flex-col rounded-3xl border border-ink-100 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-soft"
            >
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${s.gradient} text-white shadow-lg`}
              >
                <s.Icon className="h-8 w-8" />
              </div>
              <h2 className="mt-6 text-2xl font-bold text-ink-900">
                {s.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-500">
                {s.desc}
              </p>
              <ul className="mt-6 flex-1 space-y-2.5">
                {s.points.map((p) => (
                  <li
                    key={p}
                    className="flex items-center gap-2 text-sm text-ink-700"
                  >
                    <CheckIcon className="h-4 w-4 flex-none text-brand-600" />
                    {p}
                  </li>
                ))}
              </ul>
              <span className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 transition-all group-hover:gap-2.5">
                {t("getStarted")}
                <ArrowRightIcon className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <CtaSection />
    </>
  );
}
