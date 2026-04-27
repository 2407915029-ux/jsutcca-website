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
      <AdminHeader title={`编辑日记：${post.title}`} />
      <DiaryForm post={post} />
    </div>
  );
}
