import type { ComponentSize } from '@/shared/enums';
import type { ComponentStyles, ComponentClasses, ComponentSnippet } from '@/shared/types';

export interface ScenaIconCustomClasses {
	root: ComponentClasses;
}

export interface ScenaIconCustomStyles {
	root: ComponentStyles;
}

export interface ScenaIconProps {
	id: string;
	viewBox: string;
	size: ComponentSize;
	customClasses: Partial<ScenaIconCustomClasses>;
	customStyles: Partial<ScenaIconCustomStyles>;
}

export interface ScenaIconSnippets {
	children: ComponentSnippet;
}

export interface ScenaIconElements {
	root: SVGSVGElement;
}
