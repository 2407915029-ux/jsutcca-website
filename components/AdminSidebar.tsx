import Link from "next/link";
import { BookOpen, Cat, LayoutDashboard, MessageSquare } from "lucide-react";
import { T } from "@/components/LanguageProvider";

const adminLinks = [
  { href: "/admin/dashboard", labelKey: "admin.dashboard", icon: LayoutDashboard },
  { href: "/admin/cats", labelKey: "admin.manageCats", icon: Cat },
  { href: "/admin/diary", labelKey: "admin.manageDiary", icon: BookOpen },
  { href: "/admin/comments", labelKey: "admin.manageComments", icon: MessageSquare }
];

export function AdminSidebar() {
  return (
    <aside className="rounded-lg bg-white p-4 shadow-soft lg:sticky lg:top-24">
      <p className="mb-3 px-3 text-sm font-bold text-stone-500"><T k="admin.sidebarTitle" /></p>
      <nav className="grid gap-2">
        {adminLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link key={link.href} href={link.href} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold hover:bg-orange-50">
              <Icon size={17} />
              <T k={link.labelKey} />
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
