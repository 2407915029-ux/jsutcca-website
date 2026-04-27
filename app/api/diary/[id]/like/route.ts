import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(_: Request, { params }: { params: { id: string } }) {
  const cookieName = `liked_diary_${params.id.replace(/[^a-zA-Z0-9_-]/g, "")}`;
  if (cookies().get(cookieName)?.value === "1") {
    const post = await prisma.diaryPost.findUnique({ where: { id: params.id }, select: { likes: true } });
    if (!post) return NextResponse.json({ message: "活动日记不存在" }, { status: 404 });
    return NextResponse.json({ likes: post.likes, message: "这个浏览器已经点过赞啦" });
  }

  try {
    const post = await prisma.diaryPost.update({
      where: { id: params.id },
      data: { likes: { increment: 1 } },
      select: { likes: true }
    });
    const response = NextResponse.json({ likes: post.likes });
    response.cookies.set(cookieName, "1", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 365
    });
    return response;
  } catch {
    return NextResponse.json({ message: "活动日记不存在" }, { status: 404 });
  }
}
