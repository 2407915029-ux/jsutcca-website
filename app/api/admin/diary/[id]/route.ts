import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { diarySchema } from "@/lib/validators";

export const dynamic = "force-dynamic";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  await requireAdmin();
  const body = await request.json().catch(() => null);
  const parsed = diarySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: parsed.error.errors[0]?.message || "日记信息不正确" }, { status: 400 });
  }
  try {
    const post = await prisma.diaryPost.update({
      where: { id: params.id },
      data: {
        ...parsed.data,
        coverImage: parsed.data.coverImage || null,
        videoUrl: parsed.data.videoUrl || null,
        images: parsed.data.images.filter(Boolean)
      }
    });
    return NextResponse.json(post);
  } catch {
    return NextResponse.json({ message: "活动日记不存在" }, { status: 404 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await requireAdmin();
  try {
    await prisma.diaryPost.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ message: "活动日记不存在" }, { status: 404 });
  }
}
