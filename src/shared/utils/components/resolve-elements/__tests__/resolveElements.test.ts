import { describe, it, expect } from 'vitest';

import { resolveElements } from '../index';

describe('resolveElements', () => {
	describe('basic functionality', () => {
		it('should return the result of getElements', () => {
			const elements = { root: 'node' };
			const instance = { getElements: () => elements };

			expect(resolveElements(instance)).toBe(elements);
		});
	});

	describe('case handling', () => {
		it('should return null when instance is null', () => {
			expect(resolveElements(null)).toBeNull();
		});

		it('should return null when getElements returns null', () => {
			const instance = { getElements: () => null };

			expect(resolveElements<null>(instance)).toBeNull();
		});
	});

	describe('edge cases', () => {
		it('should coerce an undefined getElements result to null', () => {
			const instance = { getElements: () => undefined as unknown as { root: string } };

			expect(resolveElements(instance)).toBeNull();
		});
	});
});
