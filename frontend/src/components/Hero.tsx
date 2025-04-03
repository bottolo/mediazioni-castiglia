import { ContactCard } from "@/components/ContactCard.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { useImages } from "@/hooks/use-images.ts";
import { XIcon } from "lucide-react";
import { toast } from "sonner";
import mail from "@/assets/icons/mail.svg";
import whatsapp from "@/assets/icons/whatsapp.svg";

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
	const { data, isLoading, error } = useImages({
		queryKeys: ["hero"],
		folder: "Hero",
	});

	return (
		<section
			id={"hero"}
			className="flex flex-col-reverse gap-4 md:gap-8 md:flex-row mb-12 md:mb-20"
		>
			<div className="flex flex-col gap-1 pt-0 md:max-w-[50%] px-[1rem] md:px-0">
				<div className="hidden md:block">
					<h1 className="relative font-bold text-gray-700"> {title}</h1>
					<p className="relative subheading pb-4 text-gray-600">{subtitle}</p>
				</div>
				<p className="lg mb-4 text-gray-800 md:text-gray-600">{description}</p>
				<div className={"flex flex-col gap-2"}>
					<ContactCard
						cssVarPrefix={"mail"}
						label={"Scrivimi una mail"}
						value={email}
						icon={mail}
						onClick={async (e) => {
							e.preventDefault();

							window.location.href = "mailto:gaetano.castiglia@24max.it";
						}}
					/>
					<ContactCard
						label={"Whatsapp"}
						value={phone}
						cssVarPrefix={"phone"}
						icon={whatsapp}
						onClick={async () => {
							await navigator.clipboard.writeText(phone);

							toast.custom((id) => (
								<div
									className={
										"flex flex-col bg-white p-4 rounded-md md:w-[350px]"
									}
								>
									<p className="lg font-semibold">{phone}</p>
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
				</div>
			</div>
			<div className="relative flex-1 md:max-w-[50%]">
				{isLoading ? (
					<Skeleton className="md:absolute md:top-0 md:left-0 md:right-0 md:bottom-0 h-[300px] md:h-[475px] w-full rounded-none" />
				) : (
					<img
						alt="test"
						src={data[0]?.data}
						className="w-full h-[400px] md:h-full object-cover"
						loading={"lazy"}
					/>
				)}

				<div className="absolute bottom-0 left-0 right-0 md:hidden">
					<div className="bg-gradient-to-t from-black to-transparent h-[240px] w-full" />
					<div className="absolute bottom-0 left-0 right-0 p-4 text-white">
						<h1 className="font-semibold mb-1">{title}</h1>
						<p className="lg">{subtitle}</p>
					</div>
				</div>
			</div>
		</section>
	);
};
