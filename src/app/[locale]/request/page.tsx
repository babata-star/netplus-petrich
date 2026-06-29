import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { RequestForm } from "@/components/RequestForm";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "RequestPage" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function RequestPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("RequestPage");

  return (
    <>
      <PageHero
        title={t("title")}
        subtitle={t("subtitle")}
        breadcrumbs={[{ label: t("title") }]}
      />
      <Section tone="white">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-3xl border border-ink-100 bg-white p-6 shadow-soft sm:p-8">
            <RequestForm />
          </div>
        </div>
      </Section>
    </>
  );
}
