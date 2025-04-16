import type React from "react";
import { useEffect, useState } from "react";
import { animated, to as interpolate, useSprings } from "@react-spring/web";
import { useDrag } from "react-use-gesture";
import { useIsMobile } from "@/hooks/use-is-mobile.ts";
import arrowRight from "@/assets/icons/arrow-right.svg";
import arrowLeft from "@/assets/icons/arrow-left.svg";

const styles = {
	container: {
		position: "relative",
		width: "100%",
		height: "500px",
		userSelect: "none",
		overflow: "hidden",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		touchAction: "none",
	},
	deck: {
		position: "absolute",
		width: "300px",
		height: "350px",
		willChange: "transform",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	card: {
		backgroundColor: "white",
		width: "100%",
		height: "100%",
		padding: "10px 10px 15px 10px",
		boxShadow: "0 0px 20px 0px rgba(0, 0, 0, 0.2)",
		willChange: "transform",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		touchAction: "none",
	},
	image: {
		width: "100%",
		height: "calc(100% - 40px)",
		backgroundSize: "cover",
		backgroundPosition: "center",
		boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1) inset",
	},
	caption: {
		marginTop: "12px",
		fontSize: "14px",
		color: "#444",
		fontFamily: "cursive, sans-serif",
		textAlign: "center",
	},
	navigationArrow: {
		position: "absolute",
		top: "50%",
		transform: "translateY(-50%)",
		zIndex: 100,
		width: "50px",
		height: "50px",
		display: "flex",
		borderRadius: "8px",
		justifyContent: "center",
		alignItems: "center",
		cursor: "pointer",
		transition: "background-color 0.3s ease",
	},
	leftArrow: {
		left: "10px",
	},
	rightArrow: {
		right: "10px",
	},
	leftArrowIcon: {
		transform: "rotate(135deg)",
	},
	rightArrowIcon: {
		transform: "rotate(-45deg)",
	},
	skeletonContainer: {
		position: "relative",
		width: "100%",
		height: "500px",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	skeleton: {
		position: "absolute",
		width: "300px",
		height: "350px",
		backgroundColor: "#e0e0e0",
	},
};

type Image = {
	name: string;
	size: number;
	data: string;
	timestamp: number;
};

interface SwipeCardsProps {
	gallery?: Image[];
	isLoading?: boolean;
}

const SwipeCards: React.FC<SwipeCardsProps> = ({
	gallery = [],
	isLoading = false,
}) => {
	const [gone] = useState(() => new Set());
	const [currentIndex, setCurrentIndex] = useState(0);
	const isMobile = useIsMobile();

	useEffect(() => {
		const originalStyle = window.getComputedStyle(document.body).overflow;

		const handleTouchMove = (e: TouchEvent) => {
			if (
				e.target &&
				(e.target as HTMLElement).closest(".swipe-card-container")
			) {
				e.preventDefault();
			}
		};

		document.addEventListener("touchmove", handleTouchMove, { passive: false });

		return () => {
			document.removeEventListener("touchmove", handleTouchMove);
			document.body.style.overflow = originalStyle;
		};
	}, []);

	useEffect(() => {
		if (gallery && gallery.length > 0) {
			gone.clear();
			setCurrentIndex(0);
			api.start((i) => to(i));
		}
	}, [gallery]);

	const to = (i: number) => ({
		x: 0,
		y: i * -4,
		scale: 1,
		rot: -10 + Math.random() * 20,
		delay: i * 100,
	});

	const from = (_i: number) => ({
		x: 0,
		rot: 0,
		scale: 1.5,
		y: -1000,
	});

	const trans = (r: number, s: number) =>
		`perspective(1500px) rotateX(0deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`;

	const [props, api] = useSprings(gallery.length, (i) => ({
		...to(i),
		from: from(i),
	}));

	const bind = useDrag(
		({
			args: [index],
			down,
			movement: [mx],
			direction: [xDir],
			velocity,
			event,
		}) => {
			if (event) {
				event.preventDefault();
			}

			const trigger = velocity > 0.2;
			const dir = xDir < 0 ? -1 : 1;

			if (!down && trigger) {
				gone.add(index);
				setCurrentIndex((prevIndex) =>
					index === prevIndex && prevIndex < gallery.length - 1
						? prevIndex + 1
						: prevIndex,
				);
			}

			api.start((i) => {
				if (index !== i) return;
				const isGone = gone.has(index);
				const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0;
				const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0);
				const scale = down ? 1.1 : 1;

				return {
					x,
					rot,
					scale,
					delay: undefined,
					config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
				};
			});

			if (!down && gone.size === gallery.length) {
				setTimeout(() => {
					gone.clear();
					setCurrentIndex(0);
					api.start((i) => to(i));
				}, 600);
			}
		},
		{
			filterTaps: true,
			preventDefault: true,
			rubberband: true,
		},
	);

	const handleSwipe = (dir: number) => {
		const visibleCardIndex = Array.from(Array(gallery.length).keys())
			.reverse()
			.find((i) => !gone.has(i));

		if (visibleCardIndex === undefined) return;

		gone.add(visibleCardIndex);

		if (
			visibleCardIndex === currentIndex &&
			currentIndex < gallery.length - 1
		) {
			setCurrentIndex(currentIndex + 1);
		}

		api.start((i) => {
			if (i !== visibleCardIndex) return;
			return {
				x: (200 + window.innerWidth) * dir,
				rot: dir * 10,
				scale: 1,
				delay: undefined,
				config: { friction: 50, tension: 200 },
			};
		});

		if (gone.size === gallery.length) {
			setTimeout(() => {
				gone.clear();
				setCurrentIndex(0);
				api.start((i) => to(i));
			}, 600);
		}
	};

	if (isLoading) {
		return (
			<div style={styles.skeletonContainer as React.CSSProperties}>
				<div
					style={{ ...(styles.skeleton as React.CSSProperties) }}
					className="animate-pulse"
				/>
				<div
					style={{
						...(styles.skeleton as React.CSSProperties),
						transform: "rotate(4deg)",
					}}
					className="animate-pulse opacity-60"
				/>
				<div
					style={{
						...(styles.skeleton as React.CSSProperties),
						transform: "rotate(-8deg)",
					}}
					className="animate-pulse opacity-40"
				/>
				<div
					style={{
						...(styles.skeleton as React.CSSProperties),
						transform: "rotate(10deg)",
					}}
					className="animate-pulse opacity-20"
				/>
			</div>
		);
	}

	if (!gallery || gallery.length === 0) {
		return (
			<div style={styles.container as React.CSSProperties}>
				<div style={{ textAlign: "center" }}>
					<p>No images to display</p>
				</div>
			</div>
		);
	}

	return (
		<div
			style={styles.container as React.CSSProperties}
			className="swipe-card-container"
		>
			{!isMobile && (
				<div
					style={
						{
							...styles.navigationArrow,
							...styles.leftArrow,
						} as React.CSSProperties
					}
					onClick={() => handleSwipe(-1)}
				>
					<img src={arrowLeft} className={"size-8"} />
				</div>
			)}

			{props.map(({ x, y, rot, scale }, i) => (
				<animated.div
					style={{ ...(styles.deck as any), x, y }}
					key={
						gallery[i]?.timestamp
							? `${gallery[i].timestamp}-${gallery[i].name}`
							: i
					}
				>
					<animated.div
						{...bind(i)}
						style={{
							...(styles.card as any),
							transform: interpolate([rot, scale], trans),
						}}
					>
						<div
							style={{
								...(styles.image as any),
								backgroundImage: `url(${gallery[i]?.data})`,
							}}
						/>
					</animated.div>
				</animated.div>
			))}

			{!isMobile && (
				<div
					style={
						{
							...styles.navigationArrow,
							...styles.rightArrow,
						} as React.CSSProperties
					}
					className={"hover:bg-[var(--bg-neutral-hover)]"}
					onClick={() => handleSwipe(1)}
				>
					<img src={arrowRight} className={"size-8"} />
				</div>
			)}
		</div>
	);
};

export default SwipeCards;
