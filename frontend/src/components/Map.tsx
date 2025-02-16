import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@radix-ui/react-select";
import L from "leaflet";
import { ChevronDown, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const Map = () => {
	const mapRef = useRef(null);
	const mapInstanceRef = useRef(null);
	const [selectedLocation, setSelectedLocation] = useState("Catania");
	const [isMobile, setIsMobile] = useState(false);

	const locations = [
		{
			name: "Catania",
			address: "Via Cesare Beccaria, 67, 95123 Catania CT",
			coords: [37.5079, 15.083],
		},
		{
			name: "Paternò",
			address: "Metropolitan City of Catania, Sicily",
			coords: [37.5667, 14.9],
		},
		{
			name: "Acireale",
			address: "Metropolitan City of Catania, Sicily",
			coords: [37.6167, 15.1667],
		},
		{
			name: "San Giovanni La Punta",
			address: "Metropolitan City of Catania, Sicily",
			coords: [37.5833, 15.1],
		},
		{
			name: "Caltagirone",
			address: "Metropolitan City of Catania, Sicily",
			coords: [37.2333, 14.5167],
		},
	];

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};

		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	useEffect(() => {
		if (mapInstanceRef.current) return;

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
			mapInstanceRef.current.invalidateSize();
		}, 100);

		return () => {
			if (mapInstanceRef.current) {
				mapInstanceRef.current.remove();
				mapInstanceRef.current = null;
			}
		};
	}, []);

	const handleLocationSelect = (location) => {
		setSelectedLocation(location.name);
		if (mapInstanceRef.current) {
			mapInstanceRef.current.setView(location.coords, 12);
		}
	};

	const currentLocation = locations.find(
		(loc) => loc.name === selectedLocation,
	);

	return (
		<div className="relative h-screen w-full">
			{isMobile ? (
				<div className="bg-white rounded-lg px-[1rem]">
					<h2 className="text-lg font-medium mb-2">
						Scegli una sede (5 disponibili)
					</h2>
					<div className="relative ">
						<Select
							value={selectedLocation}
							onValueChange={(value) =>
								handleLocationSelect(
									locations.find((loc) => loc.name === value),
								)
							}
						>
							<SelectTrigger className="flex w-full items-center justify-between rounded-lg border border-black bg-white px-3 py-4 pl-10 text-sm focus:outline-none">
								<SelectValue />
								<ChevronDown className="h-4 w-4 opacity-50" />
							</SelectTrigger>
							<SelectContent
								className="w-[var(--radix-select-trigger-width)] overflow-hidden rounded-lg border border-black bg-white shadow-md z-[99999999999] mt-2"
								position="popper"
							>
								<SelectGroup className={"p-2"}>
									{locations.map((loc) => (
										<SelectItem
											key={loc.name}
											value={loc.name}
											className="relative flex cursor-pointer select-none items-center px-2 py-3 text-sm outline-none hover:bg-gray-100 focus:bg-black focus:text-white rounded-md"
										>
											{loc.name}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
						<div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
							<MapPin className="h-5 w-5 text-gray-400" />
						</div>
					</div>
					{currentLocation && (
						<p className="mt-2 text-gray-500 text-sm">
							{currentLocation.address}
						</p>
					)}
				</div>
			) : (
				<div className="absolute top-2.5 left-14 z-9999 bg-white bg-opacity-80 text-black p-4 rounded-lg w-64 drop-shadow-2xl">
					<div className="space-y-2">
						{locations.map((loc) => (
							<div
								key={loc.name}
								onClick={() => handleLocationSelect(loc)}
								className={`group flex justify-between items-start cursor-pointer p-2.5 rounded transition-colors ${
									selectedLocation === loc.name
										? "bg-black text-white"
										: "hover:bg-black hover:text-white"
								}`}
							>
								<div className="flex flex-col">
									<span className="font-medium">{loc.name}</span>
									<span
										className={`text-sm ${
											selectedLocation === loc.name
												? "text-gray-400"
												: "text-gray-500"
										}`}
									>
										{selectedLocation === loc.name && loc.address}
									</span>
								</div>
								{selectedLocation === loc.name && (
									<svg
										className="w-5 h-5 mt-1"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path
											fillRule="evenodd"
											d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
											clipRule="evenodd"
										/>
									</svg>
								)}
							</div>
						))}
					</div>
				</div>
			)}
			<div ref={mapRef} className="h-1/2 w-full mt-2 md:mt-0" />
		</div>
	);
};
