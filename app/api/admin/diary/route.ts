import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { diarySchema } from "@/lib/validators";

export const dynamic = "force-dynamic";

export async function GET() {
  await requireAdmin();
  const posts = await prisma.diaryPost.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  await requireAdmin();
  const body = await request.json().catch(() => null);
  const parsed = diarySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: parsed.error.errors[0]?.message || "日记信息不正确" }, { status: 400 });
  }
  const post = await prisma.diaryPost.create({
    data: {
      ...parsed.data,
      coverImage: parsed.data.coverImage || null,
      videoUrl: parsed.data.videoUrl || null,
      images: parsed.data.images.filter(Boolean)
    }
  });
  return NextResponse.json(post, { status: 201 });
}
