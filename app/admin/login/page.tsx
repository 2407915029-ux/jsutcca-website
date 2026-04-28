import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { LoginForm } from "@/components/admin/LoginForm";
import { T } from "@/components/LanguageProvider";

export default async function AdminLoginPage() {
  const session = await getAdminSession();
  if (session) redirect("/admin/dashboard");

  return (
    <div className="mx-auto max-w-md px-4 py-14 sm:px-6">
      <div className="rounded-lg bg-white p-6 shadow-soft">
        <p className="text-sm font-bold text-salmon"><T k="admin.loginEyebrow" /></p>
        <h1 className="mt-2 text-2xl font-bold"><T k="admin.loginTitle" /></h1>
        <p className="mt-2 text-sm leading-7 text-stone-600"><T k="admin.loginHint" /></p>
        <LoginForm />
      </div>
    </div>
  );
}
