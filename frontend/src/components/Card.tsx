import type { ReactNode } from "react";

type CardProps = {
	icon: ReactNode;
	title: string;
	description: string;
};
export const Card = ({ icon, title, description }: CardProps) => {
	return (
		<div className="pb-6 md:py-6 rounded-lg">
			{icon}

			<h3 className="text-[24px]/[32px] font-bold mb-2 mt-4">{title}</h3>
			<p className="text-[18px]/[24px] md:text-[20px]/[28px]">{description}</p>
		</div>
	);
};
