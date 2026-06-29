import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

/** PUT /api/admin/tickets/[id] — обнови статус/приоритет на сигнал (само админ). */
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
  const { status, priority } = body;

  const updated = await prisma.supportTicket.update({
    where: { id },
    data: {
      ...(status && { status }),
      ...(priority && { priority }),
    },
  });
  return NextResponse.json(updated);
}
