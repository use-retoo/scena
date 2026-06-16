import { describe, it, expect } from 'vitest';

import { formatComponentStyleProperty } from '../index';

describe('formatComponentStyleProperty', () => {
	describe('basic functionality', () => {
		it('should convert camelCase to kebab-case', () => {
			expect(formatComponentStyleProperty('backgroundColor')).toBe('background-color');
		});

		it('should convert multiple uppercase letters', () => {
			expect(formatComponentStyleProperty('borderTopLeftRadius')).toBe('border-top-left-radius');
		});
	});

	describe('case handling', () => {
		it('should leave already-lowercase property unchanged', () => {
			expect(formatComponentStyleProperty('color')).toBe('color');
		});

		it('should prefix leading uppercase letter with a dash', () => {
			expect(formatComponentStyleProperty('WebkitTransform')).toBe('-webkit-transform');
		});
	});

	describe('edge cases', () => {
		it('should return empty string for empty input', () => {
			expect(formatComponentStyleProperty('')).toBe('');
		});

		it('should handle string without uppercase letters', () => {
			expect(formatComponentStyleProperty('margin-top')).toBe('margin-top');
		});
	});
});
