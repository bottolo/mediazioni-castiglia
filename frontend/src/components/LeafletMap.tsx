import { useMap } from "@/hooks/use-map.ts";
import { locations } from "@/utils/locations";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
} from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import marker from "@/assets/icons/marker.svg";

export const LeafletMap = () => {
	const {
		mapRef,
		selectedLocation,
		handleLocationSelect,
		currentLocation,
		isMobile,
	} = useMap();

	return (
		<div className="flex flex-col relative h-[600px]">
			{isMobile ? (
				<div className="bg-white px-4 pb-4">
					<h4 className="mb-2">
						Scegli una sede ({locations?.length} disponibili)
					</h4>
					<div className="relative">
						<Select
							value={selectedLocation}
							onValueChange={(value) =>
								handleLocationSelect(
									locations?.find((loc) => loc?.name === value),
								)
							}
						>
							<SelectTrigger className="flex w-full items-center justify-between rounded-sm border border-black bg-white px-3 py-4 pl-10 text-sm focus:outline-none">
								<p>{selectedLocation || "Seleziona una sede"}</p>
								<ChevronDown className="h-4 w-4" />
							</SelectTrigger>
							<SelectContent
								className="w-[var(--radix-select-trigger-width)] overflow-hidden rounded-lg bg-white drop-shadow-[var(--drop-shadow-select)] z-[99999999999] my-2"
								position="popper"
							>
								<SelectGroup className="p-2">
									{locations.map((loc) => (
										<SelectItem
											key={loc.name}
											value={loc.name}
											className="relative cursor-pointer select-none items-center px-2 py-3 sm outline-none rounded-md overflow-hidden"
										>
											{selectedLocation === loc.name ? (
												<div
													className="absolute inset-0 transition-opacity duration-150"
													style={{
														background:
															"linear-gradient(to top, var(--bg-button-default-from), var(--bg-button-default-to))",
														zIndex: 0,
													}}
												/>
											) : (
												<>
													<div className="absolute inset-0 bg-transparent transition-opacity duration-150" />
													<div
														className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-150"
														style={{ background: "var(--bg-neutral-hover)" }}
													/>
												</>
											)}
											<span
												className={`relative z-10 ${selectedLocation === loc.name ? "text-white" : ""}`}
											>
												{loc.name}
											</span>
											{selectedLocation === loc.name && (
												<span className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10">
													<Check className="h-4 w-4 text-white" />
												</span>
											)}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
						<div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
							<img alt={"marker"} src={marker} />
						</div>
					</div>
					{currentLocation && (
						<p className="mt-2 text-gray-500 text-sm">
							{currentLocation.address}
						</p>
					)}
				</div>
			) : null}
			<div className="relative h-full w-full">
				<div ref={mapRef} className="h-full w-full" />
				{!isMobile && (
					<div className="absolute top-3 right-3 z-[998] bg-white bg-opacity-80 text-black p-1 rounded-[var(--radius-select)] w-64 drop-shadow-[var(--drop-shadow-select)]">
						<div className="space-y-1">
							{locations.map((loc) => (
								<div
									key={loc.name}
									onClick={() => handleLocationSelect(loc)}
									className={`group relative flex justify-between items-start cursor-pointer p-2.5 rounded-[var(--radius-select-item)] overflow-hidden ${
										selectedLocation === loc.name ? "text-white" : "text-black"
									}`}
								>
									{selectedLocation !== loc.name && (
										<>
											<div className="absolute inset-0 bg-transparent transition-opacity duration-150" />

											<div
												className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
												style={{ background: "var(--bg-neutral-hover)" }}
											/>
										</>
									)}

									{selectedLocation === loc.name && (
										<div
											className="absolute inset-0 transition-opacity duration-300"
											style={{
												background:
													"linear-gradient(to top, var(--bg-button-default-from), var(--bg-button-default-to))",
											}}
										/>
									)}

									{/* Content */}
									<div className="flex flex-col relative z-10">
										<p>{loc.name}</p>
										<p
											className={`sm ${
												selectedLocation === loc.name
													? "text-gray-400"
													: "text-gray-500"
											}`}
										>
											{loc.address}
										</p>
									</div>

									{selectedLocation === loc.name && (
										<svg
											className="relative z-10"
											width="14"
											height="20"
											viewBox="0 0 14 20"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M7 0C3.13 0 0 3.13 0 7C0 12.25 7 20 7 20C7 20 14 12.25 14 7C14 3.13 10.87 0 7 0ZM7 9.5C6.33696 9.5 5.70107 9.23661 5.23223 8.76777C4.76339 8.29893 4.5 7.66304 4.5 7C4.5 6.33696 4.76339 5.70107 5.23223 5.23223C5.70107 4.76339 6.33696 4.5 7 4.5C7.66304 4.5 8.29893 4.76339 8.76777 5.23223C9.23661 5.70107 9.5 6.33696 9.5 7C9.5 7.66304 9.23661 8.29893 8.76777 8.76777C8.29893 9.23661 7.66304 9.5 7 9.5Z"
												fill="white"
												fillOpacity="0.8"
											/>
										</svg>
									)}
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
