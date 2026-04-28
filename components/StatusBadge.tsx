import type { CatStatus, DiaryType } from "@prisma/client";
import { T } from "@/components/LanguageProvider";

const statusClass: Record<CatStatus, string> = {
  available: "bg-green-100 text-green-800",
  adopted: "bg-orange-100 text-orange-800",
  deceased: "bg-stone-200 text-stone-700"
};

export function CatStatusBadge({ status }: { status: CatStatus }) {
  return <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass[status]}`}><T k={`catStatus.${status}`} /></span>;
}

export function DiaryTypeBadge({ type }: { type: DiaryType }) {
  return <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800"><T k={`diaryType.${type}`} /></span>;
}
