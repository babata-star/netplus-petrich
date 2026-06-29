import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

/** PUT /api/admin/feedback/[id] — одобри/отхвърли отзив (само админ). */
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
  const { approved } = body;

  const updated = await prisma.feedback.update({
    where: { id },
    data: { approved: Boolean(approved) },
  });
  return NextResponse.json(updated);
}

/** DELETE — изтрий отзив. */
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
  await prisma.feedback.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
