import { z } from "zod";

/** Валидация на форма за заявка за услуга. */
export const requestSchema = z.object({
  fullName: z.string().min(2, "Името е твърде кратко"),
  phone: z.string().min(6, "Невалиден телефон"),
  email: z.string().email("Невалиден имейл").optional().or(z.literal("")),
  address: z.string().min(5, "Адресът е твърде кратък"),
  service: z.enum(["serviceGpon", "serviceGdn", "serviceUnitv", "serviceCombo"]),
  notes: z.string().optional(),
});

/** Валидация на форма за контакт. */
export const contactSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(6),
  email: z.string().email().optional().or(z.literal("")),
  subject: z.string().min(2),
  message: z.string().min(10),
});

/** Валидация на нов сигнал. */
export const ticketSchema = z.object({
  category: z.enum(["INTERNET", "TV", "BILLING", "EQUIPMENT", "OTHER"]),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]),
  subject: z.string().min(3),
  description: z.string().min(10),
});

/** Валидация на съобщение по сигнал. */
export const ticketMessageSchema = z.object({
  body: z.string().min(1),
});

/** Валидация на обратна връзка. */
export const feedbackSchema = z.object({
  rating: z.number().int().min(1).max(5),
  comment: z.string().optional(),
  name: z.string().min(2),
});

/**
 * Password политика — поне 8 символа, 1 буква + 1 цифра.
 * Балансира сигурност и удобство за потребители.
 */
export const passwordSchema = z
  .string()
  .min(8, "Паролата трябва да е поне 8 символа")
  .regex(/[a-zA-Zа-яА-Я]/, "Трябва да съдържа поне една буква")
  .regex(/[0-9]/, "Трябва да съдържа поне една цифра");

/** Валидация на регистрация. */
export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  address: z.string().min(5),
  password: passwordSchema,
});

// Map превключвател за услугата към RequestType enum
export const SERVICE_TO_TYPE: Record<string, "GPON" | "GDN" | "UNITV" | "COMBO"> = {
  serviceGpon: "GPON",
  serviceGdn: "GDN",
  serviceUnitv: "UNITV",
  serviceCombo: "COMBO",
};
