import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";
import { sendMail } from "@/lib/email";
import { rateLimit, LIMITS } from "@/lib/rateLimit";

const TEAM_EMAIL = process.env.SMTP_FROM || "netplus.petrich@gmail.com";

/**
 * POST /api/contact — форма за общ контакт.
 * Изпраща имейл към екипа. Не се пази в база (за целта има заявки/сигнали).
 */
export async function POST(request: NextRequest) {
  // Spam защита
  const limited = rateLimit(request, { ...LIMITS.FORM, keyPrefix: "contact" });
  if (limited) return limited;

  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Невалидни данни", details: parsed.error.flatten() },
        { status: 400 }
      );
    }
    const d = parsed.data;

    await sendMail({
      to: TEAM_EMAIL,
      subject: `Контакт: ${d.subject}`,
      text: `От: ${d.name}\nТелефон: ${d.phone}\nИмейл: ${d.email}\n\n${d.message}`,
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (e) {
    console.error("POST contact error:", e);
    return NextResponse.json({ error: "Грешка при изпращане" }, { status: 500 });
  }
}
