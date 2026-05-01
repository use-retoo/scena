import { ScenaElement } from '../ui';

/**
 * Returns the custom element constructor if it has already been registered.
 *
 * @returns The registered `CustomElementConstructor`, or `undefined` if not yet defined.
 */
export function getScenaElement() {
	return customElements.get(ScenaElement.tagName);
}

/**
 * Registers the `<scena-video-widget>` custom element in the browser.
 *
 * Safe to call multiple times — skips registration if the element is already defined.
 */
export function defineScenaElement() {
	const customElement = getScenaElement();

	if (customElement) return;

	customElements.define(ScenaElement.tagName, ScenaElement);
}
