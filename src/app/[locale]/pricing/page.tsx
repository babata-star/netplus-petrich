import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import {
  CheckIcon,
  ArrowRightIcon,
  FiberIcon,
  TvIcon,
  InteractiveTvIcon,
  BoltIcon,
  ShieldIcon,
  StarIcon,
} from "@/components/icons/Icons";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "PricingPage" });
  return { title: t("title"), description: t("subtitle") };
}

// Детайлни планове за оптичен интернет
const INTERNET_PLANS = [
  {
    name: { bg: "Старт", en: "Start" },
    speed: "100/100",
    price: "10",
    popular: false,
    desc: {
      bg: "За малък дом и основни нужди — сърфиране, социални мрежи, видео обаждания.",
      en: "For a small home and basic needs — browsing, social media, video calls.",
    },
    features: {
      bg: [
        "100/100 Mbps симетрична скорост",
        "Оптична връзка (GPON)",
        "Без такса активация",
        "Wi-Fi рутер (включен)",
        "Поддръжка по телефон 24/7",
      ],
      en: [
        "100/100 Mbps symmetric speed",
        "Fiber (GPON)",
        "No activation fee",
        "Wi-Fi router (included)",
        "Phone support 24/7",
      ],
    },
  },
  {
    name: { bg: "Оптимален", en: "Optimal" },
    speed: "300/300",
    price: "15",
    popular: true,
    desc: {
      bg: "Най-избираният план — за семейства със стрийминг, гейминг и много устройства.",
      en: "The most chosen plan — for families with streaming, gaming and many devices.",
    },
    features: {
      bg: [
        "300/300 Mbps симетрична скорост",
        "Оптична връзка (GPON)",
        "Wi-Fi 6 рутер (включен)",
        "Статичен IP (опция +2€/мес)",
        "Приоритетна поддръжка 24/7",
        "Без такса активация",
      ],
      en: [
        "300/300 Mbps symmetric speed",
        "Fiber (GPON)",
        "Wi-Fi 6 router (included)",
        "Static IP (option +€2/mo)",
        "Priority support 24/7",
        "No activation fee",
      ],
    },
  },
  {
    name: { bg: "Премиум", en: "Premium" },
    speed: "1000/1000",
    price: "20",
    popular: false,
    desc: {
      bg: "Максимална скорост за тежки потребители, хоум офис и малък бизнес.",
      en: "Maximum speed for heavy users, home office and small business.",
    },
    features: {
      bg: [
        "1000/1000 Mbps симетрична скорост",
        "Оптична връзка (GPON)",
        "Wi-Fi 6 рутер Pro (включен)",
        "Статичен IP (включен)",
        "Приоритетна поддръжка + мониторинг",
        "SLA време за реакция ≤ 4 часа",
      ],
      en: [
        "1000/1000 Mbps symmetric speed",
        "Fiber (GPON)",
        "Wi-Fi 6 Pro router (included)",
        "Static IP (included)",
        "Priority support + monitoring",
        "SLA reaction time ≤ 4 hours",
      ],
    },
  },
];

// Детайлни ТВ планове
const TV_PLANS = [
  {
    name: { bg: "GDN Базов", en: "GDN Basic" },
    price: "6",
    desc: {
      bg: "Основни канали за цялото семейство.",
      en: "Essential channels for the whole family.",
    },
    features: {
      bg: ["80+ канала", "HD качество", "Електронен гид (EPG)", "Родителски контрол"],
      en: ["80+ channels", "HD quality", "Electronic guide (EPG)", "Parental controls"],
    },
  },
  {
    name: { bg: "GDN Пълен", en: "GDN Full" },
    price: "9",
    desc: {
      bg: "Спорт, филми, деца и документалистика — всичко в едно.",
      en: "Sports, movies, kids and documentaries — all in one.",
    },
    features: {
      bg: [
        "200+ канала",
        "HD и Full HD качество",
        "Спортни и филмови пакети",
        "Електронен гид (EPG)",
        "Родителски контрол",
      ],
      en: [
        "200+ channels",
        "HD and Full HD quality",
        "Sports and movie packages",
        "Electronic guide (EPG)",
        "Parental controls",
      ],
    },
  },
];

