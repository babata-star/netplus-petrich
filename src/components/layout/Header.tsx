"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import {
  MenuIcon,
  CloseIcon,
  ChevronDownIcon,
  FiberIcon,
  TvIcon,
  InteractiveTvIcon,
  PhoneIcon,
} from "@/components/icons/Icons";
import { cn, telHref } from "@/lib/utils";

const COMPANY_PHONE = "+359 88 000 0000";

export function Header() {
  const t = useTranslations("Nav");
  const ts = useTranslations("Services");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const navItems = [
    { label: t("home"), href: "/" },
    { label: t("services"), href: "/services", hasDropdown: true },
    { label: t("pricing"), href: "/pricing" },
    { label: t("news"), href: "/news" },
    { label: t("about"), href: "/about" },
    { label: t("contacts"), href: "/contacts" },
  ];

  const services = [
    { label: ts("gpon"), href: "/services/gpon", desc: "GPON", Icon: FiberIcon },
    { label: ts("gdn"), href: "/services/gdn", desc: "GDN", Icon: TvIcon },
    {
      label: ts("unitv"),
      href: "/services/unitv",
      desc: "UNITV",
      Icon: InteractiveTvIcon,
    },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 glass-light">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8">
        <Logo />

        {/* Десктоп навигация */}
        <nav className="hidden items-center gap-0.5 lg:flex">
          {navItems.map((item) =>
            item.hasDropdown ? (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                    isActive(item.href)
                      ? "text-brand-700"
                      : "text-ink-600 hover:bg-ink-50 hover:text-ink-900"
                  )}
                >
                  {item.label}
                  <ChevronDownIcon className="h-4 w-4" />
                </Link>
                {servicesOpen && (
                  <div className="absolute left-1/2 top-full w-72 -translate-x-1/2 pt-2">
                    <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white p-2 shadow-lift">
                      {services.map((s) => (
                        <Link
                          key={s.href}
                          href={s.href}
                          className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-ink-50"
                        >
                          <span className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                            <s.Icon className="h-5 w-5" />
                          </span>
                          <span className="flex flex-col">
                            <span className="text-sm font-semibold text-ink-900">
                              {s.label}
                            </span>
                            <span className="text-xs text-ink-500">
                              {s.desc}
                            </span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "text-brand-700"
                    : "text-ink-600 hover:bg-ink-50 hover:text-ink-900"
                )}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* Действия (десктоп) */}
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={telHref(COMPANY_PHONE)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-ink-900 transition-colors hover:text-brand-600"
          >
            <PhoneIcon className="h-4 w-4" />
            {COMPANY_PHONE}
          </a>
          <LanguageSwitcher />
          <ButtonLink href="/portal" variant="outline" size="sm">
            {t("portal")}
          </ButtonLink>
        </div>

        {/* Мобилни действия */}
        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink-900 hover:bg-ink-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
            aria-label={mobileOpen ? t("closeMenu") : t("openMenu")}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <CloseIcon className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Мобилно меню */}
      <div
        className={cn(
          "overflow-hidden border-t border-ink-100 bg-white transition-[max-height] duration-300 lg:hidden",
          mobileOpen ? "max-h-[36rem]" : "max-h-0"
        )}
      >
        <nav className="flex flex-col gap-1 px-5 py-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "rounded-xl px-4 py-3 text-base font-medium transition-colors",
                isActive(item.href)
                  ? "bg-brand-50 text-brand-700"
                  : "text-ink-800 hover:bg-ink-50"
              )}
            >
              {item.label}
            </Link>
          ))}
          <div className="ml-3 flex flex-col border-l border-ink-100 pl-3">
            {services.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-ink-600 hover:bg-ink-50"
              >
                <s.Icon className="h-4 w-4 text-brand-600" />
                {s.label}
              </Link>
            ))}
          </div>
          <div className="mt-3 flex flex-col gap-2 border-t border-ink-100 pt-3">
            <ButtonLink
              href="/portal"
              variant="secondary"
              size="md"
              onClick={() => setMobileOpen(false)}
            >
              {t("portal")}
            </ButtonLink>
            <a
              href={telHref(COMPANY_PHONE)}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-ink-200 px-5 py-2.5 text-sm font-semibold text-ink-900"
            >
              <PhoneIcon className="h-4 w-4" />
              {COMPANY_PHONE}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
