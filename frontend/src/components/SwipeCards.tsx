import type React from "react";
import { useEffect, useState } from "react";
import { animated, to as interpolate, useSprings } from "@react-spring/web";
import { useDrag } from "react-use-gesture";

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
};

type Image = {
	name: string;
	size: number;
	data: string;
	timestamp: number;
};

interface SwipeCardsProps {
	gallery: Image[];
}

const SwipeCards: React.FC<SwipeCardsProps> = ({ gallery }) => {
	const [gone] = useState(() => new Set());

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

			if (!down && trigger) gone.add(index);

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
			{props.map(({ x, y, rot, scale }, i) => (
				<animated.div
					style={{ ...(styles.deck as any), x, y }}
					key={`${gallery[i].timestamp}-${gallery[i].name}`}
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
								backgroundImage: `url(${gallery[i].data})`,
							}}
						/>
					</animated.div>
				</animated.div>
			))}
		</div>
	);
};

export default SwipeCards;
