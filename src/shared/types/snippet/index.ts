/** Internal return type for component snippets. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ComponentSnippetReturn = any;

/**
 * Typed Svelte 5 snippet reference.
 * Produces a descriptive compile-time error when used incorrectly
 * (e.g. called as a function instead of `{@render ...}`).
 */
export interface ComponentSnippet<Parameters extends unknown[] = []> {
	(
		this: void,
		...args: number extends Parameters['length'] ? never : Parameters
	): {
		'{@render ...} must be called with a Snippet': "import type { ComponentSnippet } from '@retoo/scena'";
	} & ComponentSnippetReturn;
}
