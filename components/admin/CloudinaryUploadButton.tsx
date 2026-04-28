"use client";

import { useRef, useState } from "react";
import { UploadCloud } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

type SignatureResponse = {
  cloudName: string;
  apiKey: string;
  uploadPreset?: string;
  timestamp: number;
  folder: string;
  signature: string;
  message?: string;
};

export function CloudinaryUploadButton({
  folder,
  multiple = true,
  onUploaded
}: {
  folder: string;
  multiple?: boolean;
  onUploaded: (urls: string[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const { t } = useLanguage();

  async function upload(files: FileList | null) {
    if (!files?.length) return;
    setUploading(true);
    setMessage("");

    try {
      const signatureResponse = await fetch("/api/admin/cloudinary/signature", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder })
      });
      const signature = (await signatureResponse.json()) as SignatureResponse;
      if (!signatureResponse.ok) {
        throw new Error(signature.message || t("admin.uploadSignatureFailed"));
      }

      const urls: string[] = [];
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("api_key", signature.apiKey);
        formData.append("timestamp", String(signature.timestamp));
        formData.append("folder", signature.folder);
        formData.append("signature", signature.signature);
        if (signature.uploadPreset) {
          formData.append("upload_preset", signature.uploadPreset);
        }

        const uploadResponse = await fetch(`https://api.cloudinary.com/v1_1/${signature.cloudName}/image/upload`, {
          method: "POST",
          body: formData
        });
        const data = await uploadResponse.json();
        if (!uploadResponse.ok || !data.secure_url) {
          throw new Error(data.error?.message || t("admin.uploadFailed"));
        }
        urls.push(data.secure_url);
      }

      onUploaded(urls);
      setMessage(t("admin.uploadedImages", { count: urls.length }));
    } catch (error) {
      setMessage(error instanceof Error ? error.message : t("admin.uploadFailed"));
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-2">
      <input ref={inputRef} type="file" accept="image/*" multiple={multiple} className="hidden" onChange={(event) => upload(event.target.files)} />
      <button type="button" onClick={() => inputRef.current?.click()} disabled={uploading} className="inline-flex items-center gap-2 rounded-lg bg-leaf px-3 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-60">
        <UploadCloud size={16} />
        {uploading ? t("admin.uploading") : multiple ? t("admin.uploadImages") : t("admin.uploadCover")}
      </button>
      {message ? <p className="text-sm text-stone-500">{message}</p> : null}
    </div>
  );
}
