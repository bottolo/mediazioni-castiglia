import { createFileRoute } from "@tanstack/react-router";
import {
	ContactIcon,
	HandCoinsIcon,
	HouseIcon,
	ShieldQuestionIcon,
} from "lucide-react";

export const Route = createFileRoute("/")({
	component: Index,
});

function Index() {
	return (
		<>
			<section id={"hero"} className="flex flex-row gap-8">
				<div className="flex flex-col gap-1 max-w-[50%] pt-4">
					<h1 className="text-4xl font-bold">Gaetano Castiglia</h1>
					<h2 className="text-2xl pb-4">Mediatore creditizio</h2>
					<p className="text-md">
						Lavoro al tuo fianco per farti risparmiare tempo, semplificare la
						raccolta di documenti e presentarti i prodotti più convenienti.
					</p>
				</div>
				<div className="flex-1 max-w-[50%]">
					<img
						alt="test"
						src="https://picsum.photos/1000/1000"
						className="w-full h-auto"
					/>
				</div>
			</section>
			<section id="services" className="flex flex-col gap-4 ">
				<div className="flex flex-col gap-1 max-w-[50%] pt-4">
					<h1 className="text-3xl font-bold">Servizi</h1>
					<h2 className="text-md pb-4">Cosa offro ai miei clienti</h2>
				</div>

				<div className="grid grid-cols-3 gap-6 ">
					<div className="py-6 rounded-lg">
						<HouseIcon color={"darkgray"} size={60} />

						<h3 className="text-xl font-bold mb-2 mt-4">Mutuo</h3>
						<p className="text-md">
							La soluzione creditizia per ogni progetto immobiliare. Mutuo
							acquisto, mutuo per ristrutturazione, mutuo green, mutuo giovani
							under 36, surroghe e altri prodotti dedicati.
						</p>
					</div>

					<div className="py-6 rounded-lg">
						<HandCoinsIcon color={"darkgray"} size={60} />

						<h3 className="text-xl font-bold mb-2 mt-4">
							Prestiti e cessione del quinto
						</h3>
						<p className="text-md">
							La nostra offerta di finanziamenti e prestiti personali per farti
							ottenere liquidità immediata. Un panel ricco di proposte e di
							partner per tutti i tuoi progetti.
						</p>
					</div>

					<div className="py-6 rounded-lg">
						<ShieldQuestionIcon color={"darkgray"} size={60} />

						<h3 className="text-xl font-bold mb-2 mt-4">
							Assicurazioni per la protezione del credito
						</h3>
						<p className="text-md">
							Proteggi il tuo investimento con le nostre polizze assicurative
							per la protezione del credito.
						</p>
					</div>

					<div className="py-6 rounded-lg">
						<ContactIcon color={"darkgray"} size={60} />
						<h3 className="text-xl font-bold mb-2 mt-4">Consulenza</h3>
						<p className="text-md">
							Offro consulenza per la scelta del prodotto più adatto alle tue
							esigenze.
						</p>
					</div>
				</div>
			</section>
		</>
	);
}
