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
import { cn } from "@/utils/cn";
import { useLocation } from "@tanstack/react-router";
import { MenuIcon, SmileIcon, XIcon } from "lucide-react";
import { toast } from "sonner";
import mail from "@/assets/icons/mail.svg";
import whatsapp from "@/assets/icons/whatsapp.svg";
import linkedin from "@/assets/icons/linkedin.svg";
import facebook from "@/assets/icons/facebook.svg";

export const MenuButton = () => {
	const location = useLocation();
	return (
		<div
			className={
				"md:hidden absolute right-4 flex justify-end flex-1 z-[999999999999999999]"
			}
		>
			<Drawer>
				<DrawerTrigger>
					<button
						className={cn(
							"px-4 py-2.5 rounded-sm cursor-pointer bg-black text-white flex flex-row gap-2 items-center font-semibold",
						)}
						type="button"
					>
						Menu <MenuIcon size={18} />
					</button>
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
								<ContactCard
									label={"Whatsapp"}
									value={"+39 334 1058956"}
									icon={whatsapp}
									className={"text-left"}
									cssVarPrefix={"phone"}
									onClick={async () => {
										await navigator.clipboard.writeText("+39 334 1058 956");

										toast.custom((id) => (
											<div
												className={
													"flex flex-col bg-white p-4 rounded-md md:w-[350px]"
												}
											>
												<p className="lg font-semibold">+39 334 1058 956</p>
												<p className="sm text-gray-500">
													Telefono copiato negli appunti
												</p>
												<button
													className="absolute top-2 right-2 cursor-pointer"
													onClick={async () => {
														toast.dismiss(id);
													}}
												>
													<XIcon size={18} />
												</button>
											</div>
										));
									}}
								/>
								<a href={"https://www.facebook.com/mediazionicastiglia"}>
									<ContactCard
										label={"Facebook"}
										value={"mediazionicastiglia"}
										icon={facebook}
										className={"text-left"}
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
