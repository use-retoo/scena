import type { ComponentSize, ComponentShape } from '@/shared/enums';
import type { ComponentStyles, ComponentClasses, ComponentAriaProps } from '@/shared/types';
import type { ScenaButtonElements } from '@/shared/ui/scena-button';
import type { ScenaIconElements } from '@/shared/ui/scena-icons';

/** Custom CSS class overrides for the close button and its sub-components. */
export interface ScenaCloseButtonComponentClasses {
	root: ComponentClasses;
	button: ComponentClasses;
	cross: ComponentClasses;
}

/** Custom inline style overrides for the close button and its sub-components. */
export interface ScenaCloseButtonComponentStyles {
	root: ComponentStyles;
	button: ComponentStyles;
	cross: ComponentStyles;
}

/** Configuration props for the close button widget. */
export interface ScenaCloseButtonProps {
	id: string;
	size: ComponentSize;
	shape: ComponentShape;
	aria: Partial<ComponentAriaProps>;
	customClasses: Partial<ScenaCloseButtonComponentClasses>;
	customStyles: Partial<ScenaCloseButtonComponentStyles>;
	onClick: (event: Event) => void;
}

/** Component ref for the close button. */
export interface ScenaCloseButtonRef {
	getElements: () => {
		root: HTMLDivElement;
		button: ScenaButtonElements | undefined;
		cross: ScenaIconElements | undefined;
	};
}
