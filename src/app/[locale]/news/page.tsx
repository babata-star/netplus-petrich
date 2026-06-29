import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { NEWS, getNews } from "@/lib/news";
import { ArrowRightIcon } from "@/components/icons/Icons";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "NewsPage" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function NewsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("NewsPage");
  const lang = locale === "en" ? "en" : "bg";

  // Вземи новини от базата (с fallback към статичните)
  const newsList = await getNews(locale);
  void NEWS; // запазваме импорта като fallback източник

  return (
    <>
      <PageHero
        title={t("title")}
        subtitle={t("subtitle")}
        breadcrumbs={[{ label: t("title") }]}
      />

      <Section tone="white">
        {newsList.length === 0 ? (
          <p className="text-center text-ink-500">{t("notFound")}</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {newsList.map((n) => {
              const d = new Date(n.date);
              const dateStr = d.toLocaleDateString(
                lang === "en" ? "en-GB" : "bg-BG",
                { day: "numeric", month: "long", year: "numeric" }
              );
              return (
                <Link
                  key={n.slug}
                  href={`/news/${n.slug}`}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-ink-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-soft"
                >
                  <div className="relative h-44 overflow-hidden bg-brand-gradient">
                    <div className="absolute inset-0 bg-grid-dark opacity-40" />
                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-ink-800">
                      {n.category[lang]}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <time className="text-xs font-medium text-ink-400">
                      {dateStr}
                    </time>
                    <h2 className="mt-2 text-base font-bold leading-snug text-ink-900 group-hover:text-brand-700">
                      {n.title[lang]}
                    </h2>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">
                      {n.excerpt[lang]}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 transition-all group-hover:gap-2.5">
                      {t("readMore")}
                      <ArrowRightIcon className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </Section>
    </>
  );
}
