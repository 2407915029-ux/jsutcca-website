import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { commentSchema } from "@/lib/validators";

export const dynamic = "force-dynamic";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const comments = await prisma.comment.findMany({
    where: { diaryPostId: params.id },
    orderBy: { createdAt: "desc" }
  });
  return NextResponse.json(comments);
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json().catch(() => null);
  const parsed = commentSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: parsed.error.errors[0]?.message || "评论格式不正确" }, { status: 400 });
  }
  const post = await prisma.diaryPost.findUnique({ where: { id: params.id }, select: { id: true } });
  if (!post) return NextResponse.json({ message: "活动日记不存在" }, { status: 404 });
  const comment = await prisma.comment.create({
    data: {
      diaryPostId: params.id,
      nickname: parsed.data.nickname || "匿名用户",
      content: parsed.data.content
    }
  });
  return NextResponse.json(comment, { status: 201 });
}
