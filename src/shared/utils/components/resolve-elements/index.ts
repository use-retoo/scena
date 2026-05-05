import type { ComponentRef } from '@/shared/types';

/**
 * Calls `getElements()` on a component instance, returning `null` when the instance is unbound.
 * Keeps the return type consistently `T | null` instead of mixing `null` (unbound) and
 * `undefined` (optional chaining result).
 */
export const resolveElements = <T>(instance: ComponentRef<T> | null): T | null => {
	return instance?.getElements() ?? null;
};
