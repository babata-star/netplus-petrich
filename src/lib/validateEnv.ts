/**
 * Валидация на environment variables.
 * Стартира при първо импортиране. Гарантира, че production има нужните secrets.
 *
 * При липсващи задължителни променли в production — хвърля грешка и спира boot.
 */

const required = ["AUTH_SECRET", "DATABASE_URL"] as const;

const warnings = [
  "SMTP_HOST",
  "SMTP_USER",
  "SMTP_PASSWORD",
  "SMTP_FROM",
] as const;

export function validateEnv(): void {
  const isProd = process.env.NODE_ENV === "production";

  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0 && isProd) {
    throw new Error(
      `Липсват задължителни environment променли: ${missing.join(", ")}. ` +
        `Задайте ги в Vercel → Settings → Environment Variables.`
    );
  }

  // Предупреждения за липсващи опционални (имейл)
  if (isProd) {
    const missingOptional = warnings.filter((key) => !process.env[key]);
    if (missingOptional.length > 0) {
      console.warn(
        `⚠️  Липсват имейл настройки: ${missingOptional.join(", ")}. ` +
          `Имейл известията няма да работят.`
      );
    }
  }

  // Проверка за слаб AUTH_SECRET (dev default)
  const secret = process.env.AUTH_SECRET;
  if (isProd && secret && secret.includes("change-me")) {
    throw new Error(
      "AUTH_SECRET съдържа 'change-me' — задайте сигурен secret в production. " +
        "Генерирайте с: openssl rand -base64 32"
    );
  }
}
