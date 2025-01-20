import type { ButtonProps } from "@/components/ui/button/button.props";
import { Loader } from "lucide-react";
import { forwardRef } from "react";
import styles from "./button.module.css";

/**
 * A versatile button component with support for different variants, sizes, and states.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Button>Click me</Button>
 *
 * // With variant and size
 * <Button variant="primary" size="lg">Large Button</Button>
 *
 * // Loading state
 * <Button isLoading>Saving...</Button>
 *
 * // With icons
 * <Button leftIcon={<Icon />}>With Icon</Button>
 *
 * // Full width disabled button
 * <Button fullWidth disabled>Disabled Button</Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			variant = "primary",
			size = "md",
			isLoading = false,
			leftIcon,
			rightIcon,
			fullWidth = false,
			disabled = false,
			className = "",
			children,
			type = "button",
			...props
		},
		ref,
	) => {
		const buttonClasses = [
			styles.button,
			styles[`button--${variant}`],
			styles[`button--${size}`],
			fullWidth && styles["button--full-width"],
			isLoading && styles["button--loading"],
			disabled && styles["button--disabled"],
			className,
		]
			.filter(Boolean)
			.join(" ");

		return (
			<button
				ref={ref}
				type={type}
				className={buttonClasses}
				disabled={disabled || isLoading}
				{...props}
			>
				{isLoading && (
					<span className={styles.button__loader}>
						<Loader />
					</span>
				)}

				{leftIcon && !isLoading && (
					<span className={styles.button__iconLeft}>{leftIcon}</span>
				)}

				{/*Magari puoi metterci un className={styles.button__content}*/}
				<span>{children}</span>

				{rightIcon && !isLoading && (
					<span className={styles.button__iconRight}>{rightIcon}</span>
				)}
			</button>
		);
	},
);
