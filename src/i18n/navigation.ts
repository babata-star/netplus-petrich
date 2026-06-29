import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Типизирани хелпъри за навигация, които автоматично
 * се съобразяват с активния локал (БГ/EN).
 *
 * Ползват се вместо тези от "next/navigation":
 *   import { useRouter, usePathname, Link } from "@/i18n/navigation";
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
