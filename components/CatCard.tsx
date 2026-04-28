import Image from "next/image";
import Link from "next/link";
import type { Cat } from "@prisma/client";
import { MapPin } from "lucide-react";
import { CatStatusBadge } from "@/components/StatusBadge";
import { T } from "@/components/LanguageProvider";

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
              <T k={`gender.${cat.gender}`} /> · {cat.age || <T k="cats.ageMissing" />} · {cat.color || <T k="cats.colorMissing" />}
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
          <span className="rounded-full bg-orange-50 px-3 py-1"><T k={cat.sterilized ? "cats.sterilized" : "cats.notSterilized"} /></span>
          <span className="rounded-full bg-orange-50 px-3 py-1"><T k={cat.dewormed ? "cats.dewormed" : "cats.notDewormed"} /></span>
          <span className="rounded-full bg-orange-50 px-3 py-1"><T k={cat.friendly ? "cats.friendly" : "cats.observePersonality"} /></span>
        </div>
        <Link href={`/cats/${cat.id}`} className="inline-flex rounded-full bg-salmon px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700">
          <T k="common.viewDetails" />
        </Link>
      </div>
    </article>
  );
}
