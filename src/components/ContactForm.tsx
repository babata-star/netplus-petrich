"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { CheckIcon } from "@/components/icons/Icons";

/**
 * Форма за контакт — client component.
 * Засега показва успех симулирано; в реална имплементация ще POST-ва към API route.
 */
export function ContactForm() {
  const t = useTranslations("ContactsPage");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: POST към /api/contact (Фаза 3)
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="mt-6 flex flex-col items-center rounded-2xl bg-brand-50 p-8 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-500 text-white">
          <CheckIcon className="h-7 w-7" />
        </span>
        <p className="mt-4 font-semibold text-ink-900">{t("formSuccess")}</p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/30";

  return (
    <form onSubmit={handleSubmit} className="mt-5 space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-ink-700">
            {t("formName")} *
          </label>
          <input required type="text" className={inputClass} />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-ink-700">
            {t("formPhone")} *
          </label>
          <input required type="tel" className={inputClass} />
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-semibold text-ink-700">
          {t("formEmail")}
        </label>
        <input type="email" className={inputClass} />
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-semibold text-ink-700">
          {t("formSubject")} *
        </label>
        <input required type="text" className={inputClass} />
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-semibold text-ink-700">
          {t("formMessage")} *
        </label>
        <textarea required rows={4} className={inputClass} />
      </div>
      <button
        type="submit"
        className="inline-flex w-full items-center justify-center rounded-full bg-accent-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-600"
      >
        {t("formSubmit")}
      </button>
    </form>
  );
}

export default ContactForm;
