import type { SelectProps } from "@/components/ui/select/select.props";
import * as RadixSelect from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import type { ReactElement } from "react";
import styles from "./select.module.css";

/**
 * A customizable select component built on top of Radix UI Select primitive.
 * Supports grouped options, custom styling through CSS modules, and full keyboard navigation.
 *
 * @example
 * ```tsx
 * const groups = [{
 *   label: "Fruits",
 *   options: [
 *     { value: "apple", label: "Apple" },
 *     { value: "banana", label: "Banana" }
 *   ]
 * }];
 *
 * const [value, setValue] = useState<string>();
 *
 * return (
 *   <Select
 *     groups={groups}
 *     value={value}
 *     onChange={setValue}
 *     placeholder="Select a fruit..."
 *   />
 * );
 * ```
 */
export const Select = ({
	groups,
	placeholder = "Select an option...",
	value,
	onChange,
	ariaLabel = "Select",
}: SelectProps): ReactElement => (
	<RadixSelect.Root value={value} onValueChange={onChange}>
		<RadixSelect.Trigger className={styles.Trigger} aria-label={ariaLabel}>
			<RadixSelect.Value placeholder={placeholder} />
			<RadixSelect.Icon className={styles.Icon}>
				<ChevronDownIcon />
			</RadixSelect.Icon>
		</RadixSelect.Trigger>

		<RadixSelect.Portal>
			<RadixSelect.Content className={styles.Content}>
				<RadixSelect.ScrollUpButton className={styles.ScrollButton}>
					<ChevronUpIcon />
				</RadixSelect.ScrollUpButton>

				<RadixSelect.Viewport className={styles.Viewport}>
					{groups.map((group, groupIndex) => (
						<div key={`${group.label}-${groupIndex}`}>
							{groupIndex > 0 && (
								<RadixSelect.Separator className={styles.Separator} />
							)}

							<RadixSelect.Group>
								<RadixSelect.Label className={styles.Label}>
									{group.label}
								</RadixSelect.Label>

								{group.options.map((option) => (
									<RadixSelect.Item
										key={option.value}
										value={option.value}
										className={styles.Item}
									>
										<RadixSelect.ItemText>{option.label}</RadixSelect.ItemText>
										<RadixSelect.ItemIndicator className={styles.ItemIndicator}>
											<CheckIcon />
										</RadixSelect.ItemIndicator>
									</RadixSelect.Item>
								))}
							</RadixSelect.Group>
						</div>
					))}
				</RadixSelect.Viewport>

				<RadixSelect.ScrollDownButton className={styles.ScrollButton}>
					<ChevronDownIcon />
				</RadixSelect.ScrollDownButton>
			</RadixSelect.Content>
		</RadixSelect.Portal>
	</RadixSelect.Root>
);
