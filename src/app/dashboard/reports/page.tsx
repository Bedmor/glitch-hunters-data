import { db } from "~/server/db";
import Link from "next/link";
import { Eye } from "lucide-react";
import { getSession } from "~/server/auth";
import DeleteButton from "./DeleteButton";

export const dynamic = "force-dynamic";

export default async function ReportsPage() {
  const session = await getSession();
  const isSuperAdmin = session?.role === "super_admin";

  const reports = await db.glitch.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Rapor Yönetimi
        </h2>
        <div className="flex gap-2">{/* Simple filters could go here */}</div>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <table className="w-full border-collapse text-left">
          <thead className="bg-gray-50 text-sm font-medium text-gray-500 dark:bg-gray-900/50">
            <tr>
              <th className="p-4">Durum</th>
              <th className="p-4">Başlık</th>
              <th className="p-4">Konum</th>
              <th className="p-4">Tarih</th>
              <th className="p-4">Önem</th>
              <th className="p-4 text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {reports.map((report) => (
              <tr
                key={report.id}
                className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50"
              >
                <td className="p-4">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      report.status === "OPEN"
                        ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                        : report.status === "IN_PROGRESS"
                          ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                          : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                    }`}
                  >
                    {report.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="font-medium text-gray-900 dark:text-gray-100">
                    {report.title}
                  </div>
                  <div className="max-w-xs truncate text-sm text-gray-500">
                    {report.description}
                  </div>
                </td>
                <td className="p-4 text-sm text-gray-500">
                  {report.latitude.toFixed(4)}, {report.longitude.toFixed(4)}
                </td>
                <td className="p-4 text-sm text-gray-500">
                  {new Date(report.createdAt).toLocaleDateString("tr-TR")}
                </td>
                <td className="p-4">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {report.severity}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <Link
                    href={`/dashboard/reports/${report.id}`}
                    className="inline-flex items-center gap-2 text-indigo-600 transition-colors hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                  >
                    <span className="text-sm font-medium">Detay</span>
                    <Eye size={16} />
                  </Link>
                  {isSuperAdmin && <DeleteButton id={report.id} />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
