import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ticketMessageSchema } from "@/lib/validations";
import { auth } from "@/auth";

/** GET /api/tickets/[id]/messages — всички съобщения по сигнал. */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Неоторизиран" }, { status: 401 });
  }
  const { id } = await params;

  const ticket = await prisma.supportTicket.findUnique({ where: { id } });
  if (!ticket) {
    return NextResponse.json({ error: "Не е намерен" }, { status: 404 });
  }
  // Клиентът вижда само своите сигнали
  const role = (session.user as { role?: string }).role;
  if (role !== "ADMIN" && ticket.userId !== session.user.id) {
    return NextResponse.json({ error: "Забранено" }, { status: 403 });
  }

  const messages = await prisma.ticketMessage.findMany({
    where: { ticketId: id },
    orderBy: { createdAt: "asc" },
  });
  return NextResponse.json(messages);
}

/** POST — добавя съобщение по сигнал. */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Неоторизиран" }, { status: 401 });
  }
  const { id } = await params;

  const ticket = await prisma.supportTicket.findUnique({ where: { id } });
  if (!ticket) {
    return NextResponse.json({ error: "Не е намерен" }, { status: 404 });
  }
  const role = (session.user as { role?: string }).role;
  if (role !== "ADMIN" && ticket.userId !== session.user.id) {
    return NextResponse.json({ error: "Забранено" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const parsed = ticketMessageSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Невалидно съобщение" }, { status: 400 });
    }

    const message = await prisma.ticketMessage.create({
      data: {
        ticketId: id,
        authorId: session.user.id,
        authorRole: role === "ADMIN" ? "staff" : "client",
        body: parsed.data.body,
      },
    });

    // Обнови статуса на сигнала
    await prisma.supportTicket.update({
      where: { id },
      data: {
        status: role === "ADMIN" ? "ANSWERED" : "WAITING",
      },
    });

    return NextResponse.json({ ok: true, id: message.id }, { status: 201 });
  } catch (e) {
    console.error("POST message error:", e);
    return NextResponse.json({ error: "Грешка" }, { status: 500 });
  }
}
