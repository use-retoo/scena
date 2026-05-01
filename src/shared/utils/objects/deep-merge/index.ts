import { isPlainObject } from '../is-plain-object';

/**
 * Recursively merges `source` into `target`.
 * Nested plain objects are merged; all other values are overwritten.
 */
export function deepMerge<T extends object, S extends object>(
	target: T,
	source: S
): Omit<T, keyof S> & S;
export function deepMerge<T extends object, S extends object>(
	target: T,
	source: S | null | undefined
): (Omit<T, keyof S> & S) | T;
export function deepMerge<T extends object, S extends object>(
	target: T | null | undefined,
	source: S
): (Omit<T, keyof S> & S) | S;
export function deepMerge<T extends object, S extends object>(
	target: T | null | undefined,
	source: S | null | undefined
): object {
	if (source == null) return target as object;
	if (target == null) return source as object;

	const result = { ...target } as Record<string, unknown>;

	for (const key of Object.keys(source)) {
		const sourceValue = (source as Record<string, unknown>)[key];
		const targetValue = (target as Record<string, unknown>)[key];

		if (isPlainObject(sourceValue) && isPlainObject(targetValue)) {
			result[key] = deepMerge(targetValue, sourceValue);
		} else {
			result[key] = sourceValue;
		}
	}

	return result;
}
