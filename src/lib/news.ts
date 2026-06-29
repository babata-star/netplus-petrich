import { prisma } from "@/lib/prisma";

/**
 * Статични новини (fallback).
 * Използват се само ако базата е недостъпна или празна.
 */
export type NewsItem = {
  slug: string;
  date: string;
  category: { bg: string; en: string };
  excerpt: { bg: string; en: string };
  title: { bg: string; en: string };
};

export const NEWS: NewsItem[] = [
  {
    slug: "upgrede-mrezhata-2026",
    date: "2026-06-20",
    category: { bg: "Мрежа", en: "Network" },
    title: {
      bg: "Обновихме ядрото на мрежата — още по-бързо рутиране",
      en: "We upgraded our network core — even faster routing",
    },
    excerpt: {
      bg: "Инвестирахме в нови маршрутизатори в централния възел, което намалява латентността и повишава стабилността за всички клиенти.",
      en: "We invested in new routers in our central node, reducing latency and improving stability for all customers.",
    },
  },
  {
    slug: "promo-leto-2026",
    date: "2026-06-10",
    category: { bg: "Промоция", en: "Promotion" },
    title: {
      bg: "Лятна промоция: първи месец безплатно за нови клиенти",
      en: "Summer promo: first month free for new customers",
    },
    excerpt: {
      bg: "До края на юли всички нови абонати за оптичен интернет получават първия месец безплатно и без такса активация.",
      en: "Until the end of July, all new fiber internet subscribers get the first month free with no activation fee.",
    },
  },
  {
    slug: "planned-maintenance-july",
    date: "2026-06-05",
    category: { bg: "Поддръжка", en: "Maintenance" },
    title: {
      bg: "Планова поддръжка на 5 юли (02:00–04:00 ч.)",
      en: "Planned maintenance on July 5 (02:00–04:00)",
    },
    excerpt: {
      bg: "Ще проведем кратка плановата поддръжка на инфраструктурата. Възможни са кратки прекъсвания в посочения прозорец.",
      en: "We'll conduct brief planned infrastructure maintenance. Brief interruptions are possible in the stated window.",
    },
  },
];

/**
 * Вземи новини от базата (с fallback към статичните).
 */
export async function getNews(locale: string): Promise<NewsItem[]> {
  try {
    const lang = locale === "en" ? "en" : "bg";
    const dbNews = await prisma.news.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });
    if (dbNews.length === 0) return NEWS;

    return dbNews.map((n) => ({
      slug: n.slug,
      date: n.createdAt.toISOString(),
      category: { bg: n.category, en: n.category },
      excerpt: {
        bg: n.excerptBg,
        en: n.excerptEn || n.excerptBg,
      },
      title: {
        bg: n.titleBg,
        en: n.titleEn || n.titleBg,
      },
    }));
  } catch {
    return NEWS;
  }
}

/** Вземи конкретна новина по slug (с fallback). */
export async function getNewsBySlug(
  slug: string,
  locale: string
): Promise<{
  title: { bg: string; en: string };
  excerpt: { bg: string; en: string };
  content: { bg: string; en: string };
  category: { bg: string; en: string };
  date: string;
} | null> {
  try {
    const n = await prisma.news.findUnique({ where: { slug } });
    if (!n) {
      const fallback = NEWS.find((x) => x.slug === slug);
      return fallback
        ? {
            title: fallback.title,
            excerpt: fallback.excerpt,
            content: {
              bg: fallback.excerpt.bg,
              en: fallback.excerpt.en,
            },
            category: fallback.category,
            date: fallback.date,
          }
        : null;
    }
    return {
      title: { bg: n.titleBg, en: n.titleEn || n.titleBg },
      excerpt: { bg: n.excerptBg, en: n.excerptEn || n.excerptBg },
      content: { bg: n.contentBg, en: n.contentEn || n.contentBg },
      category: { bg: n.category, en: n.category },
      date: n.createdAt.toISOString(),
    };
  } catch {
    return null;
  }
}
