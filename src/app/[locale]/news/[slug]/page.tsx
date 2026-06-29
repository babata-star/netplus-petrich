import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { CtaSection } from "@/components/home/CtaSection";
import { getNews, getNewsBySlug } from "@/lib/news";
import { ArrowRightIcon } from "@/components/icons/Icons";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const item = await getNewsBySlug(slug, locale);
  if (!item) return {};
  const lang = locale === "en" ? "en" : "bg";
  return {
    title: item.title[lang],
    description: item.excerpt[lang],
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("NewsPage");
  const lang = locale === "en" ? "en" : "bg";

  const item = await getNewsBySlug(slug, locale);
  if (!item) notFound();

  const d = new Date(item.date);
  const dateStr = d.toLocaleDateString(lang === "en" ? "en-GB" : "bg-BG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Свързани (другите новини)
  const all = await getNews(locale);
  const related = all.filter((n) => n.slug !== slug).slice(0, 2);

  return (
    <>
      <PageHero
        title={item.title[lang]}
        breadcrumbs={[
          { label: t("title"), href: "/news" },
          { label: item.category[lang] },
        ]}
      >
        <div className="flex items-center gap-3 text-sm text-ink-100/80">
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wider">
            {item.category[lang]}
          </span>
          <span>
            {t("published")} {dateStr}
          </span>
        </div>
      </PageHero>

      <Section tone="white">
        <article className="mx-auto max-w-3xl">
          <p className="text-lg leading-relaxed text-ink-700">
            {item.excerpt[lang]}
          </p>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-600">
            <p>{item.content[lang]}</p>
          </div>

          <Link
            href="/news"
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:gap-2.5"
          >
            ← {t("back")}
          </Link>
        </article>

        {/* Свързани */}
        {related.length > 0 && (
          <div className="mx-auto mt-16 max-w-5xl">
            <h2 className="mb-6 text-xl font-bold text-ink-900">
              {t("related")}
            </h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/news/${r.slug}`}
                  className="group flex gap-4 rounded-2xl border border-ink-100 bg-white p-5 transition-all hover:border-brand-200 hover:shadow-soft"
                >
                  <div className="flex h-16 w-16 flex-none items-center justify-center rounded-xl bg-brand-gradient">
                    <span className="text-xl font-extrabold text-white">
                      {r.category[lang].charAt(0)}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
                      {r.category[lang]}
                    </span>
                    <span className="mt-1 text-sm font-semibold leading-snug text-ink-900 group-hover:text-brand-700">
                      {r.title[lang]}
                    </span>
                  </div>
                  <ArrowRightIcon className="ml-auto h-5 w-5 flex-none self-center text-ink-300 transition-colors group-hover:text-brand-600" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </Section>

      <CtaSection />
    </>
  );
}
