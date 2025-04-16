// RootComponent.tsx
import { Toaster } from "@/components/ui/sonner.tsx";
import { useIsMobile } from "@/hooks/use-is-mobile.ts";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Navbar } from "../components/navbar/Navbar.tsx";
import linkedinbw from "@/assets/icons/linkedin-bw.svg";
import facebookbw from "@/assets/icons/facebook-bw.svg";
import whatsappbw from "@/assets/icons/whatsapp-bw.svg";
import mailbw from "@/assets/icons/mail-bw.svg";
import { TermsOfService } from "@/components/TermsOfService.tsx";

export const Route = createRootRoute({
	component: RootComponent,
});

function RootComponent() {
	const isMobile = useIsMobile();
	return (
		<div className="flex flex-col min-h-screen items-center">
			<header className="sticky top-0 border-b w-full bg-white z-9999">
				<div className="flex flex-col items-center w-full px-6 md:px-0">
					<Navbar />
				</div>
			</header>

			<main className="flex-1 pb-2 md:pb-0 space-y-4 md:space-y-8 md:mt-12 w-full max-w-[1032px] items-center">
				<Outlet />
			</main>

			<Toaster position={isMobile ? "top-center" : "bottom-right"} />

			<footer
				className={
					"bg-[#181818] w-full h-[700px] md:h-[420px] text-white flex flex-col items-center justify-center px-6 md:px-0"
				}
			>
				<div
					className={
						"flex flex-col gap-10 md:flex-row md:-justify-center md:justify-between md:max-w-[1032px] w-full h-[572px] md:h-[292px]"
					}
				>
					<div className={"flex flex-col gap-6 max-w-[364px] md:max-w-[416px]"}>
						<h2 className={"font-[500]"}>Mediazioni Castiglia</h2>
						<div className={"flex flex-col gap-2"}>
							<a
								className={"flex flex-row items-center gap-1.5 hover:underline"}
								href={"https://www.linkedin.com/in/gaetano-castiglia-9b739251/"}
							>
								<img className={"size-8"} alt={"linkedin"} src={linkedinbw} />
								<p className={"lg font-[300]"}>Gaetano Castiglia</p>
							</a>{" "}
							<a
								className={"flex flex-row items-center gap-1.5 hover:underline"}
								href={"https://www.facebook.com/mediazionicastiglia"}
							>
								<img className={"size-8"} alt={"facebook"} src={facebookbw} />
								<p className={"lg font-[300]"}>Mediazioni Castiglia</p>
							</a>{" "}
							<a
								className={"flex flex-row items-center gap-1.5 hover:underline"}
								href={"whatsapp://send?phone=393341058956"}
							>
								<img className={"size-8"} alt={"whatsapp"} src={whatsappbw} />
								<p className={"lg font-[300]"}>+39 334 105 8956</p>{" "}
							</a>{" "}
							<a
								className={"flex flex-row items-center gap-1.5 hover:underline"}
								href={"mailto:info@mediazionicastiglia.it"}
							>
								<img className={"size-8"} alt={"mail"} src={mailbw} />
								<p className={"lg font-[300]"}> info@mediazionicastiglia.it</p>
							</a>
						</div>
					</div>
					<div
						className={"flex flex-col gap-1  max-w-[364px] md:max-w-[416px]"}
					>
						<p className={"lg font-[500]"}>Gaetano Castiglia</p>
						<p className={"lg font-light"}>Codice IVASS: E000366730</p>
						<p className={"sm font-light pt-2 text-[#CDCDCD]"}>
							Credit specialist presso PROXIPO S.p.A, consulente del credito
							iscritto al n. M447 dell'elenco tenuto dall'Organismo degli Agenti
							e dei Mediatori. Nello svolgimento della sua attività, 24 MAX SPA
							per tramite dei suoi collaboratori pone in relazione gli istituti
							di credito con la clientela per la concessione di finanziamenti.
							24 MAX SPA agisce quale mediatore convenzionato.
						</p>
					</div>

					<div
						className={
							"md:hidden flex flex-col md:flex-row gap-2 md:gap-8 font-light md:max-w-[1032px] w-full text-left md:text-center md:items-center md:justify-center"
						}
					>
						<p className={"sm"}>
							Developed by{" "}
							<a
								className={"hover:underline"}
								href={"https://github.com/bottolo"}
							>
								bottolo
							</a>
							, designed by{" "}
							<a
								className={"hover:underline"}
								href={"https://github.com/FrankieBortot"}
							>
								frankie
							</a>
						</p>{" "}
						<p className={"sm"}>© Copyright 2025 Mediazioni Castiglia</p>
						<TermsOfService />
					</div>
				</div>

				<div
					className={
						"hidden md:flex  flex-col md:flex-row gap-2 md:gap-8 font-light md:max-w-[1032px] w-full text-left md:text-center md:items-center md:justify-center"
					}
				>
					<p className={"sm"}>
						Developed by{" "}
						<a
							className={"hover:underline"}
							href={"https://github.com/bottolo"}
						>
							bottolo
						</a>
						, designed by{" "}
						<a
							className={"hover:underline"}
							href={"https://github.com/FrankieBortot"}
						>
							frankie
						</a>
					</p>{" "}
					<p className={"sm"}>© Copyright 2025 Mediazioni Castiglia</p>
					<TermsOfService />
				</div>
			</footer>
		</div>
	);
}
