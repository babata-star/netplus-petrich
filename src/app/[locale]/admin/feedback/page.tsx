import { setRequestLocale } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { FeedbackActions } from "@/components/admin/FeedbackActions";
import { StarIcon } from "@/components/icons/Icons";

export default async function AdminFeedbackPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const feedbacks = await prisma.feedback.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-ink-900">Отзиви</h1>
      <p className="mt-1 text-sm text-ink-500">
        Модерирайте клиентските отзиви. Одобрените се показват публично.
      </p>

      <div className="mt-6 space-y-3">
        {feedbacks.map((f) => (
          <div
            key={f.id}
            className="rounded-2xl border border-ink-100 bg-white p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-ink-900">{f.name}</span>
                  <span className="flex">
                    {Array.from({ length: f.rating }).map((_, i) => (
                      <StarIcon key={i} className="h-4 w-4 text-accent-500" />
                    ))}
                  </span>
                </div>
                {f.comment && (
                  <p className="mt-2 text-sm text-ink-600">{f.comment}</p>
                )}
                <div className="mt-2 text-xs text-ink-400">
                  {new Date(f.createdAt).toLocaleDateString("bg-BG")}
                </div>
              </div>
              <FeedbackActions id={f.id} approved={f.approved} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
