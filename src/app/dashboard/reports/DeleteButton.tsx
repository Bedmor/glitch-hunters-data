"use client";

import { Trash2 } from "lucide-react";
import { deleteGlitch } from "~/server/actions";
import { useTransition } from "react";

export default function DeleteButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm("Bu raporu silmek istediğinize emin misiniz?")) {
      startTransition(async () => {
        await deleteGlitch(id);
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="ml-4 inline-flex items-center gap-2 text-red-600 transition-colors hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
      title="Raporu Sil"
    >
      {isPending ? (
        <span className="text-xs">Siliniyor...</span>
      ) : (
        <>
          <Trash2 size={16} />
          <span className="text-sm font-medium">Sil</span>
        </>
      )}
    </button>
  );
}
