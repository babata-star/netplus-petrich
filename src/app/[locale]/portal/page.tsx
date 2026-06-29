import { setRequestLocale, getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { ButtonLink } from "@/components/ui/Button";
import { auth } from "@/auth";
import {
  TicketIcon,
  BellIcon,
  PortalIcon,
  StarIcon,
  ArrowRightIcon,
} from "@/components/icons/Icons";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Portal" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function PortalLandingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Portal");
  const tn = await getTranslations("Nav");
  const session = await auth();

  // Влезли потребители → директно в таблото
  if (session?.user) {
    redirect("/portal/dashboard");
  }

  const features = [
    { Icon: TicketIcon, title: t("tickets") },
    { Icon: BellIcon, title: t("requests") },
    { Icon: StarIcon, title: t("feedback") },
    { Icon: PortalIcon, title: t("dashboard") },
  ];

  return (
    <>
      <PageHero
        title={t("title")}
        subtitle={t("subtitle")}
        breadcrumbs={[{ label: t("title") }]}
      />
      <Section tone="white">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent-200 bg-accent-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-accent-700">
            <span className="flex h-2 w-2 animate-pulse rounded-full bg-accent-500" />
            Beta
          </div>

          <h2 className="mt-6 text-2xl font-extrabold text-ink-900 sm:text-3xl">
            {t("comingSoon")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink-500">
            {t("comingSoonDesc")}
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="flex flex-col items-center rounded-2xl border border-ink-100 bg-white p-5"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <f.Icon className="h-6 w-6" />
                </span>
                <span className="mt-3 text-sm font-semibold text-ink-700">
                  {f.title}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-3xl bg-brand-gradient p-8 text-white">
            <div className="bg-grid-dark">
              <h3 className="text-xl font-bold">Влезте във вашия портал</h3>
              <p className="mt-2 text-sm text-ink-100/85">
                Подавайте сигнали, проследявайте заявки и общувайте с екипа —
                24/7, от всяко устройство.
              </p>
              <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <ButtonLink href="/portal/login" variant="primary" size="md">
                  {t("login")}
                  <ArrowRightIcon className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink
                  href="/contacts"
                  variant="outline"
                  size="md"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  {tn("contacts")}
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
