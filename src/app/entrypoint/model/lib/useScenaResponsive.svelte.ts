import { OverrideLayer } from '@/shared/enums';
import { isBrowser } from '@/shared/utils';

import type {
	UseScenaConfigReturns,
	UseScenaOverridesReturns,
	ScenaResponsiveConfig,
	UseScenaResponsiveReturns
} from '../types';

/**
 * Manages responsive breakpoint overrides for the scena widget.
 *
 * Listens to viewport width changes via `matchMedia` and applies
 * the matching breakpoint's component overrides as a named layer
 * in the overrides system (below preview priority).
 *
 * @param config - The reactive config store.
 * @param configOverrides - The config overrides manager.
 * @returns Methods to apply/destroy and a reactive API with activeBreakpoint.
 */
export default function useScenaResponsive(
	config: UseScenaConfigReturns,
	configOverrides: UseScenaOverridesReturns
): UseScenaResponsiveReturns {
	/** The currently matched breakpoint value (max-width in px), or `null` if none matched. */
	let activeBreakpoint: number | null = $state(null);

	/** Cleanup functions for `matchMedia` listeners; called in {@link destroy}. */
	let cleanups: (() => void)[] = [];

	/**
	 * Finds the smallest breakpoint that the given width fits into.
	 *
	 * Breakpoints are max-width values sorted ascending.
	 * Returns the first breakpoint where `width <= breakpoint`, or `null` if none match.
	 */
	function getMatchingBreakpoint(width: number, breakpoints: number[]): number | null {
		for (const breakpoint of breakpoints) {
			if (width <= breakpoint) {
				return breakpoint;
			}
		}

		return null;
	}

	/**
	 * Evaluates the current viewport width against all breakpoints
	 * and updates the active responsive override layer accordingly.
	 */
	function update(breakpoints: number[], responsiveConfig: ScenaResponsiveConfig) {
		const matched = getMatchingBreakpoint(window.innerWidth, breakpoints);

		if (matched !== activeBreakpoint) {
			activeBreakpoint = matched;

			if (matched !== null) {
				configOverrides.set(OverrideLayer.RESPONSIVE, () => responsiveConfig[matched]);
			} else {
				configOverrides.set(OverrideLayer.RESPONSIVE, null);
			}
		}
	}

	/**
	 * Sets up `matchMedia` listeners for each breakpoint.
	 *
	 * Reads `responsive` from the current config, registers a `change`
	 * listener on each `(max-width: {bp}px)` media query, and runs
	 * an initial evaluation.
	 */
	function apply() {
		const responsiveConfig = config.getConfig().responsive;

		/** Exit if no responsive config is provided */
		if (!responsiveConfig) return;

		/** Extract breakpoint keys and convert them to numbers */
		const breakpoints = Object.keys(responsiveConfig).map(Number);

		/** Sort breakpoints in ascending order */
		const sortedBreakpoints = breakpoints.sort((a, b) => a - b);

		/** Exit if there are no breakpoints */
		if (sortedBreakpoints.length === 0) return;

		/** Ensure code runs only in browser environment */
		if (!isBrowser) return;

		/** Register matchMedia listeners for each breakpoint */
		for (const breakpoint of sortedBreakpoints) {
			/** Create media query for current breakpoint */
			const march = window.matchMedia(`(max-width: ${breakpoint}px)`);

			/** Handler that recalculates active breakpoint */
			const handler = () => update(sortedBreakpoints, responsiveConfig);

			march.addEventListener('change', handler);

			cleanups.push(() => {
				march.removeEventListener('change', handler);
			});
		}

		/** Run initial evaluation to set the correct breakpoint on mount */
		update(sortedBreakpoints, responsiveConfig);
	}

	/** Removes all `matchMedia` listeners and clears the responsive override layer. */
	function destroy() {
		activeBreakpoint = null;

		for (const cleanup of cleanups) {
			cleanup();
		}

		cleanups = [];

		/** */
		configOverrides.set(OverrideLayer.RESPONSIVE, null);
	}

	return {
		apply,
		destroy,
		get api() {
			return {
				get activeBreakpoint() {
					return activeBreakpoint;
				}
			};
		}
	};
}
