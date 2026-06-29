"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Section, SectionHeading } from "@/components/Section";
import { ButtonLink } from "@/components/ui/Button";
import {
  MapPinIcon,
  CheckIcon,
  BoltIcon,
  ArrowRightIcon,
} from "@/components/icons/Icons";

type Result = "found" | "notFound" | null;

export function Coverage() {
  const t = useTranslations("Coverage");
  const [address, setAddress] = useState("");
  const [result, setResult] = useState<Result>(null);
  const [checking, setChecking] = useState(false);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) return;
    setChecking(true);
    // Симулация на проверка
    setTimeout(() => {
      const has = address.length % 3 !== 0;
      setResult(has ? "found" : "notFound");
      setChecking(false);
    }, 600);
  };

  return (
    <Section tone="white">
      <div className="relative overflow-hidden rounded-[2rem] bg-ink-900 px-6 py-14 text-white sm:px-12 sm:py-16">
        <div className="absolute inset-0 bg-brand-gradient" />
        <div className="absolute inset-0 bg-noise" />
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand-400/20 blur-3xl" />

        <div className="relative grid items-center gap-8 lg:grid-cols-2">
          <div>
            <SectionHeading
              title={t("title")}
              subtitle={t("subtitle")}
              align="left"
              tone="light"
            />
          </div>

          {/* Форма */}
          <div className="glass rounded-2xl p-5">
            <form
              onSubmit={handleCheck}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <div className="relative flex-1">
                <MapPinIcon className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-200" />
                <input
                  type="text"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    setResult(null);
                  }}
                  placeholder={t("placeholder")}
                  className="w-full rounded-full border border-white/20 bg-white/10 py-3 pl-11 pr-4 text-sm text-white placeholder:text-ink-200/60 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/40"
                />
              </div>
              <button
                type="submit"
                disabled={checking}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-accent-500 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-accent-600 active:scale-95 disabled:opacity-60"
              >
                {checking ? "..." : t("button")}
                {!checking && <ArrowRightIcon className="h-4 w-4" />}
              </button>
            </form>

            {/* Резултат */}
            {result && (
              <div
                className={`mt-4 flex items-start gap-2.5 rounded-xl p-3.5 text-sm transition-all ${
                  result === "found"
                    ? "bg-brand-500/15 text-brand-100"
                    : "bg-accent-500/15 text-accent-100"
                }`}
              >
                {result === "found" ? (
                  <CheckIcon className="mt-0.5 h-5 w-5 flex-none text-brand-300" />
                ) : (
                  <BoltIcon className="mt-0.5 h-5 w-5 flex-none text-accent-300" />
                )}
                <span>
                  {result === "found" ? t("found") : t("notFound")}
                </span>
              </div>
            )}

            {result === "found" && (
              <ButtonLink
                href="/request"
                variant="primary"
                size="sm"
                className="mt-3 w-full"
              >
                {t("button")}
                <ArrowRightIcon className="h-4 w-4" />
              </ButtonLink>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}

export default Coverage;
