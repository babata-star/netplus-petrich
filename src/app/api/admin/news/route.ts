import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { z } from "zod";

const newsSchema = z.object({
  slug: z.string().min(3),
  category: z.string().min(2).default("Новина"),
  titleBg: z.string().min(3),
  titleEn: z.string().optional(),
  excerptBg: z.string().min(5),
  excerptEn: z.string().optional(),
  contentBg: z.string().min(10),
  contentEn: z.string().optional(),
  published: z.boolean().default(true),
});

/** POST /api/admin/news — създай новина (само админ). */
export async function POST(request: NextRequest) {
  const session = await auth();
  const role = (session?.user as { role?: string })?.role;
  if (role !== "ADMIN") {
    return NextResponse.json({ error: "Забранено" }, { status: 403 });
  }

  const body = await request.json();
  const parsed = newsSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Невалидни данни", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  try {
    const news = await prisma.news.create({ data: parsed.data });
    return NextResponse.json(news, { status: 201 });
  } catch (e) {
    // Дублиращ slug
    return NextResponse.json(
      { error: "Този URL (slug) вече съществува" },
      { status: 409 }
    );
  }
}

/** GET — всички новини (включително непубликувани). */
export async function GET() {
  const session = await auth();
  const role = (session?.user as { role?: string })?.role;
  if (role !== "ADMIN") {
    return NextResponse.json({ error: "Забранено" }, { status: 403 });
  }
  const news = await prisma.news.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(news);
}
