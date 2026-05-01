import type { ComponentSize } from '@/shared/enums';
import type {
	ComponentAriaProps,
	ComponentClasses,
	ComponentStyles,
	ComponentSnippet
} from '@/shared/types';

import { ScenaButtonShape, ScenaButtonType, ScenaButtonVariant } from '../enums';

/** Custom CSS class overrides for the base button. */
export interface ScenaButtonComponentClasses {
	root: ComponentClasses;
}

/** Custom inline style overrides for the base button. */
export interface ScenaButtonComponentStyles {
	root: ComponentStyles;
}

/** Configuration props for the base scena button component. */
export interface ScenaButtonProps {
	id: string;
	autosize: boolean;
	size: ComponentSize;
	shape: ScenaButtonShape;
	variant: ScenaButtonVariant;
	type: ScenaButtonType;
	aria: Partial<ComponentAriaProps>;
	customClasses: Partial<ScenaButtonComponentClasses>;
	customStyles: Partial<ScenaButtonComponentStyles>;
}

/** Event handlers for the base button. */
export interface ScenaButtonEvents {
	onclick: (event: Event) => void;
}

/** Snippet slots for the base button. */
export interface ScenaButtonSnippets {
	children: ComponentSnippet;
}

/** DOM element references for the base button. */
export interface ScenaButtonElements {
	root: HTMLButtonElement;
}
