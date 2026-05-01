import { ScenaEvent } from '@/entities/event';
import type { ScenaEventEmitter } from '@/entities/event';
import { OverrideLayer } from '@/shared/enums';

import type {
	UseScenaConfigReturns,
	UseScenaOverridesReturns,
	UseScenaPreviewReturns
} from '../types';

/**
 * Manages the preview mode feature for the scena widget.
 *
 * When active, applies preview-specific config overrides (e.g. preview styles)
 * on top of the base config. Stops preview on video container click.
 *
 * @param config - The reactive config store.
 * @param configOverrides - The config overrides manager.
 * @param eventEmitter - The shared event bus for emitting preview events.
 * @returns Methods to apply/start/stop preview and a reactive API.
 */
export default function useScenaPreview(
	config: UseScenaConfigReturns,
	configOverrides: UseScenaOverridesReturns,
	eventEmitter: ScenaEventEmitter
): UseScenaPreviewReturns {
	let isPreviewing = $state(false);

	function apply() {
		const { preview } = config.getConfig();

		if (preview) {
			start();
		}
	}

	function start() {
		const currentConfig = config.getConfig();

		if (!currentConfig.preview) return;
		if (isPreviewing) return;

		isPreviewing = true;

		configOverrides.set(OverrideLayer.PREVIEW, () => ({
			...config.getConfig().preview,
			videoContainer: {
				customClasses: {
					root: [
						config.getConfig().videoContainer?.customClasses?.root,
						'rs-video-container--preview'
					]
				}
			}
		}));

		eventEmitter.emit(ScenaEvent.ON_PREVIEW_START);
	}

	function stop() {
		if (!isPreviewing) return;

		isPreviewing = false;

		configOverrides.set(OverrideLayer.PREVIEW, null);

		eventEmitter.emit(ScenaEvent.ON_PREVIEW_STOP);
	}

	return {
		apply,
		get api() {
			return {
				get isPreviewing() {
					return isPreviewing;
				},
				get isKeepTimeOnExpand() {
					return !!config.getConfig().preview?.keepTimeOnExpand;
				},
				get isKeepMuteOnExpand() {
					return !!config.getConfig().preview?.keepMuteOnExpand;
				},
				start,
				stop
			};
		}
	};
}
