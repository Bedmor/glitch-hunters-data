export default function SettingsPage() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">
        Ayarlar
      </h2>
      <p className="text-gray-500">
        Bu panel üzerinden yönetici izinleri, bildirim ayarları ve sistem
        yapılandırmaları yönetilebilir.
      </p>

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4 dark:bg-gray-900/50">
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">
              E-posta Bildirimleri
            </h3>
            <p className="text-sm text-gray-500">
              Yeni rapor gelince e-posta al
            </p>
          </div>
          <div className="relative h-6 w-12 cursor-pointer rounded-full bg-indigo-600">
            <div className="absolute top-1 right-1 h-4 w-4 rounded-full bg-white"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
