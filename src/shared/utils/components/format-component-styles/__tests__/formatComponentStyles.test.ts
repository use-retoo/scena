import { describe, it, expect } from 'vitest';

import { formatComponentStyles } from '../index';

describe('formatComponentStyles', () => {
	describe('basic functionality', () => {
		it('should convert a single-property object to a CSS string', () => {
			expect(formatComponentStyles({ color: 'red' })).toBe('color: red;');
		});

		it('should convert multiple properties joined by semicolons', () => {
			expect(formatComponentStyles({ color: 'red', backgroundColor: 'blue' })).toBe(
				'color: red; background-color: blue;'
			);
		});

		it('should kebab-case camelCase property names', () => {
			expect(formatComponentStyles({ marginTop: '4px' })).toBe('margin-top: 4px;');
		});
	});

	describe('case handling', () => {
		it('should return a string value as-is', () => {
			expect(formatComponentStyles('color: red; margin: 0')).toBe('color: red; margin: 0');
		});

		it('should return undefined when styles is undefined', () => {
			expect(formatComponentStyles(undefined)).toBeUndefined();
		});
	});

	describe('edge cases', () => {
		it('should return undefined for an empty string', () => {
			expect(formatComponentStyles('')).toBeUndefined();
		});

		it('should return just a trailing semicolon for an empty object', () => {
			expect(formatComponentStyles({})).toBe(';');
		});
	});
});
