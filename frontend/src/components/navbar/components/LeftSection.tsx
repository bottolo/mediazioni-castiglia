import { Link } from "@tanstack/react-router";
import { LaughIcon } from "lucide-react";

export const LeftSection = () => {
	return (
		<Link to={"/"}>
			<div className="flex flex-row items-center gap-2 ml-4 md:ml-0 md:w-[200px]">
				<LaughIcon className={"animate-spin"} />
				<p>Mediazioni Castiglia</p>
			</div>
		</Link>
	);
};
