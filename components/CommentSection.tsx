"use client";

import { useState } from "react";
import { Heart, MessageCircle, Send } from "lucide-react";

type Comment = {
  id: string;
  nickname: string;
  content: string;
  createdAt: string;
};

export function CommentSection({
  diaryPostId,
  initialLikes,
  initialComments
}: {
  diaryPostId: string;
  initialLikes: number;
  initialComments: Comment[];
}) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(() => (typeof window === "undefined" ? false : localStorage.getItem(`liked:${diaryPostId}`) === "1"));
  const [comments, setComments] = useState(initialComments);
  const [nickname, setNickname] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function like() {
    if (liked) {
      setMessage("这个浏览器已经点过赞啦");
      return;
    }
    const response = await fetch(`/api/diary/${diaryPostId}/like`, { method: "POST" });
    if (!response.ok) {
      setMessage("点赞失败，请稍后再试");
      return;
    }
    const data = await response.json();
    setLikes(data.likes);
    setLiked(true);
    localStorage.setItem(`liked:${diaryPostId}`, "1");
    setMessage("感谢你的喜欢");
  }

  async function submitComment(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");
    const response = await fetch(`/api/diary/${diaryPostId}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nickname, content })
    });
    const data = await response.json();
    setSubmitting(false);
    if (!response.ok) {
      setMessage(data.message || "评论提交失败");
      return;
    }
    setComments([data, ...comments]);
    setContent("");
    setNickname("");
    setMessage("评论已发布");
  }

  return (
    <section className="mt-10 rounded-lg bg-white p-5 shadow-soft sm:p-7">
      <div className="flex flex-col gap-3 border-b border-orange-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold">互动区</h2>
          <p className="mt-1 text-sm text-stone-500">欢迎留下温柔的鼓励和补充信息。</p>
        </div>
        <button onClick={like} className="inline-flex items-center justify-center gap-2 rounded-full bg-salmon px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700">
          <Heart size={17} fill={liked ? "currentColor" : "none"} />
          {likes} 个喜欢
        </button>
      </div>

      <form onSubmit={submitComment} className="mt-6 grid gap-3">
        <input
          value={nickname}
          onChange={(event) => setNickname(event.target.value)}
          maxLength={30}
          placeholder="昵称，不填则显示匿名用户"
          className="rounded-lg border border-orange-200 bg-cream px-4 py-3 outline-none focus:border-salmon"
        />
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          maxLength={500}
          placeholder="写下你的评论，最多 500 字"
          rows={4}
          className="rounded-lg border border-orange-200 bg-cream px-4 py-3 outline-none focus:border-salmon"
        />
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-stone-500">{message || `${content.length}/500`}</p>
          <button disabled={submitting} className="inline-flex items-center justify-center gap-2 rounded-lg bg-leaf px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-60">
            <Send size={16} />
            {submitting ? "提交中..." : "发表评论"}
          </button>
        </div>
      </form>

      <div className="mt-8 space-y-4">
        <h3 className="flex items-center gap-2 font-bold">
          <MessageCircle size={18} />
          评论
        </h3>
        {comments.length === 0 ? (
          <p className="rounded-lg bg-orange-50 p-4 text-sm text-stone-600">还没有评论，来做第一个留言的人吧。</p>
        ) : (
          comments.map((comment) => (
            <article key={comment.id} className="rounded-lg bg-orange-50 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold">{comment.nickname}</p>
                <time className="text-xs text-stone-500">{new Date(comment.createdAt).toLocaleString("zh-CN")}</time>
              </div>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-stone-700">{comment.content}</p>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