const COMBOS = [
  {
    name: { bg: "Интернет + ТВ", en: "Internet + TV" },
    price: "18",
    save: "2",
    includes: {
      bg: "300/300 Mbps + GDN Базов",
      en: "300/300 Mbps + GDN Basic",
    },
    features: {
      bg: ["Спестяваш 2€ на месец", "Една фактура за всичко", "Wi-Fi 6 рутер"],
      en: ["Save €2 per month", "One bill for everything", "Wi-Fi 6 router"],
    },
  },
  {
    name: { bg: "Премиум Комбо", en: "Premium Combo" },
    price: "25",
    save: "4",
    includes: {
      bg: "1000/1000 Mbps + GDN Пълен + UNITV",
      en: "1000/1000 Mbps + GDN Full + UNITV",
    },
    features: {
      bg: [
        "Спестяваш 4€ на месец",
        "Интерактивна ТВ (запис, пауза, VoD)",
        "Статичен IP + приоритетна поддръжка",
        "Гледане на телефон и таблет",
      ],
      en: [
        "Save €4 per month",
        "Interactive TV (record, pause, VoD)",
        "Static IP + priority support",
        "Watch on phone and tablet",
      ],
    },
  },
];

// Сравнителна таблица
const COMPARISON = [
  {
    feature: { bg: "Скорост (сваляне/качване)", en: "Speed (down/up)" },
    start: "100/100",
    optimal: "300/300",
    premium: "1000/1000",
  },
  {
    feature: { bg: "Технология", en: "Technology" },
    start: "GPON",
    optimal: "GPON",
    premium: "GPON",
  },
  {
    feature: { bg: "Wi-Fi рутер", en: "Wi-Fi router" },
    start: { bg: "Стандартен", en: "Standard" },
    optimal: "Wi-Fi 6",
    premium: { bg: "Wi-Fi 6 Pro", en: "Wi-Fi 6 Pro" },
  },
  {
    feature: { bg: "Статичен IP", en: "Static IP" },
    start: { bg: "Опция", en: "Option" },
    optimal: { bg: "Опция (+2€)", en: "Option (+€2)" },
    premium: { bg: "Включен", en: "Included" },
  },
  {
    feature: { bg: "Приоритетна поддръжка", en: "Priority support" },
    start: "—",
    optimal: { bg: "Да", en: "Yes" },
    premium: { bg: "Да + SLA", en: "Yes + SLA" },
  },
  {
    feature: { bg: "Мониторинг на връзката", en: "Connection monitoring" },
    start: "—",
    optimal: "—",
    premium: { bg: "Да", en: "Yes" },
  },
  {
    feature: { bg: "Такса активация", en: "Activation fee" },
    start: { bg: "Без", en: "Free" },
    optimal: { bg: "Без", en: "Free" },
    premium: { bg: "Без", en: "Free" },
  },
];

// FAQ
const FAQ = [
  {
    q: {
      bg: "Има ли договорен срок?",
      en: "Is there a contract period?",
    },
    a: {
      bg: "Не. Нашите планове са без договорен срок — можете да прекратите по всяко време с едномесечно предизвестие.",
      en: "No. Our plans have no contract period — you can terminate anytime with one month's notice.",
    },
  },
  {
    q: {
      bg: "Колко време отнема инсталацията?",
      en: "How long does installation take?",
    },
    a: {
      bg: "Обикновено 2–5 работни дни от подаване на заявката, в зависимост от покритието на вашия адрес.",
      en: "Usually 2–5 business days from request, depending on coverage at your address.",
    },
  },
  {
    q: {
      bg: "Рутерът мой ли е?",
      en: "Do I own the router?",
    },
    a: {
      bg: "Рутерът се предоставя за времето на абонамента. При прекратяване се връща в изправност.",
      en: "The router is provided for the duration of the subscription. It is returned in working condition upon termination.",
    },
  },
  {
    q: {
      bg: "Мога ли да сменя плана си по-късно?",
      en: "Can I change my plan later?",
    },
    a: {
      bg: "Да, можете да надграждате или променяте плана си по всяко време без допълнителни такси.",
      en: "Yes, you can upgrade or change your plan anytime without additional fees.",
    },
  },
  {
    q: {
      bg: "Предлагате ли отстъпки за бизнес?",
      en: "Do you offer business discounts?",
    },
    a: {
      bg: "Да. За бизнес клиенти имаме индивидуални оферти според нуждите — свържете се с нас за предложение.",
      en: "Yes. For business clients we have individual offers based on needs — contact us for a quote.",
    },
  },
];

