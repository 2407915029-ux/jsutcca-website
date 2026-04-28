import Link from "next/link";
import { AdminHeader } from "@/components/AdminHeader";
import { T } from "@/components/LanguageProvider";
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
    ["admin.statsTotalCats", total],
    ["admin.statsAvailable", available],
    ["admin.statsAdopted", adopted],
    ["admin.statsDeceased", deceased],
    ["admin.statsDiary", diaryCount],
    ["admin.statsComments", commentCount]
  ];

  return (
    <div>
      <AdminHeader titleKey="admin.dashboard" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map(([label, value]) => (
          <div key={label} className="rounded-lg bg-white p-5 shadow-soft">
            <p className="text-sm text-stone-500"><T k={label as string} /></p>
            <p className="mt-2 text-3xl font-bold">{value}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <QuickLink href="/admin/cats" labelKey="admin.manageCats" />
        <QuickLink href="/admin/diary/new" labelKey="admin.publishDiary" />
        <QuickLink href="/admin/diary" labelKey="admin.diaryManagement" />
        <QuickLink href="/admin/comments" labelKey="admin.manageComments" />
      </div>
    </div>
  );
}

function QuickLink({ href, labelKey }: { href: string; labelKey: string }) {
  return <Link href={href} className="rounded-lg bg-white p-5 font-bold shadow-soft hover:bg-orange-50"><T k={labelKey} /></Link>;
}
