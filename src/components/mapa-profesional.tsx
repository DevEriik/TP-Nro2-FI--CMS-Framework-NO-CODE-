import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const icon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

type Prof = {
  id: number;
  nombre: string;
  oficio: string;
  lat: number;
  lng: number;
};
const PROFESIONALES: Prof[] = [
  {
    id: 1,
    nombre: "Martín Benítez",
    oficio: "Plomería y Gas",
    lat: -38.9516,
    lng: -68.0591,
  },
  {
    id: 2,
    nombre: "Clara Rossi",
    oficio: "Electricidad",
    lat: -38.9313,
    lng: -68.0019,
  },
  {
    id: 3,
    nombre: "Taller Plottier",
    oficio: "Electricidad",
    lat: -38.9484,
    lng: -68.2271,
  },
];
const CENTRO: [number, number] = [-38.9516, -68.0591];

function distKm(aLat: number, aLng: number, bLat: number, bLng: number) {
  const R = 6371,
    dLa = ((bLat - aLat) * Math.PI) / 180,
    dLo = ((bLng - aLng) * Math.PI) / 180;
  const h =
    Math.sin(dLa / 2) ** 2 +
    Math.cos((aLat * Math.PI) / 180) *
      Math.cos((bLat * Math.PI) / 180) *
      Math.sin(dLo / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export default function MapaProfesionales() {
  const [pos, setPos] = useState<[number, number] | null>(null);
  const [cercanos, setCercanos] = useState<Prof[]>(PROFESIONALES);

  const buscarCercanos = () => {
    navigator.geolocation.getCurrentPosition(
      (g) => {
        const p: [number, number] = [g.coords.latitude, g.coords.longitude];
        setPos(p);
        setCercanos(
          [...PROFESIONALES]
            .sort(
              (a, b) =>
                distKm(p[0], p[1], a.lat, a.lng) -
                distKm(p[0], p[1], b.lat, b.lng),
            )
            .slice(0, 2),
        );
      },
      () => alert("Activa permiso de ubicación"),
    );
  };

  return (
    <div className="space-y-3">
      <button
        onClick={buscarCercanos}
        className="border rounded px-3 py-2 text-sm"
      >
        Buscar profesionales cercanos
      </button>
      <MapContainer
        center={CENTRO}
        zoom={11}
        style={{ height: 320, width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap"
        />
        {cercanos.map((p) => {
          const pp: [number, number] = [p.lat, p.lng];
          return (
            <Marker key={p.id} position={pp} icon={icon}>
              <Popup>
                <b>{p.nombre}</b>
                <br />
                {p.oficio}
              </Popup>
            </Marker>
          );
        })}
        {pos && (
          <Marker position={pos} icon={icon}>
            <Popup>Tu ubicación</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
