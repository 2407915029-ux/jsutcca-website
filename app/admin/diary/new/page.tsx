import { AdminHeader } from "@/components/AdminHeader";
import { DiaryForm } from "@/components/admin/DiaryForm";

export default function NewDiaryPage() {
  return (
    <div>
      <AdminHeader title="新增活动日记" />
      <DiaryForm />
    </div>
  );
}
