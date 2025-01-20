import { Button } from "@/components/ui/button/button.tsx";
import { Select } from "@/components/ui/select/select.tsx";
import { createFileRoute } from "@tanstack/react-router";
import { AccessibilityIcon, BabyIcon } from "lucide-react";

export const Route = createFileRoute("/")({
	component: Index,
});

function Index() {
	return (
		<div>
			<h1>Mediazioni is coming to get ya!</h1>
			<Button fullWidth size={"lg"}>
				frankie...
			</Button>
			<Button leftIcon={<AccessibilityIcon />} size={"md"}>
				frankie...
			</Button>
			<Button size={"sm"} rightIcon={<BabyIcon />}>
				frankie...
			</Button>
			<Button disabled size={"sm"}>
				frankie...
			</Button>
			<Button isLoading={true}>frankie, sto caricando!</Button>
			<Select
				groups={[
					{
						label: "Categoria 1",
						options: [
							{ value: "c1_1", label: "ti prego" },
							{ value: "c1_2", label: "frankie dai" },
							{ value: "c1_3", label: "non farmi soffrire" },
							{ value: "c1_4", label: "sto male" },
							{ value: "c1_5", label: "stilizzami" },
						],
					},
					{
						label: "Categoria 2",
						options: [
							{ value: "c2_1", label: "Item 1" },
							{ value: "c2_2", label: "Item 2" },
							{ value: "c2_3", label: "Item 3" },
							{ value: "c2_4", label: "Item 4" },
							{ value: "c2_5", label: "Item 5" },
						],
					},
				]}
			/>
		</div>
	);
}
