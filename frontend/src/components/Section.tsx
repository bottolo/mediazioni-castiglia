import type { ReactNode } from "react";

type SectionProps = {
	id: string;
	title: string;
	subtitle: string;
	children: ReactNode;
	childrenStyle?: string;
};
export const Section = ({
	id,
	title,
	subtitle,
	children,
	childrenStyle,
}: SectionProps) => {
	return (
		<section id={id} className="flex flex-col gap-4 ">
			<div className="flex flex-col gap-1 pt-4 md:max-w-[50%] px-[1rem] md:px-0">
				<h2 className="font-semibold">{title}</h2>
				<p className="lg pb-4">{subtitle}</p>
			</div>

			<div className={childrenStyle}>{children}</div>
		</section>
	);
};
