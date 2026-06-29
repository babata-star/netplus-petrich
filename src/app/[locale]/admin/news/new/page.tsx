import { setRequestLocale } from "next-intl/server";
import { NewsForm } from "@/components/admin/NewsForm";

export default async function NewNewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-ink-900">Нова новина</h1>
      <div className="mt-6 rounded-2xl border border-ink-100 bg-white p-6 sm:p-8">
        <NewsForm />
      </div>
    </div>
  );
}
