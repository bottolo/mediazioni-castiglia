import { cn } from "@/utils/cn.ts";
import type { ReactNode } from "react";

type CardProps = {
	icon: ReactNode;
	title: string;
	description: string;
	classname?: string;
};
export const Card = ({ icon, title, description, classname }: CardProps) => {
	return (
		<div className={cn("md:py-3 rounded-lg", classname)}>
			<img alt={icon} className={"size-12 md:size-18"} src={icon} />

			<h3 className="font-semibold mb-2 mt-4 text-gray-700">{title}</h3>
			<p className="lg text-gray-600">{description}</p>
		</div>
	);
};
