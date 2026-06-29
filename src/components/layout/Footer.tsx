import Link from "next/link";
import { useTranslations } from "next-intl";
import { LogoMark } from "@/components/Logo";
import {
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  ClockIcon,
  FiberIcon,
  TvIcon,
  InteractiveTvIcon,
} from "@/components/icons/Icons";
import { telHref } from "@/lib/utils";

export const COMPANY = {
  name: "НЕТПЮС ПЕТРИЧ",
  phone: "0882 888 388",
  email: "netplus.petrich@gmail.com",
  supportEmail: "netplus.petrich@gmail.com",
  address: "гр. Петрич 2850, ул. Братя Миладинови № 1",
  eik: "101531108",
};

export function Footer() {
  const t = useTranslations("Footer");
  const ts = useTranslations("Services");
  const tn = useTranslations("Nav");

  const services = [
    { label: ts("gpon"), href: "/services/gpon", Icon: FiberIcon },
    { label: ts("gdn"), href: "/services/gdn", Icon: TvIcon },
    { label: ts("unitv"), href: "/services/unitv", Icon: InteractiveTvIcon },
  ];

  const company = [
    { label: tn("about"), href: "/about" },
    { label: tn("pricing"), href: "/pricing" },
    { label: tn("news"), href: "/news" },
    { label: tn("contacts"), href: "/contacts" },
  ];

  const support = [
    { label: tn("portal"), href: "/portal" },
    { label: t("reportProblem"), href: "/portal/tickets/new" },
    { label: t("privacy"), href: "/privacy" },
    { label: t("terms"), href: "/terms" },
  ];

  return (
    <footer className="bg-ink-900 text-ink-100">
      <div className="bg-grid-dark">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-12">
          {/* Бранд колона */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2.5">
              <LogoMark className="h-10 w-10" />
              <div className="flex flex-col leading-none">
                <span className="text-lg font-extrabold tracking-tight text-white">
                  НЕТПЮС
                </span>
                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-brand-400">
                  Петрич
                </span>
              </div>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-200">
              {t("tagline")}
            </p>

            <div className="mt-6 space-y-2.5 text-sm">
              <a
                href={telHref(COMPANY.phone)}
                className="flex items-center gap-3 text-ink-200 transition-colors hover:text-brand-300"
              >
                <PhoneIcon className="h-4 w-4 text-brand-400" />
                {COMPANY.phone}
              </a>
              <a
                href={`mailto:${COMPANY.email}`}
                className="flex items-center gap-3 text-ink-200 transition-colors hover:text-brand-300"
              >
                <MailIcon className="h-4 w-4 text-brand-400" />
                {COMPANY.email}
              </a>
              <span className="flex items-center gap-3 text-ink-200">
                <MapPinIcon className="h-4 w-4 text-brand-400" />
                {t("address")}
              </span>
              <span className="flex items-center gap-3 text-ink-200">
                <ClockIcon className="h-4 w-4 text-brand-400" />
                {t("hoursValue")}
              </span>
            </div>
          </div>

          {/* Услуги */}
          <div className="lg:col-span-2">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
              {t("servicesTitle")}
            </h3>
            <ul className="space-y-2.5 text-sm">
              {services.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="flex items-center gap-2 text-ink-200 transition-colors hover:text-brand-300"
                  >
                    <s.Icon className="h-4 w-4 text-brand-400/70" />
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Фирма */}
          <div className="lg:col-span-2">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
              {t("companyTitle")}
            </h3>
            <ul className="space-y-2.5 text-sm">
              {company.map((c) => (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    className="text-ink-200 transition-colors hover:text-brand-300"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Поддръжка */}
          <div className="lg:col-span-2">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
              {t("supportTitle")}
            </h3>
            <ul className="space-y-2.5 text-sm">
              {support.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="text-ink-200 transition-colors hover:text-brand-300"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-ink-700 bg-ink-800 p-5">
              <p className="text-sm font-semibold text-white">
                {tn("getConnected")}
              </p>
              <Link
                href="/request"
                className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-accent-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-600"
              >
                {COMPANY.phone}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Долен ред */}
      <div className="border-t border-ink-800">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-5 py-5 text-xs text-ink-300 sm:flex-row sm:px-8">
          <p>
            © {new Date().getFullYear()} {COMPANY.name}. {t("rights")}
          </p>
          <p>
            ЕИК: {COMPANY.eik} · {COMPANY.address}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
