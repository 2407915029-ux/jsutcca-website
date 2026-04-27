import Link from "next/link";
import { BookOpen, Cat, LayoutDashboard, MessageSquare } from "lucide-react";

const adminLinks = [
  { href: "/admin/dashboard", label: "后台首页", icon: LayoutDashboard },
  { href: "/admin/cats", label: "管理猫咪", icon: Cat },
  { href: "/admin/diary", label: "活动日记", icon: BookOpen },
  { href: "/admin/comments", label: "评论管理", icon: MessageSquare }
];

export function AdminSidebar() {
  return (
    <aside className="rounded-lg bg-white p-4 shadow-soft lg:sticky lg:top-24">
      <p className="mb-3 px-3 text-sm font-bold text-stone-500">后台管理</p>
      <nav className="grid gap-2">
        {adminLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link key={link.href} href={link.href} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold hover:bg-orange-50">
              <Icon size={17} />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
