import { type Location, locations } from "@/utils/locations";
import L from "leaflet";
import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-is-mobile.ts";

interface UseMapReturn {
	mapRef: React.RefObject<HTMLDivElement>;
	selectedLocation: string;
	handleLocationSelect: (location: Location) => void;
	currentLocation: Location | undefined;
	isMobile: boolean;
}

export const useMap = (): UseMapReturn => {
	const mapRef = useRef<HTMLDivElement>(null);
	const mapInstanceRef = useRef<L.Map | null>(null);
	const markersRef = useRef<{ [key: string]: L.Marker }>({});
	const [selectedLocation, setSelectedLocation] = useState("Catania");
	const isMobile = useIsMobile();

	const createCustomMarker = (selected: boolean, imageUrl?: string) => {
		if (selected) {
			return new L.Icon({
				iconUrl:
					"https://cdn1.iconfinder.com/data/icons/color-bold-style/21/14_2-512.png",
				shadowUrl:
					"https://www.pngall.com/wp-content/uploads/2017/05/Shadow-Transparent.png",
				iconSize: [40, 40],
				iconAnchor: [12, 41],
				popupAnchor: [8, -34],
				shadowSize: [35, 35],
			});
		}

		const markerHtmlStyles = `
      background-color: #fff;
      width: 2rem;
      height: 2rem;
      display: block;
      position: relative;
      border-radius: 50%;
      border: 2px solid white;
      background-image: url(${imageUrl || "https://picsum.photos/200/200"}); 
      background-size: cover;
    `;

		return L.divIcon({
			className: "custom-marker",
			html: `<span style="${markerHtmlStyles}"></span>`,
			iconSize: [32, 32],
			iconAnchor: [16, 16],
		});
	};

	const updateMarkers = () => {
		Object.entries(markersRef.current).map(([name, marker]) => {
			const location = locations.find((loc) => loc.name === name);
			if (location) {
				const isSelected = name === selectedLocation;
				marker.setIcon(
					createCustomMarker(
						isSelected,
						isSelected ? undefined : location.image,
					),
				);
			}
		});
	};

	useEffect(() => {
		if (mapInstanceRef.current || !mapRef.current) return;

		if (mapRef.current) {
			if (!isMobile) mapRef.current.style.borderRadius = "12px";
			mapRef.current.style.overflow = "hidden";
		}

		const map = L.map(mapRef.current, {
			dragging: !isMobile,
			tap: false,
		}).setView([37.5079, 15.083], 9);

		mapInstanceRef.current = map;

		L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
			attribution:
				'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		}).addTo(map);

		if (isMobile) {
			map.dragging.disable();

			map.touchZoom.enable();

			map.on("touchstart", (e) => {
				if (e.touches && e.touches.length === 1) {
					e.preventDefault();
					return false;
				}
			});
		}

		locations.map((loc) => {
			const marker = L.marker(loc.coords, {
				icon: createCustomMarker(
					loc.name === selectedLocation,
					loc.name === selectedLocation ? undefined : loc.image,
				),
			}).addTo(map);

			const popupContent = `
        <div class="w-40 flex flex-col">
          <h3 class="font-semibold">${loc.name}</h3>
          <p class="text-gray-500">${loc.address}</p>
        </div>
      `;
			marker.bindPopup(popupContent);

			markersRef.current[loc.name] = marker;
		});

		setTimeout(() => {
			mapInstanceRef.current?.invalidateSize();
		}, 100);

		return () => {
			if (mapInstanceRef.current) {
				mapInstanceRef.current.remove();
				mapInstanceRef.current = null;
			}
			markersRef.current = {};
		};
	}, [isMobile]);

	useEffect(() => {
		updateMarkers();
	}, [selectedLocation]);

	const handleLocationSelect = (location: Location) => {
		setSelectedLocation(location.name);
		if (mapInstanceRef.current) {
			mapInstanceRef.current.setView(location.coords, 12);
		}
	};

	const currentLocation = locations.find(
		(loc) => loc.name === selectedLocation,
	);

	return {
		mapRef,
		selectedLocation,
		handleLocationSelect,
		currentLocation,
		isMobile,
	};
};
