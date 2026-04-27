import Link from "next/link";
import { AdminHeader } from "@/components/AdminHeader";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminCommentsPage() {
  const comments = await prisma.comment.findMany({
    orderBy: { createdAt: "desc" },
    include: { diaryPost: { select: { id: true, title: true } } }
  });

  return (
    <div>
      <AdminHeader title="评论管理" />
      <div className="overflow-hidden rounded-lg bg-white shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[780px] text-left text-sm">
            <thead className="bg-orange-50 text-stone-600">
              <tr>
                <th className="p-4">昵称</th>
                <th className="p-4">评论内容</th>
                <th className="p-4">所属日记</th>
                <th className="p-4">时间</th>
                <th className="p-4">操作</th>
              </tr>
            </thead>
            <tbody>
              {comments.map((comment) => (
                <tr key={comment.id} className="border-t border-orange-100 align-top">
                  <td className="p-4 font-semibold">{comment.nickname}</td>
                  <td className="max-w-md p-4 leading-7">{comment.content}</td>
                  <td className="p-4">
                    <Link href={`/diary/${comment.diaryPost.id}`} className="font-semibold text-green-700">{comment.diaryPost.title}</Link>
                  </td>
                  <td className="p-4">{comment.createdAt.toLocaleString("zh-CN")}</td>
                  <td className="p-4">
                    <DeleteButton endpoint={`/api/admin/comments/${comment.id}`} confirmText="确认删除这条评论吗？" />
                  </td>
                </tr>
              ))}
              {!comments.length ? <tr><td className="p-6 text-center text-stone-500" colSpan={5}>暂时没有评论</td></tr> : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
