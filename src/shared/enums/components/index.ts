/** T-shirt size scale used for component sizing. */
export enum ComponentSize {
	XS = 'xs',
	SM = 'sm',
	MD = 'md',
	LG = 'lg',
	XL = 'xl',
	XXL = 'xxl'
}

/** Placement of a component within its container (3×3 grid). */
export enum ComponentPlacement {
	TOP_START = 'top-start',
	TOP_CENTER = 'top-center',
	TOP_END = 'top-end',
	MIDDLE_START = 'middle-start',
	MIDDLE_CENTER = 'middle-center',
	MIDDLE_END = 'middle-end',
	BOTTOM_START = 'bottom-start',
	BOTTOM_CENTER = 'bottom-center',
	BOTTOM_END = 'bottom-end'
}

/** CSS `position` values for component layout. */
export enum ComponentPosition {
	STATIC = 'static',
	RELATIVE = 'relative',
	ABSOLUTE = 'absolute',
	FIXED = 'fixed'
}

/** Shape variant for components (affects border-radius and aspect ratio). */
export enum ComponentShape {
	CIRCLE = 'circle',
	LANDSCAPE = 'landscape',
	PORTRAIT = 'portrait',
	SQUARE = 'square'
}

/** Possible values for the `aria-pressed` attribute. */
export enum ComponentAriaPressed {
	MIXED = 'mixed'
}

/** Possible values for the `aria-haspopup` attribute. */
export enum ComponentAriaHaspopup {
	MENU = 'menu',
	TREE = 'tree',
	GRID = 'grid',
	DIALOG = 'dialog',
	LISTBOX = 'listbox'
}
