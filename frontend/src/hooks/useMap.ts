import { type Location, locations } from "@/utils/locations";
import L from "leaflet";
import { type RefObject, useEffect, useRef, useState } from "react";

interface UseMapReturn {
	mapRef: RefObject<HTMLDivElement>;
	selectedLocation: string;
	handleLocationSelect: (location: Location | undefined) => void;
	currentLocation: Location | undefined;
	isMobile: boolean;
}

export const useMap = (): UseMapReturn => {
	const mapRef = useRef<HTMLDivElement>(null);
	const mapInstanceRef = useRef<L.Map | null>(null);
	const [selectedLocation, setSelectedLocation] = useState("Catania");
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};

		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	useEffect(() => {
		if (mapInstanceRef.current || !mapRef.current) return;

		const map = L.map(mapRef.current).setView([37.5079, 15.083], 9);
		mapInstanceRef.current = map;

		L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
			attribution:
				'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		}).addTo(map);

		locations.map((loc) => {
			const marker = L.marker(loc.coords).addTo(map);
			marker.bindPopup(loc.name);
		});

		setTimeout(() => {
			mapInstanceRef.current?.invalidateSize();
		}, 100);

		return () => {
			if (mapInstanceRef.current) {
				mapInstanceRef.current.remove();
				mapInstanceRef.current = null;
			}
		};
	}, []);

	const handleLocationSelect = (location: Location | undefined) => {
		setSelectedLocation(location?.name);
		if (mapInstanceRef.current) {
			mapInstanceRef.current.setView(location?.coords, 12);
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
