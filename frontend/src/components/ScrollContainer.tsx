import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useEffect, useRef, useState } from "react";

const ScrollContainer = ({ items, imageHeight = "h-64", gap = "gap-4" }) => {
	const [canScrollLeft, setCanScrollLeft] = useState(false);
	const [canScrollRight, setCanScrollRight] = useState(false);
	const scrollRef = useRef(null);

	const checkScroll = () => {
		if (!scrollRef.current) return;

		const element = scrollRef.current;
		const scrollLeft = element.scrollLeft;
		const isScrollable = element.scrollWidth > element.clientWidth;

		setCanScrollLeft(scrollLeft > 0);
		setCanScrollRight(
			isScrollable && scrollLeft < element.scrollWidth - element.clientWidth,
		);
	};

	useEffect(() => {
		const element = scrollRef.current;
		if (!element) return;

		checkScroll();
		element.addEventListener("scroll", checkScroll);
		window.addEventListener("resize", checkScroll);

		return () => {
			element.removeEventListener("scroll", checkScroll);
			window.removeEventListener("resize", checkScroll);
		};
	}, [items]);

	return (
		<div className="relative w-full">
			<div
				className={`absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black to-transparent opacity-10 pointer-events-none transition-opacity duration-200 z-10
          ${canScrollLeft ? "opacity-10" : "opacity-0"}`}
			/>

			<div
				className={`absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black to-transparent opacity-10 pointer-events-none transition-opacity duration-200 z-10
          ${canScrollRight ? "opacity-10" : "opacity-0"}`}
			/>

			<ScrollArea className="w-full whitespace-nowrap rounded-md">
				<div ref={scrollRef} className={`flex ${gap} py-4 px-2`}>
					{items?.map((item, index) => (
						<div
							key={item.name || index}
							className={`flex-none ${imageHeight} w-72 border border-gray-300`}
						>
							<img
								src={item.data}
								alt={item.name}
								className="w-full h-full object-cover"
							/>
						</div>
					))}
				</div>
			</ScrollArea>
		</div>
	);
};

export default ScrollContainer;
