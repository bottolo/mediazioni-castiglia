import { LeftSection } from "@/components/navbar/components/LeftSection.tsx";
import { MenuButton } from "@/components/navbar/components/MenuButton.tsx";
import { MiddleSection } from "@/components/navbar/components/MiddleSection.tsx";
import { RightSection } from "@/components/navbar/components/RightSection.tsx";

export const Navbar = () => {
	return (
		<nav className="flex flex-row items-center py-[0.9rem] justify-between w-full max-w-[1032px]">
			<LeftSection />
			<MiddleSection />
			<RightSection />
			<MenuButton />
		</nav>
	);
};
