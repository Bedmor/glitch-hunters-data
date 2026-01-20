import { db } from "~/server/db";
import Link from "next/link";
import { ArrowLeft, MapPin, Calendar, AlertTriangle } from "lucide-react";
import StatusUpdater from "./StatusUpdater";
import { notFound } from "next/navigation";

export default async function ReportDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const report = await db.glitch.findUnique({
    where: { id: params.id },
  });

  if (!report) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6">
        <Link
          href="/dashboard/reports"
          className="mb-4 inline-flex items-center gap-2 text-gray-500 transition-colors hover:text-gray-900 dark:hover:text-gray-100"
        >
          <ArrowLeft size={20} />
          <span>Listeye Dön</span>
        </Link>
        <div className="flex items-start justify-between">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {report.title}
          </h1>
          <StatusUpdater id={report.id} currentStatus={report.status} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="space-y-6 md:col-span-2">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
              Detaylar
            </h3>
            <p className="leading-relaxed whitespace-pre-wrap text-gray-600 dark:text-gray-300">
              {report.description}
            </p>
            {report.imageUri && (
              <div className="mt-6 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={report.imageUri}
                  alt="Rapor görseli"
                  className="h-auto max-h-96 w-full object-cover"
                />
              </div>
            )}
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
              Yorumlar & Aktivite
            </h3>
            <div className="py-8 text-center text-gray-500">
              Henüz yorum yapılmamış.
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <h3 className="mb-4 text-sm font-semibold tracking-wider text-gray-500 uppercase">
              Bilgiler
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 text-gray-400" size={18} />
                <div>
                  <span className="block text-sm font-medium text-gray-900 dark:text-white">
                    Konum
                  </span>
                  <span className="text-sm text-gray-500">
                    {report.latitude.toFixed(6)}, {report.longitude.toFixed(6)}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="mt-0.5 text-gray-400" size={18} />
                <div>
                  <span className="block text-sm font-medium text-gray-900 dark:text-white">
                    Bildirilme Tarihi
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(report.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 text-gray-400" size={18} />
                <div>
                  <span className="block text-sm font-medium text-gray-900 dark:text-white">
                    Önem Derecesi
                  </span>
                  <span className="text-sm text-gray-500">
                    {report.severity}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
