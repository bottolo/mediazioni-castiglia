export type Location = {
	name: string;
	coords: [number, number];
	address: string;
	image?: string;
};

export const locations: Location[] = [
	{
		name: "Catania",
		address: "Via Cesare Beccaria, 67",
		coords: [37.5079, 15.083],
		image:
			"https://lh5.googleusercontent.com/p/AF1QipPgvqeijca9N9t7pqd3x9GaJCn_CASVCLnV6sEX=w426-h240-k-no",
	},
	{
		name: "Paternò",
		address: "Parco Europa, 35",
		coords: [37.57507793171467, 14.907446344176554],
		image:
			"https://lh5.googleusercontent.com/p/AF1QipNkdrJEphA7d1g_6zqWwLwOrN9DK6L_yXsRdOpO=w408-h272-k-no",
	},
	{
		name: "Acireale",
		address: "Corso Savoia, 166",
		coords: [37.620334638538864, 15.16327151432825],
		image:
			"https://lh5.googleusercontent.com/p/AF1QipOBhn-YPBcNaUPAQtCd9rCigPgMUQbGyVbY3Ojt=w426-h240-k-no",
	},
	{
		name: "San Giovanni La Punta",
		address: "Via Duca d'Aosta, 29",
		coords: [37.58331868811885, 15.095411171950873],
		image:
			"https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=kzrPYUe5thaC2gGhPUpodQ&cb_client=search.gws-prod.gps&w=408&h=240&yaw=298.55322&pitch=0&thumbfov=100",
	},
	{
		name: "Caltagirone",
		address: "Viale Principe Umberto, 107",
		coords: [37.22772608358408, 14.522285597127729],
		image:
			"https://lh5.googleusercontent.com/p/AF1QipMEQBHA5YZ99MtfXTpL_UteSB9Lvv0WHHtr9ufW=w426-h240-k-no",
	},
];
