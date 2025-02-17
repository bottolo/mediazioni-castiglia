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
				<div className="absolute top-2.5 left-14 z-9998 bg-white bg-opacity-80 text-black p-4 rounded-lg w-64 drop-shadow-2xl">
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
										width="14"
										height="20"
										viewBox="0 0 14 20"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M7 0C3.13 0 0 3.13 0 7C0 12.25 7 20 7 20C7 20 14 12.25 14 7C14 3.13 10.87 0 7 0ZM7 9.5C6.33696 9.5 5.70107 9.23661 5.23223 8.76777C4.76339 8.29893 4.5 7.66304 4.5 7C4.5 6.33696 4.76339 5.70107 5.23223 5.23223C5.70107 4.76339 6.33696 4.5 7 4.5C7.66304 4.5 8.29893 4.76339 8.76777 5.23223C9.23661 5.70107 9.5 6.33696 9.5 7C9.5 7.66304 9.23661 8.29893 8.76777 8.76777C8.29893 9.23661 7.66304 9.5 7 9.5Z"
											fill="white"
											fill-opacity="0.8"
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
