import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog.tsx";

export const TermsOfService = () => (
	<Dialog>
		<DialogTrigger>
			<p className={"sm hover:underline cursor-pointer text-left"}>
				Termini e condizioni
			</p>
		</DialogTrigger>
		<DialogContent className={"bg-[#F2F2F2] max-h-[80vh] overflow-y-auto"}>
			<DialogHeader>
				<DialogTitle className={"text-xl text-left font-bold mb-4"}>
					Termini e condizioni
				</DialogTitle>
				<div className="text-sm space-y-4 pr-2 text-left">
					<h2 className="text-lg font-semibold">1. Introduzione</h2>
					<p>
						Benvenuto sul nostro sito web. I presenti Termini di Servizio
						("Termini") disciplinano l'utilizzo del modulo di contatto presente
						su questa landing page, gestita da Mediazioni Castiglia ("noi",
						"nostro" o "ci").
					</p>
					<p>
						Utilizzando il nostro modulo di contatto, l'utente accetta
						integralmente i presenti Termini. Se non si accettano i Termini, si
						prega di non utilizzare il modulo di contatto.
					</p>

					<h2 className="text-lg font-semibold mt-6">
						2. Descrizione del Servizio
					</h2>
					<p>
						Il nostro sito web offre un modulo di contatto che permette agli
						utenti di inviare richieste di informazioni sui nostri
						prodotti/servizi. Quando un utente compila e invia il modulo, i dati
						inseriti vengono trasmessi esclusivamente via email al destinatario
						designato per la gestione delle richieste.
					</p>

					<h2 className="text-lg font-semibold mt-6">
						3. Trattamento dei Dati Personali
					</h2>

					<h3 className="text-base font-medium mt-3">
						3.1 Raccolta e Utilizzo dei Dati
					</h3>
					<p>
						I dati forniti attraverso il modulo di contatto (come nome,
						indirizzo email, numero di telefono e messaggio) vengono raccolti al
						solo scopo di elaborare la richiesta dell'utente e rispondere alla
						stessa.
					</p>

					<h3 className="text-base font-medium mt-3">
						3.2 Nessuna Memorizzazione dei Dati
					</h3>
					<p>
						Non memorizziamo alcun dato inserito nel modulo di contatto in
						database o altri sistemi di archiviazione permanente. I dati vengono
						utilizzati esclusivamente per l'invio di un'email con le
						informazioni fornite dall'utente alla persona responsabile del
						prodotto/servizio.
					</p>

					<h3 className="text-base font-medium mt-3">
						3.3 Nessun Utilizzo di Cookie
					</h3>
					<p>
						Il nostro sito web non utilizza cookie o altre tecnologie di
						tracciamento per raccogliere informazioni sugli utenti.
					</p>

					<h3 className="text-base font-medium mt-3">
						3.4 Base Giuridica del Trattamento
					</h3>
					<p>
						La base giuridica per il trattamento dei dati è il consenso
						dell'utente, fornito al momento dell'invio del modulo di contatto.
					</p>

					<h3 className="text-base font-medium mt-3">
						3.5 Diritti dell'Interessato
					</h3>
					<p>
						In conformità con il Regolamento Generale sulla Protezione dei Dati
						(GDPR), gli utenti hanno diritto di accesso, rettifica,
						cancellazione e limitazione del trattamento dei propri dati
						personali. Tuttavia, poiché non conserviamo i dati dopo l'invio
						dell'email, questi diritti possono essere esercitati solo prima
						dell'invio del modulo.
					</p>

					<h2 className="text-lg font-semibold mt-6">
						4. Obblighi dell'Utente
					</h2>

					<h3 className="text-base font-medium mt-3">
						4.1 Accuratezza delle Informazioni
					</h3>
					<p>
						L'utente è responsabile dell'accuratezza delle informazioni fornite
						attraverso il modulo di contatto.
					</p>

					<h3 className="text-base font-medium mt-3">4.2 Contenuti Proibiti</h3>
					<p>
						È vietato inserire nel modulo di contatto contenuti illegali,
						diffamatori, minacciosi, abusivi, osceni o altrimenti discutibili.
					</p>

					<h3 className="text-base font-medium mt-3">
						4.3 Divieto di Utilizzo Automatizzato
					</h3>
					<p>
						È vietato l'utilizzo di bot, script o altri mezzi automatizzati per
						compilare e inviare il modulo di contatto.
					</p>

					<h2 className="text-lg font-semibold mt-6">
						5. Limitazioni di Responsabilità
					</h2>

					<h3 className="text-base font-medium mt-3">
						5.1 Disponibilità del Servizio
					</h3>
					<p>
						Non garantiamo che il modulo di contatto sarà sempre disponibile o
						privo di errori. Ci riserviamo il diritto di sospendere o
						interrompere il servizio in qualsiasi momento senza preavviso.
					</p>

					<h3 className="text-base font-medium mt-3">
						5.2 Sicurezza della Trasmissione
					</h3>
					<p>
						Sebbene adottiamo misure ragionevoli per proteggere le informazioni
						inviate attraverso il modulo di contatto, non possiamo garantire la
						sicurezza assoluta della trasmissione di dati via Internet.
					</p>

					<h3 className="text-base font-medium mt-3">
						5.3 Esclusione di Garanzie
					</h3>
					<p>
						Il modulo di contatto è fornito "così com'è" e "come disponibile",
						senza garanzie di alcun tipo, esplicite o implicite.
					</p>

					<h2 className="text-lg font-semibold mt-6">
						6. Proprietà Intellettuale
					</h2>
					<p>
						Tutti i diritti di proprietà intellettuale relativi al nostro sito
						web, inclusi testi, grafica, logo, immagini e software, sono di
						nostra proprietà o dei nostri licenzianti. Nulla nei presenti
						Termini concede all'utente alcun diritto di utilizzare tali
						proprietà intellettuali.
					</p>

					<h2 className="text-lg font-semibold mt-6">
						7. Modifiche ai Termini
					</h2>
					<p>
						Ci riserviamo il diritto di modificare i presenti Termini in
						qualsiasi momento. Le modifiche entreranno in vigore immediatamente
						dopo la pubblicazione sul sito web. L'utilizzo continuato del modulo
						di contatto dopo tali modifiche costituirà l'accettazione delle
						stesse.
					</p>

					<h2 className="text-lg font-semibold mt-6">8. Legge Applicabile</h2>
					<p>
						I presenti Termini sono regolati e interpretati in conformità con le
						leggi italiane. Qualsiasi controversia derivante o relativa ai
						presenti Termini sarà soggetta alla giurisdizione esclusiva dei
						tribunali italiani.
					</p>

					<h2 className="text-lg font-semibold mt-6">9. Separabilità</h2>
					<p>
						Se una qualsiasi disposizione dei presenti Termini dovesse essere
						ritenuta invalida o inapplicabile da un tribunale competente, le
						restanti disposizioni rimarranno in vigore.
					</p>

					<h2 className="text-lg font-semibold mt-6">10. Contatti</h2>
					<p>
						Per domande o chiarimenti sui presenti Termini, si prega di
						contattarci all'indirizzo info@mediazionicastiglia.it.
					</p>

					<p className="text-xs text-gray-500 italic mt-6">
						Data di ultima modifica: 15 Aprile 2025
					</p>
				</div>{" "}
			</DialogHeader>
		</DialogContent>
	</Dialog>
);
