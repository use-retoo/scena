import type { ComponentStyles } from '../../types';

/**
 * Converts a camelCase property name to a kebab-case CSS property.
 */
export const formatComponentStyleProperty = (propertyName: string): string => {
	return propertyName.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
};

/**
 * Converts a `ComponentStyles` value (string or object) into an inline CSS string.
 */
export const formatComponentStyles = (styles: ComponentStyles | undefined): string | undefined => {
	if (!styles) {
		return undefined;
	}

	if (typeof styles === 'string') {
		return styles;
	}

	return (
		Object.entries(styles)
			.map(([property, value]) => `${formatComponentStyleProperty(property)}: ${value}`)
			.join('; ') + ';'
	);
};
