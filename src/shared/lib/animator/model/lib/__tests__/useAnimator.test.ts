import { describe, it, expect } from 'vitest';

import { useAnimator } from '../';

const CLASS_NAMES = {
	hidden: 'hidden',
	in: 'in',
	out: 'out'
};

function createAnimator({
	isHidden = false,
	isAnimated = false,
	isShownOnReady = false
}: {
	isHidden?: boolean;
	isAnimated?: boolean;
	isShownOnReady?: boolean;
} = {}) {
	return useAnimator({
		getIsHidden: () => isHidden,
		getIsAnimated: () => isAnimated,
		getIsShownOnReady: () => isShownOnReady,
		classNames: CLASS_NAMES
	});
}

describe('useAnimator', () => {
	describe('basic functionality', () => {
		it('should return isHidden as boolean', () => {
			const animator = createAnimator();

			expect(typeof animator.isHidden).toBe('boolean');
		});

		it('should return hasShownAnimation as boolean', () => {
			const animator = createAnimator();

			expect(typeof animator.hasShownAnimation).toBe('boolean');
		});

		it('should return hasHiddenAnimation as boolean', () => {
			const animator = createAnimator();

			expect(typeof animator.hasHiddenAnimation).toBe('boolean');
		});

		it('should return classes as array', () => {
			const animator = createAnimator();

			expect(Array.isArray(animator.classes)).toBe(true);
		});

		it('should reflect isHidden as false when not hidden', () => {
			const animator = createAnimator({ isHidden: false });

			expect(animator.isHidden).toBe(false);
		});

		it('should reflect isHidden as true when hidden', () => {
			const animator = createAnimator({ isHidden: true });

			expect(animator.isHidden).toBe(true);
		});
	});

	describe('case handling', () => {
		it('should apply hidden class when hidden and not animated', () => {
			const animator = createAnimator({ isHidden: true, isAnimated: false });

			expect(animator.classes).toContain(CLASS_NAMES.hidden);
		});

		it('should not apply hidden class when not hidden', () => {
			const animator = createAnimator({ isHidden: false });

			expect(animator.classes).not.toContain(CLASS_NAMES.hidden);
		});

		it('should not apply in class when not animated', () => {
			const animator = createAnimator({ isHidden: false, isAnimated: false, isShownOnReady: true });

			expect(animator.classes).not.toContain(CLASS_NAMES.in);
		});

		it('should apply in class when animated, isShownOnReady and not hidden', () => {
			const animator = createAnimator({ isHidden: false, isAnimated: true, isShownOnReady: true });

			expect(animator.classes).toContain(CLASS_NAMES.in);
		});

		it('should set hasShownAnimation when animated, isShownOnReady and not hidden', () => {
			const animator = createAnimator({ isHidden: false, isAnimated: true, isShownOnReady: true });

			expect(animator.hasShownAnimation).toBe(true);
		});

		it('should not set hasShownAnimation when hidden even with isShownOnReady', () => {
			const animator = createAnimator({ isHidden: true, isAnimated: true, isShownOnReady: true });

			expect(animator.hasShownAnimation).toBe(false);
		});

		it('should not set hasHiddenAnimation without prior visibility', () => {
			const animator = createAnimator({ isHidden: true, isAnimated: true });

			expect(animator.hasHiddenAnimation).toBe(false);
		});

		it('should not apply out class without prior visibility', () => {
			const animator = createAnimator({ isHidden: true, isAnimated: true });

			expect(animator.classes).not.toContain(CLASS_NAMES.out);
		});

		it('should not apply in class when hidden', () => {
			const animator = createAnimator({ isHidden: true, isAnimated: true, isShownOnReady: true });

			expect(animator.classes).not.toContain(CLASS_NAMES.in);
		});
	});

	describe('edge cases', () => {
		it('should handle empty classNames without throwing', () => {
			expect(() => {
				useAnimator({
					getIsHidden: () => true,
					getIsAnimated: () => false,
					getIsShownOnReady: () => false,
					classNames: {}
				});
			}).not.toThrow();
		});

		it('should return classes with no applied entries when nothing is active', () => {
			const animator = createAnimator({ isHidden: false, isAnimated: false });

			expect(
				Array.isArray(animator.classes) &&
					animator.classes.every((entry) => {
						return !entry;
					})
			).toBe(true);
		});
	});

	describe('consistency', () => {
		it('should not have hasShownAnimation when isAnimated is false', () => {
			const animator = createAnimator({ isHidden: false, isAnimated: false, isShownOnReady: true });

			expect(animator.hasShownAnimation).toBe(false);
		});

		it('should not have hasHiddenAnimation when isAnimated is false', () => {
			const animator = createAnimator({ isHidden: true, isAnimated: false });

			expect(animator.hasHiddenAnimation).toBe(false);
		});

		it('should create independent instances', () => {
			const animatorA = createAnimator({ isHidden: true });
			const animatorB = createAnimator({ isHidden: false });

			expect(animatorA.isHidden).toBe(true);
			expect(animatorB.isHidden).toBe(false);
		});
	});
});
