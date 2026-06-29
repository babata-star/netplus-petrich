import { setRequestLocale } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { NewsForm } from "@/components/admin/NewsForm";

export default async function EditNewsPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const news = await prisma.news.findUnique({ where: { id } });
  if (!news) notFound();

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-ink-900">Редактиране</h1>
      <div className="mt-6 rounded-2xl border border-ink-100 bg-white p-6 sm:p-8">
        <NewsForm
          initial={{
            id: news.id,
            slug: news.slug,
            category: news.category,
            titleBg: news.titleBg,
            titleEn: news.titleEn || "",
            excerptBg: news.excerptBg,
            excerptEn: news.excerptEn || "",
            contentBg: news.contentBg,
            contentEn: news.contentEn || "",
            published: news.published,
          }}
        />
      </div>
    </div>
  );
}
