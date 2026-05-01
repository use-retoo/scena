import type { ComponentSize, ComponentShape } from '@/shared/enums';
import type {
	ComponentAriaProps,
	ComponentClasses,
	ComponentStyles,
	ComponentSnippet
} from '@/shared/types';

/** Custom CSS class overrides for the video container. */
export interface ScenaVideoContainerCustomClasses {
	root: ComponentClasses;
}

/** Custom inline style overrides for the video container. */
export interface ScenaVideoContainerCustomStyles {
	root: ComponentStyles;
}

/** Configuration props for the video container widget. */
export interface ScenaVideoContainerProps {
	id: string;
	/** Size of the video container. */
	size: ComponentSize;
	/** Shape of the video container (affects aspect ratio and border-radius). */
	shape: ComponentShape;
	/** ARIA attributes for accessibility. */
	aria: Partial<ComponentAriaProps>;
	customClasses: Partial<ScenaVideoContainerCustomClasses>;
	customStyles: Partial<ScenaVideoContainerCustomStyles>;
}

/** Snippet slots for the video container. */
export interface ScenaVideoContainerSnippets {
	children: ComponentSnippet;
}

/** Component ref for the video container. */
export interface ScenaVideoContainerRef {
	getElements: () => { root: HTMLDivElement };
}
