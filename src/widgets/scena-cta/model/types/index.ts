import type { ComponentSize } from '@/shared/enums';
import type { ComponentStyles, ComponentClasses, ComponentAriaProps } from '@/shared/types';
import type { ScenaButtonElements } from '@/shared/ui/scena-button';

import type { ScenaCtaButtonPlacement } from '../enums';

/** Custom CSS class overrides for the CTA button. */
export interface ScenaCtaButtonComponentClasses {
	root: ComponentClasses;
	button: ComponentClasses;
}

/** Custom inline style overrides for the CTA button. */
export interface ScenaCtaButtonComponentStyles {
	root: ComponentStyles;
	button: ComponentStyles;
}

/** Custom HTML override for the CTA button. */
export interface ScenaCtaButtonComponentHtml {
	button: string;
}

/** Adaptive display settings for the CTA button across screen sizes. */
export interface ScenaCtaButtonAdaptive {
	sizes: ComponentSize[];
	placement: ScenaCtaButtonPlacement;
}

/** Configuration props for the CTA (call-to-action) button widget. */
export interface ScenaCtaButtonProps {
	id: string;
	text: string;
	size: ComponentSize;
	placement: ScenaCtaButtonPlacement;
	adaptive: ScenaCtaButtonAdaptive | false;
	aria: Partial<ComponentAriaProps>;
	customClasses: Partial<ScenaCtaButtonComponentClasses>;
	customStyles: Partial<ScenaCtaButtonComponentStyles>;
	customHtml: Partial<ScenaCtaButtonComponentHtml>;
	onClick: (event: Event) => void;
}

/** DOM elements exposed by the CTA button component. */
export interface ScenaCtaButtonElements {
	root: HTMLDivElement | null;
	button: ScenaButtonElements | null;
}

/** Component ref for the CTA button. */
export interface ScenaCtaButtonRef {
	getElements: () => ScenaCtaButtonElements;
}
