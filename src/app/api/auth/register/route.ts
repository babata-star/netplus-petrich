import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validations";
import { rateLimit, LIMITS } from "@/lib/rateLimit";
import bcrypt from "bcryptjs";

/**
 * POST /api/auth/register — регистрация на нов клиентски акаунт.
 */
export async function POST(request: NextRequest) {
  // Защита от brute-force / mass registration
  const limited = rateLimit(request, { ...LIMITS.AUTH, keyPrefix: "register" });
  if (limited) return limited;

  try {
    const body = await request.json();
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Невалидни данни", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const d = parsed.data;
    const email = d.email.toLowerCase();

    // Проверка за съществуващ потребител
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "Вече съществува профил с този имейл" },
        { status: 409 }
      );
    }

    const hashed = await bcrypt.hash(d.password, 12);
    await prisma.user.create({
      data: {
        name: d.name,
        email,
        phone: d.phone,
        address: d.address,
        password: hashed,
        role: "CLIENT",
      },
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (e) {
    console.error("Register error:", e);
    return NextResponse.json({ error: "Грешка при регистрация" }, { status: 500 });
  }
}
