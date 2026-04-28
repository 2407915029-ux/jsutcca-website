import { Smile } from "lucide-react";
import { T } from "@/components/LanguageProvider";

export function EmptyState({
  title,
  description,
  titleKey,
  descriptionKey,
  titleValues,
  descriptionValues
}: {
  title?: string;
  description?: string;
  titleKey?: string;
  descriptionKey?: string;
  titleValues?: Record<string, string | number>;
  descriptionValues?: Record<string, string | number>;
}) {
  return (
    <div className="rounded-lg border border-dashed border-orange-200 bg-white/70 p-10 text-center">
      <Smile className="mx-auto text-salmon" />
      <h3 className="mt-4 text-lg font-bold">{titleKey ? <T k={titleKey} values={titleValues} /> : title}</h3>
      {descriptionKey || description ? <p className="mt-2 text-sm text-stone-600">{descriptionKey ? <T k={descriptionKey} values={descriptionValues} /> : description}</p> : null}
    </div>
  );
}
