import { db } from "~/server/db";
import MapLazy from "./MapLazy";

export const revalidate = 0; // Disable cache for realtime updates

export default async function MapPage() {
  const reports = await db.glitch.findMany();

  return (
    <div className="h-[calc(100vh-8rem)]">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Şehir Yoğunluk Haritası
        </h2>
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500"></span>
            <span className="text-gray-600 dark:text-gray-300">Açık</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-amber-500"></span>
            <span className="text-gray-600 dark:text-gray-300">İşleniyor</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-green-500"></span>
            <span className="text-gray-600 dark:text-gray-300">Çözüldü</span>
          </div>
        </div>
      </div>
      <div className="h-full w-full rounded-xl border border-gray-200 bg-white p-1 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <MapLazy reports={reports} />
      </div>
    </div>
  );
}
