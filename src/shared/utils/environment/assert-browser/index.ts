import { ScenaError } from '../../errors';
import { isBrowser } from '../is-browser';

/**
 * Throws a {@link ScenaError} when called outside a browser environment.
 *
 * @param method - The calling method name, included in the error message.
 * @throws {ScenaError} When `isBrowser` is `false`.
 */
export function assertBrowser(method: string): void {
	if (!isBrowser) {
		throw new ScenaError(`${method}() requires a browser environment`);
	}
}