export default async function PricingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("PricingPage");
  const tm = await getTranslations("Misc");
  const lang = locale === "en" ? "en" : "bg";

  return (
    <>
      <PageHero
        title={t("title")}
        subtitle={t("subtitle")}
        breadcrumbs={[{ label: t("title") }]}
      />

      {/* ===== ОПТИЧЕН ИНТЕРНЕТ ===== */}
      <Section tone="white">
        <SectionHeading
          eyebrow={t("internetTitle")}
          title={t("internetTitle")}
          subtitle={lang === "en" ? "Symmetric GPON fiber — same speed for upload and download." : "Симетрична GPON оптика — еднаква скорост за качване и сваляне."}
          align="center"
        />

        <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
          {INTERNET_PLANS.map((plan, i) => (
            <Reveal key={plan.name[lang]} delay={i * 100} className="h-full">
              <div
                className={`relative flex h-full flex-col rounded-3xl border p-8 transition-all duration-300 ${
                  plan.popular
                    ? "border-brand-500 bg-white shadow-glow lg:-translate-y-3 lg:scale-[1.03]"
                    : "border-ink-100 bg-white hover:border-brand-200 hover:shadow-soft"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-ink-900 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-400" />
                    {t("popular")}
                  </span>
                )}

                {/* Име + скорост */}
                <div className="flex h-16 flex-col">
                  <h3 className="text-xl font-bold text-ink-900">
                    {plan.name[lang]}
                  </h3>
                  <div className="flex items-baseline gap-1.5">
                    <FiberIcon className="h-4 w-4 text-brand-600" />
                    <span className="text-sm font-bold text-brand-600">
                      {plan.speed} Mbps
                    </span>
                  </div>
                </div>

                {/* Описание */}
                <p className="mt-3 text-sm leading-relaxed text-ink-500">
                  {plan.desc[lang]}
                </p>

                {/* Цена */}
                <div className="mt-5 flex items-baseline gap-1">
                  <span className="text-sm text-ink-400">{t("from")}</span>
                  <span
                    className="text-5xl font-extrabold tracking-tight text-ink-900"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {plan.price}
                  </span>
                  <span className="text-sm font-semibold text-ink-500">
                    {tm("currency")} {tm("perMonth")}
                  </span>
                </div>

                <div className="my-6 h-px bg-ink-100" />

                {/* Характеристики */}
                <ul className="flex-1 space-y-3">
                  {plan.features[lang].map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 text-sm font-medium text-ink-700"
                    >
                      <span
                        className={`mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full ${
                          plan.popular
                            ? "bg-brand-500 text-white"
                            : "bg-brand-50 text-brand-600"
                        }`}
                      >
                        <CheckIcon className="h-3 w-3" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <ButtonLink
                  href="/request"
                  variant={plan.popular ? "primary" : "outline"}
                  size="md"
                  className="mt-7 w-full"
                >
                  {t("choose")}
                </ButtonLink>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ===== ТЕЛЕВИЗИЯ + КОМБО ===== */}
      <Section tone="ash" className="bg-noise">
        <SectionHeading
          eyebrow={t("tvTitle")}
          title={t("tvTitle")}
          align="center"
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {/* GDN планове */}
          <div className="space-y-4">
            {TV_PLANS.map((plan) => (
              <div
                key={plan.name[lang]}
                className="flex flex-col rounded-2xl border border-ink-100 bg-white p-6 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <TvIcon className="h-5 w-5 text-brand-600" />
                    <h3 className="text-lg font-bold text-ink-900">
                      {plan.name[lang]}
                    </h3>
                  </div>
                  <p className="mt-1 text-sm text-ink-500">{plan.desc[lang]}</p>
                  <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                    {plan.features[lang].map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-1.5 text-xs font-medium text-ink-600"
                      >
                        <CheckIcon className="h-3 w-3 text-brand-600" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4 flex items-baseline gap-1 sm:mt-0 sm:pl-6">
                  <span
                    className="text-3xl font-extrabold text-ink-900"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {plan.price}
                  </span>
                  <span className="text-sm font-semibold text-ink-500">
                    {tm("currency")}
                    {tm("perMonth")}
                  </span>
                </div>
              </div>
            ))}

            {/* UNITV отделно */}
            <div className="rounded-2xl border border-accent-200 bg-accent-50/50 p-6">
              <div className="flex items-center gap-2">
                <InteractiveTvIcon className="h-5 w-5 text-accent-600" />
                <h3 className="text-lg font-bold text-ink-900">UNITV</h3>
              </div>
              <p className="mt-1 text-sm text-ink-600">
                {lang === "en"
                  ? "Interactive TV — pause, rewind, record and watch on any device."
                  : "Интерактивна ТВ — пауза, превъртане, запис и гледане на всяко устройство."}
              </p>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                {[
                  lang === "en" ? "Pause & rewind" : "Пауза и превъртане",
                  lang === "en" ? "Cloud recording" : "Запис в облака",
                  lang === "en" ? "VoD library" : "VoD библиотека",
                  lang === "en" ? "Multi-device" : "Мулти-устройства",
                ].map((f) => (
                  <span
                    key={f}
                    className="flex items-center gap-1.5 text-xs font-medium text-ink-700"
                  >
                    <CheckIcon className="h-3 w-3 text-accent-600" />
                    {f}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-sm text-ink-500">
                {lang === "en"
                  ? "Add-on to any GDN plan — from €3/month."
                  : "Добавка към всеки GDN план — от 3€/месец."}
              </p>
            </div>
          </div>

          {/* Комбо оферти */}
          <div>
            <SectionHeading
              eyebrow={t("comboTitle")}
              title={t("comboTitle")}
              align="left"
            />
            <div className="mt-4 space-y-4">
              {COMBOS.map((c) => (
                <div
                  key={c.name[lang]}
                  className="relative overflow-hidden rounded-2xl border border-brand-200 bg-gradient-to-br from-white to-brand-50 p-6"
                >
                  <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-accent-500 px-2.5 py-1 text-[0.65rem] font-bold text-white">
                    <BoltIcon className="h-3 w-3" />-{c.save} {tm("currency")}
                  </span>
                  <h3 className="text-lg font-bold text-ink-900">
                    {c.name[lang]}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-brand-700">
                    {c.includes[lang]}
                  </p>
                  <ul className="mt-3 space-y-1.5">
                    {c.features[lang].map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2 text-xs font-medium text-ink-700"
                      >
                        <CheckIcon className="h-3 w-3 text-brand-600" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span
                      className="text-3xl font-extrabold text-ink-900"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {c.price}
                    </span>
                    <span className="text-sm font-semibold text-ink-500">
                      {tm("currency")}
                      {tm("perMonth")}
                    </span>
                  </div>
                  <ButtonLink
                    href="/request"
                    variant="primary"
                    size="sm"
                    className="mt-4"
                  >
                    {t("choose")}
                  </ButtonLink>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-10 rounded-2xl bg-ink-100/60 p-4 text-center text-xs text-ink-500">
          ℹ️ {t("note")} {t("activationNote")}
        </p>
      </Section>

      {/* ===== СРАВНИТЕЛНА ТАБЛИЦА ===== */}
      <Section tone="white">
        <SectionHeading
          eyebrow={lang === "en" ? "Compare plans" : "Сравнете плановете"}
          title={lang === "en" ? "Internet plans comparison" : "Сравнение на интернет плановете"}
          align="center"
        />

        <Reveal className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr className="border-b-2 border-ink-200">
                <th className="py-4 pr-4 text-left text-sm font-bold text-ink-500">
                  {lang === "en" ? "Feature" : "Характеристика"}
                </th>
                <th className="px-4 py-4 text-center text-sm font-bold text-ink-900">
                  {lang === "en" ? "Start" : "Старт"}
                  <div className="mt-0.5 text-xs font-normal text-ink-400">10€</div>
                </th>
                <th className="rounded-t-xl bg-brand-50 px-4 py-4 text-center text-sm font-bold text-brand-700">
                  {lang === "en" ? "Optimal" : "Оптимален"}
                  <div className="mt-0.5 text-xs font-normal text-brand-600">15€</div>
                </th>
                <th className="px-4 py-4 text-center text-sm font-bold text-ink-900">
                  {lang === "en" ? "Premium" : "Премиум"}
                  <div className="mt-0.5 text-xs font-normal text-ink-400">20€</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row, i) => {
                const get = (v: string | { bg: string; en: string }) =>
                  typeof v === "string" ? v : v[lang];
                return (
                  <tr
                    key={i}
                    className={`border-b border-ink-100 ${
                      i % 2 === 1 ? "bg-ink-50/40" : ""
                    } ${i === 1 || i === 3 ? "bg-brand-50/50" : ""}`}
                  >
                    <td className="py-4 pr-4 text-sm font-medium text-ink-700">
                      {get(row.feature)}
                    </td>
                    <td className="px-4 py-4 text-center text-sm text-ink-600">
                      {get(row.start)}
                    </td>
                    <td className="bg-brand-50/30 px-4 py-4 text-center text-sm font-semibold text-brand-700">
                      {get(row.optimal)}
                    </td>
                    <td className="px-4 py-4 text-center text-sm font-semibold text-ink-900">
                      {get(row.premium)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Reveal>
      </Section>

      {/* ===== FAQ ===== */}
      <Section tone="ash" className="bg-noise">
        <SectionHeading
          eyebrow={lang === "en" ? "Questions" : "Въпроси"}
          title={lang === "en" ? "Frequently asked" : "Често задавани въпроси"}
          align="center"
        />

        <div className="mx-auto mt-12 max-w-3xl space-y-4">
          {FAQ.map((item, i) => (
            <Reveal key={i} delay={i * 60}>
              <details className="group rounded-2xl border border-ink-100 bg-white p-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-sm font-bold text-ink-900">
                  {item.q[lang]}
                  <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-ink-100 text-ink-500 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-ink-500">
                  {item.a[lang]}
                </p>
              </details>
            </Reveal>
          ))}
        </div>

        {/* CTA накрая */}
        <div className="mx-auto mt-12 max-w-2xl rounded-3xl border border-ink-100 bg-white p-8 text-center shadow-soft">
          <ShieldIcon className="mx-auto h-10 w-10 text-brand-500" />
          <h3 className="mt-4 text-xl font-bold text-ink-900">
            {lang === "en"
              ? "Not sure which plan fits?"
              : "Не сте сигурни кой план ви подхожда?"}
          </h3>
          <p className="mt-2 text-sm text-ink-500">
            {lang === "en"
              ? "Contact us — we'll help you choose based on your needs and home setup."
              : "Свържете се с нас — ще ви помогнем да изберете според нуждите и домашната ви мрежа."}
          </p>
          <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/request" variant="primary" size="md">
              {lang === "en" ? "Request a plan" : "Заявете пакет"}
              <ArrowRightIcon className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href="/contacts" variant="outline" size="md">
              {lang === "en" ? "Contact us" : "Свържете се"}
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
