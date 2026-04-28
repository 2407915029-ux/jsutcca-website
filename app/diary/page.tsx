import { DiaryCard } from "@/components/DiaryCard";
import { EmptyState } from "@/components/EmptyState";
import { T } from "@/components/LanguageProvider";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function DiaryPage() {
  const posts = await prisma.diaryPost.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { comments: true } } }
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <p className="text-sm font-bold text-salmon"><T k="diary.eyebrow" /></p>
      <h1 className="mt-2 text-3xl font-bold"><T k="diary.title" /></h1>
      <p className="mt-4 max-w-3xl leading-8 text-stone-700"><T k="diary.description" /></p>
      <div className="mt-8">
        {posts.length ? <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{posts.map((post) => <DiaryCard key={post.id} post={post} />)}</div> : <EmptyState titleKey="diary.empty" />}
      </div>
    </div>
  );
}
