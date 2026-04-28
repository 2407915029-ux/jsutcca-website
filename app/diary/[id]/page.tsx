import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation";
import { CommentSection } from "@/components/CommentSection";
import { DiaryTypeBadge } from "@/components/StatusBadge";
import { T } from "@/components/LanguageProvider";
import { prisma } from "@/lib/prisma";
import { getVideoEmbed } from "@/lib/video";

export const dynamic = "force-dynamic";

export default async function DiaryDetailPage({ params }: { params: { id: string } }) {
  const post = await prisma.diaryPost.findUnique({
    where: { id: params.id },
    include: { comments: { orderBy: { createdAt: "desc" } } }
  });
  if (!post) notFound();
  const images = post.images.length ? post.images : post.coverImage ? [post.coverImage] : [];
  const video = getVideoEmbed(post.videoUrl);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <article className="rounded-lg bg-white p-5 shadow-soft sm:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <DiaryTypeBadge type={post.type} />
          <time className="text-sm text-stone-500">{post.createdAt.toLocaleString("zh-CN")}</time>
        </div>
        <h1 className="mt-4 text-3xl font-bold leading-tight">{post.title}</h1>
        <p className="mt-4 leading-8 text-stone-700">{post.summary}</p>
        <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-lg bg-green-50">
          <Image src={post.coverImage || "/placeholder-diary.svg"} alt={post.title} fill className="object-cover" priority />
        </div>
        <div className="prose-meow mt-8 max-w-none text-stone-800">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
        {video ? (
          <section className="mt-8">
            <h2 className="mb-3 text-xl font-bold"><T k="diary.video" /></h2>
            {video.type === "video" ? (
              <video src={video.src} controls className="aspect-video w-full rounded-lg bg-black" />
            ) : video.type === "iframe" ? (
              <iframe
                src={video.src}
                title={`${post.title} video`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="aspect-video w-full rounded-lg border-0 bg-black"
              />
            ) : (
              <a href={video.src} target="_blank" rel="noreferrer" className="inline-flex rounded-lg bg-orange-50 px-4 py-3 font-semibold text-green-700">
                <T k="diary.openVideo" />
              </a>
            )}
          </section>
        ) : null}
        {images.length ? (
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {images.map((image) => (
              <div key={image} className="relative aspect-[4/3] overflow-hidden rounded-lg bg-orange-50">
                <Image src={image} alt={`${post.title} image`} fill className="object-cover" />
              </div>
            ))}
          </div>
        ) : null}
      </article>
      <CommentSection
        diaryPostId={post.id}
        initialLikes={post.likes}
        initialComments={post.comments.map((comment) => ({
          id: comment.id,
          nickname: comment.nickname,
          content: comment.content,
          createdAt: comment.createdAt.toISOString()
        }))}
      />
    </div>
  );
}
