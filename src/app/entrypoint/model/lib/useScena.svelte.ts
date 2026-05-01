import { mount as _mount, unmount as _unmount } from 'svelte';

import { ScenaEvent, useEventEmitter } from '@/entities/event';

import { Scena } from '../../ui';
import type { UseScenaReturns, ScenaConfig, ScenaInstance, ScenaTarget } from '../types';

import {
	useScenaConfig,
	useScenaOverrides,
	useScenaPreview,
	useScenaResponsive,
	useScenaVisibility
} from './';

/**
 * Creates a scena widget factory.
 *
 * Returns an object with `mount` and `unmount` methods
 * for managing the widget lifecycle in the DOM.
 *
 * @example
 * ```ts
 * const scena = useScena();
 * const instance = await scena.mount({ video: { src: 'video.mp4' } });
 * // later...
 * await scena.unmount(instance);
 * ```
 */
export default function useScena(): UseScenaReturns {
	const cleanups = new WeakMap<ScenaInstance, () => void>();

	/**
	 * Mounts the scena widget into a target DOM element.
	 *
	 * Initializes config, applies overrides/preview/visibility features,
	 * and renders the Svelte component. Resolves once the component is mounted.
	 *
	 * @param scenaConfig - Widget configuration (video source, features, overrides).
	 * @param scenaTarget - DOM element or ShadowRoot to mount into. Defaults to `document.body`.
	 * @returns A promise that resolves with the {@link ScenaInstance} handle.
	 */
	function mount(
		scenaConfig: ScenaConfig,
		scenaTarget: ScenaTarget = document.body
	): Promise<ScenaInstance> {
		const promise = new Promise<ScenaInstance>((resolve) => {
			const config = useScenaConfig(scenaConfig);

			const configOverrides = useScenaOverrides(config);

			const eventEmitter = useEventEmitter();

			const preview = useScenaPreview(config, configOverrides, eventEmitter);
			preview.apply();

			const visibility = useScenaVisibility(config, eventEmitter);
			visibility.apply();

			const responsive = useScenaResponsive(config, configOverrides);
			responsive.apply();

			const component: Scena = _mount(Scena, {
				target: scenaTarget,
				props: {
					get config() {
						return configOverrides.resolved;
					},

					mount: () => {
						const scena = component as Scena;

						scena.api.events.on(ScenaEvent.ON_VIDEO_READY, () => {
							if (visibility.api.isShownOnReady) {
								visibility.api.show();
							}
						});

						scena.api.events.on(ScenaEvent.ON_VIDEO_CONTAINER_CLICK, () => {
							if (preview.api.isPreviewing) {
								preview.api.stop();

								if (!preview.api.isKeepTimeOnExpand) {
									scena.api.controller.seek(0);
								}

								if (!preview.api.isKeepMuteOnExpand) {
									scena.api.controller.unmute();
								}
							}
						});

						const instance: ScenaInstance = {
							api: scena.api,
							config,
							component,
							preview: preview.api,
							responsive: responsive.api,
							visibility: visibility.api
						};

						cleanups.set(instance, () => responsive.destroy());

						resolve(instance);
					},

					unmount: () => {
						const scena = component as Scena;

						promise.then((instance) => {
							/** Skip animation if explicitly disabled. */
							const isAnimated = config.getConfig().visibility?.isAnimated ?? true;

							/** Skip animation if already hidden. */
							const isHidden = config.getConfig().visibility?.isHidden ?? false;

							if (!isAnimated || isHidden) {
								void unmount(instance);
								return;
							}

							const containerRoot = scena.api.components.container?.getElements()?.root;

							if (!containerRoot) {
								void unmount(instance);
								return;
							}

							visibility.api.hide();

							/**
							 * Waits for the browser to apply styles and start the hide animation.
							 *
							 * After {@link visibility.api.hide} is called, the browser has not yet
							 * recalculated styles in the current microtask. Deferring to the next
							 * animation frame ensures {@link Element.getAnimations} returns the
							 * active CSS animations triggered by the visibility change.
							 *
							 * Once all animations settle, the instance is safely unmounted.
							 */
							requestAnimationFrame(() => {
								const animations = containerRoot.getAnimations();

								if (animations.length > 0) {
									Promise.allSettled(animations.map((animation) => animation.finished)).then(() => {
										void unmount(instance);
									});
								} else {
									void unmount(instance);
								}
							});
						});
					},

					eventEmitter
				}
			});
		});

		return promise;
	}

	/**
	 * Unmounts a previously mounted scena widget instance.
	 *
	 * @param instance - The instance handle returned by {@link mount}.
	 */
	async function unmount(instance: ScenaInstance) {
		cleanups.get(instance)?.();
		cleanups.delete(instance);

		if (instance.component) {
			await _unmount(instance.component);
		}
	}

	return {
		NAME: __NAME__,
		VERSION: __VERSION__,
		mount,
		unmount
	};
}
