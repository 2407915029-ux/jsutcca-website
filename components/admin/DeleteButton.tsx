"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export function DeleteButton({ endpoint, confirmText = "确认删除这条内容吗？" }: { endpoint: string; confirmText?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function remove() {
    if (!window.confirm(confirmText)) return;
    setLoading(true);
    await fetch(endpoint, { method: "DELETE" });
    setLoading(false);
    router.refresh();
  }

  return (
    <button onClick={remove} disabled={loading} className="inline-flex items-center gap-1 rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-100 disabled:opacity-60">
      <Trash2 size={15} />
      {loading ? "删除中..." : "删除"}
    </button>
  );
}
