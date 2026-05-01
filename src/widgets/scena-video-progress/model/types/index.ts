import type { ComponentSize, ComponentShape } from '@/shared/enums';
import type { ComponentStyles, ComponentClasses, ComponentAriaProps } from '@/shared/types';
import type {
	ScenaProgressLineElements,
	ScenaProgressCircleElements
} from '@/shared/ui/scena-progress';

import type { ScenaVideoProgressVariant } from '../enums';

/** Custom CSS class overrides for the video progress bar. */
export interface ScenaVideoProgressComponentClasses {
	root: ComponentClasses;
	track: ComponentClasses;
	progress: ComponentClasses;
	buffered: ComponentClasses;
}

/** Custom inline style overrides for the video progress bar. */
export interface ScenaVideoProgressComponentStyles {
	root: ComponentStyles;
	track: ComponentStyles;
	progress: ComponentStyles;
	buffered: ComponentStyles;
}

/** Thickness values for the progress bar in default and hover states. */
export interface ScenaVideoProgressThickness {
	default: number;
	hover: number;
}

/** Maps each component size to its progress thickness values. */
export type ScenaVideoProgressThicknessMap = Record<ComponentSize, ScenaVideoProgressThickness>;

/** Thickness config per progress variant (line/circle) and size. */
export type ScenaVideoProgressComponentThickness = Record<
	ScenaVideoProgressVariant,
	ScenaVideoProgressThicknessMap
>;

/** Configuration props for the video progress widget. */
export interface ScenaVideoProgressProps {
	id: string;
	size: ComponentSize;
	shape: ComponentShape;
	hasBuffer: boolean;
	aria: Partial<ComponentAriaProps>;
	customThickness: Partial<ScenaVideoProgressComponentThickness>;
	customClasses: Partial<ScenaVideoProgressComponentClasses>;
	customStyles: Partial<ScenaVideoProgressComponentStyles>;
}

/** Component ref for the video progress bar. */
export interface ScenaVideoProgressRef {
	getElements: () => ScenaProgressLineElements | ScenaProgressCircleElements | null;
}
