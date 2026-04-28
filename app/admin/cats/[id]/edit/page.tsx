import { notFound } from "next/navigation";
import { AdminHeader } from "@/components/AdminHeader";
import { CatForm } from "@/components/admin/CatForm";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function EditCatPage({ params }: { params: { id: string } }) {
  const cat = await prisma.cat.findUnique({ where: { id: params.id } });
  if (!cat) notFound();
  return (
    <div>
      <AdminHeader titleKey="admin.editCat" titleValues={{ name: cat.name }} />
      <CatForm cat={cat} />
    </div>
  );
}
