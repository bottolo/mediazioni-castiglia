import { LeftSection } from "@/components/navbar/components/LeftSection.tsx";
import { MiddleSection } from "@/components/navbar/components/MiddleSection.tsx";
import { RightSection } from "@/components/navbar/components/RightSection.tsx";

export const Navbar = () => {
	return (
		<nav className="flex flex-row items-center px-8 md:px-[12rem] py-[0.9rem]">
			<LeftSection />
			<MiddleSection />
			<RightSection />
		</nav>
	);
};
