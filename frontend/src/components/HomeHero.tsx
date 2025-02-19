import { ContactCard } from "@/components/ContactCard.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { useImages } from "@/hooks/use-images.ts";
import { toast } from "sonner";

type HeroProps = {
	title: string;
	subtitle: string;
	description: string;
	email: string;
	phone: string;
	image: string;
};

export const HomeHero = ({
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
					<h1 className="relative font-bold"> {title}</h1>
					<p className="relative subheading pb-4">{subtitle}</p>
				</div>
				<p className="lg mb-4">{description}</p>
				<div className={"flex flex-col gap-4"}>
					<ContactCard
						label={"Email"}
						value={email}
						icon={
							<svg
								width="20"
								height="20"
								viewBox="0 0 32 32"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M5.33329 26.6667C4.59996 26.6667 3.9724 26.4058 3.45063 25.884C2.92885 25.3622 2.66751 24.7342 2.66663 24V8C2.66663 7.26667 2.92796 6.63911 3.45063 6.11734C3.97329 5.59556 4.60085 5.33422 5.33329 5.33334H26.6666C27.4 5.33334 28.028 5.59467 28.5506 6.11734C29.0733 6.64 29.3342 7.26756 29.3333 8V24C29.3333 24.7333 29.0724 25.3613 28.5506 25.884C28.0288 26.4067 27.4008 26.6676 26.6666 26.6667H5.33329ZM16 17.1C16.1111 17.1 16.228 17.0831 16.3506 17.0493C16.4733 17.0156 16.5897 16.9658 16.7 16.9L26.1333 11C26.3111 10.8889 26.4444 10.7502 26.5333 10.584C26.6222 10.4178 26.6666 10.2342 26.6666 10.0333C26.6666 9.58889 26.4777 9.25556 26.1 9.03334C25.7222 8.81111 25.3333 8.82222 24.9333 9.06667L16 14.6667L7.06663 9.06667C6.66663 8.82222 6.27774 8.81689 5.89996 9.05067C5.52218 9.28445 5.33329 9.612 5.33329 10.0333C5.33329 10.2556 5.37774 10.4502 5.46663 10.6173C5.55551 10.7844 5.68885 10.912 5.86663 11L15.3 16.9C15.4111 16.9667 15.528 17.0169 15.6506 17.0507C15.7733 17.0844 15.8897 17.1009 16 17.1Z"
									fill="#0D7DFF"
								/>
							</svg>
						}
						childrenClassName={"md:gap-64"}
						backgroundColor={"var(--bg-email)"}
						onClick={async (e) => {
							e.preventDefault();

							window.location.href = "mailto:gaetano.castiglia@24max.it";
						}}
					/>
					<ContactCard
						label={"Whatsapp"}
						value={phone}
						icon={
							<svg
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<g clip-path="url(#clip0_507_1791)">
									<g clip-path="url(#clip1_507_1791)">
										<path
											d="M0.899994 23.1654L2.46584 17.4483C1.49848 15.7712 0.990357 13.8687 0.992694 11.9325C0.995244 5.84912 5.94584 0.900024 12.0294 0.900024C14.9815 0.901524 17.7525 2.05037 19.8364 4.13582C21.9204 6.22127 23.067 8.99327 23.0659 11.9414C23.0632 18.0243 18.1119 22.9743 12.0292 22.9743H12.0244C10.1775 22.9736 8.36264 22.5102 6.75059 21.6312L0.899994 23.1654Z"
											fill="white"
										/>
										<path
											d="M12.0326 2.76406C6.97269 2.76406 2.85774 6.87751 2.85594 11.9336C2.85344 13.6601 3.33963 15.352 4.25829 16.8138L4.47654 17.1608L3.54969 20.5445L7.02159 19.6341L7.35684 19.8327C8.76489 20.6684 10.3793 21.1103 12.0257 21.1112H12.0292C17.0852 21.1112 21.2002 16.9973 21.2021 11.9409C21.206 10.7358 20.9707 9.5418 20.5099 8.42819C20.0492 7.31458 19.3721 6.30342 18.5179 5.45326C17.6684 4.59846 16.6578 3.92063 15.5446 3.45903C14.4314 2.99742 13.2377 2.76121 12.0326 2.76406Z"
											fill="url(#paint0_linear_507_1791)"
										/>
										<path
											fill-rule="evenodd"
											clip-rule="evenodd"
											d="M9.27087 7.31989C9.06417 6.86074 8.84667 6.85144 8.65032 6.84349L8.12172 6.83704C7.93782 6.83704 7.63902 6.90604 7.38642 7.18204C7.13382 7.45804 6.42117 8.12509 6.42117 9.48184C6.42117 10.8386 7.40937 12.1496 7.54707 12.3338C7.68477 12.518 9.45477 15.3909 12.2578 16.4963C14.5872 17.4149 15.0612 17.2322 15.567 17.1863C16.0728 17.1404 17.1985 16.5192 17.4282 15.8753C17.6578 15.2313 17.658 14.6796 17.5891 14.5643C17.5203 14.4489 17.3364 14.3804 17.0604 14.2424C16.7844 14.1044 15.4288 13.4373 15.1761 13.3452C14.9233 13.2531 14.7396 13.2074 14.5555 13.4834C14.3715 13.7594 13.8436 14.3802 13.6827 14.5643C13.5217 14.7483 13.3611 14.7714 13.0851 14.6336C12.8091 14.4957 11.9211 14.2044 10.8675 13.265C10.0477 12.534 9.49437 11.6313 9.33327 11.3555C9.17217 11.0796 9.31617 10.9302 9.45447 10.7928C9.57822 10.6692 9.73017 10.4708 9.86832 10.3098C10.0065 10.1489 10.0519 10.0338 10.1437 9.85009C10.2355 9.66634 10.1898 9.50494 10.1208 9.36709C10.0518 9.22924 9.51597 7.86529 9.27087 7.31989Z"
											fill="white"
										/>
									</g>
								</g>
								<defs>
									<linearGradient
										id="paint0_linear_507_1791"
										x1="11.8423"
										y1="3.86506"
										x2="11.9353"
										y2="19.5438"
										gradientUnits="userSpaceOnUse"
									>
										<stop stop-color="#57D163" />
										<stop offset="1" stop-color="#23B33A" />
									</linearGradient>
									<clipPath id="clip0_507_1791">
										<rect width="24" height="24" fill="white" />
									</clipPath>
									<clipPath id="clip1_507_1791">
										<rect width="24" height="24" fill="white" />
									</clipPath>
								</defs>
							</svg>
						}
						backgroundColor={"var(--bg-phone)"}
						onClick={async () => {
							await navigator.clipboard.writeText(phone);

							toast(phone, {
								description: "Telefono copiato negli appunti",
								action: {
									label: "Chiudi",
								},
							});
						}}
					/>
				</div>
			</div>
			<div className="relative flex-1 md:max-w-[50%]">
				{isLoading ? (
					<Skeleton className="absolute top-0 left-0 right-0 bottom-0 h-[475px] w-full rounded-none" />
				) : (
					<img
						alt="test"
						src={data[0]?.data}
						className="w-full h-auto"
						loading={"lazy"}
					/>
				)}

				<div className="absolute bottom-0 left-0 right-0 md:hidden">
					<div className="bg-gradient-to-t from-black/80 to-transparent h-48 w-full" />
					<div className="absolute bottom-0 left-0 right-0 p-4 text-white">
						<h1 className="font-bold mb-2">{title}</h1>
						<p className="subheading">{subtitle}</p>
					</div>
				</div>
			</div>
		</section>
	);
};
