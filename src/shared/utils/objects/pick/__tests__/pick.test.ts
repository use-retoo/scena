import { describe, it, expect } from 'vitest';

import { pick } from '../index';

describe('pick', () => {
	describe('basic functionality', () => {
		it('should pick single key', () => {
			const result = pick(
				{
					a: 1,
					b: 2
				},
				['a']
			);

			expect(result).toEqual({
				a: 1
			});
		});

		it('should pick multiple keys', () => {
			const result = pick(
				{
					a: 1,
					b: 2,
					c: 3
				},
				['a', 'c']
			);

			expect(result).toEqual({
				a: 1,
				c: 3
			});
		});
	});

	describe('case handling', () => {
		it('should skip key when key does not exist in source', () => {
			const source = {
				a: 1
			};

			const result = pick(source, ['a', 'b' as keyof typeof source]);

			expect(result).toEqual({
				a: 1
			});
			expect('b' in result).toBe(false);
		});

		it('should preserve undefined when key exists with undefined value', () => {
			const source = {
				a: undefined,
				b: 2
			};

			const result = pick(source, ['a']);

			expect(result).toEqual({
				a: undefined
			});
			expect('a' in result).toBe(true);
		});

		it('should preserve null when key exists with null value', () => {
			const source = {
				a: null,
				b: 2
			};

			const result = pick(source, ['a']);

			expect(result).toEqual({
				a: null
			});
		});
	});

	describe('edge cases', () => {
		it('should return empty object when keys array is empty', () => {
			const result = pick(
				{
					a: 1
				},
				[]
			);

			expect(result).toEqual({});
		});

		it('should return empty object when source is empty', () => {
			const result = pick({}, []);

			expect(result).toEqual({});
		});
	});

	describe('consistency', () => {
		it('should not mutate source', () => {
			const source = {
				a: 1,
				b: 2
			};

			const snapshot = { ...source };

			pick(source, ['a']);

			expect(source).toEqual(snapshot);
		});

		it('should return new reference', () => {
			const source = {
				a: 1
			};

			const result = pick(source, ['a']);

			expect(result).not.toBe(source);
		});
	});
});
