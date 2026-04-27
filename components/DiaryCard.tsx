import Image from "next/image";
import Link from "next/link";
import type { DiaryPost } from "@prisma/client";
import { Heart, MessageCircle } from "lucide-react";
import { DiaryTypeBadge } from "@/components/StatusBadge";

type DiaryCardPost = DiaryPost & { _count?: { comments: number } };

export function DiaryCard({ post }: { post: DiaryCardPost }) {
  return (
    <article className="overflow-hidden rounded-lg bg-white shadow-soft">
      <div className="relative aspect-[16/10] bg-green-50">
        <Image src={post.coverImage || "/placeholder-diary.svg"} alt={post.title} fill className="object-cover" />
      </div>
      <div className="space-y-3 p-5">
        <div className="flex items-center justify-between gap-3">
          <DiaryTypeBadge type={post.type} />
          <time className="text-xs text-stone-500">{post.createdAt.toLocaleDateString("zh-CN")}</time>
        </div>
        <h3 className="text-xl font-bold">{post.title}</h3>
        <p className="line-clamp-3 text-sm leading-7 text-stone-700">{post.summary}</p>
        <div className="flex items-center justify-between">
          <div className="flex gap-4 text-sm text-stone-500">
            <span className="inline-flex items-center gap-1">
              <Heart size={16} />
              {post.likes}
            </span>
            <span className="inline-flex items-center gap-1">
              <MessageCircle size={16} />
              {post._count?.comments ?? 0}
            </span>
          </div>
          <Link href={`/diary/${post.id}`} className="rounded-full bg-leaf px-4 py-2 text-sm font-semibold text-white hover:bg-green-700">
            查看详情
          </Link>
        </div>
      </div>
    </article>
  );
}
