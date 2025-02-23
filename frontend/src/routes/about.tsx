import { AboutHero } from "@/components/AboutHero.tsx";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
	component: About,
});

function About() {
	return (
		<div className={"space-y-12"}>
			<AboutHero
				title={"Chi sono"}
				subtitle={"Gaetano Castiglia"}
				description={
					"Scopri il mutuo che si adatta alle tue esigenze attraverso una consulenza personalizzata. Lavorerò al tuo fianco per farti risparmiare tempo, semplificare la raccolta documentale e presentarti il prodotto creditizio più conveniente grazie alle numerose convenzioni con i nostri partner bancari."
				}
				email={"gaetano.castiglia@24max.it"}
				phone={"+39 334 1058956"}
			/>
		</div>
	);
}
