import type { UseAnimatorProps, UseAnimatorReturns } from '../types';

/**
 * Manages show/hide CSS animation state for a component.
 *
 * Tracks visibility transitions and derives the appropriate CSS class list
 * (`hidden`, `in`, `out`) based on the current and historical visibility state.
 *
 * @param props - Reactive getters for hidden/animated state and CSS class name map.
 * @returns Reactive animation state and a derived CSS class list.
 */
export default function useAnimator({
	getIsHidden,
	getIsAnimated,
	getIsShownOnReady,
	classNames
}: UseAnimatorProps): UseAnimatorReturns {
	const isAnimated = $derived(getIsAnimated());

	const isShownOnReady = $derived(getIsShownOnReady());

	const isHidden = $derived(getIsHidden());

	let hasBeenVisible = $state(false);

	let hasBeenHidden = $state(false);

	$effect.pre(() => {
		if (isHidden) {
			hasBeenHidden = true;
		} else {
			hasBeenVisible = true;
		}
	});

	const hasShownAnimation = $derived(isAnimated && !isHidden && (hasBeenHidden || isShownOnReady));

	const hasHiddenAnimation = $derived(isAnimated && isHidden && hasBeenVisible);

	const classes = $derived([
		isHidden && !hasHiddenAnimation && classNames.hidden,
		hasShownAnimation && classNames.in,
		hasHiddenAnimation && classNames.out
	]);

	return {
		get isHidden() {
			return isHidden;
		},
		get hasShownAnimation() {
			return hasShownAnimation;
		},
		get hasHiddenAnimation() {
			return hasHiddenAnimation;
		},
		get classes() {
			return classes;
		}
	};
}
