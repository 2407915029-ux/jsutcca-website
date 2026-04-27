import Link from "next/link";
import { AdminHeader } from "@/components/AdminHeader";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [total, available, adopted, deceased, diaryCount, commentCount] = await Promise.all([
    prisma.cat.count(),
    prisma.cat.count({ where: { status: "available" } }),
    prisma.cat.count({ where: { status: "adopted" } }),
    prisma.cat.count({ where: { status: "deceased" } }),
    prisma.diaryPost.count(),
    prisma.comment.count()
  ]);
  const stats = [
    ["猫咪总数", total],
    ["待领养数量", available],
    ["已领养数量", adopted],
    ["去世猫咪数量", deceased],
    ["活动日记数量", diaryCount],
    ["评论数量", commentCount]
  ];

  return (
    <div>
      <AdminHeader title="后台首页" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map(([label, value]) => (
          <div key={label} className="rounded-lg bg-white p-5 shadow-soft">
            <p className="text-sm text-stone-500">{label}</p>
            <p className="mt-2 text-3xl font-bold">{value}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <QuickLink href="/admin/cats" label="管理猫咪" />
        <QuickLink href="/admin/diary/new" label="发布活动日记" />
        <QuickLink href="/admin/diary" label="管理活动日记" />
        <QuickLink href="/admin/comments" label="管理评论" />
      </div>
    </div>
  );
}

function QuickLink({ href, label }: { href: string; label: string }) {
  return <Link href={href} className="rounded-lg bg-white p-5 font-bold shadow-soft hover:bg-orange-50">{label}</Link>;
}
