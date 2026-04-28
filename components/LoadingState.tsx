import { T } from "@/components/LanguageProvider";

export function LoadingState({ text, textKey = "common.loading" }: { text?: string; textKey?: string }) {
  return (
    <div className="rounded-lg bg-white/80 p-6 text-center text-sm text-stone-600 shadow-soft">
      {text || <T k={textKey} />}
    </div>
  );
}
