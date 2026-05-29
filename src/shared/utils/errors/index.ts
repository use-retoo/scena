/**
 * Base error class for all scena runtime errors.
 *
 * Using a named subclass makes scena errors easy to identify
 * in stack traces and `instanceof` checks.
 */
export class ScenaError extends Error {
	override readonly name = 'ScenaError';

	constructor(message: string) {
		super(message);
	}
}
