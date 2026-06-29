import { setRequestLocale } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { AdminTicketChat } from "@/components/admin/AdminTicketChat";
import { AdminTicketStatusControl } from "@/components/admin/AdminTicketStatusControl";

export default async function AdminTicketDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const ticket = await prisma.supportTicket.findUnique({
    where: { id },
    include: {
      user: { select: { name: true, email: true, phone: true, address: true } },
      messages: { orderBy: { createdAt: "asc" } },
    },
  });

  if (!ticket) notFound();

  return (
    <div>
      <Link
        href="/admin/tickets"
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-ink-900"
      >
        ← Всички сигнали
      </Link>

      <div className="mb-6 rounded-2xl border border-ink-100 bg-white p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-extrabold text-ink-900">
              {ticket.subject}
            </h1>
            <div className="mt-2 grid gap-1 text-xs text-ink-500 sm:grid-cols-2">
              <span>Клиент: <strong className="text-ink-700">{ticket.user?.name}</strong></span>
              <span>Имейл: <strong className="text-ink-700">{ticket.user?.email}</strong></span>
              <span>Телефон: <strong className="text-ink-700">{ticket.user?.phone || "—"}</strong></span>
              <span>Категория: <strong className="text-ink-700">{ticket.category}</strong></span>
            </div>
          </div>
          <AdminTicketStatusControl id={ticket.id} initialStatus={ticket.status} initialPriority={ticket.priority} />
        </div>
        <div className="mt-4 rounded-xl bg-ink-50 p-4 text-sm text-ink-700">
          {ticket.description}
        </div>
      </div>

      <AdminTicketChat ticketId={ticket.id} initialMessages={ticket.messages} />
    </div>
  );
}
