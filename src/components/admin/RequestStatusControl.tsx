"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const STATUSES = [
  { value: "NEW", label: "Нова", color: "bg-red-50 text-red-700" },
  { value: "IN_PROGRESS", label: "В процес", color: "bg-accent-50 text-accent-700" },
  { value: "CONTACTED", label: "Свързахме се", color: "bg-blue-50 text-blue-700" },
  { value: "DONE", label: "Завършена", color: "bg-green-50 text-green-700" },
  { value: "CANCELLED", label: "Отказана", color: "bg-ink-100 text-ink-600" },
];

export function RequestStatusControl({
  id,
  initialStatus,
}: {
  id: string;
  initialStatus: string;
}) {
  const [status, setStatus] = useState(initialStatus);
  const [saving, setSaving] = useState(false);

  const change = async (newStatus: string) => {
    setSaving(true);
    setStatus(newStatus);
    await fetch(`/api/admin/requests/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    setSaving(false);
  };

  const current = STATUSES.find((s) => s.value === status) || STATUSES[0];

  return (
    <select
      value={status}
      onChange={(e) => change(e.target.value)}
      disabled={saving}
      className={cn(
        "rounded-full border-0 px-3 py-1.5 text-xs font-bold uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-brand-400",
        current.color
      )}
    >
      {STATUSES.map((s) => (
        <option key={s.value} value={s.value} className="bg-white text-ink-900">
          {s.label}
        </option>
      ))}
    </select>
  );
}

export default RequestStatusControl;
