import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { catSchema } from "@/lib/validators";

export const dynamic = "force-dynamic";

export async function GET() {
  await requireAdmin();
  const cats = await prisma.cat.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(cats);
}

export async function POST(request: Request) {
  await requireAdmin();
  const body = await request.json().catch(() => null);
  const parsed = catSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: parsed.error.errors[0]?.message || "猫咪信息不正确" }, { status: 400 });
  }
  const data = {
    ...parsed.data,
    images: parsed.data.images.filter(Boolean)
  };
  const cat = await prisma.cat.create({ data });
  return NextResponse.json(cat, { status: 201 });
}
