import Link from "next/link";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

/**
 * Компактен hero за вътрешни страници (услуги, контакти, и т.н.).
 * Има breadcrumb и заглавие/подзаглавие върху бранд градиент.
 */
export function PageHero({
  title,
  subtitle,
  eyebrow,
  breadcrumbs,
  children,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  breadcrumbs?: { label: string; href?: string }[];
  children?: React.ReactNode;
}) {
  const t = useTranslations("PageHero");

  return (
    <section className="relative overflow-hidden bg-ink-900 text-white bg-noise">
      <div className="absolute inset-0 bg-brand-gradient" />
      <div className="absolute inset-0 bg-grid-dark opacity-40" />
      <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand-400/20 blur-3xl" />
      <div className="absolute -left-16 bottom-0 h-72 w-72 rounded-full bg-accent-500/10 blur-3xl" />

      <div className="relative mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="breadcrumb" className="mb-5">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-ink-100/70">
              <li>
                <Link href="/" className="hover:text-white">
                  {t("home")}
                </Link>
              </li>
              {breadcrumbs.map((b, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-ink-300">/</span>
                  {b.href ? (
                    <Link href={b.href} className="hover:text-white">
                      {b.label}
                    </Link>
                  ) : (
                    <span className={cn("text-white")}>{b.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="max-w-3xl">
          {eyebrow && (
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.18em] text-brand-300">
              {eyebrow}
            </span>
          )}
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-100/85 sm:text-lg">
              {subtitle}
            </p>
          )}
          {children && <div className="mt-7">{children}</div>}
        </div>
      </div>
    </section>
  );
}

export default PageHero;
