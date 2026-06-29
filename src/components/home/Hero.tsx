"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ButtonLink } from "@/components/ui/Button";
import {
  ArrowRightIcon,
  BoltIcon,
  ShieldIcon,
  FiberIcon,
  GaugeIcon,
} from "@/components/icons/Icons";

export function Hero() {
  const t = useTranslations("Hero");
  const tNav = useTranslations("Nav");

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.09, delayChildren: 0.05 },
    },
  };
  const item = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const stats = [
    { value: t("stat1Value"), label: t("stat1Label") },
    { value: t("stat2Value"), label: t("stat2Label") },
    { value: t("stat3Value"), label: t("stat3Label") },
  ];

  // Усещане за "скорост" — плаващи частици
  const floats = [
    { Icon: FiberIcon, top: "18%", left: "8%", delay: 0 },
    { Icon: GaugeIcon, top: "62%", left: "12%", delay: 1.2 },
    { Icon: BoltIcon, top: "28%", left: "88%", delay: 0.6 },
    { Icon: ShieldIcon, top: "70%", left: "82%", delay: 1.8 },
  ];

  return (
    <section className="relative overflow-hidden bg-ink-900 text-white bg-noise">
      {/* Mesh градиент фон */}
      <div className="absolute inset-0 bg-brand-gradient" />
      <div className="absolute inset-0 bg-grid-dark opacity-50" />

      {/* Плаващи икони — символизират мрежови възли */}
      {floats.map((f, i) => (
        <motion.div
          key={i}
          className="absolute hidden text-brand-300/20 lg:block"
          style={{ top: f.top, left: f.left }}
          animate={{ y: [0, -16, 0] }}
          transition={{
            duration: 6,
            delay: f.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <f.Icon className="h-10 w-10" />
        </motion.div>
      ))}

      <div className="relative mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-3xl text-center"
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

          {/* Заглавие — по-голямо, по-смело */}
          <motion.h1
            variants={item}
            className="mt-7 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.75rem]"
          >
            {t("title").replace(t("titleHighlight"), "")}
            <span className="relative whitespace-nowrap text-accent-300">
              {t("titleHighlight")}
              <svg
                className="absolute -bottom-2 left-0 w-full text-accent-400/70"
                viewBox="0 0 200 8"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 5.5C40 2.5 160 2.5 198 5.5"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </motion.h1>

          {/* Подзаглавие — контролирана ширина за четимост */}
          <motion.p
            variants={item}
            className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-100/80"
          >
            {t("subtitle")}
          </motion.p>

          {/* CTA бутони */}
          <motion.div
            variants={item}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <ButtonLink
              href="/request"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
            >
              {t("ctaPrimary")}
              <ArrowRightIcon className="h-5 w-5" />
            </ButtonLink>
            <button
              type="button"
              className="glass inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-3.5 text-base font-semibold text-white transition-all hover:bg-white/15 sm:w-auto"
            >
              {t("ctaSecondary")}
            </button>
          </motion.div>
        </motion.div>

        {/* Статистики — glassmorphism карти */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3"
        >
          {stats.map((s, i) => (
            <div key={s.label} className="glass rounded-2xl p-6 text-center">
              <div
                className="text-3xl font-extrabold text-white sm:text-4xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {s.value}
              </div>
              <div className="mt-1.5 text-xs font-medium uppercase tracking-[0.14em] text-ink-100/60">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
