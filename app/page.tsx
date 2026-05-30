import Link from "next/link";
import Image from "next/image";
import { BookOpen, Gift, HeartHandshake, PawPrint, Ribbon, Sparkles } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { CatCard } from "@/components/CatCard";
import { DiaryCard } from "@/components/DiaryCard";
import { EmptyState } from "@/components/EmptyState";
import { T } from "@/components/LanguageProvider";

export const dynamic = "force-dynamic";

const featureLinks = [
  { href: "/cats?status=available", labelKey: "home.catsForAdoption", icon: PawPrint },
  { href: "/cats?status=adopted", labelKey: "home.adoptedCats", icon: HeartHandshake },
  { href: "/cats?status=deceased", labelKey: "home.inMemory", icon: Ribbon },
  { href: "/donate", labelKey: "home.donateSupport", icon: Sparkles },
  { href: "/shop", labelKey: "nav.shop", icon: Gift },
  { href: "/diary", labelKey: "nav.diary", icon: BookOpen }
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
            <p className="text-sm font-bold text-salmon"><T k="home.heroIntro" /></p>
            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl"><T k="site.name" /></h1>
            <p className="mt-5 max-w-2xl text-lg leading-9 text-stone-700">
              <T k="home.heroDescription" />
            </p>
            <p className="mt-4 rounded-lg bg-cream p-4 text-base font-semibold text-stone-800">
              <T k="home.heroSlogan" />
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-orange-50 shadow-soft">
            <Image src="/campus-stray-cat-rescue.jpg?v=20260531" alt="Campus Stray Cat Rescue" fill className="object-cover" priority />
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
                <span className="font-bold"><T k={item.labelKey} /></span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-salmon"><T k="home.recommended" /></p>
            <h2 className="text-2xl font-bold"><T k="home.waitingForHome" /></h2>
          </div>
          <Link href="/cats?status=available" className="text-sm font-bold text-green-700"><T k="common.viewMore" /></Link>
        </div>
        {cats.length ? <div className="grid gap-6 md:grid-cols-3">{cats.map((cat) => <CatCard key={cat.id} cat={cat} />)}</div> : <EmptyState titleKey="home.noAvailableCats" />}
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-salmon"><T k="home.recentUpdates" /></p>
            <h2 className="text-2xl font-bold"><T k="nav.diary" /></h2>
          </div>
          <Link href="/diary" className="text-sm font-bold text-green-700"><T k="common.viewMore" /></Link>
        </div>
        {posts.length ? <div className="grid gap-6 md:grid-cols-3">{posts.map((post) => <DiaryCard key={post.id} post={post} />)}</div> : <EmptyState titleKey="home.diaryEmpty" />}
      </section>
    </div>
  );
}
