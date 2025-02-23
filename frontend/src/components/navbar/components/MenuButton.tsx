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
import { Link, useLocation } from "@tanstack/react-router";
import { MenuIcon, SmileIcon, XIcon } from "lucide-react";
import { toast } from "sonner";

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
						<DrawerTitle className="mb-8">
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
								<DrawerClose asChild>
									<Link to="/">
										<button
											className={cn(
												"p-3 rounded-sm cursor-pointer w-full text-left",
												location.pathname === "/"
													? "bg-black text-white"
													: "hover:bg-gray-100 transition-colors",
											)}
											type="button"
										>
											<p>Home</p>
										</button>
									</Link>
								</DrawerClose>
								<DrawerClose asChild>
									<Link to="/about">
										<button
											className={cn(
												"p-3 rounded-sm cursor-pointer w-full text-left",
												location.pathname === "/about"
													? "bg-black text-white"
													: "hover:bg-gray-100 transition-colors",
											)}
											type="button"
										>
											<p>Chi sono</p>
										</button>
									</Link>
								</DrawerClose>
								<p className={"text-left mt-4 text-gray-500"}>Come trovarmi</p>
								<ContactCard
									className={
										"text-left bg-[var(--bg-card-email)] hover:bg-[var(--bg-card-email-hover)]"
									}
									label={"Email"}
									value={"gaetano.castiglia@24max.it"}
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
									onClick={async (e) => {
										e.preventDefault();

										window.location.href = "mailto:gaetano.castiglia@24max.it";
									}}
								/>
								<ContactCard
									label={"Whatsapp"}
									value={"+39 334 1058956"}
									icon={
										<svg
											width="24"
											height="24"
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
									className={
										"text-left bg-[var(--bg-card-phone)] hover:bg-[var(--bg-card-phone-hover)]"
									}
									onClick={async () => {
										await navigator.clipboard.writeText("+39 334 1058 956");

										toast.custom((id) => (
											<div
												className={
													"flex flex-col bg-white p-4 rounded-sm md:w-[350px]"
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
										icon={
											<svg
												width="24"
												height="24"
												viewBox="0 0 24 24"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<g clip-path="url(#clip0_107_1987)">
													<path
														d="M24 12C24 5.37262 18.6274 0 12 0C5.37262 0 0 5.37262 0 12C0 17.9895 4.38825 22.954 10.125 23.8542V15.4688H7.07812V12H10.125V9.35625C10.125 6.34875 11.9166 4.6875 14.6576 4.6875C15.9705 4.6875 17.3438 4.92188 17.3438 4.92188V7.875H15.8306C14.3399 7.875 13.875 8.80003 13.875 9.74906V12H17.2031L16.6711 15.4688H13.875V23.8542C19.6117 22.954 24 17.9896 24 12Z"
														fill="#1877F2"
													/>
													<path
														d="M16.6711 15.4688L17.2031 12H13.875V9.74906C13.875 8.79994 14.3399 7.875 15.8306 7.875H17.3438V4.92188C17.3438 4.92188 15.9705 4.6875 14.6575 4.6875C11.9166 4.6875 10.125 6.34875 10.125 9.35625V12H7.07812V15.4688H10.125V23.8542C10.7453 23.9514 11.3722 24.0001 12 24C12.6278 24.0001 13.2547 23.9514 13.875 23.8542V15.4688H16.6711Z"
														fill="white"
													/>
												</g>
												<defs>
													<clipPath id="clip0_107_1987">
														<rect width="24" height="24" fill="white" />
													</clipPath>
												</defs>
											</svg>
										}
										className={
											"text-left bg-[var(--bg-card-neutral)] hover:bg-[var(--bg-card-neutral-hover)]"
										}
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
										icon={
											<svg
												width="24"
												height="24"
												viewBox="0 0 24 24"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<g clip-path="url(#clip0_107_1991)">
													<path
														d="M21.75 0.562587H2.25C1.80756 0.558084 1.3814 0.729282 1.06504 1.03862C0.74867 1.34795 0.56794 1.77016 0.5625 2.21259V21.7913C0.568923 22.2331 0.750087 22.6544 1.06634 22.9629C1.3826 23.2714 1.8082 23.4421 2.25 23.4376H21.75C22.1925 23.4411 22.6183 23.2693 22.9345 22.9598C23.2507 22.6503 23.4316 22.2282 23.4375 21.7857V2.20696C23.4296 1.76583 23.2479 1.34564 22.9319 1.03772C22.6159 0.729808 22.1912 0.559058 21.75 0.562587Z"
														fill="#0076B2"
													/>
													<path
														d="M3.94871 9.13696H7.34434V20.0626H3.94871V9.13696ZM5.64746 3.69946C6.03692 3.69946 6.41764 3.81498 6.74144 4.03139C7.06523 4.2478 7.31757 4.55539 7.46653 4.91524C7.61548 5.27509 7.65436 5.67104 7.57824 6.05299C7.50213 6.43494 7.31444 6.78573 7.03891 7.06099C6.76339 7.33625 6.41242 7.52361 6.0304 7.59936C5.64837 7.67512 5.25246 7.63586 4.89275 7.48656C4.53304 7.33726 4.2257 7.08463 4.00959 6.76063C3.79349 6.43662 3.67834 6.0558 3.67871 5.66634C3.67921 5.14452 3.88685 4.64424 4.25601 4.27543C4.62517 3.90663 5.12564 3.69946 5.64746 3.69946ZM9.47434 9.13696H12.7293V10.637H12.7743C13.2281 9.77821 14.3343 8.87259 15.9862 8.87259C19.425 8.86509 20.0625 11.1282 20.0625 14.0626V20.0626H16.6668V14.747C16.6668 13.4813 16.6443 11.852 14.9025 11.852C13.1606 11.852 12.8643 13.232 12.8643 14.6645V20.0626H9.47434V9.13696Z"
														fill="white"
													/>
												</g>
												<defs>
													<clipPath id="clip0_107_1991">
														<rect width="24" height="24" fill="white" />
													</clipPath>
												</defs>
											</svg>
										}
										className={
											"text-left bg-[var(--bg-card-neutral)] hover:bg-[var(--bg-card-neutral-hover)]"
										}
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
