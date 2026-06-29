import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { feedbackSchema } from "@/lib/validations";
import { rateLimit, LIMITS } from "@/lib/rateLimit";
import { auth } from "@/auth";

/**
 * GET /api/feedback — одобрените публични отзиви.
 */
export async function GET() {
  const feedbacks = await prisma.feedback.findMany({
    where: { approved: true },
    orderBy: { createdAt: "desc" },
    take: 20,
    select: { name: true, rating: true, comment: true, createdAt: true },
  });
  return NextResponse.json(feedbacks);
}

/**
 * POST /api/feedback — изпращане на нов отзив.
 * Достъпен за всички (влезли и невлезли).
 */
export async function POST(request: NextRequest) {
  // Spam защита
  const limited = rateLimit(request, { ...LIMITS.FORM, keyPrefix: "feedback" });
  if (limited) return limited;

  try {
    const body = await request.json();
    const parsed = feedbackSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Невалидни данни", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const session = await auth();
    const d = parsed.data;

    await prisma.feedback.create({
      data: {
        userId: session?.user?.id ?? null,
        name: d.name,
        rating: d.rating,
        comment: d.comment || null,
        approved: false, // модерация от админ
      },
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (e) {
    console.error("POST feedback error:", e);
    return NextResponse.json({ error: "Грешка" }, { status: 500 });
  }
}
