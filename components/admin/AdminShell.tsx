"use client";

import { usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/AdminSidebar";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }
  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[240px_1fr]">
      <AdminSidebar />
      <div className="min-w-0">{children}</div>
    </div>
  );
}
