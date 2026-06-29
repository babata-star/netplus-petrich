"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { TrashIcon, CheckIcon } from "@/components/icons/Icons";

type NewsData = {
  id?: string;
  slug: string;
  category: string;
  titleBg: string;
  titleEn: string;
  excerptBg: string;
  excerptEn: string;
  contentBg: string;
  contentEn: string;
  published: boolean;
};

export function NewsForm({ initial }: { initial?: NewsData }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState<NewsData>(
    initial || {
      slug: "",
      category: "Новина",
      titleBg: "",
      titleEn: "",
      excerptBg: "",
      excerptEn: "",
      contentBg: "",
      contentEn: "",
      published: true,
    }
  );

  const set = (k: keyof NewsData, v: string | boolean) =>
    setForm((f) => ({ ...f, [k]: v }));

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    const isEdit = !!form.id;
    const url = isEdit ? `/api/admin/news/${form.id}` : "/api/admin/news";
    const res = await fetch(url, {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Грешка при запис");
      setSaving(false);
      return;
    }
    router.push("/admin/news");
    router.refresh();
  };

  const remove = async () => {
    if (!form.id) return;
    if (!confirm("Изтриване на новината?")) return;
    await fetch(`/api/admin/news/${form.id}`, { method: "DELETE" });
    router.push("/admin/news");
    router.refresh();
  };

  // Авто-generate slug от заглавието
  const onTitleChange = (title: string) => {
    set("titleBg", title);
    if (!form.id) {
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9\u0400-\u04FF]+/g, "-")
        .replace(/^-+|-+$/g, "");
      set("slug", slug);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/30";
  const labelClass = "mb-1 block text-xs font-bold uppercase tracking-wider text-ink-500";

  return (
    <form onSubmit={save} className="space-y-6">
      {error && (
        <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Основни полета */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={labelClass}>Заглавие (БГ) *</label>
          <input
            required
            type="text"
            value={form.titleBg}
            onChange={(e) => onTitleChange(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>URL (slug) *</label>
          <input
            required
            type="text"
            value={form.slug}
            onChange={(e) => set("slug", e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Категория</label>
          <input
            type="text"
            value={form.category}
            onChange={(e) => set("category", e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      {/* Кратко описание */}
      <div>
        <label className={labelClass}>Кратко описание (БГ) *</label>
        <textarea
          required
          rows={2}
          value={form.excerptBg}
          onChange={(e) => set("excerptBg", e.target.value)}
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass}>Кратко описание (EN)</label>
        <textarea
          rows={2}
          value={form.excerptEn}
          onChange={(e) => set("excerptEn", e.target.value)}
          className={inputClass}
        />
      </div>

      {/* Пълно съдържание */}
      <div>
        <label className={labelClass}>Съдържание (БГ) *</label>
        <textarea
          required
          rows={6}
          value={form.contentBg}
          onChange={(e) => set("contentBg", e.target.value)}
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass}>Съдържание (EN)</label>
        <textarea
          rows={6}
          value={form.contentEn}
          onChange={(e) => set("contentEn", e.target.value)}
          className={inputClass}
        />
      </div>

      {/* Заглавие EN */}
      <div>
        <label className={labelClass}>Заглавие (EN)</label>
        <input
          type="text"
          value={form.titleEn}
          onChange={(e) => set("titleEn", e.target.value)}
          className={inputClass}
        />
      </div>

      {/* Публикуване */}
      <label className="flex cursor-pointer items-center gap-3">
        <input
          type="checkbox"
          checked={form.published}
          onChange={(e) => set("published", e.target.checked)}
          className="h-5 w-5 rounded border-ink-300 text-brand-500 focus:ring-brand-400"
        />
        <span className="text-sm font-medium text-ink-700">
          Публикувана (видима на сайта)
        </span>
      </label>

      {/* Бутони */}
      <div className="flex items-center gap-3 border-t border-ink-100 pt-5">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-2.5 text-sm font-semibold text-white shadow-soft transition-all hover:brightness-110 disabled:opacity-60"
        >
          <CheckIcon className="h-4 w-4" />
          {saving ? "Запис..." : form.id ? "Запази промените" : "Публикувай"}
        </button>
        <Link
          href="/admin/news"
          className="rounded-full border border-ink-200 px-5 py-2.5 text-sm font-semibold text-ink-600 hover:bg-ink-50"
        >
          Отказ
        </Link>
        {form.id && (
          <button
            type="button"
            onClick={remove}
            className="ml-auto inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50"
          >
            <TrashIcon className="h-4 w-4" />
            Изтрий
          </button>
        )}
      </div>
    </form>
  );
}

export default NewsForm;
