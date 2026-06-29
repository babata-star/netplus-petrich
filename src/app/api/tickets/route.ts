import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ticketSchema } from "@/lib/validations";
import { notifyClientTicket } from "@/lib/email";
import { auth } from "@/auth";

/** GET /api/tickets — сигналите на текущия клиент (или всички за админ). */
export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Неоторизиран" }, { status: 401 });
  }
  const role = (session.user as { role?: string }).role;
  const where = role === "ADMIN" ? {} : { userId: session.user.id };

  const tickets = await prisma.supportTicket.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { messages: true } } },
  });
  return NextResponse.json(tickets);
}

/** POST /api/tickets — нов сигнал (само влезли клиенти). */
export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Влезте в профила си" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = ticketSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Невалидни данни", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const d = parsed.data;
    const ticket = await prisma.supportTicket.create({
      data: {
        userId: session.user.id,
        category: d.category,
        priority: d.priority,
        subject: d.subject,
        description: d.description,
      },
    });

    // Имейл потвърждение към клиента
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { email: true },
    });
    if (user?.email) {
      notifyClientTicket({
        email: user.email,
        subject: d.subject,
        ticketId: ticket.id,
      });
    }

    return NextResponse.json({ ok: true, id: ticket.id }, { status: 201 });
  } catch (e) {
    console.error("POST /api/tickets error:", e);
    return NextResponse.json({ error: "Грешка при създаване" }, { status: 500 });
  }
}
