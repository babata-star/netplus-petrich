import { useTranslations } from "next-intl";
import { Section, SectionHeading } from "@/components/Section";
import { Reveal } from "@/components/ui/Reveal";
import { StarIcon } from "@/components/icons/Icons";

/**
 * Фиктивни (заместващи) отзиви.
 */
const REVIEWS = {
  bg: [
    {
      name: "Митко К.",
      role: "Клиент от 2021",
      text: "Най-стабилният интернет в Петрич. Когато имам проблем, се обаждам на местни хора, а не на колцентър в друга държава.",
      rating: 5,
    },
    {
      name: "Елена Тодорова",
      role: "Домашен потребител",
      text: "Преминахме на НЕТПЛЮС заради GPON и няма връщане назад. Скоростта е точно каквато обещаха — симетрична и реална.",
      rating: 5,
    },
    {
      name: "Георги П.",
      role: "Малък бизнес",
      text: "За офиса ни важна е поддръжката. Отзивчиви са, идват бързо и говорят на човешки език. Препоръчвам.",
      rating: 5,
    },
  ],
  en: [
    {
      name: "Mitko K.",
      role: "Customer since 2021",
      text: "The most stable internet in Petrich. When I have an issue, I call local people — not an offshore call center.",
      rating: 5,
    },
    {
      name: "Elena Todorova",
      role: "Home user",
      text: "We switched to NETPLUS for GPON and there's no going back. The speed is exactly as promised — symmetric and real.",
      rating: 5,
    },
    {
      name: "Georgi P.",
      role: "Small business",
      text: "Support matters for our office. They're responsive, fast and speak human. Highly recommend.",
      rating: 5,
    },
  ],
};

export function Reviews({ locale }: { locale: string }) {
  const t = useTranslations("Reviews");
  const reviews = REVIEWS[locale === "en" ? "en" : "bg"];

  return (
    <Section tone="ash" className="bg-noise">
      <SectionHeading
        eyebrow={t("subtitle")}
        title={t("title")}
        align="center"
      />

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {reviews.map((r, i) => (
          <Reveal key={r.name} delay={i * 120} className="h-full">
            <figure className="flex h-full flex-col rounded-3xl border border-ink-100 bg-white p-7 shadow-xs">
              {/* Звезди */}
              <div className="flex gap-0.5">
                {Array.from({ length: r.rating }).map((_, idx) => (
                  <StarIcon key={idx} className="h-4 w-4 text-accent-500" />
                ))}
              </div>

              <blockquote className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-ink-700">
                &ldquo;{r.text}&rdquo;
              </blockquote>

              <figcaption className="mt-6 flex items-center gap-3 border-t border-ink-100 pt-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-900 text-sm font-bold text-white">
                  {r.name.charAt(0)}
                </span>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-ink-900">
                    {r.name}
                  </span>
                  <span className="text-xs text-ink-400">{r.role}</span>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export default Reviews;
