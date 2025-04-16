import { cn } from "@/utils/cn.ts";
import type { ReactNode } from "react";

interface ContactCardProps {
	label: string;
	value: string;
	icon: ReactNode;
	className?: string;
	childrenClassName?: string;
	onClick?: () => void;
	cssVarPrefix?: string;
	labelColor?: string;
	textColor?: string;
}

export const ContactCard = ({
	label,
	value,
	icon,
	className = "",
	childrenClassName = "",
	onClick,
	cssVarPrefix = "",
	labelColor = "",
	textColor = "",
}: ContactCardProps) => {
	const getPrefixedVar = (baseName: string) => {
		const prefix = cssVarPrefix ? `${cssVarPrefix}-` : "";
		return `var(--bg-card-${prefix}${baseName}, var(--bg-card-default-${baseName}))`;
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

	return (
		<div
			className={cn(
				"w-full md:w-[360px] rounded-lg relative group transition-all duration-150",
				onClick && "cursor-pointer",
			)}
			onClick={onClick}
			style={{
				boxShadow: `${shadowSoft}`,
			}}
		>
			<div
				className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-150 pointer-events-none"
				style={{
					boxShadow: `0px 6px 10px -8px ${shadowSoft}`,
				}}
			/>

			<div className="absolute inset-0 rounded-lg">
				<div
					className="absolute inset-0 rounded-lg transition-opacity duration-150"
					style={{
						backgroundImage: `radial-gradient(circle 90px at top right, ${borderTo}, ${borderFrom})`,
					}}
				/>
				<div
					className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150"
					style={{
						backgroundImage: `radial-gradient(circle 90px at top right, ${borderToHover}, ${borderFromHover})`,
					}}
				/>
			</div>

			<div className="relative p-[1px]">
				<div
					className={cn(
						"relative w-full h-full rounded-[7px] py-[10px] px-[12px]",
						className,
					)}
				>
					<div className="absolute inset-0 rounded-[7px]">
						<div
							className="absolute inset-0 rounded-[7px] transition-opacity duration-150"
							style={{
								backgroundImage: `linear-gradient(to top, ${bgFrom}, ${bgTo})`,
							}}
						/>
						<div
							className="absolute inset-0 rounded-[7px] opacity-0 group-hover:opacity-100 transition-opacity duration-150"
							style={{
								backgroundImage: `linear-gradient(to top, ${bgFromHover}, ${bgToHover})`,
							}}
						/>
					</div>

					<div
						className={cn(
							"flex flex-row justify-between relative z-10",
							childrenClassName,
						)}
					>
						<h4 className={cn(labelColor || "text-gray-500")}>{label}</h4>
						<img alt={String(icon)} src={icon} />
					</div>
					<p className={cn("lg font-semibold relative z-10", textColor)}>
						{value}
					</p>
				</div>
			</div>
		</div>
	);
};
