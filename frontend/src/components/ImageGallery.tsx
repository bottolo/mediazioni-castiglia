import React, { useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import arrowRight from "@/assets/icons/arrow-right.svg";
import arrowLeft from "@/assets/icons/arrow-left.svg";

interface ImageGalleryProps {
	images: Array<{
		src?: string;
		data?: string;
		alt?: string;
		name?: string;
	}>;
	isLoading?: boolean;
	error?: any;
	height?: string;
	width?: string;
	gap?: string;
}

const ImageGallery = ({
	images,
	isLoading = false,
	error = null,
	height = "h-64",
	width = "w-72",
	gap = "gap-4",
}: ImageGalleryProps) => {
	const scrollContainerRef = useRef(null);
	const [scrollPosition, setScrollPosition] = useState(0);
	const [maxScroll, setMaxScroll] = useState(0);

	const handleScroll = () => {
		if (scrollContainerRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } =
				scrollContainerRef.current;
			setScrollPosition(scrollLeft);
			setMaxScroll(scrollWidth - clientWidth);
		}
	};

	const scroll = (direction) => {
		if (scrollContainerRef.current) {
			const scrollAmount = direction === "left" ? -300 : 300;
			scrollContainerRef.current.scrollBy({
				left: scrollAmount,
				behavior: "smooth",
			});
		}
	};

	React.useEffect(() => {
		if (scrollContainerRef.current) {
			const { scrollWidth, clientWidth } = scrollContainerRef.current;
			setMaxScroll(scrollWidth - clientWidth);
		}

		const handleResize = () => {
			if (scrollContainerRef.current) {
				const { scrollWidth, clientWidth } = scrollContainerRef.current;
				setMaxScroll(scrollWidth - clientWidth);
			}
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [images]);

	if (isLoading) {
		return (
			<div className="w-full whitespace-nowrap rounded-lg overflow-x-auto scrollbar-hide">
				<div className={`flex ${gap} pb-4 scrollbar-hide`}>
					{[...Array(6)].map((_, index) => (
						<Skeleton
							key={index}
							className={`flex-none ${height} ${width} bg-gray-200 animate-pulse rounded-lg`}
						/>
					))}
				</div>
			</div>
		);
	}

	if (error) {
		return <p className="text-red-500">Errore: {error.message || error}</p>;
	}

	if (!images || images.length === 0) {
		return <p className="text-gray-500">Nessuna immagine disponibile.</p>;
	}

	return (
		<div className="relative rounded-lg">
			<button
				type={"button"}
				className={`hidden md:block absolute -left-20 top-1/2 z-10 -translate-y-1/2 p-2 rounded-lg cursor-pointer bg-white/80 text-gray-700 hover:bg-[var(--bg-neutral-hover)] transition-colors ${scrollPosition <= 0 ? "opacity-50 cursor-not-allowed" : "opacity-100"}`}
				onClick={() => scroll("left")}
				disabled={scrollPosition <= 0}
				aria-label="Precedente"
			>
				<img alt={"Left arrow"} src={arrowLeft} />
			</button>

			<button
				type={"button"}
				className={`hidden md:block absolute -right-20 top-1/2 z-10 -translate-y-1/2 p-2 rounded-lg cursor-pointer bg-white/80  text-gray-700 hover:bg-[var(--bg-neutral-hover)] transition-colors ${scrollPosition >= maxScroll ? "opacity-50 cursor-not-allowed" : "opacity-100"}`}
				onClick={() => scroll("right")}
				disabled={scrollPosition >= maxScroll}
				aria-label="Successivo"
			>
				<img alt={"Right arrow"} src={arrowRight} />
			</button>

			<div
				ref={scrollContainerRef}
				className={`flex ${gap} pb-4 overflow-x-auto scrollbar-hide rounded-lg`}
				style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
				onScroll={handleScroll}
			>
				{images.map((image, index) => (
					<div
						key={index}
						className={`flex-none ${height} ${width} overflow-hidden border border-gray-300 rounded-lg`}
					>
						<img
							src={image.src || image.data || image}
							alt={image.alt || image.name || `Image ${index + 1}`}
							className="w-full h-full object-cover hover:scale-105 transition-transform duration-150"
						/>
					</div>
				))}
			</div>

			<div className="pointer-events-none absolute left-10 top-0 bottom-4 w-16 bg-gradient-to-r from-background to-transparent" />
			<div className="pointer-events-none absolute right-10 top-0 bottom-4 w-16 bg-gradient-to-l from-background to-transparent" />
		</div>
	);
};

export default ImageGallery;
