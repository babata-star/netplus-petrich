import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/news?locale=bg — списък публични новини.
 * Ползва се от публичните страници; fallback към статични данни ако базата е празна.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale") === "en" ? "en" : "bg";
  const limit = Math.min(Number(searchParams.get("limit")) || 10, 50);

  const news = await prisma.news.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take: limit,
  });

  // Мапинг към публичен формат (двуезичен)
  const items = news.map((n) => ({
    slug: n.slug,
    category: n.category,
    title: locale === "en" ? n.titleEn || n.titleBg : n.titleBg,
    excerpt: locale === "en" ? n.excerptEn || n.excerptBg : n.excerptBg,
    content: locale === "en" ? n.contentEn || n.contentBg : n.contentBg,
    date: n.createdAt,
  }));

  return NextResponse.json(items);
}
