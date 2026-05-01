/**
 * SSR-safe `HTMLElement` constructor.
 *
 * On the server `HTMLElement` is undefined, which would throw at module
 * evaluation time when used as a base class. Falling back to an empty stub
 * lets the module be imported in SSR environments (Nuxt, Next, etc.) without
 * forcing consumers to client-only the import itself.
 */
export const SAFE_HTML_ELEMENT: typeof HTMLElement =
	typeof HTMLElement !== 'undefined' ? HTMLElement : (class {} as unknown as typeof HTMLElement);
