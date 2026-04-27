import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { catSchema } from "@/lib/validators";

export const dynamic = "force-dynamic";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  await requireAdmin();
  const body = await request.json().catch(() => null);
  const parsed = catSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: parsed.error.errors[0]?.message || "猫咪信息不正确" }, { status: 400 });
  }
  try {
    const cat = await prisma.cat.update({
      where: { id: params.id },
      data: { ...parsed.data, images: parsed.data.images.filter(Boolean) }
    });
    return NextResponse.json(cat);
  } catch {
    return NextResponse.json({ message: "猫咪不存在" }, { status: 404 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await requireAdmin();
  try {
    await prisma.cat.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ message: "猫咪不存在" }, { status: 404 });
  }
}
