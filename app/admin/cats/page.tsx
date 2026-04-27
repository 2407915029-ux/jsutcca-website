import Link from "next/link";
import type { CatStatus } from "@prisma/client";
import { AdminHeader } from "@/components/AdminHeader";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { CatStatusBadge } from "@/components/StatusBadge";
import { catStatusLabels, genderLabels } from "@/lib/labels";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const statuses: CatStatus[] = ["available", "adopted", "deceased"];

export default async function AdminCatsPage({ searchParams }: { searchParams: { status?: CatStatus } }) {
  const status = statuses.includes(searchParams.status as CatStatus) ? searchParams.status : undefined;
  const cats = await prisma.cat.findMany({ where: status ? { status } : undefined, orderBy: { createdAt: "desc" } });

  return (
    <div>
      <AdminHeader title="猫咪管理" />
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <Link href="/admin/cats" className={`rounded-full px-4 py-2 text-sm font-semibold ${!status ? "bg-salmon text-white" : "bg-white"}`}>全部</Link>
          {statuses.map((item) => <Link key={item} href={`/admin/cats?status=${item}`} className={`rounded-full px-4 py-2 text-sm font-semibold ${status === item ? "bg-salmon text-white" : "bg-white"}`}>{catStatusLabels[item]}</Link>)}
        </div>
        <Link href="/admin/cats/new" className="rounded-lg bg-leaf px-4 py-2 text-sm font-semibold text-white">新增猫咪</Link>
      </div>
      <div className="overflow-hidden rounded-lg bg-white shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-orange-50 text-stone-600">
              <tr>
                <th className="p-4">名字</th>
                <th className="p-4">状态</th>
                <th className="p-4">性别</th>
                <th className="p-4">地点</th>
                <th className="p-4">更新时间</th>
                <th className="p-4">操作</th>
              </tr>
            </thead>
            <tbody>
              {cats.map((cat) => (
                <tr key={cat.id} className="border-t border-orange-100">
                  <td className="p-4 font-semibold">{cat.name}</td>
                  <td className="p-4"><CatStatusBadge status={cat.status} /></td>
                  <td className="p-4">{genderLabels[cat.gender]}</td>
                  <td className="p-4">{cat.location || "待补充"}</td>
                  <td className="p-4">{cat.updatedAt.toLocaleDateString("zh-CN")}</td>
                  <td className="flex gap-2 p-4">
                    <Link href={`/admin/cats/${cat.id}/edit`} className="rounded-lg bg-orange-50 px-3 py-2 font-semibold hover:bg-orange-100">编辑</Link>
                    <DeleteButton endpoint={`/api/admin/cats/${cat.id}`} confirmText={`确认删除猫咪“${cat.name}”吗？`} />
                  </td>
                </tr>
              ))}
              {!cats.length ? <tr><td className="p-6 text-center text-stone-500" colSpan={6}>暂时没有猫咪档案</td></tr> : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
