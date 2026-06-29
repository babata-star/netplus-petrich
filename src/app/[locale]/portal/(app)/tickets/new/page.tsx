import { setRequestLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import { NewTicketForm } from "@/components/portal/NewTicketForm";

export default async function NewTicketPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Portal");

  return (
    <div>
      <Link
        href="/portal/tickets"
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-ink-900"
      >
        ← {t("tickets")}
      </Link>
      <h1 className="text-2xl font-extrabold text-ink-900">{t("newTicket")}</h1>
      <p className="mt-1 text-sm text-ink-500">
        Опишете проблема си и нашият екип ще се свърже с вас.
      </p>

      <div className="mt-6 rounded-2xl border border-ink-100 bg-white p-6 sm:p-8">
        <NewTicketForm />
      </div>
    </div>
  );
}
