"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const STATUSES = [
  { value: "OPEN", label: "Отворен" },
  { value: "WAITING", label: "В чакане" },
  { value: "ANSWERED", label: "Отговорен" },
  { value: "RESOLVED", label: "Решен" },
  { value: "CLOSED", label: "Затворен" },
];
const PRIORITIES = [
  { value: "LOW", label: "Нисък" },
  { value: "MEDIUM", label: "Среден" },
  { value: "HIGH", label: "Висок" },
  { value: "URGENT", label: "Спешен" },
];

export function AdminTicketStatusControl({
  id,
  initialStatus,
  initialPriority,
}: {
  id: string;
  initialStatus: string;
  initialPriority: string;
}) {
  const [status, setStatus] = useState(initialStatus);
  const [priority, setPriority] = useState(initialPriority);

  const update = async (field: "status" | "priority", value: string) => {
    if (field === "status") setStatus(value);
    else setPriority(value);
    await fetch(`/api/admin/tickets/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: value }),
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <label className="text-xs font-semibold text-ink-500">Статус:</label>
      <select
        value={status}
        onChange={(e) => update("status", e.target.value)}
        className="rounded-full border border-ink-200 bg-white px-3 py-1.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-brand-400"
      >
        {STATUSES.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>
      <label className="ml-2 text-xs font-semibold text-ink-500">Приоритет:</label>
      <select
        value={priority}
        onChange={(e) => update("priority", e.target.value)}
        className={cn(
          "rounded-full border border-ink-200 bg-white px-3 py-1.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-brand-400",
          priority === "URGENT" && "border-red-300"
        )}
      >
        {PRIORITIES.map((p) => (
          <option key={p.value} value={p.value}>
            {p.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default AdminTicketStatusControl;
