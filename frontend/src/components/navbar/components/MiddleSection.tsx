import { cn } from "@/utils/cn.ts";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

export const MiddleSection = () => {
	const [currentPage, setCurrentPage] = useState<"/" | "/about">("/");

	return (
		<div className="invisible md:visible flex flex-1 justify-center items-center gap-2 text-sm">
			<Link to="/">
				<button
					className={cn(
						"p-3 rounded-sm cursor-pointer",
						currentPage === "/"
							? "bg-black text-white"
							: "hover:bg-gray-100 transition-colors",
					)}
					type="button"
					onClick={() => setCurrentPage("/")}
				>
					Home
				</button>
			</Link>
			<Link to="/about">
				<button
					className={cn(
						"p-3 rounded-sm cursor-pointer",
						currentPage === "/about"
							? "bg-black text-white"
							: "hover:bg-gray-100 transition-colors",
					)}
					type="button"
					onClick={() => setCurrentPage("/about")}
				>
					Contatti
				</button>
			</Link>
		</div>
	);
};
