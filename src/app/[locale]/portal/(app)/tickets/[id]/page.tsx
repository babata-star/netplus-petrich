import { setRequestLocale } from "next-intl/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { TicketChat } from "@/components/portal/TicketChat";

export default async function TicketDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const session = await auth();

  const ticket = await prisma.supportTicket.findUnique({
    where: { id },
    include: {
      messages: { orderBy: { createdAt: "asc" } },
    },
  });

  if (!ticket || ticket.userId !== session!.user!.id) {
    notFound();
  }

  return (
    <div>
      <Link
        href="/portal/tickets"
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-ink-900"
      >
        ← Всички сигнали
      </Link>

      {/* Заглавка */}
      <div className="mb-6 rounded-2xl border border-ink-100 bg-white p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-extrabold text-ink-900">
              {ticket.subject}
            </h1>
            <div className="mt-1 text-xs text-ink-400">
              {ticket.category} · {ticket.priority} приоритет ·{" "}
              {new Date(ticket.createdAt).toLocaleDateString("bg-BG")}
            </div>
          </div>
          <StatusBadge status={ticket.status} />
        </div>
        {/* Първоначално описание */}
        <div className="mt-4 rounded-xl bg-ink-50 p-4 text-sm text-ink-700">
          {ticket.description}
        </div>
      </div>

      {/* Чат */}
      <TicketChat ticketId={ticket.id} initialMessages={ticket.messages} />
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
      className={`flex-none rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${styles[status] || styles.CLOSED}`}
    >
      {labels[status] || status}
    </span>
  );
}
