"use client";

import dynamic from "next/dynamic";
import { type Glitch } from "../../../../generated/prisma";

const MapViewer = dynamic(() => import("./MapViewer"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
      <p className="animate-pulse text-gray-500">Harita yükleniyor...</p>
    </div>
  ),
});

interface MapLazyProps {
  reports: Glitch[];
}

export default function MapLazy({ reports }: MapLazyProps) {
  return <MapViewer reports={reports} />;
}
