// @ts-nocheck
import { IconLoader } from "@tabler/icons-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Polygon, TileLayer } from "react-leaflet";

// TS ignore all file because of leaflet
const Map: React.FC<{
  neightborhood?: string | null;
}> = ({ neightborhood }) => {
  const [coordinates, setCoordinates] = useState<
    Array<[number, number]> | undefined
  >([]);
  const [hasFoundCompleteAddress, setHasFoundCompleteAddress] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const icon = L.icon({ iconUrl: "/pin.png", iconSize: [50, 50] });
  const getBoundaries = async (neightborhood: string) => {
    // Take everything after the first space even if there is
    const name = neightborhood.toLocaleLowerCase().split("(")[0]!;
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search.php?q=${encodeURIComponent(
        name
      )}&polygon_geojson=1&format=json`
    );
    const data = await res.json();

    for (const item of data) {
      if (!item.geojson) continue;
      if (item.geojson.type === "Polygon") {
        setCoordinates(
          item.geojson.coordinates[0].map((row: number[]) => [row[1], row[0]])
        );
        setHasFoundCompleteAddress(false);
        break;
      } else if (item.geojson.type === "MultiPolygon") {
        setCoordinates(
          item.geojson.coordinates[0][0].map((row: number[]) => [
            row[1],
            row[0],
          ])
        );
        setHasFoundCompleteAddress(false);
        break;
      }
      if (item.geojson.type === "Point") {
        setCoordinates([[item.lat, item.lon]]);
        setHasFoundCompleteAddress(true);
        break;
      }
    }
  };

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      getBoundaries(neightborhood ? neightborhood : "Suisse");
    }, 500);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [neightborhood]);

  return (
    <div className="z-0" style={{ width: "100" + "%", height: "100" + "%" }}>
      {coordinates && coordinates.length > 0 ? (
        <MapContainer
          style={{ width: "100" + "%", height: "100" + "%" }}
          {...(hasFoundCompleteAddress
            ? { center: coordinates[0], bounds: [coordinates[0]] }
            : { bounds: coordinates })}
          boundsOptions={{ padding: [1, 1] }}
          zoom={hasFoundCompleteAddress ? 16 : 12}
          doubleClickZoom={false}
          touchZoom={false}
          key={coordinates.map((c) => c.join(",")).join(",")}
          className="z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {!hasFoundCompleteAddress && <Polygon positions={coordinates} />}
          {hasFoundCompleteAddress && (
            <Marker position={coordinates[0] as [number, number]} icon={icon} />
          )}
        </MapContainer>
      ) : (
        <div className="relative grid h-full w-full place-items-center">
          <IconLoader
            className="absolute animate-spin text-primary"
            size={32}
            stroke={1.5}
          />
        </div>
      )}
    </div>
  );
};

export default Map;
