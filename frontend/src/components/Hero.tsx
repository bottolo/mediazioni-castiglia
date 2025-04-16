import { ContactCard } from "@/components/ContactCard.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { useImages } from "@/hooks/use-images.ts";
import mail from "@/assets/icons/mail.svg";
import whatsapp from "@/assets/icons/whatsapp.svg";
import paperplane from "@/assets/icons/paperplane.svg";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "./ui/dialog";
import { DialogTrigger } from "@/components/ui/dialog.tsx";
import { ContactForm } from "@/components/ContactForm.tsx";
import { useState } from "react";

type HeroProps = {
	title: string;
	subtitle: string;
	description: string;
	email: string;
	phone: string;
	image: string;
};

export const Hero = ({
	title,
	subtitle,
	description,
	email,
	phone,
}: HeroProps) => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const { data, isLoading, error } = useImages({
		queryKeys: ["hero"],
		folder: "Hero",
	});

	return (
		<section
			id={"hero"}
			className="flex flex-col-reverse gap-4 md:gap-8 md:flex-row mb-12 md:mb-20"
		>
			<div className="flex flex-col gap-1 pt-0 flex-1 md:w-[50%] px-[1rem] md:px-0 self-start">
				<div className="hidden md:block">
					<h1 className="relative font-bold text-gray-700 pb-2"> {title}</h1>
					<p className="relative font-[300] subheading pb-4 text-gray-700 max-w-[400px]">
						{subtitle}
					</p>
				</div>
				<p className="lg mb-4 md:mb-12 text-gray-800 md:text-gray-600 max-w-[400px]">
					{description}
				</p>
				<div className={"flex flex-col gap-2"}>
					<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
						<DialogTrigger className={"text-left cursor-pointer"}>
							<ContactCard
								cssVarPrefix={"contact"}
								label={"Vuoi contattarmi?"}
								value={"Fissiamo un incontro"}
								icon={paperplane}
								labelColor={"text-stone-400"}
								textColor={"text-stone-100"}
							/>
						</DialogTrigger>
						<DialogContent className={"bg-[#F2F2F2]"}>
							<DialogHeader>
								<DialogTitle className={"mb-6"}>Contattami</DialogTitle>
								<DialogDescription>
									<ContactForm onSuccess={() => setIsDialogOpen(false)} />
								</DialogDescription>
							</DialogHeader>
						</DialogContent>
					</Dialog>

					<ContactCard
						cssVarPrefix={"mail"}
						label={"Scrivimi una mail"}
						value={email}
						icon={mail}
						onClick={async (e) => {
							e.preventDefault();

							window.location.href = "mailto:info@mediazionicastiglia.it";
						}}
					/>
					<a href={"whatsapp://send?phone=393341058956"}>
						<ContactCard
							label={"Whatsapp"}
							value={phone}
							cssVarPrefix={"phone"}
							icon={whatsapp}
						/>
					</a>
				</div>
			</div>
			<div className="relative flex-1 md:w-[50%]">
				{isLoading ? (
					<Skeleton className="md:absolute md:top-0 md:left-0 md:right-0 md:bottom-0 h-[300px] md:h-[520px] w-full md:rounded-lg" />
				) : (
					<img
						alt="test"
						src={data[0]?.data}
						className="w-full h-[400px] md:h-full object-cover md:rounded-lg"
					/>
				)}

				<div className="absolute bottom-0 left-0 right-0 md:hidden">
					<div className="bg-gradient-to-t from-black to-transparent h-[240px] w-full" />
					<div className="absolute bottom-0 left-0 right-0 p-4 text-white">
						<h1 className="font-semibold mb-1">{title}</h1>
						<p className="subheading text-gray-100">{subtitle}</p>
					</div>
				</div>
			</div>
		</section>
	);
};
