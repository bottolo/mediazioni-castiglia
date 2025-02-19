type Experience = {
	date: string;
	title: string;
	company: string;
	image?: string;
	className?: string;
};

export const experiences: Experience[] = [
	{
		date: "2020 - Oggi",
		title: "Credit sales specialist",
		company: "24Max",
		image:
			"https://www.uniroma1.it/sites/default/files/sites/default/files/logo/24max.png",
	},
	{
		date: "2017 - 2020",
		title: "Consulente per servizi finanziari",
		company: "Auxilia Finance",
		image: "https://www.fiaip.it/wp-content/uploads/2019/10/Auxilia_logo.png",
		className: "p-2",
	},
	{
		date: "2016 - 2017",
		title: "Family Broker",
		company: "Credipass",
		image:
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThTkixw8AD_ZsLYbvimnJcdyRjYFLWSMM71A&s",
		className: "py-2 px-16",
	},
	{
		date: "2014 - 2019",
		title: "Responsabile Aziendale Junior",
		company: "SDL Centrostudi",
		image:
			"https://pbs.twimg.com/media/EcYbqVVVAAA0uv8?format=png&name=4096x4096",
		className: "py-2",
	},
	{
		date: "2014 - 2015",
		title: "Money 360",
		company: "Mediatore creditizio in collaborazione",
		image: "https://www.money360.it/img/logos/logo-money360.png",
		className: "py-2 px-16",
	},
	{
		date: "2008 - 2013",
		title: "Barclays",
		company: "Agente in attività finanziaria",
		image: "https://1000logos.net/wp-content/uploads/2016/10/Barclays-Logo.jpg",
		className: "px-20 py-2",
	},
];
