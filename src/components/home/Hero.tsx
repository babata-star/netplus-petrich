"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ButtonLink } from "@/components/ui/Button";
import {
  ArrowRightIcon,
  FiberIcon,
  GaugeIcon,
  ShieldIcon,
  BoltIcon,
} from "@/components/icons/Icons";

// Spring physics според skill-а: stiffness 100, damping 20 — premium, weighty feel
const spring = { type: "spring" as const, stiffness: 100, damping: 20 };
const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const t = useTranslations("Hero");
  const tNav = useTranslations("Nav");

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };
  const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
  };

  // 3 ключови предимства (вместо hero-metric template, забранен от skill-а)
  const pillars = [
    { Icon: BoltIcon, label: t("stat1Value"), sub: t("stat1Label") },
    { Icon: ShieldIcon, label: t("stat2Value"), sub: t("stat2Label") },
    { Icon: FiberIcon, label: t("stat3Value"), sub: t("stat3Label") },
  ];

  return (
    <section className="relative overflow-hidden bg-ink-950 text-white bg-noise">
      {/* Mesh градиент фон */}
      <div className="absolute inset-0 bg-brand-gradient opacity-90" />
      <div className="absolute inset-0 bg-grid-dark opacity-40" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-5 py-24 sm:px-8 lg:grid-cols-12 lg:py-32">
        {/* ЛЯВО: съдържание (асиметрично, не центрирано) */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="lg:col-span-7"
        >
          {/* Badge */}
          <motion.span
            variants={item}
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-400" />
            </span>
            {t("badge")}
          </motion.span>

          {/* Заглавие — ляво подравнено, inline image typography */}
          <motion.h1
            variants={item}
            className="mt-6 max-w-2xl text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.5rem]"
          >
            {t("title").replace(t("titleHighlight"), "")}
            {/* Inline визуален елемент — "окно" в заглавието (signature техника) */}
            <span className="relative inline-flex items-center align-middle">
              <span className="mx-1 inline-flex h-12 w-20 overflow-hidden rounded-xl bg-accent-500 align-middle sm:h-16 sm:w-28">
                <span className="flex h-full w-full items-center justify-center bg-grid-dark">
                  <FiberIcon className="h-6 w-6 text-white sm:h-8 sm:w-8" />
                </span>
              </span>
              <span className="text-accent-300">{t("titleHighlight")}</span>
            </span>
          </motion.h1>

          {/* Подзаглавие */}
          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-lg leading-relaxed text-ink-100/80"
          >
            {t("subtitle")}
          </motion.p>

          {/* Single CTA (skill: максимум 1 primary CTA) */}
          <motion.div variants={item} className="mt-9">
            <ButtonLink
              href="/request"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
            >
              {t("ctaPrimary")}
              <ArrowRightIcon className="h-5 w-5" />
            </ButtonLink>
          </motion.div>
        </motion.div>

        {/* ДЯСНО: визуална колона с 3 стълба */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...spring, delay: 0.4 }}
          className="lg:col-span-5"
        >
          <div className="space-y-3">
            {pillars.map((p, i) => (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...spring, delay: 0.6 + i * 0.12 }}
                className="glass group flex items-center gap-4 rounded-2xl p-5"
              >
                <span className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-accent-500/20 text-accent-300 transition-transform group-hover:scale-110">
                  <p.Icon className="h-6 w-6" />
                </span>
                <div>
                  <div
                    className="text-xl font-bold text-white"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {p.label}
                  </div>
                  <div className="text-xs font-medium uppercase tracking-[0.12em] text-ink-100/60">
                    {p.sub}
                  </div>
                </div>
                {/* Perpetual micro-interaction: shimmer pulse */}
                <span className="ml-auto h-2 w-2 animate-pulse rounded-full bg-accent-400/60" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
