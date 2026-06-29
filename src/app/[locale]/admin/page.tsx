import { setRequestLocale } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  TicketIcon,
  BellIcon,
  StarIcon,
  GlobeIcon,
  ArrowRightIcon,
} from "@/components/icons/Icons";

export default async function AdminDashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Статистики
  const [
    newRequests,
    openTickets,
    totalNews,
    pendingFeedback,
    recentRequests,
    recentTickets,
  ] = await Promise.all([
    prisma.serviceRequest.count({ where: { status: "NEW" } }),
    prisma.supportTicket.count({
      where: { status: { in: ["OPEN", "WAITING"] } },
    }),
    prisma.news.count(),
    prisma.feedback.count({ where: { approved: false } }),
    prisma.serviceRequest.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    prisma.supportTicket.findMany({
      where: { status: { in: ["OPEN", "WAITING"] } },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  const stats = [
    {
      label: "Нови заявки",
      value: newRequests,
      Icon: BellIcon,
      color: "text-accent-600 bg-accent-50",
      href: "/admin/requests",
    },
    {
      label: "Отворени сигнали",
      value: openTickets,
      Icon: TicketIcon,
      color: "text-red-600 bg-red-50",
      href: "/admin/tickets",
    },
    {
      label: "Новини",
      value: totalNews,
      Icon: GlobeIcon,
      color: "text-brand-600 bg-brand-50",
      href: "/admin/news",
    },
    {
      label: "Чакащи отзиви",
      value: pendingFeedback,
      Icon: StarIcon,
      color: "text-ink-600 bg-ink-100",
      href: "/admin/feedback",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-ink-900">Табло</h1>
      <p className="mt-1 text-sm text-ink-500">
        Преглед на активността и задачите.
      </p>

      {/* Статистики */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="rounded-2xl border border-ink-100 bg-white p-5 transition-all hover:border-brand-200 hover:shadow-soft"
          >
            <div className="flex items-center justify-between">
              <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${s.color}`}>
                <s.Icon className="h-6 w-6" />
              </span>
              <span className="text-3xl font-extrabold text-ink-900">
                {s.value}
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm font-semibold text-ink-700">
                {s.label}
              </span>
              <ArrowRightIcon className="h-4 w-4 text-ink-300" />
            </div>
          </Link>
        ))}
      </div>

      {/* Скорошни заявки + сигнали */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Заявки */}
        <div>
          <h2 className="mb-3 text-lg font-bold text-ink-900">
            Скорошни заявки
          </h2>
          {recentRequests.length === 0 ? (
            <p className="rounded-xl border border-dashed border-ink-200 bg-white p-6 text-center text-sm text-ink-400">
              Няма нови заявки.
            </p>
          ) : (
            <div className="space-y-2">
              {recentRequests.map((r) => (
                <Link
                  key={r.id}
                  href="/admin/requests"
                  className="flex items-center justify-between rounded-xl border border-ink-100 bg-white p-4 hover:border-brand-200"
                >
                  <div>
                    <div className="text-sm font-semibold text-ink-900">
                      {r.name}
                    </div>
                    <div className="text-xs text-ink-400">
                      {r.type} · {r.phone}
                    </div>
                  </div>
                  <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-bold text-red-700">
                    {r.status}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Сигнали */}
        <div>
          <h2 className="mb-3 text-lg font-bold text-ink-900">
            Активни сигнали
          </h2>
          {recentTickets.length === 0 ? (
            <p className="rounded-xl border border-dashed border-ink-200 bg-white p-6 text-center text-sm text-ink-400">
              Няма отворени сигнали.
            </p>
          ) : (
            <div className="space-y-2">
              {recentTickets.map((t) => (
                <Link
                  key={t.id}
                  href={`/admin/tickets/${t.id}`}
                  className="flex items-center justify-between rounded-xl border border-ink-100 bg-white p-4 hover:border-brand-200"
                >
                  <div className="flex items-center gap-3">
                    <TicketIcon className="h-5 w-5 text-brand-600" />
                    <div>
                      <div className="text-sm font-semibold text-ink-900">
                        {t.subject}
                      </div>
                      <div className="text-xs text-ink-400">
                        {t.category} · {t.priority}
                      </div>
                    </div>
                  </div>
                  <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-bold text-red-700">
                    {t.status}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
