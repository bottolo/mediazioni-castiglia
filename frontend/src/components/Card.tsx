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

			<h3 className="font-bold mb-2 mt-4">{title}</h3>
			<p className="lg">{description}</p>
		</div>
	);
};
