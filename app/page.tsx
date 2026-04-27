import Link from "next/link";
import Image from "next/image";
import { BookOpen, Gift, HeartHandshake, PawPrint, Ribbon, Sparkles } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { CatCard } from "@/components/CatCard";
import { DiaryCard } from "@/components/DiaryCard";
import { EmptyState } from "@/components/EmptyState";

export const dynamic = "force-dynamic";

const featureLinks = [
  { href: "/cats?status=available", label: "待领养猫咪", icon: PawPrint },
  { href: "/cats?status=adopted", label: "已领养猫咪", icon: HeartHandshake },
  { href: "/cats?status=deceased", label: "去世猫咪纪念", icon: Ribbon },
  { href: "/donate", label: "捐款支持", icon: Sparkles },
  { href: "/shop", label: "周边商品", icon: Gift },
  { href: "/diary", label: "活动日记", icon: BookOpen }
];

export default async function HomePage() {
  const [cats, posts] = await Promise.all([
    prisma.cat.findMany({ where: { status: "available" }, take: 3, orderBy: { createdAt: "desc" } }),
    prisma.diaryPost.findMany({ take: 3, orderBy: { createdAt: "desc" }, include: { _count: { select: { comments: true } } } })
  ]);

  return (
    <div>
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-16">
          <div>
            <p className="text-sm font-bold text-salmon">校园猫咪救助 / 绝育 / 医疗 / 领养</p>
            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">江理工喵喵队</h1>
            <p className="mt-5 max-w-2xl text-lg leading-9 text-stone-700">
              我们关注校园流浪猫的日常照护、医疗救助、科学绝育和稳定领养，也记录每一次被看见的温柔。
            </p>
            <p className="mt-4 rounded-lg bg-cream p-4 text-base font-semibold text-stone-800">
              让每一只校园猫都被看见、被照顾、被温柔以待。
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-orange-50 shadow-soft">
            <Image src="/placeholder-cat.svg" alt="江理工喵喵队猫咪照片轮播占位" fill className="object-cover" priority />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featureLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-lg bg-white p-5 shadow-soft hover:-translate-y-0.5 hover:shadow-lg">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-100 text-salmon">
                  <Icon size={21} />
                </span>
                <span className="font-bold">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-salmon">推荐领养</p>
            <h2 className="text-2xl font-bold">正在等待家的猫咪</h2>
          </div>
          <Link href="/cats?status=available" className="text-sm font-bold text-green-700">查看更多</Link>
        </div>
        {cats.length ? <div className="grid gap-6 md:grid-cols-3">{cats.map((cat) => <CatCard key={cat.id} cat={cat} />)}</div> : <EmptyState title="暂时还没有待领养猫咪" />}
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-salmon">最近更新</p>
            <h2 className="text-2xl font-bold">活动日记</h2>
          </div>
          <Link href="/diary" className="text-sm font-bold text-green-700">查看更多</Link>
        </div>
        {posts.length ? <div className="grid gap-6 md:grid-cols-3">{posts.map((post) => <DiaryCard key={post.id} post={post} />)}</div> : <EmptyState title="活动日记还在整理中" />}
      </section>
    </div>
  );
}
