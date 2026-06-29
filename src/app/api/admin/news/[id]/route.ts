import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

/** PUT /api/admin/news/[id] — редактирай новина. */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  const role = (session?.user as { role?: string })?.role;
  if (role !== "ADMIN") {
    return NextResponse.json({ error: "Забранено" }, { status: 403 });
  }
  const { id } = await params;
  const body = await request.json();
  const updated = await prisma.news.update({ where: { id }, data: body });
  return NextResponse.json(updated);
}

/** DELETE — изтрий новина. */
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  const role = (session?.user as { role?: string })?.role;
  if (role !== "ADMIN") {
    return NextResponse.json({ error: "Забранено" }, { status: 403 });
  }
  const { id } = await params;
  await prisma.news.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
