import type { ComponentSize } from '@/shared/enums';
import type { ComponentStyles, ComponentClasses, ComponentAriaProps } from '@/shared/types';

/** Thickness values for the progress indicator in default and hover states. */
export interface ScenaProgressThickness {
	default: number;
	hover: number;
}

/** Maps each component size to its progress thickness settings. */
export type ScenaProgressComponentThickness = Record<ComponentSize, ScenaProgressThickness>;

/** Custom CSS class overrides for the circular progress indicator. */
export interface ScenaProgressCircleComponentClasses {
	root: ComponentClasses;
	track: ComponentClasses;
	buffer: ComponentClasses;
	progress: ComponentClasses;
}

/** Custom inline style overrides for the circular progress indicator. */
export interface ScenaProgressCircleComponentStyles {
	root: ComponentStyles;
	track: ComponentStyles;
	buffer: ComponentStyles;
	progress: ComponentStyles;
}

/** Configuration props for the circular progress indicator. */
export interface ScenaProgressCircleProps {
	id: string;
	size: ComponentSize;
	buffer: number;
	progress: number;
	hasBuffer: boolean;
	aria: Partial<ComponentAriaProps>;
	customThickness: Partial<ScenaProgressComponentThickness>;
	customClasses: Partial<ScenaProgressCircleComponentClasses>;
	customStyles: Partial<ScenaProgressCircleComponentStyles>;
}

/** Seek event callbacks for the circular progress indicator. */
export interface ScenaProgressCircleEvents {
	onSeek: (progress: number, event: Event) => void;
	onSeekStart?: (event: Event) => void;
	onSeekEnd?: (event: Event) => void;
}

/** Custom CSS class overrides for the linear progress bar. */
export interface ScenaProgressLineComponentClasses {
	root: ComponentClasses;
	track: ComponentClasses;
	buffer: ComponentClasses;
	progress: ComponentClasses;
}

/** Custom inline style overrides for the linear progress bar. */
export interface ScenaProgressLineComponentStyles {
	root: ComponentStyles;
	track: ComponentStyles;
	buffer: ComponentStyles;
	progress: ComponentStyles;
}

/** Configuration props for the linear progress bar. */
export interface ScenaProgressLineProps {
	id: string;
	size: ComponentSize;
	buffer: number;
	progress: number;
	hasBuffer: boolean;
	customThickness: Partial<ScenaProgressComponentThickness>;
	customClasses: Partial<ScenaProgressLineComponentClasses>;
	customStyles: Partial<ScenaProgressLineComponentStyles>;
	aria: Partial<ComponentAriaProps>;
}

/** Seek event callbacks for the linear progress bar. */
export interface ScenaProgressLineEvents {
	onSeek: (progress: number, event: Event) => void;
	onSeekStart?: (event: Event) => void;
	onSeekEnd?: (event: Event) => void;
}

/** DOM event handlers bound by the line progress hook. */
export interface UseProgressLineReturnEvents {
	onpointerup: (event: PointerEvent) => void;
	onpointermove: (event: PointerEvent) => void;
	onpointerdown: (event: PointerEvent) => void;
	onpointercancel: (event: PointerEvent) => void;
	onmouseenter: () => void;
	onmouseleave: () => void;
}

/** Reactive state returned by the line progress hook. */
export interface UseProgressLineReturn {
	isFocused: boolean;
	isDragging: boolean;
	isDisabledTransition: boolean;
	thickness: number;
	transition: string | undefined;
	events: UseProgressLineReturnEvents;
}

/** Props accepted by the line progress hook. */
export interface UseProgressLineProps {
	getRootElement: () => HTMLElement;
	getSize: () => ComponentSize;
	getCustomThickness: () => ScenaProgressComponentThickness;
	getProgress: () => number;
}

/** Seek event callbacks used internally by the line progress hook. */
export interface UseProgressLineEvents {
	onSeek: (progress: number, event: Event) => void;
	onSeekStart: (event: Event) => void;
	onSeekEnd: (event: Event) => void;
}

/** Props accepted by the circle progress hook. */
export interface UseProgressCircleProps {
	getRootElement: () => SVGSVGElement;
	getSize: () => ComponentSize;
	getCustomThickness: () => ScenaProgressComponentThickness;
	getProgress: () => number;
	getBuffer: () => number;
}

/** Seek event callbacks used internally by the circle progress hook. */
export interface UseProgressCircleEvents {
	onSeek: (progress: number, event: Event) => void;
	onSeekStart: (event: Event) => void;
	onSeekEnd: (event: Event) => void;
}

/** DOM event handlers bound by the circle progress hook. */
export interface UseProgressCircleReturnEvents {
	onclick: (event: MouseEvent) => void;
	onpointerdown: (event: PointerEvent) => void;
	onpointermove: (event: PointerEvent) => void;
	onpointerup: (event: PointerEvent) => void;
	onpointercancel: (event: PointerEvent) => void;
	onmouseenter: () => void;
	onmouseleave: () => void;
}

/** DOM element references for the linear progress bar. */
export interface ScenaProgressLineElements {
	root: HTMLDivElement;
	track: HTMLDivElement;
	buffer: HTMLDivElement | null;
	progress: HTMLDivElement;
}

/** DOM element references for the circular progress indicator. */
export interface ScenaProgressCircleElements {
	root: SVGSVGElement;
	track: SVGCircleElement | null;
	buffer: SVGCircleElement | null;
	progress: SVGCircleElement | null;
}

/** Reactive state returned by the circle progress hook. */
export interface UseProgressCircleReturn {
	isFocused: boolean;
	isDragging: boolean;
	radialSize: number;
	radialRadius: number;
	radialCircumference: number;
	radialProgressOffset: number;
	radialBufferOffset: number;
	thickness: number;
	hitAreaThickness: number;
	transition: string | undefined;
	events: UseProgressCircleReturnEvents;
}
