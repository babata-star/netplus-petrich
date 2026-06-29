import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  TicketIcon,
  BellIcon,
  StarIcon,
  PortalIcon,
} from "@/components/icons/Icons";
import { ButtonLink } from "@/components/ui/Button";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const session = await auth();
  const t = await getTranslations("Portal");

  // Двойна защита (layout-ът също проверява)
  if (!session?.user?.id) redirect("/portal/login");

  // Статистики за текущия потребител
  const [tickets, requests] = await Promise.all([
    prisma.supportTicket.findMany({
      where: { userId: session!.user!.id },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    prisma.serviceRequest.findMany({
      where: { userId: session!.user!.id },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  const openTickets = tickets.filter(
    (x) => x.status === "OPEN" || x.status === "WAITING"
  ).length;

  const stats = [
    {
      label: t("tickets"),
      value: tickets.length,
      sub: `${openTickets} отворени`,
      Icon: TicketIcon,
      color: "text-brand-600 bg-brand-50",
    },
    {
      label: t("requests"),
      value: requests.length,
      sub: `${requests.filter((r) => r.status === "NEW").length} нови`,
      Icon: BellIcon,
      color: "text-accent-600 bg-accent-50",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-ink-900">
          {t("dashboard")}
        </h1>
        <p className="mt-1 text-sm text-ink-500">
          Здравейте, {session?.user?.name}! Ето преглед на вашите услуги.
        </p>
      </div>

      {/* Статистики */}
      <div className="grid gap-4 sm:grid-cols-2">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-ink-100 bg-white p-5"
          >
            <div className="flex items-center justify-between">
              <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${s.color}`}>
                <s.Icon className="h-6 w-6" />
              </span>
              <span className="text-3xl font-extrabold text-ink-900">
                {s.value}
              </span>
            </div>
            <div className="mt-3 text-sm font-semibold text-ink-700">
              {s.label}
            </div>
            <div className="text-xs text-ink-400">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Бързи действия */}
      <div className="mt-6 flex flex-wrap gap-3">
        <ButtonLink href="/portal/tickets/new" variant="primary" size="md">
          <TicketIcon className="h-4 w-4" />
          {t("newTicket")}
        </ButtonLink>
        <ButtonLink href="/portal/feedback" variant="outline" size="md">
          <StarIcon className="h-4 w-4" />
          {t("feedback")}
        </ButtonLink>
      </div>

      {/* Последни сигнали */}
      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-ink-900">{t("tickets")}</h2>
          {tickets.length > 0 && (
            <Link
              href="/portal/tickets"
              className="text-sm font-semibold text-brand-700 hover:text-brand-600"
            >
              Всички →
            </Link>
          )}
        </div>
        {tickets.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-ink-200 bg-ink-50/50 p-8 text-center text-sm text-ink-500">
            Нямате подадени сигнали.
            <Link href="/portal/tickets/new" className="mt-2 block font-semibold text-brand-700">
              Подайте първия си сигнал →
            </Link>
          </div>
        ) : (
          <div className="space-y-2">
            {tickets.map((ticket) => (
              <Link
                key={ticket.id}
                href={`/portal/tickets/${ticket.id}`}
                className="flex items-center justify-between rounded-xl border border-ink-100 bg-white p-4 transition-colors hover:border-brand-200"
              >
                <div className="flex items-center gap-3">
                  <TicketIcon className="h-5 w-5 text-brand-600" />
                  <div>
                    <div className="text-sm font-semibold text-ink-900">
                      {ticket.subject}
                    </div>
                    <div className="text-xs text-ink-400">
                      {ticket.category} · {ticket.priority}
                    </div>
                  </div>
                </div>
                <StatusBadge status={ticket.status} />
              </Link>
            ))}
          </div>
        )}
      </div>
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
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-wider ${styles[status] || styles.CLOSED}`}
    >
      {status}
    </span>
  );
}
