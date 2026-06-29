"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  PortalIcon,
  TicketIcon,
  BellIcon,
  StarIcon,
  GlobeIcon,
  ArrowRightIcon,
} from "@/components/icons/Icons";
import { LogoMark } from "@/components/Logo";
import { cn } from "@/lib/utils";

export function AdminSidebar({ userName }: { userName?: string | null }) {
  const pathname = usePathname();

  const items = [
    { label: "Табло", href: "/admin", Icon: PortalIcon },
    { label: "Заявки", href: "/admin/requests", Icon: BellIcon },
    { label: "Сигнали", href: "/admin/tickets", Icon: TicketIcon },
    { label: "Новини", href: "/admin/news", Icon: GlobeIcon },
    { label: "Отзиви", href: "/admin/feedback", Icon: StarIcon },
  ];

  return (
    <aside className="lg:sticky lg:top-8 lg:h-fit">
      <div className="rounded-2xl bg-ink-900 p-5 text-white">
        <div className="flex items-center gap-2.5">
          <LogoMark className="h-9 w-9" />
          <div>
            <div className="text-sm font-bold">Админ панел</div>
            <div className="text-xs text-ink-300">НЕТПЮС</div>
          </div>
        </div>
        <div className="mt-4 border-t border-ink-700 pt-3">
          <div className="text-xs text-ink-300">Влезли като:</div>
          <div className="truncate text-sm font-semibold">{userName}</div>
        </div>
      </div>

      <nav className="mt-4 space-y-1">
        {items.map((item) => {
          // Точно съвпадение за /admin, иначе startsWith
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                active
                  ? "bg-ink-900 text-white"
                  : "text-ink-600 hover:bg-ink-100"
              )}
            >
              <item.Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <button
        type="button"
        onClick={() => signOut({ callbackUrl: "/" })}
        className="mt-4 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-ink-500 transition-colors hover:bg-red-50 hover:text-red-600"
      >
        <ArrowRightIcon className="h-5 w-5 rotate-180" />
        Изход
      </button>
    </aside>
  );
}

export default AdminSidebar;
