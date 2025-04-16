import { cn } from "@/utils/cn.ts";
import type { ReactNode } from "react";

interface ButtonProps {
	children: ReactNode;
	type?: "button" | "submit" | "reset";
	onClick?: () => void;
	className?: string;
	inactive?: boolean;
	cssVarPrefix?: string;
	icon?: string;
}

export const Button = ({
	children,
	type = "button",
	onClick,
	className = "",
	inactive = false,
	cssVarPrefix = "",
	icon = undefined,
}: ButtonProps) => {
	const getPrefixedVar = (baseName: string) => {
		const prefix = cssVarPrefix ? `${cssVarPrefix}-` : "";
		return `var(--bg-button-${prefix}${baseName}, var(--bg-button-default-${baseName}))`;
	};

	const borderFrom = getPrefixedVar("border-from");
	const borderTo = getPrefixedVar("border-to");
	const borderFromHover = getPrefixedVar("border-from-hover");
	const borderToHover = getPrefixedVar("border-to-hover");
	const bgFrom = getPrefixedVar("from");
	const bgTo = getPrefixedVar("to");
	const bgFromHover = getPrefixedVar("from-hover");
	const bgToHover = getPrefixedVar("to-hover");
	const shadowSoft = getPrefixedVar("shadow-soft");

	const neutralHover = "var(--bg-neutral-hover, #dcdcdc)";

	return (
		<button
			type={type}
			className={cn(
				"relative rounded-[4px] group transition-all duration-150 cursor-pointer",
				className,
			)}
			onClick={onClick}
			style={{
				boxShadow: `${inactive ? "" : shadowSoft}`,
			}}
		>
			<div className="absolute inset-0 rounded-[4px]">
				<div
					className="absolute inset-0 rounded-[4px] transition-opacity duration-150"
					style={{
						background: inactive
							? "white"
							: `radial-gradient(circle 90px at top right, ${borderTo}, ${borderFrom})`,
					}}
				/>
				<div
					className="absolute inset-0 rounded-[4px] opacity-0 group-hover:opacity-100 transition-opacity duration-150"
					style={{
						background: inactive
							? neutralHover
							: `radial-gradient(circle 90px at top right, ${borderToHover}, ${borderFromHover})`,
					}}
				/>
			</div>

			<div className="relative p-[1px]">
				<div className="relative w-full h-full rounded-[3px]">
					<div className="absolute inset-0 rounded-[3px]">
						<div
							className="absolute inset-0 rounded-[3px] transition-opacity duration-150"
							style={{
								background: inactive
									? "white"
									: `linear-gradient(to top, ${bgFrom}, ${bgTo})`,
							}}
						/>
						<div
							className="absolute inset-0 rounded-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-150"
							style={{
								background: inactive
									? neutralHover
									: `linear-gradient(to top, ${bgFromHover}, ${bgToHover})`,
							}}
						/>
					</div>

					<div
						className={cn(
							"relative z-10 w-full h-full py-2 px-4 text-center font-semibold flex flex-row items-center gap-3 justify-center",
							inactive ? "text-black" : "text-white",
						)}
					>
						{children} {icon && <img alt={icon} src={icon} />}
					</div>
				</div>
			</div>
		</button>
	);
};
