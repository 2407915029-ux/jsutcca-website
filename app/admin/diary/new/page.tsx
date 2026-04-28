import { AdminHeader } from "@/components/AdminHeader";
import { DiaryForm } from "@/components/admin/DiaryForm";

export default function NewDiaryPage() {
  return (
    <div>
      <AdminHeader titleKey="admin.newDiary" />
      <DiaryForm />
    </div>
  );
}
