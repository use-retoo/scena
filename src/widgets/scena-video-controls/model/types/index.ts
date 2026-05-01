import type { ComponentSize } from '@/shared/enums';
import type { ComponentStyles, ComponentClasses, ComponentAriaProps } from '@/shared/types';
import type { ScenaButtonElements } from '@/shared/ui/scena-button';
import type { ScenaIconElements } from '@/shared/ui/scena-icons';

/** Custom CSS class overrides for the video play/pause controls. */
export interface ScenaVideoControlsComponentClasses {
	root: ComponentClasses;
	play: ComponentClasses;
	pause: ComponentClasses;
}

/** Custom inline style overrides for the video play/pause controls. */
export interface ScenaVideoControlsComponentStyles {
	root: ComponentStyles;
	play: ComponentStyles;
	pause: ComponentStyles;
}

/** Per-button ARIA overrides for video controls. */
export interface ScenaVideoControlsComponentAria {
	play: Partial<ComponentAriaProps>;
	pause: Partial<ComponentAriaProps>;
}

/** Configuration props for the video play/pause controls widget. */
export interface ScenaVideoControlsProps {
	id: string;
	size: ComponentSize;
	aria: Partial<ScenaVideoControlsComponentAria>;
	customClasses: Partial<ScenaVideoControlsComponentClasses>;
	customStyles: Partial<ScenaVideoControlsComponentStyles>;
}

/** Component ref for the video play/pause controls. */
export interface ScenaVideoControlsRef {
	getElements: () => {
		root: HTMLDivElement | null;
		pauseButton: ScenaButtonElements | undefined;
		pauseIcon: ScenaIconElements | undefined;
		playButton: ScenaButtonElements | undefined;
		playIcon: ScenaIconElements | undefined;
	};
}
