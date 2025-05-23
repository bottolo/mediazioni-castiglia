import { cn } from "@/utils/cn.ts";
import { Link, useLocation } from "@tanstack/react-router";

export const MiddleSection = () => {
	const location = useLocation();

	return (
		<div className="invisible flex flex-1 justify-center items-center gap-2 text-sm">
			<Link to="/">
				<button
					className={cn(
						"p-3 rounded-sm cursor-pointer",
						location.pathname === "/"
							? "bg-black text-white"
							: "hover:bg-[var(--bg-neutral-hover)]",
					)}
					type="button"
				>
					<h4>Home</h4>
				</button>
			</Link>
			<Link to="/about">
				<button
					className={cn(
						"p-3 rounded-sm cursor-pointer",
						location.pathname === "/about"
							? "bg-black text-white"
							: "hover:bg-[var(--bg-neutral-hover)]",
					)}
					type="button"
				>
					<h4>Chi sono</h4>
				</button>
			</Link>
		</div>
	);
};
