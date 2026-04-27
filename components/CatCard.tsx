import Image from "next/image";
import Link from "next/link";
import type { Cat } from "@prisma/client";
import { MapPin } from "lucide-react";
import { CatStatusBadge } from "@/components/StatusBadge";
import { genderLabels } from "@/lib/labels";

export function CatCard({ cat }: { cat: Cat }) {
  const image = cat.images[0] || "/placeholder-cat.svg";

  return (
    <article className="overflow-hidden rounded-lg bg-white shadow-soft">
      <div className="relative aspect-[4/3] bg-orange-50">
        <Image src={image} alt={cat.name} fill className="object-cover" />
      </div>
      <div className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold">{cat.name}</h3>
            <p className="mt-1 text-sm text-stone-600">
              {genderLabels[cat.gender]} · {cat.age || "年龄待补充"} · {cat.color || "花色待补充"}
            </p>
          </div>
          <CatStatusBadge status={cat.status} />
        </div>
        {cat.location ? (
          <p className="flex items-center gap-1 text-sm text-stone-600">
            <MapPin size={15} />
            {cat.location}
          </p>
        ) : null}
        <p className="line-clamp-3 text-sm leading-7 text-stone-700">{cat.description}</p>
        <div className="flex flex-wrap gap-2 text-xs text-stone-700">
          <span className="rounded-full bg-orange-50 px-3 py-1">{cat.sterilized ? "已绝育" : "未绝育"}</span>
          <span className="rounded-full bg-orange-50 px-3 py-1">{cat.dewormed ? "已驱虫" : "未驱虫"}</span>
          <span className="rounded-full bg-orange-50 px-3 py-1">{cat.friendly ? "亲人" : "性格待观察"}</span>
        </div>
        <Link href={`/cats/${cat.id}`} className="inline-flex rounded-full bg-salmon px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700">
          查看详情
        </Link>
      </div>
    </article>
  );
}
