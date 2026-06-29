"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "@/components/icons/Icons";

type Message = {
  id: string;
  authorRole: string;
  body: string;
  createdAt: string | Date;
};

export function TicketChat({
  ticketId,
  initialMessages,
}: {
  ticketId: string;
  initialMessages: Message[];
}) {
  const { data: session } = useSession();
  const [messages, setMessages] = useState(initialMessages);
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!body.trim()) return;
    setSending(true);

    const res = await fetch(`/api/tickets/${ticketId}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body }),
    });
    if (res.ok) {
      const data = await res.json();
      // Оптимистично добавяне
      setMessages((m) => [
        ...m,
        {
          id: data.id,
          authorRole: "client",
          body,
          createdAt: new Date().toISOString(),
        },
      ]);
      setBody("");
    }
    setSending(false);
  };

  return (
    <div className="flex flex-col rounded-2xl border border-ink-100 bg-white">
      {/* Съобщения */}
      <div className="max-h-[28rem] space-y-3 overflow-y-auto p-5">
        {messages.length === 0 && (
          <p className="py-8 text-center text-sm text-ink-400">
            Все още няма съобщения. Опишете проблема по-подробно тук.
          </p>
        )}
        {messages.map((m) => {
          const isStaff = m.authorRole === "staff";
          const isOwn = !isStaff && session?.user?.id;
          return (
            <div
              key={m.id}
              className={cn("flex", isOwn ? "justify-end" : "justify-start")}
            >
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm",
                  isStaff
                    ? "bg-brand-50 text-ink-900"
                    : isOwn
                      ? "bg-brand-gradient text-white"
                      : "bg-ink-100 text-ink-700"
                )}
              >
                {isStaff && (
                  <div className="mb-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-brand-600">
                    Екип НЕТПЮС
                  </div>
                )}
                <p className="whitespace-pre-wrap">{m.body}</p>
                <div
                  className={cn(
                    "mt-1 text-[0.65rem]",
                    isOwn && !isStaff ? "text-white/70" : "text-ink-400"
                  )}
                >
                  {new Date(m.createdAt).toLocaleString("bg-BG", {
                    day: "2-digit",
                    month: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={endRef} />
      </div>

      {/* Поле за отговор */}
      <form
        onSubmit={send}
        className="flex items-center gap-2 border-t border-ink-100 p-3"
      >
        <input
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Напишете отговор..."
          className="flex-1 rounded-full border border-ink-200 bg-ink-50 px-4 py-2.5 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/30"
        />
        <button
          type="submit"
          disabled={sending || !body.trim()}
          className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-accent-500 text-white transition-colors hover:bg-accent-600 disabled:opacity-50"
          aria-label="Изпрати"
        >
          <ArrowRightIcon className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
}

export default TicketChat;
