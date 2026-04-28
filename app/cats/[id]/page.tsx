import Image from "next/image";
import { notFound } from "next/navigation";
import { CatStatusBadge } from "@/components/StatusBadge";
import { T } from "@/components/LanguageProvider";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function CatDetailPage({ params }: { params: { id: string } }) {
  const cat = await prisma.cat.findUnique({ where: { id: params.id } });
  if (!cat) notFound();
  const images = cat.images.length ? cat.images : ["/placeholder-cat.svg"];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className={`rounded-lg p-6 shadow-soft sm:p-8 ${cat.status === "deceased" ? "bg-stone-100" : "bg-white"}`}>
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div className="space-y-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-orange-50">
              <Image src={images[0]} alt={cat.name} fill className="object-cover" priority />
            </div>
            {images.length > 1 ? (
              <div className="grid grid-cols-3 gap-3">
                {images.slice(1).map((image) => (
                  <div key={image} className="relative aspect-square overflow-hidden rounded-lg bg-orange-50">
                    <Image src={image} alt={`${cat.name} photo`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            ) : null}
          </div>
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-salmon"><T k="cats.detail" /></p>
                <h1 className="mt-2 text-3xl font-bold">{cat.name}</h1>
              </div>
              <CatStatusBadge status={cat.status} />
            </div>
            <div className="mt-6 grid gap-3 text-sm text-stone-700 sm:grid-cols-2">
              <Info labelKey="common.gender" valueKey={`gender.${cat.gender}`} />
              <Info labelKey="cats.age" value={cat.age} fallbackKey="common.notProvided" />
              <Info labelKey="cats.color" value={cat.color} fallbackKey="common.notProvided" />
              <Info labelKey="cats.frequentLocation" value={cat.location} fallbackKey="common.notProvided" />
              <Info labelKey="cats.health" value={cat.healthStatus} fallbackKey="common.notProvided" />
              <Info labelKey="cats.sterilizedStatus" valueKey={cat.sterilized ? "cats.sterilized" : "cats.notSterilized"} />
              <Info labelKey="cats.dewormedStatus" valueKey={cat.dewormed ? "cats.dewormed" : "cats.notDewormed"} />
              <Info labelKey="cats.friendliness" valueKey={cat.friendly ? "cats.friendly" : "cats.observe"} />
            </div>
            <Section titleKey="cats.intro" content={cat.description} />
            <Section titleKey="cats.personality" content={cat.personality} />
            <Section titleKey="cats.rescueRecord" content={cat.rescueRecord} />
            <Section titleKey="cats.medicalRecord" content={cat.medicalRecord} />
            <Section titleKey={cat.status === "deceased" ? "cats.memorialText" : "cats.adoptionNotes"} content={cat.adoptionRequirements} fallbackKey={cat.status === "deceased" ? "cats.memorialDefault" : "cats.adoptionDefault"} />
            <div className="mt-6 rounded-lg bg-cream p-4 text-sm leading-7 text-stone-700"><T k="cats.contactPlaceholder" /></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Info({ labelKey, value, valueKey, fallbackKey }: { labelKey: string; value?: string | null; valueKey?: string; fallbackKey?: string }) {
  return (
    <div className="rounded-lg bg-cream p-3">
      <p className="text-xs text-stone-500"><T k={labelKey} /></p>
      <p className="mt-1 font-semibold">{valueKey ? <T k={valueKey} /> : value || (fallbackKey ? <T k={fallbackKey} /> : null)}</p>
    </div>
  );
}

function Section({ titleKey, content, fallbackKey }: { titleKey: string; content?: string | null; fallbackKey?: string }) {
  if (!content && !fallbackKey) return null;
  return (
    <section className="mt-6">
      <h2 className="font-bold"><T k={titleKey} /></h2>
      <p className="mt-2 whitespace-pre-wrap leading-8 text-stone-700">{content || (fallbackKey ? <T k={fallbackKey} /> : null)}</p>
    </section>
  );
}
