"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { CheckIcon } from "@/components/icons/Icons";
import { cn } from "@/lib/utils";

export function NewTicketForm() {
  const t = useTranslations("Portal");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    category: "INTERNET",
    priority: "MEDIUM",
    subject: "",
    description: "",
  });

  const set = (k: keyof typeof form, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Грешка при подаване");
        setLoading(false);
        return;
      }
      router.push("/portal/tickets");
      router.refresh();
    } catch {
      setError("Възникна грешка");
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/30";

  const categories = [
    { value: "INTERNET", label: "Интернет" },
    { value: "TV", label: "Телевизия" },
    { value: "BILLING", label: "Таксуване" },
    { value: "EQUIPMENT", label: "Оборудване" },
    { value: "OTHER", label: "Друго" },
  ];
  const priorities = [
    { value: "LOW", label: t("low") },
    { value: "MEDIUM", label: t("medium") },
    { value: "HIGH", label: t("high") },
    { value: "URGENT", label: t("urgent") },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Категория */}
      <div>
        <label className="mb-2 block text-xs font-semibold text-ink-700">
          {t("ticketCategory")}
        </label>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => set("category", c.value)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                form.category === c.value
                  ? "bg-brand-500 text-white"
                  : "bg-ink-100 text-ink-600 hover:bg-ink-200"
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Приоритет */}
      <div>
        <label className="mb-2 block text-xs font-semibold text-ink-700">
          {t("ticketPriority")}
        </label>
        <div className="flex flex-wrap gap-2">
          {priorities.map((p) => (
            <button
              key={p.value}
              type="button"
              onClick={() => set("priority", p.value)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                form.priority === p.value
                  ? p.value === "URGENT"
                    ? "bg-red-500 text-white"
                    : "bg-ink-900 text-white"
                  : "bg-ink-100 text-ink-600 hover:bg-ink-200"
              )}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Относно */}
      <div>
        <label className="mb-1.5 block text-xs font-semibold text-ink-700">
          {t("ticketSubject")} *
        </label>
        <input
          required
          type="text"
          value={form.subject}
          onChange={(e) => set("subject", e.target.value)}
          className={inputClass}
        />
      </div>

      {/* Описание */}
      <div>
        <label className="mb-1.5 block text-xs font-semibold text-ink-700">
          {t("ticketDescription")} *
        </label>
        <textarea
          required
          rows={5}
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-600 disabled:opacity-60"
      >
        {loading ? "..." : (
          <>
            <CheckIcon className="h-4 w-4" />
            {t("submitTicket")}
          </>
        )}
      </button>
    </form>
  );
}

export default NewTicketForm;
