import { cn } from "@/utils/cn.ts";
import type { ReactNode } from "react";
import { useState } from "react";

interface ContactCardProps {
	label: string;
	value: string;
	icon: ReactNode;
	className?: string;
	childrenClassName?: string;
	onClick?: () => void;
	cssVarPrefix?: string;
}

export const ContactCard = ({
	label,
	value,
	icon,
	className = "",
	childrenClassName = "",
	onClick,
	cssVarPrefix = "",
}: ContactCardProps) => {
	const [isHovered, setIsHovered] = useState(false);

	const handleMouseEnter = () => setIsHovered(true);
	const handleMouseLeave = () => setIsHovered(false);

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

	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
		<div
			className={cn(
				"w-full md:w-[360px] rounded-lg p-[1px] transition-all duration-300",
				onClick && "cursor-pointer",
			)}
			style={{
				background: isHovered
					? `radial-gradient(circle 90px at top right, ${borderToHover}, ${borderFromHover})`
					: `radial-gradient(circle 90px at top right, ${borderTo}, ${borderFrom})`,
			}}
			onClick={onClick}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<div
				className={cn(
					"w-full h-full rounded-[7px] py-[10px] px-[12px] transition-all duration-300",
					className,
				)}
				style={{
					background: isHovered
						? `linear-gradient(to top, ${bgFromHover}, ${bgToHover})`
						: `linear-gradient(to top, ${bgFrom}, ${bgTo})`,
				}}
			>
				<div className={cn("flex flex-row justify-between", childrenClassName)}>
					<h4 className="text-gray-500">{label}</h4>
					<img src={icon} />
				</div>
				<p className="lg font-semibold">{value}</p>
			</div>
		</div>
	);
};
