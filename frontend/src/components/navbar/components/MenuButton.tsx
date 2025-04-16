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
import { XIcon } from "lucide-react";
import mail from "@/assets/icons/mail.svg";
import whatsapp from "@/assets/icons/whatsapp.svg";
import linkedin from "@/assets/icons/linkedin.svg";
import facebook from "@/assets/icons/facebook.svg";
import { Button } from "@/components/Button.tsx";
import hamburger from "@/assets/icons/hamburger.svg";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog.tsx";
import paperplane from "@/assets/icons/paperplane.svg";
import { ContactForm } from "@/components/ContactForm.tsx";
import { useRef, useState } from "react";

export const MenuButton = () => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const drawerCloseRef = useRef<HTMLButtonElement>(null);

	const openContactDialog = () => {
		setIsDrawerOpen(false);
		if (drawerCloseRef.current) {
			drawerCloseRef.current.click();
		}

		setTimeout(() => {
			setIsDialogOpen(true);
		}, 100);
	};

	return (
		<div
			className={
				"md:hidden absolute right-4 flex justify-end flex-1 z-[999999999999999997]"
			}
		>
			<Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
				<DrawerTrigger>
					<Button icon={hamburger}>Contatti</Button>
				</DrawerTrigger>
				<DrawerContent className={"z-[999999999999999997]"}>
					<DrawerHeader>
						<DrawerTitle className="mb-4">
							<div className="absolute top-3 left-1/2 transform -translate-x-1/2">
								<div className="w-16 h-1 bg-[#CCC] rounded-full" />
							</div>
							<div className="flex flex-row justify-between">
								<p className="lg flex flex-row items-center gap-2">
									Mediazioni Castiglia
								</p>
								<DrawerClose ref={drawerCloseRef} asChild>
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
								<div
									onClick={openContactDialog}
									className="text-left cursor-pointer"
								>
									<ContactCard
										cssVarPrefix={"contact"}
										label={"Vuoi contattarmi?"}
										value={"Fissiamo un incontro"}
										icon={paperplane}
										labelColor={"text-stone-400"}
										textColor={"text-stone-100"}
									/>
								</div>

								<ContactCard
									className={"text-left"}
									label={"Email"}
									value={"info@mediazionicastiglia.it"}
									icon={mail}
									cssVarPrefix={"mail"}
									onClick={async (e) => {
										e.preventDefault();

										window.location.href = "mailto:info@mediazionicastiglia.it";
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

			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent className={"bg-[#F2F2F2]"}>
					<DialogHeader>
						<DialogTitle className={"mb-6"}>Contattami</DialogTitle>
						<DialogDescription>
							<ContactForm onSuccess={() => setIsDialogOpen(false)} />
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</div>
	);
};
