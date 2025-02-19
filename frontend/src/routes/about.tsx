import { AboutHero } from "@/components/AboutHero.tsx";
import { LeafletMap } from "@/components/LeafletMap.tsx";
import { Section } from "@/components/Section.tsx";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { useImages } from "@/hooks/use-images.ts";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { cn } from "@/utils/cn.ts";
import { experiences } from "@/utils/experiences.ts";
import { createFileRoute } from "@tanstack/react-router";
import _ from "lodash";

export const Route = createFileRoute("/about")({
	component: About,
});

function About() {
	const isMobile = useIsMobile();
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

	const gridLayouts = {
		desktop: [
			"col-span-2 row-span-2",
			"col-span-1 row-span-1",
			"col-span-1 row-span-1",
			"col-span-1 row-span-1",
			"col-span-1 row-span-1",
		],
		mobile: ["col-span-2", "col-span-2", "col-span-2"],
	};

	const previewAwards = _.take(awards, isMobile ? 3 : 5);

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
				childrenStyle={"px-4 md:px-0"}
			>
				{awardsError && <p>Errore: {awardsError.message}</p>}
				{isLoadingAwards && (
					<div className="flex flex-col space-y-2">
						<div className="grid md:grid-cols-2 gap-1">
							<Skeleton className="h-full w-full rounded-none" />

							<div className="grid md:grid-cols-2 gap-1">
								<Skeleton className="h-50 w-full rounded-none" />
								<Skeleton className="h-50 w-full rounded-none" />
								<Skeleton className="h-50 w-full rounded-none" />
								{!isMobile && <Skeleton className="h-50 w-full rounded-none" />}
							</div>
						</div>
						<div className="space-y-2">
							<Skeleton className="h-12 w-[225px] rounded-md" />
						</div>
					</div>
				)}
				{awards && (
					<>
						<div
							className={`grid ${isMobile ? "grid-cols-2" : "md:grid-cols-4 md:grid-rows-2"} gap-1 w-full h-full md:h-[400px]`}
						>
							{previewAwards?.map((award, index) => (
								<div
									key={award.name}
									className={`bg-white ${isMobile ? gridLayouts.mobile[index] : gridLayouts.desktop[index]} overflow-hidden border border-gray-300`}
								>
									<img
										src={award.data}
										alt={award.name}
										className="w-full h-full object-cover"
									/>
								</div>
							))}
						</div>
						<Dialog>
							<DialogTrigger asChild>
								<button className="mt-2 p-3 rounded-md bg-black text-white cursor-pointer hover:opacity-80 transition-opacity ease-in-out">
									<p className={"font-bold"}>Vedi tutti i riconoscimenti</p>
								</button>
							</DialogTrigger>
							<DialogContent className="max-w-96 rounded-md md:max-w-4xl max-h-[80vh] overflow-y-auto bg-white">
								<DialogHeader>
									<DialogTitle>
										<h3>Tutti i Riconoscimenti</h3>
									</DialogTitle>
								</DialogHeader>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-1 ">
									{awards?.map((award) => (
										<img
											src={award.data}
											alt={award.name}
											className="w-full h-full object-cover border border-gray-300"
										/>
									))}
								</div>
							</DialogContent>
						</Dialog>
					</>
				)}
			</Section>
			<Section
				id={"experience"}
				title={"Esperienza"}
				subtitle={"La mia storia fino ad oggi"}
				childrenStyle={"px-4 md:px-0"}
			>
				<div className={"flex flex-col gap-8 md:gap-4"}>
					{experiences.slice(0, 3).map((experience, _) => (
						<div
							key={experience?.title}
							className={"flex flex-col md:flex-row gap-4"}
						>
							<img
								alt={experience?.title}
								className={cn(
									"h-[100px] w-[300px] object-contain border border-gray-300 flex-shrink-0 ",
									experience?.className,
								)}
								src={experience?.image}
							/>
							<div className={"flex flex-col justify-between md:py-1"}>
								<p className={"sm"}>{experience?.date}</p>
								<p className={"lg font-bold"}>{experience?.title}</p>
								<p>{experience?.company}</p>
							</div>
						</div>
					))}
					<Dialog>
						<DialogTrigger asChild>
							<button className="w-fit mt-2 p-3 rounded-md bg-black text-white cursor-pointer hover:opacity-80 transition-opacity ease-in-out">
								<p className={"font-bold"}>Vedi tutte le esperienze</p>
							</button>
						</DialogTrigger>
						<DialogContent className="max-w-96 rounded-md md:max-w-4xl max-h-[80vh] overflow-y-auto bg-white">
							<DialogHeader>
								<DialogTitle>
									<h3>Tutte le Esperienze</h3>
								</DialogTitle>
							</DialogHeader>
							<div className="flex flex-col items-center  md:grid md:grid-cols-2 md:mx-auto gap-12 md:gap-8">
								{experiences?.map((experience, _) => (
									<div
										key={experience?.title}
										className={"flex flex-col gap-4"}
									>
										<img
											alt={experience?.title}
											className={cn(
												"h-[100px] w-[300px] object-contain border border-gray-300 flex-shrink-0 ",
												experience?.className,
											)}
											src={experience?.image}
										/>
										<div className={"flex flex-col justify-between md:py-1"}>
											<p className={"sm"}>{experience?.date}</p>
											<p className={"lg font-bold"}>{experience?.title}</p>
											<p>{experience?.company}</p>
										</div>
									</div>
								))}
							</div>
						</DialogContent>
					</Dialog>
				</div>
			</Section>
			<Section
				id="gallery"
				title="Gallery"
				subtitle="Interazione con clienti e collaboratori, sempre"
				childrenStyle={"px-4 md:px-0"}
			>
				<div className="w-full overflow-x-auto">
					<div className="flex flex-row gap-4 min-w-max">
						{isLoadingGallery &&
							[0, 1, 2, 3, 4, 5, 6, 7]?.map((_, index) => (
								<Skeleton
									key={index}
									className={
										"h-[300px] w-[300px] border border-gray-300 flex-shrink-0 object-cover rounded-none"
									}
								/>
							))}

						{gallery?.slice(0, 5)?.map((image, _) => (
							<div
								key={image?.name}
								className="h-[300px] w-[300px] border border-gray-300 flex-shrink-0 object-cover"
							>
								<img
									src={image.data}
									alt={image.name}
									className="w-full h-full object-cover"
								/>
							</div>
						))}
					</div>
				</div>
				{isLoadingGallery && (
					<div className="space-y-2 mt-2">
						<Skeleton className="h-12 w-[225px] rounded-md" />
					</div>
				)}
				{!isLoadingGallery && (
					<Dialog>
						<DialogTrigger asChild>
							<button className="mt-2 p-3 rounded-md bg-black text-white cursor-pointer hover:opacity-80 transition-opacity ease-in-out">
								<p className={"font-bold"}>Vedi tutte le immagini</p>
							</button>
						</DialogTrigger>
						<DialogContent className="max-w-96 rounded-md md:max-w-4xl max-h-[80vh] overflow-y-auto bg-white">
							<DialogHeader>
								<DialogTitle>
									<h3>Tutti le immagini</h3>
								</DialogTitle>
							</DialogHeader>
							{gallery?.map((image, _) => (
								<img
									key={image?.name}
									src={image?.data}
									alt={image?.name}
									className="w-full h-full object-cover border border-gray-300"
								/>
							))}
						</DialogContent>
					</Dialog>
				)}
			</Section>
		</div>
	);
}
