import { useTranslations } from "next-intl";
import { Section, SectionHeading } from "@/components/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceCard } from "@/components/home/ServiceCard";

export function ServicesPreview() {
  const t = useTranslations("ServicesPreview");

  return (
    <Section tone="white">
      <SectionHeading
        eyebrow={t("subtitle")}
        title={t("title")}
        align="center"
      />

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {(["gpon", "gdn", "unitv"] as const).map((key, i) => (
          <Reveal key={key} delay={i * 120}>
            <ServiceCard serviceKey={key} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export default ServicesPreview;
