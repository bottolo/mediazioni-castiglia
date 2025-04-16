import _ from "lodash";
import { useEffect, useState } from "react";

export const useIsMobile = (breakpoint = 768) => {
	const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);

	useEffect(() => {
		const checkMobile = () => setIsMobile(window.innerWidth < breakpoint);
		checkMobile();
		const handler = _.debounce(checkMobile, 250);
		window.addEventListener("resize", handler);
		return () => window.removeEventListener("resize", handler);
	}, [breakpoint]);

	return isMobile;
};
