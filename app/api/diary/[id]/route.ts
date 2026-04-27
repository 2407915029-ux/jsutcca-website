import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const post = await prisma.diaryPost.findUnique({
    where: { id: params.id },
    include: { comments: { orderBy: { createdAt: "desc" } } }
  });
  if (!post) return NextResponse.json({ message: "活动日记不存在" }, { status: 404 });
  return NextResponse.json(post);
}
