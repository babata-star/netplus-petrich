import { useTranslations, useLocale } from "next-intl";
import { ShieldIcon, BoltIcon, GlobeIcon, GaugeIcon } from "@/components/icons/Icons";

export function TrustBar() {
  const t = useTranslations("TrustBar");
  const locale = useLocale();
  const lang = locale === "en" ? "en" : "bg";

  const items = [
    { Icon: BoltIcon, label: { bg: "Бърза инсталация", en: "Fast install" } },
    {
      Icon: ShieldIcon,
      label: { bg: "Стабилна връзка", en: "Stable connection" },
    },
    { Icon: GlobeIcon, label: { bg: "Локален екип", en: "Local team" } },
    { Icon: GaugeIcon, label: { bg: "Реална скорост", en: "Real speed" } },
  ];

  return (
    <div className="border-b border-ink-100 bg-white">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-5 py-5 sm:px-8">
        <span className="text-xs font-bold uppercase tracking-[0.16em] text-ink-400">
          {t("label")}
        </span>
        {items.map((it, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 text-sm font-semibold text-ink-700"
          >
            <it.Icon className="h-5 w-5 text-brand-600" />
            {it.label[lang]}
          </span>
        ))}
      </div>
    </div>
  );
}

export default TrustBar;
