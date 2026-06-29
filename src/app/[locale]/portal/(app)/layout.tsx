import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { PortalSidebar } from "@/components/portal/PortalSidebar";
import { setRequestLocale } from "next-intl/server";

/**
 * Layout за защитените портал страници (dashboard, tickets, ...).
 * Проверява сесията сървърно и пренасочва към /portal/login ако няма.
 */
export default async function PortalAppLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const session = await auth();
  if (!session?.user) {
    redirect("/portal/login");
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8">
      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <PortalSidebar />
        <div>{children}</div>
      </div>
    </div>
  );
}
