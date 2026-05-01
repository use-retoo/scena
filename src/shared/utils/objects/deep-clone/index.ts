import { isPlainObject } from '../is-plain-object';

/**
 * Recursively clones a value.
 */
export const deepClone = <T>(value: T): T => {
	if (value instanceof Date) {
		return new Date(value.getTime()) as T;
	}

	if (value instanceof RegExp) {
		return new RegExp(value.source, value.flags) as T;
	}

	if (value instanceof Map) {
		return new Map([...value].map(([k, v]) => [deepClone(k), deepClone(v)])) as T;
	}

	if (value instanceof Set) {
		return new Set([...value].map(deepClone)) as T;
	}

	if (!isPlainObject(value)) {
		return value;
	}

	const result = {} as Record<string, unknown>;

	for (const key of Object.keys(value)) {
		const val = value[key];

		if (Array.isArray(val)) {
			result[key] = val.map((item) => deepClone(item));
		} else {
			result[key] = deepClone(val);
		}
	}

	return result as T;
};
