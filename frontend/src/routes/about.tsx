import { AboutHero } from "@/components/AboutHero.tsx";
import { Section } from "@/components/Section.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { useImages } from "@/hooks/use-images.ts";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { cn } from "@/utils/cn.ts";
import { experiences } from "@/utils/experiences.ts";
import { createFileRoute } from "@tanstack/react-router";

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
				id="about-awards"
				title="Riconoscimenti"
				subtitle="Cosa ho ottenuto nel corso degli anni"
				childrenStyle="px-4 md:px-0"
			>
				<div className="w-full">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
						{isLoadingAwards &&
							[0, 1, 2, 3, 4, 5, 6, 7]?.map((_, index) => (
								<Skeleton
									key={index}
									className="aspect-square w-full border border-gray-300 object-cover rounded-none"
								/>
							))}

						{awards?.map((image) => (
							<div
								key={image?.name}
								className="aspect-square w-full border border-gray-300 overflow-hidden"
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
			</Section>
			<Section
				id={"experience"}
				title={"Esperienza"}
				subtitle={"La mia storia fino ad oggi"}
				childrenStyle={"px-4 md:px-0"}
			>
				<div className={"flex flex-col gap-8"}>
					{experiences?.map((experience, _) => (
						<div
							key={experience?.title}
							className={"flex flex-col md:flex-row gap-4"}
						>
							<img
								alt={experience?.title}
								className={cn(
									"h-[100px] w-[200px] object-contain border border-gray-300 flex-shrink-0 ",
									experience?.className,
								)}
								src={experience?.image}
							/>
							<div className={"flex flex-col justify-between md:py-1"}>
								<p className={"sm"}>{experience?.date}</p>
								<p className={"lg font-semibold"}>{experience?.title}</p>
								<p>{experience?.company}</p>
							</div>
						</div>
					))}
				</div>
			</Section>

			<Section
				id="about-gallery"
				title="Gallery"
				subtitle="Interazione con clienti e collaboratori, sempre"
				childrenStyle="px-4 md:px-0"
			>
				<div className="w-full">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
						{isLoadingGallery &&
							[0, 1, 2, 3, 4, 5, 6, 7]?.map((_, index) => (
								<Skeleton
									key={index}
									className="aspect-square w-full border border-gray-300 object-cover rounded-none"
								/>
							))}

						{gallery?.map((image) => (
							<div
								key={image?.name}
								className="aspect-square w-full border border-gray-300 overflow-hidden"
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
			</Section>
		</div>
	);
}
