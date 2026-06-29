"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import {
  PortalIcon,
  TicketIcon,
  BellIcon,
  StarIcon,
  ArrowRightIcon,
} from "@/components/icons/Icons";
import { LogoMark } from "@/components/Logo";
import { cn } from "@/lib/utils";

export function PortalSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const t = useTranslations("Portal");
  const tNav = useTranslations("Nav");

  const items = [
    { label: t("dashboard"), href: "/portal/dashboard", Icon: PortalIcon },
    { label: t("tickets"), href: "/portal/tickets", Icon: TicketIcon },
    { label: t("requests"), href: "/portal/requests", Icon: BellIcon },
    { label: t("feedback"), href: "/portal/feedback", Icon: StarIcon },
  ];

  return (
    <aside className="lg:sticky lg:top-20 lg:h-fit">
      {/* Профил карта */}
      <div className="rounded-2xl border border-ink-100 bg-white p-5">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-gradient text-sm font-bold text-white">
            {session?.user?.name?.charAt(0) || "U"}
          </span>
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-sm font-semibold text-ink-900">
              {session?.user?.name}
            </span>
            <span className="truncate text-xs text-ink-500">
              {session?.user?.email}
            </span>
          </div>
        </div>
      </div>

      {/* Навигация */}
      <nav className="mt-4 space-y-1">
        {items.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                active
                  ? "bg-brand-50 text-brand-700"
                  : "text-ink-600 hover:bg-ink-50 hover:text-ink-900"
              )}
            >
              <item.Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Изход */}
      <button
        type="button"
        onClick={() => signOut({ callbackUrl: "/" })}
        className="mt-4 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-ink-500 transition-colors hover:bg-red-50 hover:text-red-600"
      >
        <ArrowRightIcon className="h-5 w-5 rotate-180" />
        Изход
      </button>

      {/* Към сайта */}
      <Link
        href="/"
        className="mt-2 flex items-center justify-center gap-2 rounded-xl border border-ink-100 px-4 py-2.5 text-xs font-semibold text-ink-500 hover:bg-ink-50"
      >
        <LogoMark className="h-4 w-4" />
        {tNav("home")}
      </Link>
    </aside>
  );
}

export default PortalSidebar;
