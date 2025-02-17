import { Link } from "@tanstack/react-router";
import { LaughIcon } from "lucide-react";

export const LeftSection = () => {
	return (
		<Link to={"/"}>
			<div className="flex flex-row items-center gap-2 w-[200px]">
				<LaughIcon className={"animate-spin"} />
				Mediazioni Castiglia
			</div>
		</Link>
	);
};
