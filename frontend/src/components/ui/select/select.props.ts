/** Represents a single option in the select dropdown */
export interface SelectOption {
    /** Unique identifier for the option */
    value: string;

    /** Display text for the option */
    label: string;
}

/** Represents a group of options in the select dropdown */
export interface SelectGroup {
    /** Display text for the group header */
    label: string;

    /** Array of options within this group */
    options: SelectOption[];
}

/** Props for the Select component */
export interface SelectProps {
    /** Array of option groups to display in the select dropdown */
    groups: SelectGroup[];

    /** Text to display when no option is selected */
    placeholder?: string;

    /** Currently selected option value */
    value?: string;

    /** Callback function called when selection changes */
    onChange?: (value: string) => void;

    /** Accessibility label for the select component */
    ariaLabel?: string;
}
