import {createFileRoute} from "@tanstack/react-router";

export const Route = createFileRoute("/")({
    component: Index,
});

function Index() {
    return (
        <div>
            <h1>Mediazioni is coming to get ya!</h1>
        </div>
    );
}
