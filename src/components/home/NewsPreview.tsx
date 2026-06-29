import Link from "next/link";
import { useTranslations } from "next-intl";
import { Section, SectionHeading } from "@/components/Section";
import { Reveal } from "@/components/ui/Reveal";
import type { NewsItem } from "@/lib/news";
import { ArrowRightIcon } from "@/components/icons/Icons";
import { ButtonLink } from "@/components/ui/Button";

export function NewsPreview({
  locale,
  items,
}: {
  locale: string;
  items: NewsItem[];
}) {
  const t = useTranslations("NewsPreview");
  const lang = locale === "en" ? "en" : "bg";
  const list = items.slice(0, 3);

  return (
    <Section tone="white">
      <SectionHeading
        eyebrow={t("subtitle")}
        title={t("title")}
        align="center"
      />

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {list.map((n, i) => {
          const d = new Date(n.date);
          const dateStr = d.toLocaleDateString(
            lang === "en" ? "en-GB" : "bg-BG",
            { day: "numeric", month: "long", year: "numeric" }
          );
          return (
            <Reveal key={n.slug} delay={i * 120} className="h-full">
              <Link
                href={`/news/${n.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-ink-100 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft"
              >
                {/* Thumbnail */}
                <div className="relative h-40 overflow-hidden bg-brand-gradient">
                  <div className="absolute inset-0 bg-grid-dark opacity-40" />
                  <span className="absolute left-4 top-4 glass rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                    {n.category[lang]}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <time className="text-xs font-medium text-ink-400">
                    {dateStr}
                  </time>
                  <h3 className="mt-2 text-base font-bold leading-snug text-ink-900 transition-colors group-hover:text-brand-700">
                    {n.title[lang]}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">
                    {n.excerpt[lang]}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 transition-all group-hover:gap-2.5">
                    {t("readMore")}
                    <ArrowRightIcon className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>

      <div className="mt-10 text-center">
        <ButtonLink href="/news" variant="ghost" size="md">
          {t("allNews")}
          <ArrowRightIcon className="h-4 w-4" />
        </ButtonLink>
      </div>
    </Section>
  );
}

export default NewsPreview;
