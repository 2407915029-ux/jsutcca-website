"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function AdminHeader({ title }: { title: string }) {
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm text-stone-500">江理工喵喵队</p>
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      <button onClick={logout} className="inline-flex items-center justify-center gap-2 rounded-lg border border-orange-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-orange-50">
        <LogOut size={16} />
        退出登录
      </button>
    </div>
  );
}
