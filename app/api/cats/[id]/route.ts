import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const cat = await prisma.cat.findUnique({ where: { id: params.id } });
  if (!cat) return NextResponse.json({ message: "猫咪不存在" }, { status: 404 });
  return NextResponse.json(cat);
}
