import Link from "next/link";
import {
  LayoutDashboard,
  Map as MapIcon,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";
import LogoutButton from "./LogoutButton";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-100 font-sans dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="flex w-64 flex-col border-r border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="p-6">
          <h1 className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-2xl font-bold text-transparent">
            CityFix
          </h1>
          <p className="mt-1 text-xs text-gray-500">Belediye Kontrol Paneli</p>
        </div>

        <nav className="flex-1 space-y-2 px-4">
          <NavItem
            href="/dashboard"
            icon={<LayoutDashboard size={20} />}
            label="Genel Bakış"
          />
          <NavItem
            href="/dashboard/map"
            icon={<MapIcon size={20} />}
            label="Harita Analizi"
          />
          <NavItem
            href="/dashboard/reports"
            icon={<FileText size={20} />}
            label="Raporlar"
          />
          <NavItem
            href="/dashboard/settings"
            icon={<Settings size={20} />}
            label="Ayarlar"
          />
        </nav>

        <div className="border-t border-gray-200 p-4 dark:border-gray-700">
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-8 dark:border-gray-700 dark:bg-gray-800">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Hoş Geldiniz, Yönetici
          </h2>
        </header>
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}

function NavItem({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-gray-600 transition-colors hover:bg-indigo-50 hover:text-indigo-600 dark:text-gray-300 dark:hover:bg-indigo-900/30 dark:hover:text-indigo-400"
    >
      {icon}
      <span className="font-medium">{label}</span>
    </Link>
  );
}
