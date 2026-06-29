import { setRequestLocale, getTranslations } from "next-intl/server";
import { FeedbackForm } from "@/components/portal/FeedbackForm";
import { StarIcon } from "@/components/icons/Icons";

export default async function FeedbackPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Portal");

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-ink-900">
          {t("feedback")}
        </h1>
        <p className="mt-1 text-sm text-ink-500">
          Оценете обслужването ни и ни помогнете да станем по-добри.
        </p>
      </div>

      <div className="rounded-2xl border border-ink-100 bg-white p-6 sm:p-8">
        <FeedbackForm />
      </div>

      {/* Декоративен акцент */}
      <div className="mt-6 flex items-center gap-2 rounded-xl bg-accent-50 p-4 text-sm text-accent-800">
        <StarIcon className="h-5 w-5 flex-none text-accent-500" />
        Вашето мнение е важно за нас. Одобрените отзиви се показват на
        началната страница.
      </div>
    </div>
  );
}
