import { db } from "~/server/db";
import { AlertCircle, CheckCircle2, Clock, TrendingUp } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  // Fetch stats concurrently
  const [totalOpen, totalInProgress, totalResolved, recentReports] =
    await Promise.all([
      db.glitch.count({ where: { status: "OPEN" } }),
      db.glitch.count({ where: { status: "IN_PROGRESS" } }),
      db.glitch.count({ where: { status: "RESOLVED" } }),
      db.glitch.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ]);

  const total = totalOpen + totalInProgress + totalResolved;
  const resolutionRate =
    total > 0 ? Math.round((totalResolved / total) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Açık Sorunlar"
          value={totalOpen}
          icon={<AlertCircle className="text-red-500" />}
          trend="+5% geçen hafta"
          trendUp={true}
        />
        <StatCard
          title="İşleniyor"
          value={totalInProgress}
          icon={<Clock className="text-amber-500" />}
          trend="Aktif çalışma"
          trendUp={false}
        />
        <StatCard
          title="Çözüldü"
          value={totalResolved}
          icon={<CheckCircle2 className="text-green-500" />}
          trend="+12% başarı"
          trendUp={true}
        />
        <StatCard
          title="Çözüm Oranı"
          value={`%${resolutionRate}`}
          icon={<TrendingUp className="text-blue-500" />}
          trend="Hedef: %85"
          trendUp={Boolean(resolutionRate > 85)}
        />
      </div>

      {/* Recent Activity & Charts sections could go here */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
            Son Bildirimler
          </h3>
          <div className="space-y-4">
            {recentReports.map((report) => (
              <div
                key={report.id}
                className="flex items-start gap-4 rounded-lg p-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50"
              >
                <div
                  className={`mt-2 h-2 w-2 rounded-full ${
                    report.status === "RESOLVED"
                      ? "bg-green-500"
                      : report.status === "IN_PROGRESS"
                        ? "bg-amber-500"
                        : "bg-red-500"
                  }`}
                />
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {report.title}
                  </p>
                  <p className="line-clamp-1 text-sm text-gray-500">
                    {report.description}
                  </p>
                  <span className="text-xs text-gray-400">
                    {report.createdAt.toLocaleDateString("tr-TR")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center rounded-xl border border-gray-100 bg-white p-6 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-4 rounded-full bg-indigo-50 p-4 dark:bg-indigo-900/20">
            <TrendingUp className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Analiz Raporları
          </h3>
          <p className="mt-2 max-w-xs text-gray-500">
            Detaylı harita analizleri ve yoğunluk haritaları için "Harita
            Analizi" sekmesine gidin.
          </p>
        </div>
      </div>
    </div>
  );
}

// Type definition for StatCard props
interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  trend: string;
  trendUp: boolean;
}

function StatCard({ title, value, icon, trend, trendUp }: StatCardProps) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-500">{title}</span>
        <div className="rounded-lg bg-gray-50 p-2 dark:bg-gray-700/50">
          {icon}
        </div>
      </div>
      <div className="flex items-end justify-between">
        <h4 className="text-3xl font-bold text-gray-900 dark:text-white">
          {value}
        </h4>
        <div
          className={`flex items-center rounded-full px-2 py-1 text-xs font-medium ${
            trendUp
              ? "bg-green-50 text-green-600 dark:bg-green-900/20"
              : "bg-gray-100 text-gray-500 dark:bg-gray-700"
          }`}
        >
          {trend}
        </div>
      </div>
    </div>
  );
}
