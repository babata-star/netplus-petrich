import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { Features } from "@/components/home/Features";
import { Coverage } from "@/components/home/Coverage";
import { PricingPreview } from "@/components/home/PricingPreview";
import { NewsPreview } from "@/components/home/NewsPreview";
import { Reviews } from "@/components/home/Reviews";
import { CtaSection } from "@/components/home/CtaSection";
import { getNews } from "@/lib/news";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const news = await getNews(locale);

  return (
    <>
      <Hero />
      <TrustBar />
      <ServicesPreview />
      <Features />
      <Coverage />
      <PricingPreview locale={locale} />
      <NewsPreview locale={locale} items={news} />
      <Reviews locale={locale} />
      <CtaSection />
    </>
  );
}
