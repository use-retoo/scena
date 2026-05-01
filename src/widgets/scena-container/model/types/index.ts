import type { ComponentPlacement, ComponentPosition } from '@/shared/enums';
import type { ComponentClasses, ComponentStyles, ComponentSnippet } from '@/shared/types';

/** Custom CSS class overrides for the outer container. */
export interface ScenaContainerCustomClasses {
	root: ComponentClasses;
}

/** Custom inline style overrides for the outer container. */
export interface ScenaContainerCustomStyles {
	root: ComponentStyles;
}

/** Configuration props for the scena outer container. */
export interface ScenaContainerProps {
	id: string;
	/** CSS `position` value for the container. */
	position: ComponentPosition;
	/** Placement within the viewport (e.g. bottom-end). */
	placement: ComponentPlacement;
	customClasses: Partial<ScenaContainerCustomClasses>;
	customStyles: Partial<ScenaContainerCustomStyles>;
}

/** Snippet slots for the container widget. */
export interface ScenaContainerSnippets {
	children: ComponentSnippet;
}

/** Component ref for the outer container. */
export interface ScenaContainerRef {
	getElements: () => { root: HTMLDivElement };
}
