import type { ButtonHTMLAttributes, ReactNode } from "react";

/** Defines the available visual styles for the button */
export type ButtonVariant =
	| "primary" // Main call-to-action
	| "secondary" // Alternative actions
	| "outline" // Less prominent actions
	| "ghost" // Subtle background-less style
	| "link" // Appears as a text link
	| "danger"; // Destructive actions

/** Defines the available size presets */
export type ButtonSize =
	| "sm" // Small buttons for compact UIs
	| "md" // Default size for most use cases
	| "lg"; // Large buttons for emphasis

/** Props interface for the Button component */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	/** Content rendered inside the button */
	children: ReactNode;

	/** Visual style variant */
	variant?: ButtonVariant;

	/** Size preset */
	size?: ButtonSize;

	/** Shows loading spinner and disables button when true */
	isLoading?: boolean;

	/** Icon element displayed before children */
	leftIcon?: ReactNode;

	/** Icon element displayed after children */
	rightIcon?: ReactNode;

	/** Makes button expand to container width */
	fullWidth?: boolean;

	/** Controls button disabled state */
	disabled?: boolean;

	/** Controls loading spinner visibility when isLoading is true */
	showSpinner?: boolean;

	/** Additional CSS classes to apply */
	className?: string;
}
