import { setRequestLocale } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { RequestStatusControl } from "@/components/admin/RequestStatusControl";
import { BellIcon, PhoneIcon, MapPinIcon, MailIcon } from "@/components/icons/Icons";

const TYPE_LABELS: Record<string, string> = {
  GPON: "Оптичен интернет",
  GDN: "Цифрова ТВ",
  UNITV: "Интерактивна ТВ",
  COMBO: "Комбо",
  MOVE: "Преместване",
  UPGRADE: "Ъпгрейд",
  OTHER: "Друго",
};

export default async function AdminRequestsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const requests = await prisma.serviceRequest.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-ink-900">Заявки</h1>
      <p className="mt-1 text-sm text-ink-500">
        Всички заявки за услуги — {requests.length} общо.
      </p>

      {requests.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-ink-200 bg-white p-12 text-center">
          <BellIcon className="mx-auto h-10 w-10 text-ink-300" />
          <p className="mt-3 text-sm text-ink-500">Все още няма заявки.</p>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {requests.map((r) => (
            <div
              key={r.id}
              className="rounded-2xl border border-ink-100 bg-white p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <BellIcon className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-ink-900">
                        {r.name}
                      </span>
                      <span className="rounded-md bg-ink-100 px-2 py-0.5 text-xs font-semibold text-ink-600">
                        {TYPE_LABELS[r.type] || r.type}
                      </span>
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-500">
                      <span className="flex items-center gap-1">
                        <PhoneIcon className="h-3.5 w-3.5" /> {r.phone}
                      </span>
                      {r.email && (
                        <span className="flex items-center gap-1">
                          <MailIcon className="h-3.5 w-3.5" /> {r.email}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <MapPinIcon className="h-3.5 w-3.5" /> {r.address}
                      </span>
                    </div>
                    {r.notes && (
                      <div className="mt-2 rounded-lg bg-ink-50 px-3 py-2 text-sm text-ink-600">
                        {r.notes}
                      </div>
                    )}
                    <div className="mt-2 text-xs text-ink-400">
                      {new Date(r.createdAt).toLocaleString("bg-BG")}
                    </div>
                  </div>
                </div>
                <RequestStatusControl id={r.id} initialStatus={r.status} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
