import { cn } from "@/utils/cn.ts";
import type { ReactNode } from "react";

interface ContactCardProps {
	label: string;
	value: string;
	icon: ReactNode;
	backgroundColor: string;
	className?: string;
	childrenClassName?: string;
	onClick?: () => void;
}

export const ContactCard = ({
	label,
	value,
	icon,
	className = "",
	childrenClassName = "",
	onClick,
}: ContactCardProps) => {
	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
		<div
			className={cn(
				"md:w-fit p-3 rounded-md",
				className,
				onClick && "cursor-pointer",
			)}
			onClick={onClick}
		>
			<div
				className={cn(
					"flex flex-row justify-between ",
					childrenClassName ? childrenClassName : "md:gap-32",
				)}
			>
				<h4 className="text-gray-500">{label}</h4>
				<div className="w-5 h-5">{icon}</div>
			</div>
			<p className="lg font-semibold">{value}</p>
		</div>
	);
};
