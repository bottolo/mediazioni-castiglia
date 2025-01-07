import {Link, Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
	component: RootComponent,
});

function RootComponent() {
	return (
		<div className="h-screen w-screen flex flex-col">
			<nav className="border-b px-6 py-4 flex gap-4 bg-white shrink-0">
				<Link className={"[&.active]:font-bold hover:text-gray-600"} to="/">
					Home
				</Link>
				<Link
					className={"[&.active]:font-bold hover:text-gray-600"}
					to="/about"
				>
					About
				</Link>
			</nav>
			<main className="flex-1 min-h-0">
				<Outlet />
			</main>
		</div>
	);
}
