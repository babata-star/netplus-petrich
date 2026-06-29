import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

/** PUT /api/admin/requests/[id] — обнови статус/бележки на заявка (само админ). */
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
  const { status, adminNotes } = body;

  const updated = await prisma.serviceRequest.update({
    where: { id },
    data: {
      ...(status && { status }),
      ...(adminNotes !== undefined && { adminNotes }),
    },
  });
  return NextResponse.json(updated);
}
