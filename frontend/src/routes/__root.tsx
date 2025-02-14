import { cn } from "@/utils/cn";
import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import {
	FacebookIcon,
	LaughIcon,
	LinkedinIcon,
	MailIcon,
	MessageCircleIcon,
} from "lucide-react";
import { useState } from "react";

export const Route = createRootRoute({
	component: RootComponent,
});

function RootComponent() {
	const [currentPage, setCurrentPage] = useState<"/" | "/about">("/");

	return (
		<div className="flex flex-col min-h-screen">
			<header className="bg-[#D9D9D9] w-full">
				<nav className="flex flex-row items-center px-[12rem] py-[0.5rem]">
					<div className="flex flex-row items-center gap-2 w-[200px]">
						<LaughIcon className={"animate-spin"} />
						Logo
					</div>

					<div className="flex-1 flex justify-center items-center gap-2 text-sm">
						<Link to="/">
							<button
								className={cn(
									"p-2 rounded-sm cursor-pointer",
									currentPage === "/"
										? "bg-black text-white"
										: "hover:bg-gray-100 transition-colors",
								)}
								type="button"
								onClick={() => setCurrentPage("/")}
							>
								Home
							</button>
						</Link>
						<Link to="/about">
							<button
								className={cn(
									"p-2 rounded-sm cursor-pointer",
									currentPage === "/about"
										? "bg-black text-white"
										: "hover:bg-gray-100 transition-colors",
								)}
								type="button"
								onClick={() => setCurrentPage("/about")}
							>
								About
							</button>
						</Link>
					</div>

					<div className="flex flex-row items-center gap-2 w-[200px] justify-end">
						<div className="p-1 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors cursor-pointer">
							<FacebookIcon size={20} />
						</div>
						<a
							href={"https://www.linkedin.com/in/gaetano-castiglia-9b739251/"}
							className="p-1 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors cursor-pointer"
						>
							<LinkedinIcon size={20} />
						</a>
						<div className="p-1 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors cursor-pointer">
							<MessageCircleIcon size={20} />
						</div>
						<div className="p-1 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors cursor-pointer">
							<MailIcon size={20} />
						</div>
					</div>
				</nav>
			</header>

			<main className="flex-1 px-[12rem] py-12">
				<Outlet />
			</main>

			{/*<footer className="w-full bg-[#D9D9D9] mt-auto">*/}
			{/*	<div className="px-[12rem] py-4">Footer</div>*/}
			{/*</footer>*/}
		</div>
	);
}
