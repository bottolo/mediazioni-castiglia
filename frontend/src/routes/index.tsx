import {createFileRoute} from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: Index,
});

function Index() {



	return (
		<div className="h-full flex flex-col">
			<div className="px-6 py-4 shrink-0">
				<h1 className="text-2xl font-bold">Mediazioni is coming to get ya!</h1>
			</div>
		</div>
	);
}

export default Index;
