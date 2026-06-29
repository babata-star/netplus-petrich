import { setRequestLocale, getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { ButtonLink } from "@/components/ui/Button";
import { BellIcon } from "@/components/icons/Icons";

const TYPE_LABELS: Record<string, string> = {
  GPON: "Оптичен интернет",
  GDN: "Цифрова ТВ",
  UNITV: "Интерактивна ТВ",
  COMBO: "Комбо",
  MOVE: "Преместване",
  UPGRADE: "Ъпгрейд",
  OTHER: "Друго",
};

const STATUS_LABELS: Record<string, { label: string; class: string }> = {
  NEW: { label: "Нова", class: "bg-red-50 text-red-700" },
  IN_PROGRESS: { label: "В процес", class: "bg-accent-50 text-accent-700" },
  CONTACTED: { label: "Свързахме се", class: "bg-blue-50 text-blue-700" },
  DONE: { label: "Завършена", class: "bg-green-50 text-green-700" },
  CANCELLED: { label: "Отказана", class: "bg-ink-100 text-ink-600" },
};

export default async function RequestsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const session = await auth();
  const t = await getTranslations("Portal");

  if (!session?.user?.id) redirect("/portal/login");

  const requests = await prisma.serviceRequest.findMany({
    where: { userId: session!.user!.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-ink-900">
            {t("requests")}
          </h1>
          <p className="mt-1 text-sm text-ink-500">
            Вашите заявки за услуги и промени.
          </p>
        </div>
        <ButtonLink href="/request" variant="primary" size="md">
          <BellIcon className="h-4 w-4" />
          Нова заявка
        </ButtonLink>
      </div>

      {requests.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-ink-200 bg-ink-50/50 p-12 text-center">
          <BellIcon className="mx-auto h-10 w-10 text-ink-300" />
          <p className="mt-3 text-sm text-ink-500">Нямате заявки.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {requests.map((r) => {
            const status = STATUS_LABELS[r.status] || STATUS_LABELS.NEW;
            return (
              <div
                key={r.id}
                className="rounded-2xl border border-ink-100 bg-white p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                      <BellIcon className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="font-semibold text-ink-900">
                        {TYPE_LABELS[r.type] || r.type}
                      </div>
                      {r.notes && (
                        <div className="mt-0.5 text-sm text-ink-500">
                          {r.notes}
                        </div>
                      )}
                      <div className="mt-1 text-xs text-ink-400">
                        {new Date(r.createdAt).toLocaleDateString("bg-BG")}
                      </div>
                    </div>
                  </div>
                  <span
                    className={`flex-none rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${status.class}`}
                  >
                    {status.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
