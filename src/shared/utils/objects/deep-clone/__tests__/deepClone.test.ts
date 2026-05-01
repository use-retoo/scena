import { describe, it, expect } from 'vitest';

import { deepClone } from '../index';

describe('deepClone', () => {
	describe('basic functionality', () => {
		it('should clone flat object', () => {
			const original = {
				a: 1,
				b: 'foo'
			};

			const cloned = deepClone(original);

			expect(cloned).toEqual(original);
			expect(cloned).not.toBe(original);
		});

		it('should clone nested object', () => {
			const original = {
				a: {
					b: {
						c: 3
					}
				}
			};

			const cloned = deepClone(original);

			expect(cloned).toEqual(original);
			expect(cloned.a).not.toBe(original.a);
			expect(cloned.a.b).not.toBe(original.a.b);
		});
	});

	describe('case handling', () => {
		it('should return value as-is when value is primitive', () => {
			expect(deepClone(0)).toBe(0);
			expect(deepClone('foo')).toBe('foo');
			expect(deepClone(true)).toBe(true);
			expect(deepClone(null)).toBe(null);
			expect(deepClone(undefined)).toBe(undefined);
		});

		it('should clone value when value is Array', () => {
			const original = {
				items: [{ id: 1 }, { id: 2 }]
			};

			const cloned = deepClone(original);

			expect(cloned).toEqual(original);
			expect(cloned.items).not.toBe(original.items);
			expect(cloned.items[0]).not.toBe(original.items[0]);
		});

		it('should clone value when value is Date', () => {
			const original = new Date('2025-01-01');

			const cloned = deepClone(original);

			expect(cloned.getTime()).toBe(original.getTime());
			expect(cloned).not.toBe(original);
		});

		it('should clone value when value is RegExp', () => {
			const original = /test/gi;

			const cloned = deepClone(original);

			expect(cloned.source).toBe(original.source);
			expect(cloned.flags).toBe(original.flags);
			expect(cloned).not.toBe(original);
		});

		it('should clone value when value is Map', () => {
			const value = {
				nested: true
			};

			const original = new Map([['key', value]]);

			const cloned = deepClone(original);

			expect(cloned.get('key')).toEqual(value);
			expect(cloned.get('key')).not.toBe(value);
		});

		it('should clone value when value is Set', () => {
			const original = new Set([1, 2, 3]);

			const cloned = deepClone(original);

			expect(cloned).toEqual(original);
			expect(cloned).not.toBe(original);
		});
	});

	describe('edge cases', () => {
		it('should clone object when object has mixed value types', () => {
			const original = {
				a: 'hello',
				b: 42,
				c: true,
				d: null,
				e: [1, 2],
				f: {
					g: 1
				}
			};

			const cloned = deepClone(original);

			expect(cloned).toEqual(original);
			expect(cloned.e).not.toBe(original.e);
			expect(cloned.f).not.toBe(original.f);
		});

		it('should clone array when array contains primitives', () => {
			const original = {
				tags: ['a', 'b', 'c']
			};

			const cloned = deepClone(original);

			expect(cloned.tags).toEqual(['a', 'b', 'c']);
			expect(cloned.tags).not.toBe(original.tags);
		});
	});

	describe('consistency', () => {
		it('should not mutate original when clone is modified', () => {
			const original = {
				a: {
					b: 1
				}
			};

			const snapshot = {
				a: {
					b: 1
				}
			};

			const cloned = deepClone(original);
			cloned.a.b = 999;

			expect(original).toEqual(snapshot);
		});

		it('should return equal but independent copies', () => {
			const original = {
				list: [{ id: 1 }],
				meta: {
					count: 1
				}
			};

			const clone1 = deepClone(original);
			const clone2 = deepClone(original);

			expect(clone1).toEqual(clone2);
			expect(clone1).not.toBe(clone2);
			expect(clone1.list).not.toBe(clone2.list);
		});
	});
});
