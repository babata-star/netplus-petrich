import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requestSchema, SERVICE_TO_TYPE } from "@/lib/validations";
import { notifyTeamNewRequest } from "@/lib/email";
import { rateLimit, LIMITS } from "@/lib/rateLimit";
import { auth } from "@/auth";

/**
 * POST /api/requests — подава нова заявка за услуга.
 * Публична (нерегистрираните потребители също могат).
 */
export async function POST(request: NextRequest) {
  // Spam защита
  const limited = rateLimit(request, { ...LIMITS.FORM, keyPrefix: "request" });
  if (limited) return limited;

  try {
    const body = await request.json();
    const parsed = requestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Невалидни данни", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const d = parsed.data;
    const session = await auth();
    const userId = session?.user?.id ?? null;

    const record = await prisma.serviceRequest.create({
      data: {
        userId,
        name: d.fullName,
        phone: d.phone,
        email: d.email || null,
        address: d.address,
        type: SERVICE_TO_TYPE[d.service],
        notes: d.notes || null,
      },
    });

    // Имейл към екипа (асинхронно, не блокира отговора)
    notifyTeamNewRequest({
      name: d.fullName,
      phone: d.phone,
      service: d.service,
      address: d.address,
    });

    return NextResponse.json(
      { ok: true, id: record.id },
      { status: 201 }
    );
  } catch (e) {
    console.error("POST /api/requests error:", e);
    return NextResponse.json(
      { error: "Възникна грешка. Опитайте отново." },
      { status: 500 }
    );
  }
}

/** GET /api/requests — само за админ (списък заявки). */
export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Неоторизиран" }, { status: 401 });
  }

  // Клиентите виждат само своите; админът — всички
  const role = (session.user as { role?: string }).role;
  const where = role === "ADMIN" ? {} : { userId: session.user.id };

  const requests = await prisma.serviceRequest.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: 100,
  });
  return NextResponse.json(requests);
}
