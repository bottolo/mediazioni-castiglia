import { ContactCard } from "@/components/ContactCard";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { SmileIcon, XIcon } from "lucide-react";
import mail from "@/assets/icons/mail.svg";
import whatsapp from "@/assets/icons/whatsapp.svg";
import linkedin from "@/assets/icons/linkedin.svg";
import facebook from "@/assets/icons/facebook.svg";
import { Button } from "@/components/Button.tsx";
import hamburger from "@/assets/icons/hamburger.svg";

export const MenuButton = () => {
	return (
		<div
			className={
				"md:hidden absolute right-4 flex justify-end flex-1 z-[999999999999999999]"
			}
		>
			<Drawer>
				<DrawerTrigger>
					<Button icon={hamburger}>Contatti</Button>
				</DrawerTrigger>
				<DrawerContent>
					<DrawerHeader>
						<DrawerTitle className="mb-4">
							<div className="absolute top-3 left-1/2 transform -translate-x-1/2">
								<div className="w-16 h-1 bg-[#CCC] rounded-full" />
							</div>
							<div className="flex flex-row justify-between">
								<p className="lg flex flex-row items-center gap-2">
									<SmileIcon className="animate-spin" />
									Mediazioni Castiglia
								</p>
								<DrawerClose asChild>
									<button
										className="hover:opacity-75 transition-opacity"
										type="button"
									>
										<XIcon size={18} />
									</button>
								</DrawerClose>
							</div>
						</DrawerTitle>
						<DrawerDescription>
							<div className={"flex flex-col gap-4"}>
								<p className={"text-left mt-4 text-gray-500"}>Come trovarmi</p>
								{/*<ContactCard*/}
								{/*	cssVarPrefix={"contact"}*/}
								{/*	label={"Vuoi contattarmi?"}*/}
								{/*	value={"Fissiamo un incontro"}*/}
								{/*	icon={paperplane}*/}
								{/*	onClick={async (e) => {*/}
								{/*		e.preventDefault();*/}
								{/*	}}*/}
								{/*	labelColor={"text-stone-400"}*/}
								{/*	textColor={"text-stone-100"}*/}
								{/*	className={"text-left"}*/}
								{/*/>{" "}*/}
								<ContactCard
									className={"text-left"}
									label={"Email"}
									value={"gaetano.castiglia@24max.it"}
									icon={mail}
									cssVarPrefix={"mail"}
									onClick={async (e) => {
										e.preventDefault();

										window.location.href = "mailto:gaetano.castiglia@24max.it";
									}}
								/>
								<a href={"whatsapp://send?phone=393341058956"}>
									<ContactCard
										label={"Whatsapp"}
										value={"+39 334 1058956"}
										icon={whatsapp}
										className={"text-left"}
										cssVarPrefix={"phone"}
									/>
								</a>
								<a href={"https://www.facebook.com/mediazionicastiglia"}>
									<ContactCard
										label={"Facebook"}
										value={"mediazionicastiglia"}
										icon={facebook}
										className={"text-left"}
										cssVarPrefix={"default"}
									/>
								</a>
								<a
									href={
										"https://www.linkedin.com/in/gaetano-castiglia-9b739251/"
									}
								>
									<ContactCard
										label={"Linkedin"}
										value={"Gaetano Castiglia"}
										icon={linkedin}
										className={"text-left"}
										cssVarPrefix={"default"}
									/>
								</a>
							</div>
						</DrawerDescription>
					</DrawerHeader>
				</DrawerContent>
			</Drawer>
		</div>
	);
};
