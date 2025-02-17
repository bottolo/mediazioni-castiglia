import { useMap } from "@/hooks/useMap";
import { locations } from "@/utils/locations";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@radix-ui/react-select";
import { ChevronDown, MapPin } from "lucide-react";

export const LeafletMap = () => {
	const {
		mapRef,
		selectedLocation,
		handleLocationSelect,
		currentLocation,
		isMobile,
	} = useMap();

	return (
		<div className="relative h-screen w-full">
			{isMobile ? (
				<div className="bg-white rounded-lg px-[1rem]">
					<h4 className="mb-2">Scegli una sede (5 disponibili)</h4>
					<div className="relative">
						<Select
							value={selectedLocation}
							onValueChange={(value) =>
								handleLocationSelect(
									locations?.find((loc) => loc?.name === value),
								)
							}
						>
							<SelectTrigger className="flex w-full items-center justify-between rounded-lg border border-black bg-white px-3 py-4 pl-10 text-sm focus:outline-none">
								<SelectValue />
								<ChevronDown className="h-4 w-4 opacity-50" />
							</SelectTrigger>
							<SelectContent
								className="w-[var(--radix-select-trigger-width)] overflow-hidden rounded-lg border border-black bg-white shadow-md z-[99999999999] my-2"
								position="popper"
							>
								<SelectGroup className="p-2">
									{locations.map((loc) => (
										<SelectItem
											key={loc.name}
											value={loc.name}
											className="relative flex cursor-pointer select-none items-center px-2 py-3 sm outline-none hover:bg-gray-100 focus:bg-black focus:text-white rounded-md"
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
							// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
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
									<p>{loc.name}</p>
									<p
										className={`sm ${
											selectedLocation === loc.name
												? "text-gray-400"
												: "text-gray-500"
										}`}
									>
										{selectedLocation === loc.name && loc.address}
									</p>
								</div>
								{selectedLocation === loc.name && (
									// biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
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
