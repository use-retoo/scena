import { describe, it, expect } from 'vitest';

import { deepMerge } from '../index';

describe('deepMerge', () => {
	describe('basic functionality', () => {
		it('should merge flat objects', () => {
			const target = {
				a: 1,
				b: 2
			};

			const source = {
				b: 3,
				c: 4
			};

			const result = deepMerge(target, source);

			expect(result).toEqual({
				a: 1,
				b: 3,
				c: 4
			});
		});

		it('should merge nested objects', () => {
			const target = {
				nested: {
					a: 1,
					b: 2
				}
			};

			const source = {
				nested: {
					b: 3
				}
			};

			const result = deepMerge(target, source);

			expect(result).toEqual({
				nested: {
					a: 1,
					b: 3
				}
			});
		});

		it('should merge deeply nested objects', () => {
			const target = {
				a: {
					b: {
						c: 1,
						d: 2
					}
				}
			};

			const source = {
				a: {
					b: {
						d: 3
					}
				}
			};

			const result = deepMerge(target, source);

			expect(result).toEqual({
				a: {
					b: {
						c: 1,
						d: 3
					}
				}
			});
		});
	});

	describe('case handling', () => {
		it('should overwrite target when source has same primitive key', () => {
			const target = {
				a: 1
			};

			const source = {
				a: 2
			};

			const result = deepMerge(target, source);

			expect(result).toEqual({
				a: 2
			});
		});

		it('should overwrite object when source has primitive for same key', () => {
			const target = {
				a: {
					deep: true
				}
			};

			const source = {
				a: 'replaced'
			};

			const result = deepMerge(target, source);

			expect(result).toEqual({
				a: 'replaced'
			});
		});

		it('should add key when source has new key', () => {
			const target = {
				a: 1
			};

			const source = {
				b: 2
			};

			const result = deepMerge(target, source);

			expect(result).toEqual({
				a: 1,
				b: 2
			});
		});

		it('should set undefined when source value is undefined', () => {
			const target = {
				a: 1,
				b: 2
			};

			const source = {
				a: undefined
			};

			const result = deepMerge(target, source);

			expect(result.a).toBeUndefined();
			expect(result.b).toBe(2);
		});

		it('should set null when source value is null', () => {
			const target = {
				a: 1,
				b: 2
			};

			const source = {
				a: null
			};

			const result = deepMerge(target, source);

			expect(result.a).toBeNull();
			expect(result.b).toBe(2);
		});
	});

	describe('edge cases', () => {
		it('should return target copy when source is empty', () => {
			const target = {
				a: 1
			};

			const source = {};

			const result = deepMerge(target, source);

			expect(result).toEqual({
				a: 1
			});
		});

		it('should return source copy when target is empty', () => {
			const target = {};

			const source = {
				a: 1
			};

			const result = deepMerge(target, source);

			expect(result).toEqual({
				a: 1
			});
		});

		it('should return new reference when source is empty', () => {
			const target = {
				a: 1,
				b: {
					c: 2
				}
			};

			const source = {};

			const result = deepMerge(target, source);

			expect(result).toEqual(target);
			expect(result).not.toBe(target);
		});
	});

	describe('consistency', () => {
		it('should not mutate target', () => {
			const target = {
				a: 0,
				nested: {
					b: 0
				}
			};

			const source = {
				a: 1,
				nested: {
					c: 0
				}
			};

			const snapshot = {
				a: 0,
				nested: {
					b: 0
				}
			};

			deepMerge(target, source);

			expect(target).toEqual(snapshot);
		});

		it('should not mutate source', () => {
			const target = {
				a: 0
			};

			const source = {
				a: 1
			};

			const snapshot = {
				a: 1
			};

			deepMerge(target, source);

			expect(source).toEqual(snapshot);
		});

		it('should return new reference', () => {
			const target = {
				a: 0
			};

			const source = {
				b: 1
			};

			const result = deepMerge(target, source);

			expect(result).not.toBe(target);
			expect(result).not.toBe(source);
		});
	});

	describe('null/undefined source', () => {
		it('should return target when source is null', () => {
			const target = { a: 1 };
			const result = deepMerge(target, null as unknown as object);
			expect(result).toEqual({ a: 1 });
		});

		it('should return target when source is undefined', () => {
			const target = { a: 1 };
			const result = deepMerge(target, undefined as unknown as object);
			expect(result).toEqual({ a: 1 });
		});

		it('should not crash when nested source value is null', () => {
			const target = { nested: { a: 1 } };
			const source = { nested: null };
			const result = deepMerge(target, source as unknown as object);
			expect(result.nested).toBeNull();
		});
	});
});
