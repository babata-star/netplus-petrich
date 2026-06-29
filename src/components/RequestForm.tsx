"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/Button";
import { CheckIcon, ArrowRightIcon } from "@/components/icons/Icons";
import { cn } from "@/lib/utils";

type Step = 0 | 1 | 2;

/**
 * 3-стъпкова форма за заявка за нова услуга.
 * Засега симулира подаване; в Фаза 3 ще POST-ва към /api/requests.
 */
export function RequestForm() {
  const t = useTranslations("RequestPage");
  const [step, setStep] = useState<Step>(0);
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    service: "serviceGpon",
    notes: "",
  });

  const set = (k: keyof typeof data, v: string) =>
    setData((d) => ({ ...d, [k]: v }));

  const steps = [t("step1"), t("step2"), t("step3")];
  const inputClass =
    "w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/30";

  const services = [
    "serviceGpon",
    "serviceGdn",
    "serviceUnitv",
    "serviceCombo",
  ] as const;

  const next = () => setStep((s) => (s < 2 ? ((s + 1) as Step) : s));
  const back = () => setStep((s) => (s > 0 ? ((s - 1) as Step) : s));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center rounded-3xl bg-brand-50 p-8 text-center sm:p-12">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-500 text-white">
          <CheckIcon className="h-8 w-8" />
        </span>
        <h3 className="mt-5 text-xl font-bold text-ink-900">
          {t("success")}
        </h3>
        <p className="mt-2 max-w-md text-sm text-ink-600">
          {t("successDesc")}
        </p>
        <ButtonLink href="/" variant="outline" size="md" className="mt-6">
          {t("newRequest")}
        </ButtonLink>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Stepper */}
      <div className="mb-8 flex items-center justify-between">
        {steps.map((label, i) => (
          <div key={i} className="flex flex-1 items-center">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-colors",
                  i < step && "bg-brand-500 text-white",
                  i === step && "bg-ink-900 text-white ring-4 ring-ink-100",
                  i > step && "bg-ink-100 text-ink-400"
                )}
              >
                {i < step ? <CheckIcon className="h-4 w-4" /> : i + 1}
              </div>
              <span
                className={cn(
                  "mt-1.5 hidden text-[0.65rem] font-semibold uppercase tracking-wider sm:block",
                  i <= step ? "text-ink-900" : "text-ink-400"
                )}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={cn(
                  "mx-2 h-0.5 flex-1 rounded transition-colors",
                  i < step ? "bg-brand-500" : "bg-ink-100"
                )}
              />
            )}
          </div>
        ))}
      </div>

      {/* Стъпка 1: Данни */}
      {step === 0 && (
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-ink-700">
              {t("fullName")} *
            </label>
            <input
              required
              type="text"
              value={data.fullName}
              onChange={(e) => set("fullName", e.target.value)}
              className={inputClass}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-ink-700">
                {t("phone")} *
              </label>
              <input
                required
                type="tel"
                value={data.phone}
                onChange={(e) => set("phone", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-ink-700">
                {t("email")}
              </label>
              <input
                type="email"
                value={data.email}
                onChange={(e) => set("email", e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
        </div>
      )}

      {/* Стъпка 2: Адрес и услуга */}
      {step === 1 && (
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-ink-700">
              {t("address")} *
            </label>
            <input
              required
              type="text"
              value={data.address}
              onChange={(e) => set("address", e.target.value)}
              placeholder="ул. „...“ № ..., гр. Петрич"
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-ink-700">
              {t("service")} *
            </label>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {services.map((s) => (
                <label
                  key={s}
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-xl border-2 p-3.5 transition-colors",
                    data.service === s
                      ? "border-brand-500 bg-brand-50"
                      : "border-ink-200 hover:border-brand-200"
                  )}
                >
                  <input
                    type="radio"
                    name="service"
                    value={s}
                    checked={data.service === s}
                    onChange={(e) => set("service", e.target.value)}
                    className="sr-only"
                  />
                  <span
                    className={cn(
                      "flex h-5 w-5 flex-none items-center justify-center rounded-full border-2",
                      data.service === s
                        ? "border-brand-500 bg-brand-500"
                        : "border-ink-300"
                    )}
                  >
                    {data.service === s && (
                      <span className="h-2 w-2 rounded-full bg-white" />
                    )}
                  </span>
                  <span className="text-sm font-medium text-ink-900">
                    {t(s)}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Стъпка 3: Потвърждение */}
      {step === 2 && (
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-ink-700">
              {t("notes")}
            </label>
            <textarea
              rows={3}
              value={data.notes}
              onChange={(e) => set("notes", e.target.value)}
              className={inputClass}
            />
          </div>

          {/* Резюме */}
          <div className="rounded-2xl bg-ink-50 p-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink-500">
              {t("step3")}
            </h4>
            <dl className="mt-3 space-y-1.5 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-ink-500">{t("fullName")}</dt>
                <dd className="font-semibold text-ink-900">
                  {data.fullName || "—"}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ink-500">{t("phone")}</dt>
                <dd className="font-semibold text-ink-900">
                  {data.phone || "—"}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ink-500">{t("address")}</dt>
                <dd className="text-right font-semibold text-ink-900">
                  {data.address || "—"}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ink-500">{t("service")}</dt>
                <dd className="font-semibold text-ink-900">
                  {t(data.service as "serviceGpon")}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      )}

      {/* Навигация */}
      <div className="mt-6 flex items-center justify-between">
        {step > 0 ? (
          <button
            type="button"
            onClick={back}
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold text-ink-600 hover:bg-ink-50"
          >
            ← {t("back")}
          </button>
        ) : (
          <span />
        )}
        {step < 2 ? (
          <button
            type="button"
            onClick={next}
            disabled={
              (step === 0 && (!data.fullName || !data.phone)) ||
              (step === 1 && !data.address)
            }
            className="inline-flex items-center gap-1.5 rounded-full bg-accent-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-600 disabled:opacity-50"
          >
            {t("next")}
            <ArrowRightIcon className="h-4 w-4" />
          </button>
        ) : (
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 rounded-full bg-brand-gradient px-6 py-2.5 text-sm font-semibold text-white shadow-soft transition-all hover:brightness-110"
          >
            {t("submit")}
          </button>
        )}
      </div>
    </form>
  );
}

export default RequestForm;
