/**
 * Checks whether a value is a plain object (not an array, `null`, or class instance).
 *
 * @param value - The value to check.
 * @returns `true` if the value is a plain object created via `{}` or `Object.create(null)`.
 */
export const isPlainObject = (value: unknown): value is Record<string, unknown> => {
	if (typeof value !== 'object' || value === null || Array.isArray(value)) {
		return false;
	}

	const proto = Object.getPrototypeOf(value);

	return proto === Object.prototype || proto === null;
};
