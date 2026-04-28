"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

export function DeleteButton({
  endpoint,
  confirmText,
  confirmKey = "admin.deleteContentConfirm",
  confirmValues
}: {
  endpoint: string;
  confirmText?: string;
  confirmKey?: string;
  confirmValues?: Record<string, string | number>;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  async function remove() {
    if (!window.confirm(confirmText || t(confirmKey, confirmValues))) return;
    setLoading(true);
    await fetch(endpoint, { method: "DELETE" });
    setLoading(false);
    router.refresh();
  }

  return (
    <button onClick={remove} disabled={loading} className="inline-flex items-center gap-1 rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-100 disabled:opacity-60">
      <Trash2 size={15} />
      {loading ? t("common.deleting") : t("common.delete")}
    </button>
  );
}
