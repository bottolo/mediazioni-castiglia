import {createFileRoute} from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
	component: About,
});

function About() {
	return <h1>About Page</h1>;
}
