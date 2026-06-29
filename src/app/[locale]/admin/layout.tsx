import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { setRequestLocale } from "next-intl/server";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

/**
 * Layout за админ панела — само ADMIN role.
 */
export default async function AdminLayout({
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
  const role = (session.user as { role?: string }).role;
  if (role !== "ADMIN") {
    redirect("/portal/dashboard");
  }

  return (
    <div className="min-h-screen bg-ink-50">
      <div className="mx-auto grid w-full max-w-7xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-[240px_1fr]">
        <AdminSidebar userName={session.user.name} />
        <div>{children}</div>
      </div>
    </div>
  );
}
