/**
 * Converts a camelCase property name to a kebab-case CSS property.
 */
export const formatComponentStyleProperty = (propertyName: string): string => {
	return propertyName.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
};
