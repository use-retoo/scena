import { readFileSync } from 'node:fs';

/**
 * Provides `__NAME__` / `__VERSION__` as real runtime globals for tests.
 *
 * In the production build these are inlined by Vite's `define`, but relying on
 * that compile-time substitution inside Vitest is fragile: the transformed
 * module is cached in `node_modules/.vite`, and under parallel runs (e.g. the
 * lefthook pre-commit hook) the dep-optimizer cache can race and drop the
 * substitution, leaving a bare `__NAME__` reference -> `ReferenceError`.
 *
 * Setup files run fresh on every test execution and are not cached, so defining
 * the globals here makes the values cache- and race-proof.
 */
const pkg = JSON.parse(readFileSync('./package.json', 'utf-8')) as {
	name: string;
	version: string;
};

Object.assign(globalThis, {
	__NAME__: pkg.name,
	__VERSION__: pkg.version
});
