import axios from "axios";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Polygon, TileLayer } from "react-leaflet";
import { IconLoader } from "@tabler/icons-react";
import L from "leaflet";

const NeighborhoodSearch: React.FC<{
  neightborhood?: string | null;
  completeAddress?: boolean;
}> = ({ neightborhood, completeAddress = false }) => {
  const [coordinates, setCoordinates] = useState<
    Array<[number, number]> | undefined
  >([]);
  const [hasNotFoundCompleteAddress, setHasNotFoundCompleteAddress] =
    useState(false);

  const icon = L.icon({ iconUrl: "/pin.png", iconSize: [50, 50] });
  const getBoundaries = async (neightborhood: string) => {
    setHasNotFoundCompleteAddress(false);
    const name = (
      !completeAddress
        ? (neightborhood as string).replace(/\s\([^)]*\)|\d+/g, "").trim()
        : neightborhood
    ).toLocaleLowerCase();
    const data = await axios.get(
      `https://nominatim.openstreetmap.org/search.php?q=${encodeURIComponent(
        name
      )}&polygon_geojson=1&format=json`
    );

    let hasFound = false;
    for (const item of data.data) {
      if (!item.geojson) continue;
      if (!completeAddress) {
        if (item.geojson.type === "Polygon") {
          setCoordinates(
            item.geojson.coordinates[0].map((row: number[]) => [row[1], row[0]])
          );
          hasFound = true;
          break;
        } else if (item.geojson.type === "MultiPolygon") {
          setCoordinates(
            item.geojson.coordinates[0][0].map((row: number[]) => [
              row[1],
              row[0],
            ])
          );
          hasFound = true;
          break;
        }
      } else {
        if (item.geojson.type === "Point") {
          setCoordinates([[item.lat, item.lon]]);
          hasFound = true;
          break;
        }
      }
    }
    if (hasFound) return;

    setHasNotFoundCompleteAddress(completeAddress ? true : false);

    // Get what is between the parenthesis
    const commune = !completeAddress
      ? neightborhood
          ?.match(/\(([^)]+)\)/)?.[1]
          ?.split(" ")
          .at(-1)
      : neightborhood.split(",")[1]?.trim();

    if (!commune) {
      setCoordinates([[46.8182, 8.2275]]);
      return;
    }
    const second = await axios.get(
      `https://nominatim.openstreetmap.org/search.php?q=${encodeURIComponent(
        commune as string
      )}&polygon_geojson=1&format=json`
    );
    for (const item of second.data) {
      if (!item.geojson) continue;
      if (item.geojson.type === "Polygon") {
        setCoordinates(
          item.geojson.coordinates[0].map((row: number[]) => [row[1], row[0]])
        );
        hasFound = true;
        break;
      } else if (item.geojson.type === "MultiPolygon") {
        setCoordinates(
          item.geojson.coordinates[0][0].map((row: number[]) => [
            row[1],
            row[0],
          ])
        );
        hasFound = true;
        break;
      }
    }
  };

  useEffect(() => {
    getBoundaries(neightborhood ? neightborhood : "Suisse");
  }, []);

  return (
    <div style={{ width: 100 + "%", height: 100 + "%" }}>
      {coordinates && coordinates.length > 0 ? (
        // @ts-ignore
        <MapContainer
          style={{ width: 100 + "%", height: 100 + "%" }}
          {...(completeAddress && !hasNotFoundCompleteAddress
            ? { center: coordinates[0], bounds: [coordinates[0]] }
            : { bounds: coordinates })}
          boundsOptions={{ padding: [1, 1] }}
          zoomControl={false}
          zoom={completeAddress && !hasNotFoundCompleteAddress ? 16 : 12}
          scrollWheelZoom={false}
          dragging={false}
          doubleClickZoom={false}
          touchZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {(!completeAddress || hasNotFoundCompleteAddress) && (
            <Polygon positions={coordinates} />
          )}
          {completeAddress && !hasNotFoundCompleteAddress && (
            <Marker position={coordinates[0] as [number, number]} icon={icon} />
          )}
        </MapContainer>
      ) : (
        <div className="relative grid h-full w-full place-items-center">
          <IconLoader
            className="absolute animate-spin text-blue"
            size={32}
            stroke={1.5}
          />
        </div>
      )}
    </div>
  );
};

export default NeighborhoodSearch;
