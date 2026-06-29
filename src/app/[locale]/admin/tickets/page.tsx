import { setRequestLocale } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { TicketIcon, ArrowRightIcon } from "@/components/icons/Icons";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<string, string> = {
  OPEN: "bg-red-50 text-red-700",
  WAITING: "bg-accent-50 text-accent-700",
  ANSWERED: "bg-blue-50 text-blue-700",
  RESOLVED: "bg-green-50 text-green-700",
  CLOSED: "bg-ink-100 text-ink-600",
};
const STATUS_LABELS: Record<string, string> = {
  OPEN: "Отворен",
  WAITING: "В чакане",
  ANSWERED: "Отговорен",
  RESOLVED: "Решен",
  CLOSED: "Затворен",
};
const PRIORITY_STYLES: Record<string, string> = {
  LOW: "text-ink-400",
  MEDIUM: "text-blue-600",
  HIGH: "text-accent-600",
  URGENT: "text-red-600",
};

export default async function AdminTicketsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tickets = await prisma.supportTicket.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { name: true, email: true } },
      _count: { select: { messages: true } },
    },
  });

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-ink-900">Сигнали</h1>
      <p className="mt-1 text-sm text-ink-500">
        Всички клиентски сигнали — {tickets.length} общо.
      </p>

      <div className="mt-6 space-y-3">
        {tickets.map((t) => (
          <Link
            key={t.id}
            href={`/admin/tickets/${t.id}`}
            className="group flex items-center justify-between rounded-2xl border border-ink-100 bg-white p-5 transition-all hover:border-brand-200 hover:shadow-soft"
          >
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <TicketIcon className="h-5 w-5" />
              </span>
              <div>
                <div className="font-semibold text-ink-900 group-hover:text-brand-700">
                  {t.subject}
                </div>
                <div className="mt-0.5 text-xs text-ink-500">
                  {t.user?.name} · {t.category} ·{" "}
                  <span className={cn("font-semibold", PRIORITY_STYLES[t.priority])}>
                    {t.priority}
                  </span>{" "}
                  приоритет · {new Date(t.createdAt).toLocaleDateString("bg-BG")}
                  {t._count.messages > 0 && (
                    <> · {t._count.messages} съобщения</>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={cn("rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-wider", STATUS_STYLES[t.status])}>
                {STATUS_LABELS[t.status]}
              </span>
              <ArrowRightIcon className="h-4 w-4 text-ink-300 transition-colors group-hover:text-brand-600" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
