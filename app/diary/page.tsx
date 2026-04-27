import { DiaryCard } from "@/components/DiaryCard";
import { EmptyState } from "@/components/EmptyState";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function DiaryPage() {
  const posts = await prisma.diaryPost.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { comments: true } } }
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <p className="text-sm font-bold text-salmon">救助记录</p>
      <h1 className="mt-2 text-3xl font-bold">活动日记</h1>
      <p className="mt-4 max-w-3xl leading-8 text-stone-700">记录绝育、就医、喂养、线下活动、领养回访和日常照护。</p>
      <div className="mt-8">
        {posts.length ? <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{posts.map((post) => <DiaryCard key={post.id} post={post} />)}</div> : <EmptyState title="活动日记还在整理中" />}
      </div>
    </div>
  );
}
