import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetail } from "@/components/ServiceDetail";

type Props = {
  params: Promise<{ locale: string; service: string }>;
};

const VALID = ["gpon", "gdn", "unitv"] as const;

export function generateStaticParams() {
  return VALID.map((service) => ({ service }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale, service } = await params;
  if (!VALID.includes(service as (typeof VALID)[number])) {
    return {};
  }
  const tp = await getTranslations({
    locale,
    namespace: "ServicesPreview",
  });
  return {
    title: tp(`${service}.title`),
    description: tp(`${service}.desc`),
  };
}

export default async function ServicePage({ params }: Props) {
  const { locale, service } = await params;
  if (!VALID.includes(service as (typeof VALID)[number])) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <ServiceDetail
      slug={service as "gpon" | "gdn" | "unitv"}
      locale={locale}
    />
  );
}
