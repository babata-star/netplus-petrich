import { useTranslations } from "next-intl";
import { Section, SectionHeading } from "@/components/Section";
import { Reveal } from "@/components/ui/Reveal";
import {
  TicketIcon,
  BellIcon,
  MailIcon,
  PortalIcon,
  StarIcon,
  MessageIcon,
} from "@/components/icons/Icons";

export function Features() {
  const t = useTranslations("Features");

  const features = [
    { key: "f1", Icon: TicketIcon, accent: "brand" },
    { key: "f2", Icon: BellIcon, accent: "accent" },
    { key: "f3", Icon: MailIcon, accent: "brand" },
    { key: "f4", Icon: PortalIcon, accent: "accent" },
    { key: "f5", Icon: StarIcon, accent: "brand" },
    { key: "f6", Icon: MessageIcon, accent: "accent" },
  ];

  return (
    <Section tone="ash" className="bg-noise">
      <SectionHeading
        eyebrow={t("subtitle")}
        title={t("title")}
        align="center"
      />

      <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-ink-100 bg-ink-100 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <Reveal key={f.key} delay={(i % 3) * 80} className="h-full">
            <div className="group flex h-full flex-col bg-white p-7 transition-colors hover:bg-ink-50/40">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 ${
                  f.accent === "brand"
                    ? "bg-brand-50 text-brand-600 group-hover:bg-brand-500 group-hover:text-white"
                    : "bg-accent-50 text-accent-600 group-hover:bg-accent-500 group-hover:text-white"
                }`}
              >
                <f.Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-base font-bold text-ink-900">
                {t(`${f.key}Title`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">
                {t(`${f.key}Desc`)}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export default Features;
