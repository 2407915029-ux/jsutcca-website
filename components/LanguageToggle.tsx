"use client";

import { useLanguage } from "@/components/LanguageProvider";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="inline-flex rounded-full border border-orange-200 bg-white p-1 text-xs font-bold text-stone-700">
      <button
        type="button"
        onClick={() => setLanguage("zh")}
        className={`rounded-full px-2.5 py-1 ${language === "zh" ? "bg-salmon text-white" : "hover:bg-orange-50"}`}
        aria-pressed={language === "zh"}
      >
        中文
      </button>
      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={`rounded-full px-2.5 py-1 ${language === "en" ? "bg-salmon text-white" : "hover:bg-orange-50"}`}
        aria-pressed={language === "en"}
      >
        EN
      </button>
    </div>
  );
}
