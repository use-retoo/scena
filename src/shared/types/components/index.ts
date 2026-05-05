import { ComponentAriaHaspopup, ComponentAriaPressed } from '../../enums';

/** Shape of any component instance that exposes its DOM elements via `getElements()`. */
export type ComponentRef<T> = { getElements(): T };

/** Inline styles — a raw CSS string or a partial `CSSStyleDeclaration` object. */
export type ComponentStyles = string | Partial<CSSStyleDeclaration>;

/**
 * Class binding value.
 * Accepts a string, falsy values (skipped), an object whose truthy keys
 * are added as classes, or a nested array of the same.
 */
export type ComponentClasses =
	| string
	| number
	| false
	| null
	| undefined
	| Record<string, boolean>
	| ComponentClasses[];

/** Common ARIA attributes shared across interactive components. */
export interface ComponentAriaProps {
	ariaLabel?: string;
	ariaLabelledby?: string;
	ariaDescribedby?: string;
	ariaDisabled?: boolean;
	ariaExpanded?: boolean;
	ariaControls?: string;
	ariaPressed?: ComponentAriaPressed;
	ariaHaspopup?: ComponentAriaHaspopup;
}
