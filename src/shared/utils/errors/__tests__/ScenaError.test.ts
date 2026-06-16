import { describe, it, expect } from 'vitest';

import { ScenaError } from '../index';

describe('ScenaError', () => {
	describe('basic functionality', () => {
		it('should set the provided message', () => {
			const error = new ScenaError('something went wrong');

			expect(error.message).toBe('something went wrong');
		});

		it('should have the name ScenaError', () => {
			const error = new ScenaError('boom');

			expect(error.name).toBe('ScenaError');
		});
	});

	describe('case handling', () => {
		it('should be an instance of Error', () => {
			const error = new ScenaError('boom');

			expect(error).toBeInstanceOf(Error);
		});

		it('should be an instance of ScenaError', () => {
			const error = new ScenaError('boom');

			expect(error).toBeInstanceOf(ScenaError);
		});

		it('should be throwable and catchable as ScenaError', () => {
			expect(() => {
				throw new ScenaError('boom');
			}).toThrow(ScenaError);
		});
	});

	describe('edge cases', () => {
		it('should handle an empty message', () => {
			const error = new ScenaError('');

			expect(error.message).toBe('');
			expect(error.name).toBe('ScenaError');
		});
	});
});
