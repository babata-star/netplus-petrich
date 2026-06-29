"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { LogoMark } from "@/components/Logo";

export default function LoginPage() {
  const t = useTranslations("Portal");
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });

  const set = (k: keyof typeof form, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "register") {
        // 1. Регистрация
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Грешка при регистрация");
          setLoading(false);
          return;
        }
      }

      // 2. Вход (след регистрация или директно)
      const result = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      if (result?.error) {
        setError(mode === "register" ? "Профилът е създаден, но входът е неуспешен." : "Грешен имейл или парола");
        setLoading(false);
        return;
      }
      router.push("/portal/dashboard");
      router.refresh();
    } catch {
      setError("Възникна грешка. Опитайте отново.");
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/30";

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-50 px-5 py-12">
      <div className="w-full max-w-md">
        {/* Лого */}
        <div className="mb-8 flex flex-col items-center">
          <LogoMark className="h-12 w-12" />
          <h1 className="mt-4 text-2xl font-extrabold text-ink-900">
            {t("title")}
          </h1>
          <p className="mt-1 text-sm text-ink-500">{t("subtitle")}</p>
        </div>

        <div className="rounded-3xl border border-ink-100 bg-white p-6 shadow-soft sm:p-8">
          {/* Tabs */}
          <div className="mb-6 flex rounded-full bg-ink-100 p-1">
            <button
              type="button"
              onClick={() => { setMode("login"); setError(""); }}
              className={`flex-1 rounded-full py-2 text-sm font-semibold transition-colors ${
                mode === "login" ? "bg-white text-ink-900 shadow-sm" : "text-ink-500"
              }`}
            >
              {t("login")}
            </button>
            <button
              type="button"
              onClick={() => { setMode("register"); setError(""); }}
              className={`flex-1 rounded-full py-2 text-sm font-semibold transition-colors ${
                mode === "register" ? "bg-white text-ink-900 shadow-sm" : "text-ink-500"
              }`}
            >
              {t("register")}
            </button>
          </div>

          <p className="mb-5 text-center text-sm text-ink-500">
            {mode === "login" ? t("loginDesc") : t("registerDesc")}
          </p>

          {error && (
            <div className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-ink-700">
                    Име и фамилия *
                  </label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-ink-700">
                      Телефон *
                    </label>
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-ink-700">
                      Адрес *
                    </label>
                    <input
                      required
                      type="text"
                      value={form.address}
                      onChange={(e) => set("address", e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-ink-700">
                {t("email")} *
              </label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-ink-700">
                {t("password")} *
              </label>
              <input
                required
                type="password"
                value={form.password}
                onChange={(e) => set("password", e.target.value)}
                className={inputClass}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center rounded-full bg-accent-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-600 disabled:opacity-60"
            >
              {loading ? "..." : mode === "login" ? t("loginButton") : t("registerButton")}
            </button>
          </form>

          {mode === "login" && (
            <Link
              href="/portal"
              className="mt-5 block text-center text-xs text-ink-400 hover:text-ink-600"
            >
              ← Обратно към началната
            </Link>
          )}

          {/* Демо акаунти */}
          {mode === "login" && (
            <div className="mt-6 rounded-xl bg-ink-50 p-3 text-center text-xs text-ink-500">
              <p className="font-semibold text-ink-700">Демо акаунти:</p>
              <p className="mt-1">Клиент: client@example.com / client123</p>
              <p>Админ: admin@netplus-petrich.bg / admin123</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
