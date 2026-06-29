import { useTranslations } from "next-intl";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { ButtonLink } from "@/components/ui/Button";
import { CtaSection } from "@/components/home/CtaSection";
import {
  CheckIcon,
  ArrowRightIcon,
  FiberIcon,
  TvIcon,
  InteractiveTvIcon,
  GaugeIcon,
  ShieldIcon,
  GlobeIcon,
} from "@/components/icons/Icons";

type ServiceSlug = "gpon" | "gdn" | "unitv";

const META: Record<
  ServiceSlug,
  { gradient: string; Icon: typeof FiberIcon; specs: { key: string; Icon: typeof GaugeIcon }[] }
> = {
  gpon: {
    gradient: "from-brand-500 to-brand-700",
    Icon: FiberIcon,
    specs: [
      { key: "speeds", Icon: GaugeIcon },
      { key: "coverage", Icon: GlobeIcon },
      { key: "technology", Icon: ShieldIcon },
    ],
  },
  gdn: {
    gradient: "from-ink-600 to-ink-800",
    Icon: TvIcon,
    specs: [
      { key: "channels", Icon: TvIcon },
      { key: "quality", Icon: GaugeIcon },
      { key: "coverage", Icon: GlobeIcon },
    ],
  },
  unitv: {
    gradient: "from-accent-400 to-accent-600",
    Icon: InteractiveTvIcon,
    specs: [
      { key: "quality", Icon: GaugeIcon },
      { key: "technology", Icon: ShieldIcon },
      { key: "coverage", Icon: GlobeIcon },
    ],
  },
};

// Специфични стойности (заместващи) за всеки service
const SPEC_VALUES: Record<ServiceSlug, Record<string, string>> = {
  gpon: {
    speeds: "100 / 300 / 1000 Mbps",
    coverage: "Петрич и региона",
    technology: "GPON · симетрична",
  },
  gdn: {
    channels: "200+ HD канала",
    quality: "Full HD · 1080p",
    coverage: "Всяка точка от мрежата",
  },
  unitv: {
    quality: "Full HD · мулти-устройства",
    technology: "Запис · Пауза · VoD",
    coverage: "ТВ · Телефон · Таблет",
  },
};

// Предимства за всеки service
const FEATURES: Record<ServiceSlug, { bg: string[]; en: string[] }> = {
  gpon: {
    bg: [
      "Симетрична скорост — качване = сваляне",
      "Ниска латентност за гейминг и видео-обаждания",
      "Стабилна връзка без спадове в пикови часове",
      "Оптика до дома — без медни кабели",
      "Възможност за статичен IP",
      "Мониторинг на връзката 24/7",
    ],
    en: [
      "Symmetric speed — upload = download",
      "Low latency for gaming and video calls",
      "Stable connection without peak-hour drops",
      "Fiber to the home — no copper cables",
      "Static IP available",
      "24/7 connection monitoring",
    ],
  },
  gdn: {
    bg: [
      "200+ канала в HD и Full HD качество",
      "Спорт, филми, деца, документалистика, новини",
      "Електронен гид за програмата (EPG)",
      "Без прекъсвания от времето",
      "Родителски контрол",
      "Бързо превключване между канали",
    ],
    en: [
      "200+ channels in HD and Full HD quality",
      "Sports, movies, kids, documentaries, news",
      "Electronic program guide (EPG)",
      "No weather-related interruptions",
      "Parental controls",
      "Fast channel switching",
    ],
  },
  unitv: {
    bg: [
      "Пауза и превъртане на живо ТВ",
      "Запис на програми в облака",
      "Видео по заявка (VoD) библиотека",
      "Гледане на телевизор, телефон и таблет",
      "Архив до 7 дни назад",
      "Няколко устройства едновременно",
    ],
    en: [
      "Pause and rewind live TV",
      "Record programs in the cloud",
      "Video on Demand (VoD) library",
      "Watch on TV, phone and tablet",
      "Archive up to 7 days back",
      "Multiple devices simultaneously",
    ],
  },
};

export function ServiceDetail({
  slug,
  locale,
}: {
  slug: ServiceSlug;
  locale: string;
}) {
  const t = useTranslations("ServicesPage");
  const tp = useTranslations("ServicesPreview");
  const ts = useTranslations("Services");
  const lang = locale === "en" ? "en" : "bg";

  const meta = META[slug];
  const titleKey = slug as "gpon" | "gdn" | "unitv";
  const features = FEATURES[slug][lang];

  return (
    <>
      <PageHero
        title={tp(`${titleKey}.title`)}
        subtitle={t(`${slug}Long`)}
        eyebrow={ts(slug)}
        breadcrumbs={[
          { label: t("title"), href: "/services" },
          { label: ts(slug) },
        ]}
      >
        {/* Спецификации барове */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {meta.specs.map((spec) => (
            <div
              key={spec.key}
              className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 backdrop-blur"
            >
              <spec.Icon className="h-5 w-5 flex-none text-brand-300" />
              <div className="flex flex-col">
                <span className="text-[0.65rem] font-bold uppercase tracking-wider text-ink-100/60">
                  {t(spec.key)}
                </span>
                <span className="text-sm font-semibold text-white">
                  {SPEC_VALUES[slug][spec.key]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </PageHero>

      {/* Предимства */}
      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Икона/визуал */}
          <div className="relative flex items-center justify-center">
            <div
              className={`flex aspect-square w-full max-w-sm items-center justify-center rounded-[2.5rem] bg-gradient-to-br ${meta.gradient} shadow-soft`}
            >
              <div className="absolute inset-0 rounded-[2.5rem] bg-grid-dark opacity-30" />
              <meta.Icon className="relative h-32 w-32 text-white" />
            </div>
          </div>

          {/* Списък предимства */}
          <div>
            <h2 className="text-2xl font-extrabold text-ink-900 sm:text-3xl">
              {t("features")}
            </h2>
            <ul className="mt-6 space-y-4">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-brand-50 text-brand-600">
                    <CheckIcon className="h-4 w-4" />
                  </span>
                  <span className="text-sm leading-relaxed text-ink-700">
                    {f}
                  </span>
                </li>
              ))}
            </ul>
            <ButtonLink href="/request" variant="primary" size="lg" className="mt-8">
              {t("getStarted")}
              <ArrowRightIcon className="h-5 w-5" />
            </ButtonLink>
          </div>
        </div>
      </Section>

      <CtaSection />
    </>
  );
}

export default ServiceDetail;
