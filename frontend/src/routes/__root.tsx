import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Navbar } from "../components/navbar/Navbar.tsx";

export const Route = createRootRoute({
	component: RootComponent,
});

function RootComponent() {
	return (
		<div className="flex flex-col min-h-screen">
			<header className="sticky top-0 border-b w-full bg-white z-10">
				<Navbar />
			</header>

			<main className="flex-1 md:py-12 md:px-[12rem] space-y-4 md:space-y-8 md:mt-12">
				<Outlet />
			</main>

			{/*<footer className="w-full bg-[#D9D9D9] mt-auto">*/}
			{/*	<div className="px-[12rem] py-4">Footer</div>*/}
			{/*</footer>*/}
		</div>
	);
}
