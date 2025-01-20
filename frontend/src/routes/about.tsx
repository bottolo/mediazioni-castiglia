import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
	component: Index,
});

function Index() {
	return <h1>About Page</h1>;
}
