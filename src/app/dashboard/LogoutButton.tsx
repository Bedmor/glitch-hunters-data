"use client";

import { LogOut } from "lucide-react";
import { logout } from "~/server/auth";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="flex w-full items-center gap-3 rounded-lg p-2 text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-900/20"
    >
      <LogOut size={20} />
      <span className="font-medium">Çıkış Yap</span>
    </button>
  );
}
