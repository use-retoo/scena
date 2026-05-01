import { ScenaEvent } from '@/entities/event';
import type { ScenaEventEmitter } from '@/entities/event';

import type { UseScenaConfigReturns, UseScenaVisibilityReturns } from '../types';

/**
 * Manages the show/hide visibility feature for the scena widget.
 *
 * Reads initial visibility settings from config and provides
 * `show`/`hide` methods to toggle the widget at runtime.
 *
 * @param config - The reactive config store.
 * @param eventEmitter - The shared event bus for emitting visibility events.
 * @returns Methods to apply initial state, and a reactive visibility API.
 */
export default function useScenaVisibility(
	config: UseScenaConfigReturns,
	eventEmitter: ScenaEventEmitter
): UseScenaVisibilityReturns {
	function apply() {
		const visibility = config.getConfig().visibility;

		const hasAnimatedProperty = typeof visibility?.isAnimated === 'boolean';

		const hasShownOnReadyProperty = typeof visibility?.isShownOnReady === 'boolean';

		const hasHiddenProperty = typeof visibility?.isHidden === 'boolean';

		const isAnimated = hasAnimatedProperty ? visibility?.isAnimated : true;

		let isHidden = true;

		let isShownOnReady = true;

		if (hasHiddenProperty && hasShownOnReadyProperty) {
			isHidden = visibility!.isHidden!;
			isShownOnReady = visibility!.isShownOnReady!;
		}

		if (hasHiddenProperty && !hasShownOnReadyProperty) {
			isHidden = visibility!.isHidden!;
			isShownOnReady = !visibility!.isHidden!;
		}

		if (!hasHiddenProperty && hasShownOnReadyProperty) {
			isShownOnReady = visibility!.isShownOnReady!;
			isHidden = visibility!.isShownOnReady!;
		}

		config.mergeConfig({
			visibility: {
				isAnimated,
				isShownOnReady,
				isHidden
			}
		});
	}

	function show() {
		config.mergeConfig({
			visibility: {
				isHidden: false
			}
		});

		eventEmitter.emit(ScenaEvent.ON_VISIBILITY_SHOW);
	}

	function hide() {
		config.mergeConfig({
			visibility: {
				isHidden: true
			}
		});

		eventEmitter.emit(ScenaEvent.ON_VISIBILITY_HIDE);
	}

	return {
		apply,
		get api() {
			return {
				get isHidden() {
					return !!config.getConfig().visibility?.isHidden;
				},
				get isShownOnReady() {
					return !!config.getConfig().visibility?.isShownOnReady;
				},
				show,
				hide
			};
		}
	};
}
