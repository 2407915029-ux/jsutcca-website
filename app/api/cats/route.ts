import { NextRequest, NextResponse } from "next/server";
import type { CatStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const statuses: CatStatus[] = ["available", "adopted", "deceased"];

export async function GET(request: NextRequest) {
  const status = request.nextUrl.searchParams.get("status") as CatStatus | null;
  const cats = await prisma.cat.findMany({
    where: status && statuses.includes(status) ? { status } : undefined,
    orderBy: { createdAt: "desc" }
  });
  return NextResponse.json(cats);
}
