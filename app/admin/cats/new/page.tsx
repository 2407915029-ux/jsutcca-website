import { AdminHeader } from "@/components/AdminHeader";
import { CatForm } from "@/components/admin/CatForm";

export default function NewCatPage() {
  return (
    <div>
      <AdminHeader title="新增猫咪" />
      <CatForm />
    </div>
  );
}
