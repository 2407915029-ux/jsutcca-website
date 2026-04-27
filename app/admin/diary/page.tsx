import Link from "next/link";
import { AdminHeader } from "@/components/AdminHeader";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { DiaryTypeBadge } from "@/components/StatusBadge";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDiaryPage() {
  const posts = await prisma.diaryPost.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { comments: true } } }
  });

  return (
    <div>
      <AdminHeader title="活动日记管理" />
      <div className="mb-5 flex justify-end">
        <Link href="/admin/diary/new" className="rounded-lg bg-leaf px-4 py-2 text-sm font-semibold text-white">新增活动日记</Link>
      </div>
      <div className="overflow-hidden rounded-lg bg-white shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-orange-50 text-stone-600">
              <tr>
                <th className="p-4">标题</th>
                <th className="p-4">类型</th>
                <th className="p-4">点赞</th>
                <th className="p-4">评论</th>
                <th className="p-4">发布时间</th>
                <th className="p-4">操作</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-t border-orange-100">
                  <td className="p-4 font-semibold">{post.title}</td>
                  <td className="p-4"><DiaryTypeBadge type={post.type} /></td>
                  <td className="p-4">{post.likes}</td>
                  <td className="p-4">{post._count.comments}</td>
                  <td className="p-4">{post.createdAt.toLocaleDateString("zh-CN")}</td>
                  <td className="flex gap-2 p-4">
                    <Link href={`/admin/diary/${post.id}/edit`} className="rounded-lg bg-orange-50 px-3 py-2 font-semibold hover:bg-orange-100">编辑</Link>
                    <DeleteButton endpoint={`/api/admin/diary/${post.id}`} confirmText={`确认删除活动日记“${post.title}”吗？相关评论也会删除。`} />
                  </td>
                </tr>
              ))}
              {!posts.length ? <tr><td className="p-6 text-center text-stone-500" colSpan={6}>活动日记还在整理中</td></tr> : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
