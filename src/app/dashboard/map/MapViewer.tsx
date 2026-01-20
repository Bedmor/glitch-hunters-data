"use client";

import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { type Glitch } from "../../../../generated/prisma";

interface MapViewerProps {
  reports: Glitch[];
}

export default function MapViewer({ reports }: MapViewerProps) {
  const center: [number, number] = [41.0082, 28.9784]; // Istanbul center default

  const getColor = (status: string) => {
    switch (status) {
      case "OPEN":
        return "#ef4444"; // red-500
      case "IN_PROGRESS":
        return "#f59e0b"; // amber-500
      case "RESOLVED":
        return "#22c55e"; // green-500
      default:
        return "#3b82f6";
    }
  };

  return (
    <MapContainer
      center={center}
      zoom={11}
      style={{
        height: "100%",
        width: "100%",
        borderRadius: "0.75rem",
        zIndex: 0,
      }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {reports.map((report) => (
        <CircleMarker
          key={report.id}
          center={[report.latitude, report.longitude]}
          pathOptions={{
            color: getColor(report.status),
            fillColor: getColor(report.status),
            fillOpacity: 0.6,
          }}
          radius={8}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-bold text-gray-900">{report.title}</h3>
              <p className="mb-2 text-sm text-gray-600">{report.description}</p>
              <div className="flex gap-2">
                <span
                  className={`rounded px-2 py-1 text-xs text-white ${
                    report.status === "OPEN"
                      ? "bg-red-500"
                      : report.status === "IN_PROGRESS"
                        ? "bg-amber-500"
                        : "bg-green-500"
                  }`}
                >
                  {report.status}
                </span>
                <span className="self-center text-xs text-gray-500">
                  {new Date(report.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
