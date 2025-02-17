import { Link } from "@tanstack/react-router";
import { LaughIcon } from "lucide-react";

export const LeftSection = () => {
	return (
		<Link to={"/"}>
			<div className="flex flex-row items-center gap-2 w-[150px] md:w-[200px]">
				<LaughIcon className={"animate-spin"} />
				<span className="truncate">Mediazioni Castiglia</span>
			</div>
		</Link>
	);
};
