import Image from "next/image";
import { notFound } from "next/navigation";
import { CatStatusBadge } from "@/components/StatusBadge";
import { genderLabels } from "@/lib/labels";
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
                    <Image src={image} alt={`${cat.name}照片`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            ) : null}
          </div>
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-salmon">猫咪详情</p>
                <h1 className="mt-2 text-3xl font-bold">{cat.name}</h1>
              </div>
              <CatStatusBadge status={cat.status} />
            </div>
            <div className="mt-6 grid gap-3 text-sm text-stone-700 sm:grid-cols-2">
              <Info label="性别" value={genderLabels[cat.gender]} />
              <Info label="年龄" value={cat.age || "待补充"} />
              <Info label="花色" value={cat.color || "待补充"} />
              <Info label="常出没地点" value={cat.location || "待补充"} />
              <Info label="健康情况" value={cat.healthStatus || "待补充"} />
              <Info label="绝育情况" value={cat.sterilized ? "已绝育" : "未绝育"} />
              <Info label="驱虫情况" value={cat.dewormed ? "已驱虫" : "未驱虫"} />
              <Info label="亲人程度" value={cat.friendly ? "亲人" : "待观察"} />
            </div>
            <Section title="简介" content={cat.description} />
            <Section title="性格描述" content={cat.personality} />
            <Section title="救助记录" content={cat.rescueRecord} />
            <Section title="医疗记录" content={cat.medicalRecord} />
            <Section title={cat.status === "deceased" ? "纪念文字" : "领养要求或备注"} content={cat.adoptionRequirements || (cat.status === "deceased" ? "谢谢它曾经来到校园，也谢谢每一位记得它的人。" : "如有领养意向，请联系喵喵队志愿者。")} />
            <div className="mt-6 rounded-lg bg-cream p-4 text-sm leading-7 text-stone-700">联系方式占位：后续可填写社群二维码、邮箱或志愿者联系方式。</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-cream p-3">
      <p className="text-xs text-stone-500">{label}</p>
      <p className="mt-1 font-semibold">{value}</p>
    </div>
  );
}

function Section({ title, content }: { title: string; content?: string | null }) {
  if (!content) return null;
  return (
    <section className="mt-6">
      <h2 className="font-bold">{title}</h2>
      <p className="mt-2 whitespace-pre-wrap leading-8 text-stone-700">{content}</p>
    </section>
  );
}
