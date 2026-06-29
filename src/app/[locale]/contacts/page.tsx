import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { ContactForm } from "@/components/ContactForm";
import { COMPANY } from "@/components/layout/Footer";
import {
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  ClockIcon,
} from "@/components/icons/Icons";
import { telHref } from "@/lib/utils";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ContactsPage" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function ContactsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ContactsPage");
  const tf = await getTranslations("Footer");

  const contactCards = [
    {
      Icon: PhoneIcon,
      label: t("phone"),
      value: COMPANY.phone,
      href: telHref(COMPANY.phone),
      sub: `${t("support")} · ${t("sales")}`,
    },
    {
      Icon: MailIcon,
      label: t("email"),
      value: COMPANY.email,
      href: `mailto:${COMPANY.email}`,
      sub: COMPANY.supportEmail,
    },
    {
      Icon: MapPinIcon,
      label: t("address"),
      value: COMPANY.address,
      sub: tf("address"),
    },
    {
      Icon: ClockIcon,
      label: t("hours"),
      value: t("hoursValue"),
      sub: "",
    },
  ];

  return (
    <>
      <PageHero
        title={t("title")}
        subtitle={t("subtitle")}
        breadcrumbs={[{ label: t("title") }]}
      />

      <Section tone="white">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Контакт карти */}
          <div>
            <div className="grid gap-4 sm:grid-cols-2">
              {contactCards.map((c) => {
                const content = (
                  <div className="flex h-full flex-col rounded-2xl border border-ink-100 bg-white p-5 transition-all hover:border-brand-200 hover:shadow-soft">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                      <c.Icon className="h-5 w-5" />
                    </div>
                    <span className="mt-3 text-xs font-bold uppercase tracking-wider text-ink-400">
                      {c.label}
                    </span>
                    <span className="mt-1 font-semibold text-ink-900">
                      {c.value}
                    </span>
                    {c.sub && (
                      <span className="mt-0.5 text-xs text-ink-500">
                        {c.sub}
                      </span>
                    )}
                  </div>
                );
                return c.href ? (
                  <a
                    key={c.label}
                    href={c.href}
                    className="block h-full"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={c.label}>{content}</div>
                );
              })}
            </div>

            {/* Карта — Google Maps embed (без API ключ, надеждно) */}
            <div className="group relative mt-6 overflow-hidden rounded-2xl border border-ink-100 shadow-soft">
              <div className="relative aspect-[4/3] bg-ink-100">
                <iframe
                  title={t("mapTitle")}
                  src="https://maps.google.com/maps?width=100%25&height=400&hl=en&q=Petrich%2C%20Bulgaria&t=&z=13&ie=UTF8&iwloc=B&output=embed"
                  className="h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </div>

          {/* Форма */}
          <div>
            <div className="rounded-3xl border border-ink-100 bg-white p-6 sm:p-8">
              <h2 className="text-xl font-bold text-ink-900">
                {t("formTitle")}
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
