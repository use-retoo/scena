import type { ComponentSize, ComponentShape } from '@/shared/enums';
import type { ComponentStyles, ComponentClasses, ComponentAriaProps } from '@/shared/types';
import type { ScenaButtonElements } from '@/shared/ui/scena-button';
import type { ScenaIconElements } from '@/shared/ui/scena-icons';

/** Custom CSS class overrides for the volume mute/unmute controls. */
export interface ScenaVideoVolumeComponentClasses {
	root: ComponentClasses;
	mute: ComponentClasses;
	unmute: ComponentClasses;
}

/** Custom inline style overrides for the volume mute/unmute controls. */
export interface ScenaVideoVolumeComponentStyles {
	root: ComponentStyles;
	mute: ComponentStyles;
	unmute: ComponentStyles;
}

/** Per-button ARIA overrides for volume controls. */
export interface ScenaVideoVolumeComponentAria {
	mute: Partial<ComponentAriaProps>;
	unmute: Partial<ComponentAriaProps>;
}

/** Configuration props for the volume control widget. */
export interface ScenaVideoVolumeProps {
	id: string;
	size: ComponentSize;
	shape: ComponentShape;
	aria: Partial<ScenaVideoVolumeComponentAria>;
	customClasses: Partial<ScenaVideoVolumeComponentClasses>;
	customStyles: Partial<ScenaVideoVolumeComponentStyles>;
}

/** Component ref for the volume control widget. */
export interface ScenaVideoVolumeRef {
	getElements: () => {
		root: HTMLDivElement | null;
		unmuteButton: ScenaButtonElements | undefined;
		unmuteIcon: ScenaIconElements | undefined;
		muteButton: ScenaButtonElements | undefined;
		muteIcon: ScenaIconElements | undefined;
	};
}
