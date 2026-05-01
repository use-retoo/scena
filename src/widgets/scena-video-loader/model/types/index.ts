import type { ComponentSize } from '@/shared/enums';
import type { ComponentStyles, ComponentClasses } from '@/shared/types';
import type { ScenaLoaderElements } from '@/shared/ui/scena-loader';

/** Custom CSS class overrides for the video loader widget. */
export interface ScenaVideoLoaderComponentClasses {
	root: ComponentClasses;
	loader: ComponentClasses;
}

/** Custom inline style overrides for the video loader widget. */
export interface ScenaVideoLoaderComponentStyles {
	root: ComponentStyles;
	loader: ComponentStyles;
}

/** Configuration props for the video buffering/loading indicator. */
export interface ScenaVideoLoaderProps {
	id: string;
	size: ComponentSize;
	customClasses: Partial<ScenaVideoLoaderComponentClasses>;
	customStyles: Partial<ScenaVideoLoaderComponentStyles>;
}

/** Component ref for the video loader. */
export interface ScenaVideoLoaderRef {
	getElements: () => {
		root: HTMLDivElement;
		loader: ScenaLoaderElements | undefined;
	};
}
