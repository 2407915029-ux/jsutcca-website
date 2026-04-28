import { T } from "@/components/LanguageProvider";

export function Footer() {
  return (
    <footer className="border-t border-orange-100 bg-white/65">
      <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-stone-600 sm:px-6">
        <p className="font-bold text-ink"><T k="site.name" /></p>
        <p className="mt-2"><T k="site.footerTagline" /></p>
      </div>
    </footer>
  );
}
