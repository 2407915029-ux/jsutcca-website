import { Smile } from "lucide-react";

export function EmptyState({ title, description }: { title: string; description?: string }) {
  return (
    <div className="rounded-lg border border-dashed border-orange-200 bg-white/70 p-10 text-center">
      <Smile className="mx-auto text-salmon" />
      <h3 className="mt-4 text-lg font-bold">{title}</h3>
      {description ? <p className="mt-2 text-sm text-stone-600">{description}</p> : null}
    </div>
  );
}
