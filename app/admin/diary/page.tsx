import Link from "next/link";
import { AdminHeader } from "@/components/AdminHeader";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { DiaryTypeBadge } from "@/components/StatusBadge";
import { T } from "@/components/LanguageProvider";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDiaryPage() {
  const posts = await prisma.diaryPost.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { comments: true } } }
  });

  return (
    <div>
      <AdminHeader titleKey="admin.diaryManagement" />
      <div className="mb-5 flex justify-end">
        <Link href="/admin/diary/new" className="rounded-lg bg-leaf px-4 py-2 text-sm font-semibold text-white"><T k="admin.addDiary" /></Link>
      </div>
      <div className="overflow-hidden rounded-lg bg-white shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-orange-50 text-stone-600">
              <tr>
                <th className="p-4"><T k="common.title" /></th>
                <th className="p-4"><T k="common.type" /></th>
                <th className="p-4"><T k="common.likes" /></th>
                <th className="p-4"><T k="common.comments" /></th>
                <th className="p-4"><T k="common.createdAt" /></th>
                <th className="p-4"><T k="common.actions" /></th>
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
                    <Link href={`/admin/diary/${post.id}/edit`} className="rounded-lg bg-orange-50 px-3 py-2 font-semibold hover:bg-orange-100"><T k="common.edit" /></Link>
                    <DeleteButton endpoint={`/api/admin/diary/${post.id}`} confirmKey="admin.deleteDiaryConfirm" confirmValues={{ title: post.title }} />
                  </td>
                </tr>
              ))}
              {!posts.length ? <tr><td className="p-6 text-center text-stone-500" colSpan={6}><T k="diary.empty" /></td></tr> : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
