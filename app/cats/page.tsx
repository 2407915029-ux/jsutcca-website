import Link from "next/link";
import type { CatStatus } from "@prisma/client";
import { CatCard } from "@/components/CatCard";
import { EmptyState } from "@/components/EmptyState";
import { catStatusLabels } from "@/lib/labels";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const statuses: CatStatus[] = ["available", "adopted", "deceased"];

export default async function CatsPage({ searchParams }: { searchParams: { status?: CatStatus } }) {
  const status = statuses.includes(searchParams.status as CatStatus) ? searchParams.status : undefined;
  const cats = await prisma.cat.findMany({
    where: status ? { status } : undefined,
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <p className="text-sm font-bold text-salmon">猫咪档案</p>
        <h1 className="mt-2 text-3xl font-bold">猫咪列表</h1>
        <p className="mt-3 max-w-2xl leading-8 text-stone-600">查看待领养、已领养和纪念中的校园猫咪信息。</p>
      </div>
      <div className="mb-8 flex flex-wrap gap-2">
        <Link href="/cats" className={`rounded-full px-4 py-2 text-sm font-semibold ${!status ? "bg-salmon text-white" : "bg-white"}`}>全部猫咪</Link>
        {statuses.map((item) => (
          <Link key={item} href={`/cats?status=${item}`} className={`rounded-full px-4 py-2 text-sm font-semibold ${status === item ? "bg-salmon text-white" : "bg-white"}`}>
            {catStatusLabels[item]}
          </Link>
        ))}
      </div>
      {cats.length ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{cats.map((cat) => <CatCard key={cat.id} cat={cat} />)}</div>
      ) : (
        <EmptyState title={status ? `暂时还没有${catStatusLabels[status]}猫咪` : "暂时还没有猫咪档案"} description="管理员发布后会显示在这里。" />
      )}
    </div>
  );
}
