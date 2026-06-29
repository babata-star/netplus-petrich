import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Стартирай i18n middleware за всички пътища, освен за статични файлове и API
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
