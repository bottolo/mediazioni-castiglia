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
		<div className={cn("md:py-6 rounded-lg", classname)}>
			{icon}

			<h3 className="font-semibold mb-2 mt-4">{title}</h3>
			<p className="lg">{description}</p>
		</div>
	);
};
