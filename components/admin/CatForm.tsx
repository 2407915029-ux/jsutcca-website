"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Cat } from "@prisma/client";
import { ImageUrlInput } from "@/components/ImageUrlInput";
import { CloudinaryUploadButton } from "@/components/admin/CloudinaryUploadButton";
import { catStatusLabels, genderLabels } from "@/lib/labels";

type CatPayload = Omit<Cat, "id" | "createdAt" | "updatedAt">;

const emptyCat: CatPayload = {
  name: "",
  status: "available",
  gender: "unknown",
  age: "",
  color: "",
  location: "",
  description: "",
  personality: "",
  healthStatus: "",
  sterilized: false,
  dewormed: false,
  friendly: null,
  adoptionRequirements: "",
  rescueRecord: "",
  medicalRecord: "",
  images: []
};

export function CatForm({ cat }: { cat?: Cat }) {
  const router = useRouter();
  const [form, setForm] = useState<CatPayload>(cat ? { ...cat } : emptyCat);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function setField<K extends keyof CatPayload>(key: K, value: CatPayload[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    const response = await fetch(cat ? `/api/admin/cats/${cat.id}` : "/api/admin/cats", {
      method: cat ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, images: form.images.filter(Boolean) })
    });
    const data = await response.json();
    setLoading(false);
    if (!response.ok) {
      setMessage(data.message || "保存失败");
      return;
    }
    router.push("/admin/cats");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="grid gap-5 rounded-lg bg-white p-5 shadow-soft sm:p-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Input label="名字（必填）" value={form.name} onChange={(value) => setField("name", value)} required />
        <Select label="状态" value={form.status} onChange={(value) => setField("status", value as CatPayload["status"])} options={catStatusLabels} />
        <Select label="性别" value={form.gender} onChange={(value) => setField("gender", value as CatPayload["gender"])} options={genderLabels} />
        <Input label="年龄" value={form.age || ""} onChange={(value) => setField("age", value)} />
        <Input label="花色" value={form.color || ""} onChange={(value) => setField("color", value)} />
        <Input label="常出没地点" value={form.location || ""} onChange={(value) => setField("location", value)} />
      </div>
      <Textarea label="简介（必填）" value={form.description} onChange={(value) => setField("description", value)} required />
      <div className="grid gap-4 md:grid-cols-3">
        <Input label="性格描述" value={form.personality || ""} onChange={(value) => setField("personality", value)} />
        <Input label="健康情况" value={form.healthStatus || ""} onChange={(value) => setField("healthStatus", value)} />
        <Select label="是否亲人" value={form.friendly === null ? "unknown" : form.friendly ? "true" : "false"} onChange={(value) => setField("friendly", value === "unknown" ? null : value === "true")} options={{ true: "亲人", false: "待观察", unknown: "未知" }} />
      </div>
      <div className="flex flex-wrap gap-4">
        <Checkbox label="已绝育" checked={form.sterilized} onChange={(value) => setField("sterilized", value)} />
        <Checkbox label="已驱虫" checked={form.dewormed} onChange={(value) => setField("dewormed", value)} />
      </div>
      <Textarea label="领养要求或备注" value={form.adoptionRequirements || ""} onChange={(value) => setField("adoptionRequirements", value)} />
      <Textarea label="救助记录" value={form.rescueRecord || ""} onChange={(value) => setField("rescueRecord", value)} />
      <Textarea label="医疗记录" value={form.medicalRecord || ""} onChange={(value) => setField("medicalRecord", value)} />
      <label className="grid gap-2 text-sm font-semibold">
        图片 URL <span className="font-normal text-stone-500">一行一个，可手动输入，也可上传到 Cloudinary 后自动填入</span>
        <CloudinaryUploadButton folder="meow-team/cats" onUploaded={(urls) => setField("images", [...form.images, ...urls])} />
        <ImageUrlInput values={form.images} onChange={(values) => setField("images", values)} />
      </label>
      {message ? <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{message}</p> : null}
      <button disabled={loading} className="rounded-lg bg-salmon px-4 py-3 font-semibold text-white hover:bg-orange-700 disabled:opacity-60">
        {loading ? "保存中..." : "保存猫咪信息"}
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

function Textarea({ label, value, onChange, required }: { label: string; value: string; onChange: (value: string) => void; required?: boolean }) {
  return (
    <label className="grid gap-2 text-sm font-semibold">
      {label}
      <textarea required={required} value={value} onChange={(event) => onChange(event.target.value)} rows={4} className="rounded-lg border border-orange-200 bg-cream px-3 py-2 outline-none focus:border-salmon" />
    </label>
  );
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: Record<string, string> }) {
  return (
    <label className="grid gap-2 text-sm font-semibold">
      {label}
      <select value={value} onChange={(event) => onChange(event.target.value)} className="rounded-lg border border-orange-200 bg-cream px-3 py-2 outline-none focus:border-salmon">
        {Object.entries(options).map(([optionValue, labelText]) => <option key={optionValue} value={optionValue}>{labelText}</option>)}
      </select>
    </label>
  );
}

function Checkbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <label className="flex items-center gap-2 rounded-lg bg-orange-50 px-4 py-3 text-sm font-semibold">
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />
      {label}
    </label>
  );
}
