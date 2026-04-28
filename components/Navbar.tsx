import Link from "next/link";
import { Cat, HeartHandshake } from "lucide-react";
import { getAdminSession } from "@/lib/auth";
import { T } from "@/components/LanguageProvider";
import { LanguageToggle } from "@/components/LanguageToggle";

const links = [
  { href: "/", labelKey: "nav.home" },
  { href: "/cats", labelKey: "nav.cats" },
  { href: "/donate", labelKey: "nav.donate" },
  { href: "/shop", labelKey: "nav.shop" },
  { href: "/diary", labelKey: "nav.diary" }
];

export async function Navbar() {
  const session = await getAdminSession();

  return (
    <header className="sticky top-0 z-40 border-b border-orange-100 bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-salmon text-white">
            <Cat size={22} />
          </span>
          <T k="site.name" />
        </Link>
        <nav className="flex flex-wrap items-center gap-2 text-sm font-medium text-stone-700">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="rounded-full px-3 py-2 hover:bg-white">
              <T k={link.labelKey} />
            </Link>
          ))}
          <LanguageToggle />
          <Link
            href={session ? "/admin/dashboard" : "/admin/login"}
            className="inline-flex items-center gap-1 rounded-full bg-leaf px-3 py-2 text-white hover:bg-green-700"
          >
            <HeartHandshake size={16} />
            <T k="nav.admin" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
