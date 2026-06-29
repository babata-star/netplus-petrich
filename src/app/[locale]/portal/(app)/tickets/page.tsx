import { setRequestLocale, getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { TicketIcon, ArrowRightIcon } from "@/components/icons/Icons";
import { ButtonLink } from "@/components/ui/Button";

export default async function TicketsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const session = await auth();
  const t = await getTranslations("Portal");

  if (!session?.user?.id) redirect("/portal/login");

  const tickets = await prisma.supportTicket.findMany({
    where: { userId: session!.user!.id },
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { messages: true } } },
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-ink-900">{t("tickets")}</h1>
          <p className="mt-1 text-sm text-ink-500">
            Всички ваши сигнали и техният статус.
          </p>
        </div>
        <ButtonLink href="/portal/tickets/new" variant="primary" size="md">
          <TicketIcon className="h-4 w-4" />
          {t("newTicket")}
        </ButtonLink>
      </div>

      {tickets.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-ink-200 bg-ink-50/50 p-12 text-center">
          <TicketIcon className="mx-auto h-10 w-10 text-ink-300" />
          <p className="mt-3 text-sm text-ink-500">Все още нямате подадени сигнали.</p>
          <ButtonLink href="/portal/tickets/new" variant="primary" size="md" className="mt-4">
            {t("newTicket")}
          </ButtonLink>
        </div>
      ) : (
        <div className="space-y-3">
          {tickets.map((ticket) => (
            <Link
              key={ticket.id}
              href={`/portal/tickets/${ticket.id}`}
              className="group flex items-center justify-between rounded-2xl border border-ink-100 bg-white p-5 transition-all hover:border-brand-200 hover:shadow-soft"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <TicketIcon className="h-5 w-5" />
                </span>
                <div>
                  <div className="font-semibold text-ink-900 group-hover:text-brand-700">
                    {ticket.subject}
                  </div>
                  <div className="mt-0.5 text-xs text-ink-400">
                    {ticket.category} · {ticket.priority} ·{" "}
                    {new Date(ticket.createdAt).toLocaleDateString("bg-BG")}
                    {ticket._count.messages > 0 && (
                      <> · {ticket._count.messages} съобщения</>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status={ticket.status} />
                <ArrowRightIcon className="h-4 w-4 text-ink-300 transition-colors group-hover:text-brand-600" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    OPEN: "bg-red-50 text-red-700",
    WAITING: "bg-accent-50 text-accent-700",
    ANSWERED: "bg-blue-50 text-blue-700",
    RESOLVED: "bg-green-50 text-green-700",
    CLOSED: "bg-ink-100 text-ink-600",
  };
  const labels: Record<string, string> = {
    OPEN: "Отворен",
    WAITING: "В чакане",
    ANSWERED: "Отговорен",
    RESOLVED: "Решен",
    CLOSED: "Затворен",
  };
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-wider ${styles[status] || styles.CLOSED}`}
    >
      {labels[status] || status}
    </span>
  );
}
