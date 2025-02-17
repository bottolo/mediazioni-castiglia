export type Location = {
	name: string;
	coords: [number, number];
	address: string;
	image?: string;
};
export const locations: Location[] = [
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
