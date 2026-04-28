"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Cat } from "@prisma/client";
import { ImageUrlInput } from "@/components/ImageUrlInput";
import { CloudinaryUploadButton } from "@/components/admin/CloudinaryUploadButton";
import { useLanguage } from "@/components/LanguageProvider";

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
  const { t } = useLanguage();
  const catStatusOptions = {
    available: t("catStatus.available"),
    adopted: t("catStatus.adopted"),
    deceased: t("catStatus.deceased")
  };
  const genderOptions = {
    male: t("gender.male"),
    female: t("gender.female"),
    unknown: t("gender.unknown")
  };

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
      setMessage(t("common.saveFailed"));
      return;
    }
    router.push("/admin/cats");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="grid gap-5 rounded-lg bg-white p-5 shadow-soft sm:p-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Input label={t("admin.catNameRequired")} value={form.name} onChange={(value) => setField("name", value)} required />
        <Select label={t("admin.status")} value={form.status} onChange={(value) => setField("status", value as CatPayload["status"])} options={catStatusOptions} />
        <Select label={t("admin.gender")} value={form.gender} onChange={(value) => setField("gender", value as CatPayload["gender"])} options={genderOptions} />
        <Input label={t("admin.age")} value={form.age || ""} onChange={(value) => setField("age", value)} />
        <Input label={t("admin.color")} value={form.color || ""} onChange={(value) => setField("color", value)} />
        <Input label={t("admin.location")} value={form.location || ""} onChange={(value) => setField("location", value)} />
      </div>
      <Textarea label={t("admin.descriptionRequired")} value={form.description} onChange={(value) => setField("description", value)} required />
      <div className="grid gap-4 md:grid-cols-3">
        <Input label={t("admin.personality")} value={form.personality || ""} onChange={(value) => setField("personality", value)} />
        <Input label={t("admin.health")} value={form.healthStatus || ""} onChange={(value) => setField("healthStatus", value)} />
        <Select label={t("admin.friendly")} value={form.friendly === null ? "unknown" : form.friendly ? "true" : "false"} onChange={(value) => setField("friendly", value === "unknown" ? null : value === "true")} options={{ true: t("admin.adoptedFriendly"), false: t("admin.observe"), unknown: t("admin.unknown") }} />
      </div>
      <div className="flex flex-wrap gap-4">
        <Checkbox label={t("admin.sterilized")} checked={form.sterilized} onChange={(value) => setField("sterilized", value)} />
        <Checkbox label={t("admin.dewormed")} checked={form.dewormed} onChange={(value) => setField("dewormed", value)} />
      </div>
      <Textarea label={t("admin.adoptionNotes")} value={form.adoptionRequirements || ""} onChange={(value) => setField("adoptionRequirements", value)} />
      <Textarea label={t("admin.rescueRecord")} value={form.rescueRecord || ""} onChange={(value) => setField("rescueRecord", value)} />
      <Textarea label={t("admin.medicalRecord")} value={form.medicalRecord || ""} onChange={(value) => setField("medicalRecord", value)} />
      <label className="grid gap-2 text-sm font-semibold">
        {t("admin.imageUrls")} <span className="font-normal text-stone-500">{t("admin.imageUrlsHint")}</span>
        <CloudinaryUploadButton folder="meow-team/cats" onUploaded={(urls) => setField("images", [...form.images, ...urls])} />
        <ImageUrlInput values={form.images} onChange={(values) => setField("images", values)} />
      </label>
      {message ? <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{message}</p> : null}
      <button disabled={loading} className="rounded-lg bg-salmon px-4 py-3 font-semibold text-white hover:bg-orange-700 disabled:opacity-60">
        {loading ? t("common.saving") : t("admin.saveCat")}
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
