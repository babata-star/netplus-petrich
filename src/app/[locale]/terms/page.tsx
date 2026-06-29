import { setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { COMPANY } from "@/components/layout/Footer";

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isEn = locale === "en";
  const t = (bg: string, en: string) => (isEn ? en : bg);

  return (
    <>
      <PageHero
        title={t("Общи условия", "Terms of service")}
        breadcrumbs={[{ label: t("Общи условия", "Terms of service") }]}
      />
      <Section tone="white">
        <div className="mx-auto max-w-3xl space-y-6">
          <p className="text-ink-600">
            {t(
              `Настоящите общи условия уреждат отношенията между ${COMPANY.name} и потребителите на услугите ни.`,
              `These terms of service govern the relationship between ${COMPANY.name} and the users of our services.`
            )}
          </p>

          <div>
            <h2 className="text-xl font-bold text-ink-900">
              {t("1. Предмет", "1. Subject")}
            </h2>
            <p className="mt-2 text-ink-600">
              {t(
                "Осигуряване на достъп до интернет и телевизионни услуги по оптична мрежа на територията на посоченото покритие.",
                "Provision of access to internet and television services over a fiber network within the stated coverage area."
              )}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-ink-900">
              {t("2. Задължения на клиента", "2. Customer obligations")}
            </h2>
            <p className="mt-2 text-ink-600">
              {t(
                "Своевременно плащане на месечните абонаменти и използване на услугата съгласно закона.",
                "Timely payment of monthly subscriptions and use of the service in accordance with the law."
              )}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-ink-900">
              {t("3. Прекратяване", "3. Termination")}
            </h2>
            <p className="mt-2 text-ink-600">
              {t(
                "Всяка от страните може да прекрати договора с предизвестие съгласно договорените срокове.",
                "Either party may terminate the agreement with notice according to the agreed terms."
              )}
            </p>
          </div>

          <p className="rounded-xl bg-ink-50 p-4 text-sm text-ink-500">
            {t(
              "Това е заместващ документ. Консултирайте се с юрист преди публикуване.",
              "This is a placeholder document. Please consult a legal professional before publishing."
            )}
          </p>
        </div>
      </Section>
    </>
  );
}
