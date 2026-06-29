"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function FeedbackActions({
  id,
  approved,
}: {
  id: string;
  approved: boolean;
}) {
  const router = useRouter();
  const [state, setState] = useState(approved);
  const [loading, setLoading] = useState<string | null>(null);

  const toggle = async () => {
    setLoading("toggle");
    const next = !state;
    setState(next);
    await fetch(`/api/admin/feedback/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ approved: next }),
    });
    setLoading(null);
  };

  const remove = async () => {
    if (!confirm("Изтриване на този отзив?")) return;
    setLoading("delete");
    await fetch(`/api/admin/feedback/${id}`, { method: "DELETE" });
    router.refresh();
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={toggle}
        disabled={loading !== null}
        className={cn(
          "rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors",
          state
            ? "bg-green-50 text-green-700 hover:bg-green-100"
            : "bg-ink-100 text-ink-500 hover:bg-ink-200"
        )}
      >
        {loading === "toggle" ? "..." : state ? "✓ Одобрен" : "Скрит"}
      </button>
      <button
        type="button"
        onClick={remove}
        disabled={loading !== null}
        className="rounded-full bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600 transition-colors hover:bg-red-100"
      >
        Изтрий
      </button>
    </div>
  );
}

export default FeedbackActions;
