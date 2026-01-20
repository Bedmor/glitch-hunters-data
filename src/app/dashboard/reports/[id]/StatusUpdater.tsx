"use client";

import { useTransition } from "react";
import { updateGlitchStatus } from "~/server/actions";
import { Loader2 } from "lucide-react";

interface StatusUpdaterProps {
  id: string;
  currentStatus: string;
}

export default function StatusUpdater({
  id,
  currentStatus,
}: StatusUpdaterProps) {
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    startTransition(async () => {
      await updateGlitchStatus(id, newStatus);
    });
  };

  return (
    <div className="flex items-center gap-2">
      <select
        value={currentStatus}
        onChange={handleStatusChange}
        disabled={isPending}
        className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none ${
          currentStatus === "OPEN"
            ? "border-red-200 bg-red-50 text-red-700 focus:ring-red-500"
            : currentStatus === "IN_PROGRESS"
              ? "border-amber-200 bg-amber-50 text-amber-700 focus:ring-amber-500"
              : "border-green-200 bg-green-50 text-green-700 focus:ring-green-500"
        }`}
      >
        <option value="OPEN">Açık</option>
        <option value="IN_PROGRESS">İşleniyor</option>
        <option value="RESOLVED">Çözüldü</option>
      </select>
      {isPending && (
        <Loader2 className="animate-spin text-gray-400" size={16} />
      )}
    </div>
  );
}
