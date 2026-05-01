import type { ComponentClasses } from '@/shared/types';

/** CSS class names applied during show/hide animation transitions. */
export interface AnimatorClassNames {
	/** Applied while the component is hidden. */
	hidden: string;
	/** Applied during the show (enter) animation. */
	in: string;
	/** Applied during the hide (exit) animation. */
	out: string;
}

/** Props accepted by {@link useAnimator}. */
export interface UseAnimatorProps {
	/** Reactive getter — returns `true` when animations are enabled. */
	getIsAnimated: () => boolean;
	/** Reactive getter — returns `true` when the component should be show on ready. */
	getIsShownOnReady: () => boolean;
	/** Reactive getter — returns `true` when the component should be hidden. */
	getIsHidden: () => boolean;
	/** Map of CSS class names for each animation state. */
	classNames: Partial<AnimatorClassNames>;
}

/** Reactive state returned by {@link useAnimator}. */
export interface UseAnimatorReturns {
	/** Whether the component is currently hidden. */
	isHidden: boolean;
	/** Whether the show (enter) animation is active. */
	hasShownAnimation: boolean;
	/** Whether the hide (exit) animation is active. */
	hasHiddenAnimation: boolean;
	/** Derived CSS class list to apply to the animated element. */
	classes: ComponentClasses;
}
