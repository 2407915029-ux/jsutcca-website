"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    setLoading(false);
    if (!response.ok) {
      setMessage(t("admin.loginFailed"));
      return;
    }
    router.push(searchParams.get("from") || "/admin/dashboard");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="mt-6 grid gap-4">
      <label className="grid gap-2 text-sm font-semibold">
        {t("admin.username")}
        <input value={username} onChange={(event) => setUsername(event.target.value)} className="rounded-lg border border-orange-200 bg-cream px-4 py-3 outline-none focus:border-salmon" />
      </label>
      <label className="grid gap-2 text-sm font-semibold">
        {t("admin.password")}
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="rounded-lg border border-orange-200 bg-cream px-4 py-3 outline-none focus:border-salmon" />
      </label>
      {message ? <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{message}</p> : null}
      <button disabled={loading} className="rounded-lg bg-salmon px-4 py-3 font-semibold text-white hover:bg-orange-700 disabled:opacity-60">
        {loading ? t("admin.loggingIn") : t("admin.login")}
      </button>
    </form>
  );
}
