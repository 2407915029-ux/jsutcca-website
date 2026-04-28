"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { DiaryPost } from "@prisma/client";
import { ImageUrlInput } from "@/components/ImageUrlInput";
import { CloudinaryUploadButton } from "@/components/admin/CloudinaryUploadButton";
import { useLanguage } from "@/components/LanguageProvider";

type DiaryPayload = Omit<DiaryPost, "id" | "createdAt" | "updatedAt" | "likes">;

const emptyDiary: DiaryPayload = {
  title: "",
  type: "daily",
  summary: "",
  content: "",
  coverImage: "",
  videoUrl: "",
  images: []
};

export function DiaryForm({ post }: { post?: DiaryPost }) {
  const router = useRouter();
  const [form, setForm] = useState<DiaryPayload>(post ? { ...post } : emptyDiary);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();
  const diaryTypeOptions = {
    sterilization: t("diaryType.sterilization"),
    medical: t("diaryType.medical"),
    feeding: t("diaryType.feeding"),
    offline_event: t("diaryType.offline_event"),
    adoption: t("diaryType.adoption"),
    daily: t("diaryType.daily"),
    other: t("diaryType.other")
  };

  function setField<K extends keyof DiaryPayload>(key: K, value: DiaryPayload[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    const response = await fetch(post ? `/api/admin/diary/${post.id}` : "/api/admin/diary", {
      method: post ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, images: form.images.filter(Boolean) })
    });
    const data = await response.json();
    setLoading(false);
    if (!response.ok) {
      setMessage(t("common.saveFailed"));
      return;
    }
    router.push("/admin/diary");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="grid gap-5 rounded-lg bg-white p-5 shadow-soft sm:p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Input label={t("admin.diaryTitleRequired")} value={form.title} onChange={(value) => setField("title", value)} required />
        <label className="grid gap-2 text-sm font-semibold">
          {t("admin.diaryTypeRequired")}
          <select value={form.type} onChange={(event) => setField("type", event.target.value as DiaryPayload["type"])} className="rounded-lg border border-orange-200 bg-cream px-3 py-2 outline-none focus:border-salmon">
            {Object.entries(diaryTypeOptions).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
        </label>
      </div>
      <Textarea label={t("admin.summaryRequired")} value={form.summary} onChange={(value) => setField("summary", value)} required rows={3} />
      <Textarea label={t("admin.contentRequired")} value={form.content} onChange={(value) => setField("content", value)} required rows={10} />
      <label className="grid gap-2 text-sm font-semibold">
        {t("admin.coverImageUrl")}
        <CloudinaryUploadButton folder="meow-team/diary/covers" multiple={false} onUploaded={(urls) => setField("coverImage", urls[0] || "")} />
        <input value={form.coverImage || ""} onChange={(event) => setField("coverImage", event.target.value)} className="rounded-lg border border-orange-200 bg-cream px-3 py-2 outline-none focus:border-salmon" />
      </label>
      <Input label={t("admin.videoUrl")} value={form.videoUrl || ""} onChange={(value) => setField("videoUrl", value)} />
      <label className="grid gap-2 text-sm font-semibold">
        {t("admin.bodyImageUrls")} <span className="font-normal text-stone-500">{t("admin.imageUrlsHint")}</span>
        <CloudinaryUploadButton folder="meow-team/diary/images" onUploaded={(urls) => setField("images", [...form.images, ...urls])} />
        <ImageUrlInput values={form.images} onChange={(values) => setField("images", values)} placeholder="https://example.com/activity.jpg" />
      </label>
      {message ? <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{message}</p> : null}
      <button disabled={loading} className="rounded-lg bg-salmon px-4 py-3 font-semibold text-white hover:bg-orange-700 disabled:opacity-60">
        {loading ? t("common.saving") : t("admin.saveDiary")}
      </button>
    </form>
  );
}

function Input({ label, value, onChange, required }: { label: string; value: string; onChange: (value: string) => void; required?: boolean }) {
  return (
    <label className="grid gap-2 text-sm font-semibold">
      {label}
      <input required={required} value={value} onChange={(event) => onChange(event.target.value)} className="rounded-lg border border-orange-200 bg-cream px-3 py-2 outline-none focus:border-salmon" />
    </label>
  );
}

function Textarea({ label, value, onChange, required, rows }: { label: string; value: string; onChange: (value: string) => void; required?: boolean; rows: number }) {
  return (
    <label className="grid gap-2 text-sm font-semibold">
      {label}
      <textarea required={required} value={value} onChange={(event) => onChange(event.target.value)} rows={rows} className="rounded-lg border border-orange-200 bg-cream px-3 py-2 outline-none focus:border-salmon" />
    </label>
  );
}
