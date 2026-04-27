import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await requireAdmin();
  try {
    await prisma.comment.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ message: "评论不存在" }, { status: 404 });
  }
}
