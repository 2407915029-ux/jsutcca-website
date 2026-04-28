import { notFound } from "next/navigation";
import { AdminHeader } from "@/components/AdminHeader";
import { DiaryForm } from "@/components/admin/DiaryForm";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function EditDiaryPage({ params }: { params: { id: string } }) {
  const post = await prisma.diaryPost.findUnique({ where: { id: params.id } });
  if (!post) notFound();
  return (
    <div>
      <AdminHeader titleKey="admin.editDiary" titleValues={{ title: post.title }} />
      <DiaryForm post={post} />
    </div>
  );
}
