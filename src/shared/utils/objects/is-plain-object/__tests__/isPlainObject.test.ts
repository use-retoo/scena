import { describe, it, expect } from 'vitest';

import { isPlainObject } from '../index';

describe('isPlainObject', () => {
	describe('basic functionality', () => {
		it('should return true when value is empty object', () => {
			const target = {};

			expect(isPlainObject(target)).toBe(true);
		});

		it('should return true when value is object with properties', () => {
			const target = {
				a: 0,
				b: 'foo'
			};

			expect(isPlainObject(target)).toBe(true);
		});

		it('should return true when value is nested object', () => {
			const target = {
				a: {
					b: {
						c: 0
					}
				}
			};

			expect(isPlainObject(target)).toBe(true);
		});
	});

	describe('case handling', () => {
		it('should return false when value is number', () => {
			const target = 0;

			expect(isPlainObject(target)).toBe(false);
		});

		it('should return false when value is string', () => {
			const target = 'foo';

			expect(isPlainObject(target)).toBe(false);
		});

		it('should return false when value is boolean', () => {
			const target = true;

			expect(isPlainObject(target)).toBe(false);
		});

		it('should return false when value is null', () => {
			const target = null;

			expect(isPlainObject(target)).toBe(false);
		});

		it('should return false when value is undefined', () => {
			const target = undefined;

			expect(isPlainObject(target)).toBe(false);
		});

		it('should return false when value is empty array', () => {
			const target: unknown[] = [];

			expect(isPlainObject(target)).toBe(false);
		});

		it('should return false when value is array with elements', () => {
			const target = [1, 2, 3];

			expect(isPlainObject(target)).toBe(false);
		});

		it('should return false when value is Date', () => {
			const target = new Date();

			expect(isPlainObject(target)).toBe(false);
		});

		it('should return false when value is Map', () => {
			const target = new Map();

			expect(isPlainObject(target)).toBe(false);
		});

		it('should return false when value is Set', () => {
			const target = new Set();

			expect(isPlainObject(target)).toBe(false);
		});

		it('should return false when value is RegExp', () => {
			const target = /regex/;

			expect(isPlainObject(target)).toBe(false);
		});
	});

	describe('edge cases', () => {
		it('should return true when value is Object.create(null)', () => {
			const target = Object.create(null);

			expect(isPlainObject(target)).toBe(true);
		});

		it('should return false when value is function', () => {
			const target = () => {};

			expect(isPlainObject(target)).toBe(false);
		});
	});

	describe('consistency', () => {
		it('should narrow type to Record', () => {
			const value: unknown = {
				key: 'value'
			};

			if (isPlainObject(value)) {
				expect(value.key).toBe('value');
			} else {
				expect.unreachable('should have narrowed to plain object');
			}
		});
	});
});
