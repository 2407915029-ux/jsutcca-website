import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const posts = await prisma.diaryPost.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { comments: true } } }
  });
  return NextResponse.json(posts);
}
