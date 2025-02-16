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
			<div className="flex flex-col gap-1 pt-4 md:max-w-[50%] px-[1rem] mx:px-0">
				<p className="text-[32px]/[40px] md:text-[36px]/[40px] font-bold">
					{title}
				</p>
				<h2 className="text-[18px]/[24px] md:text-[20px]/[28px] pb-4">
					{subtitle}
				</h2>
			</div>

			<div className={childrenStyle}>{children}</div>
		</section>
	);
};
