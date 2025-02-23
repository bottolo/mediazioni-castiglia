import { Toaster } from "@/components/ui/sonner.tsx";
import { useIsMobile } from "@/hooks/use-is-mobile.ts";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Navbar } from "../components/navbar/Navbar.tsx";

export const Route = createRootRoute({
	component: RootComponent,
});

function RootComponent() {
	const isMobile = useIsMobile();
	return (
		<div className="flex flex-col min-h-screen items-center">
			<header className="sticky top-0 border-b w-full bg-white z-10">
				<div className={"flex flex-col items-center "}>
					<Navbar />
				</div>
			</header>

			<main className="flex-1 pb-2 md:pb-0 space-y-4 md:space-y-8 md:mt-12 max-w-[1032px] items-center">
				<Outlet />
			</main>

			<Toaster position={isMobile ? "top-center" : "bottom-right"} />
		</div>
	);
}
