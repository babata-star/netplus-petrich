import { setRequestLocale } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { GlobeIcon, ArrowRightIcon, Plus } from "@/components/icons/Icons";

export default async function AdminNewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const news = await prisma.news.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-ink-900">Новини</h1>
          <p className="mt-1 text-sm text-ink-500">
            Създавайте и редактирайте съобщения.
          </p>
        </div>
        <Link
          href="/admin/news/new"
          className="inline-flex items-center gap-2 rounded-full bg-accent-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-600"
        >
          <Plus className="h-4 w-4" />
          Нова новина
        </Link>
      </div>

      <div className="mt-6 space-y-3">
        {news.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-ink-200 bg-white p-12 text-center">
            <GlobeIcon className="mx-auto h-10 w-10 text-ink-300" />
            <p className="mt-3 text-sm text-ink-500">Все още няма новини.</p>
          </div>
        ) : (
          news.map((n) => (
            <div
              key={n.id}
              className="flex items-center justify-between rounded-2xl border border-ink-100 bg-white p-5"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <GlobeIcon className="h-5 w-5" />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-ink-900">
                      {n.titleBg}
                    </span>
                    {!n.published && (
                      <span className="rounded-md bg-ink-100 px-2 py-0.5 text-xs font-semibold text-ink-500">
                        Чернова
                      </span>
                    )}
                  </div>
                  <div className="mt-0.5 text-xs text-ink-400">
                    /news/{n.slug} · {n.category} ·{" "}
                    {new Date(n.createdAt).toLocaleDateString("bg-BG")}
                  </div>
                </div>
              </div>
              <Link
                href={`/admin/news/${n.id}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 px-4 py-2 text-sm font-semibold text-ink-700 hover:border-brand-300 hover:text-brand-700"
              >
                Редактирай
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
