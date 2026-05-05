import type { ComponentStyles } from '@/shared/types';

import { formatComponentStyleProperty } from '../';

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
