import type { ComponentSize } from '@/shared/enums';
import type { ComponentStyles, ComponentClasses } from '@/shared/types';

/** Custom CSS class overrides for the loader spinner. */
export interface ScenaLoaderCustomClasses {
	root: ComponentClasses;
}

/** Custom inline style overrides for the loader spinner. */
export interface ScenaLoaderCustomStyles {
	root: ComponentStyles;
}

/** Configuration props for the loading spinner component. */
export interface ScenaLoaderProps {
	id: string;
	size: ComponentSize;
	customClasses: Partial<ScenaLoaderCustomClasses>;
	customStyles: Partial<ScenaLoaderCustomStyles>;
}

/** DOM element references for the loader spinner. */
export interface ScenaLoaderElements {
	root: SVGSVGElement;
}
