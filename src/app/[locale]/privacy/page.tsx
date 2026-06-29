import { setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { COMPANY } from "@/components/layout/Footer";

export default async function PrivacyPage({
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
        title={t("Политика за поверителност", "Privacy Policy")}
        breadcrumbs={[
          { label: t("Политика за поверителност", "Privacy Policy") },
        ]}
      />
      <Section tone="white">
        <div className="mx-auto max-w-3xl space-y-6">
          <p className="text-ink-600">
            {t(
              `Тази политика за поверителност описва как ${COMPANY.name} събира, използва и защитава вашите лични данни.`,
              `This privacy policy describes how ${COMPANY.name} collects, uses and protects your personal data.`
            )}
          </p>

          <div>
            <h2 className="text-xl font-bold text-ink-900">
              {t("1. Данни, които събираме", "1. Data we collect")}
            </h2>
            <p className="mt-2 text-ink-600">
              {t(
                "Име, адрес, телефон, имейл и технически данни, необходими за предоставяне на услугата.",
                "Name, address, phone, email and technical data necessary to provide the service."
              )}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-ink-900">
              {t("2. Как използваме данните", "2. How we use data")}
            </h2>
            <p className="mt-2 text-ink-600">
              {t(
                "За предоставяне и поддържане на услугата, обработка на сигнали и изпращане на известия.",
                "To provide and maintain the service, handle support tickets and send notifications."
              )}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-ink-900">
              {t("3. Съхранение", "3. Retention")}
            </h2>
            <p className="mt-2 text-ink-600">
              {t(
                "Съхраняваме данните ви само толкова, колкото е необходимо за целите, за които са събрани, съгласно закона.",
                "We retain your data only as long as necessary for the purposes for which it was collected, in accordance with the law."
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
