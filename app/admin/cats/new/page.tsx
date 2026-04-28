import { AdminHeader } from "@/components/AdminHeader";
import { CatForm } from "@/components/admin/CatForm";

export default function NewCatPage() {
  return (
    <div>
      <AdminHeader titleKey="admin.newCat" />
      <CatForm />
    </div>
  );
}
