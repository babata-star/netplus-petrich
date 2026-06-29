"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { StarIcon, CheckIcon } from "@/components/icons/Icons";
import { cn } from "@/lib/utils";

export function FeedbackForm() {
  const { data: session } = useSession();
  const t = useTranslations("Portal");
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        rating,
        comment,
        name: session?.user?.name || "Клиент",
      }),
    });
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center rounded-2xl bg-brand-50 p-10 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-500 text-white">
          <CheckIcon className="h-7 w-7" />
        </span>
        <p className="mt-4 font-semibold text-ink-900">
          Благодарим за вашия отзив!
        </p>
        <p className="mt-1 text-sm text-ink-500">
          Оценката ви ще бъде публикувана след одобрение от екипа.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Звезди */}
      <div>
        <label className="mb-2 block text-xs font-semibold text-ink-700">
          Вашата оценка
        </label>
        <div className="flex gap-1.5">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setRating(n)}
              onMouseEnter={() => setHover(n)}
              onMouseLeave={() => setHover(0)}
              className="transition-transform hover:scale-110"
              aria-label={`${n} звезди`}
            >
              <StarIcon
                className={cn(
                  "h-8 w-8",
                  (hover || rating) >= n
                    ? "text-accent-500"
                    : "text-ink-200"
                )}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Коментар */}
      <div>
        <label className="mb-1.5 block text-xs font-semibold text-ink-700">
          Коментар (по желание)
        </label>
        <textarea
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Споделете вашето мнение за обслужването..."
          className="w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/30"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-600 disabled:opacity-60"
      >
        {loading ? "..." : "Изпрати отзив"}
      </button>
    </form>
  );
}

export default FeedbackForm;
