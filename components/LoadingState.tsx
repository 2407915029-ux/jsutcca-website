export function LoadingState({ text = "正在加载..." }: { text?: string }) {
  return (
    <div className="rounded-lg bg-white/80 p-6 text-center text-sm text-stone-600 shadow-soft">
      {text}
    </div>
  );
}
