import { describe, it, expect } from 'vitest';

import { formatTime } from '../index';

describe('formatTime', () => {
	describe('basic functionality', () => {
		it('should format seconds as m:ss', () => {
			expect(formatTime(45)).toBe('0:45');
		});

		it('should format minutes and seconds', () => {
			expect(formatTime(150)).toBe('2:30');
		});

		it('should format hours, minutes and seconds', () => {
			expect(formatTime(3661)).toBe('1:01:01');
		});
	});

	describe('case handling', () => {
		it('should pad seconds to two digits', () => {
			expect(formatTime(5)).toBe('0:05');
		});

		it('should not pad minutes when no hours', () => {
			expect(formatTime(305)).toBe('5:05');
		});

		it('should pad minutes to two digits when hours present', () => {
			expect(formatTime(3725)).toBe('1:02:05');
		});

		it('should floor fractional seconds', () => {
			expect(formatTime(45.9)).toBe('0:45');
		});
	});

	describe('edge cases', () => {
		it('should return 0:00 for zero', () => {
			expect(formatTime(0)).toBe('0:00');
		});

		it('should treat negative input as zero', () => {
			expect(formatTime(-10)).toBe('0:00');
		});

		it('should treat NaN as zero', () => {
			expect(formatTime(NaN)).toBe('0:00');
		});

		it('should treat Infinity as zero', () => {
			expect(formatTime(Infinity)).toBe('0:00');
		});

		it('should handle exactly one hour', () => {
			expect(formatTime(3600)).toBe('1:00:00');
		});
	});
});
