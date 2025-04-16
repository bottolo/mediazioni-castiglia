import { Card } from "@/components/Card.tsx";
import { Hero } from "@/components/Hero.tsx";
import { LeafletMap } from "@/components/LeafletMap.tsx";
import { Section } from "@/components/Section.tsx";
import { useImages } from "@/hooks/use-images.ts";
import { cn } from "@/utils/cn.ts";
import { experiences } from "@/utils/experiences.ts";
import { createFileRoute } from "@tanstack/react-router";
import mutuo from "@/assets/icons/mutuo.svg";
import prestiti from "@/assets/icons/prestiti.svg";
import assicurazioni from "@/assets/icons/assicurazioni.svg";

import Calendar from "@/components/Calendar.tsx";
import ImageGallery from "@/components/ImageGallery.tsx";
import SwipeCards from "@/components/SwipeCards.tsx";
import { useCalendarEvents } from "@/hooks/use-calendar-events.ts";

export const Route = createFileRoute("/")({
	component: Index,
});

function Index() {
	const {
		data: awards,
		isLoading: isLoadingAwards,
		error: awardsError,
	} = useImages({
		queryKeys: ["awards"],
		folder: "Awards",
	});

	const {
		data: gallery,
		isLoading: isLoadingGallery,
		error: galleryError,
	} = useImages({
		queryKeys: ["gallery"],
		folder: "Gallery",
	});

	const {
		data: calendarEvents,
		isLoading: isLoadingCalendarEvents,
		error: calendarEventsError,
	} = useCalendarEvents({
		queryKeys: ["calendar"],
		folder: "Calendar",
	});

	return (
		<div className={"space-y-12 font-light"}>
			<Hero
				title={"Gaetano Castiglia"}
				subtitle={"Consulente del credito e assicurativo"}
				description={
					"Lavoro al tuo fianco per farti risparmiare tempo, semplificare la raccolta di documenti e presentarti i prodotti più convenienti."
				}
				email={"info@mediazionicastiglia.it"}
				phone={"+39 334 1058956"}
			/>

			<Section
				id={"calendar"}
				title={"Quando trovarmi"}
				subtitle={
					"Consulta la mia agenda per trovare il momento migliore per te in cui contattarmi"
				}
				childrenStyle={"w-full"}
			>
				<Calendar events={calendarEvents} />
			</Section>
			<Section
				id={"services"}
				title={"Servizi"}
				subtitle={"Cosa offro ai miei clienti"}
				childrenStyle={
					"grid grid-cols-1 md:grid-cols-3 gap-8 w-full px-[1rem] md:px-0"
				}
			>
				<Card
					icon={mutuo}
					title={"Mutuo"}
					description={
						"La soluzione creditizia per ogni progetto immobiliare. Mutuo acquisto, mutuo per ristrutturazione, mutuo green, mutuo giovani under 36, surroghe e altri prodotti dedicati."
					}
				/>
				<Card
					icon={prestiti}
					title={"Prestiti e cessione del quinto"}
					description={
						"La nostra offerta di finanziamenti e prestiti personali per farti ottenere liquidità immediata. Un panel ricco di proposte e di partner per tutti i tuoi progetti."
					}
				/>

				<Card
					icon={assicurazioni}
					title={"Assicurazioni per la protezione del credito"}
					description={
						"Proteggi il tuo investimento con le nostre polizze assicurative per la protezione del credito."
					}
				/>
			</Section>
			<Section
				id={"location"}
				title={"Dove trovarmi"}
				subtitle={"Lavoro in più località: cerca la sede più vicina a te."}
				childrenStyle={"z-1"}
			>
				<LeafletMap />
			</Section>
			<Section
				id="awards"
				title="Riconoscimenti"
				subtitle="Cosa ho ottenuto nel corso degli anni"
				childrenStyle="px-4 md:px-0 w-screen md:w-full"
			>
				<ImageGallery
					images={awards}
					isLoading={isLoadingAwards}
					error={awardsError}
					height="h-64"
					width="w-72"
					gap="gap-4"
				/>
			</Section>
			<Section
				id={"experience"}
				title={"Esperienza"}
				subtitle={"La mia storia fino ad oggi"}
				childrenStyle={"px-4 md:px-0"}
			>
				<div className={"flex flex-col gap-8 md:gap-4 "}>
					{experiences.map((experience, _) => (
						<div
							key={experience?.title}
							className={"flex flex-col md:flex-row gap-4"}
						>
							<img
								alt={experience?.title}
								className={cn(
									"h-[100px] w-[240px] object-contain border border-gray-300 flex-shrink-0 rounded-lg",
									experience?.className,
								)}
								src={experience?.image}
							/>
							<div className={"flex flex-col justify-between gap-1 md:py-1"}>
								<p className={"md text-gray-600"}>{experience?.date}</p>
								<h3 className={"font-semibold text-gray-800"}>
									{experience?.title}
								</h3>
								<p className={"lg text-gray-700"}>{experience?.company}</p>
							</div>
						</div>
					))}
				</div>
			</Section>
			<Section
				id="gallery"
				title="Gallery"
				subtitle="Interazione con clienti e collaboratori, sempre"
				childrenStyle="md:px-0 w-full overflow-hidden"
			>
				{galleryError && <p>Errore: {galleryError?.message}</p>}

				<SwipeCards gallery={gallery} isLoading={isLoadingGallery} />
			</Section>
		</div>
	);
}
