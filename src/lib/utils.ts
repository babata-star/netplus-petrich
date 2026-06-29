/** Класическа cn помощ — слива className низове, филтрира falsy. */
export function cn(
  ...classes: (string | false | null | undefined)[]
): string {
  return classes.filter(Boolean).join(" ");
}

/** Форматира телефонен номер за tel: линкове. */
export function telHref(phone: string): string {
  const compact = phone.replace(/[^\d+]/g, "");
  const international = /^0\d{9}$/.test(compact)
    ? `+359${compact.slice(1)}`
    : compact;

  return `tel:${international}`;
}
