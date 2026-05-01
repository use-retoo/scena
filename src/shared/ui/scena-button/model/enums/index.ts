/** Possible values for `aria-pressed` on scena buttons. */
export enum ScenaButtonAriaPressed {
	MIXED = 'mixed'
}

/** Possible values for `aria-haspopup` on scena buttons. */
export enum ScenaButtonAriaHaspopup {
	MENU = 'menu',
	LISTBOX = 'listbox',
	TREE = 'tree',
	GRID = 'grid',
	DIALOG = 'dialog'
}

/** Shape of the button element. */
export enum ScenaButtonShape {
	RECTANGLE = 'rectangle',
	CIRCLE = 'circle',
	SQUARE = 'square'
}

/** Visual variant of the button. */
export enum ScenaButtonVariant {
	/** Solid background fill. */
	FILLED = 'filled',
	/** Transparent background, text only. */
	TEXT = 'text'
}

/** HTML `type` attribute for the button element. */
export enum ScenaButtonType {
	BUTTON = 'button',
	SUBMIT = 'submit',
	RESET = 'reset'
}
