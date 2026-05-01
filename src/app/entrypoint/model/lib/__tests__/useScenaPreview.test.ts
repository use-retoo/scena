import { describe, it, expect, vi } from 'vitest';

import { useScenaConfig, useScenaOverrides } from '@/app/entrypoint';
import { useEventEmitter } from '@/entities/event';

import { useScenaPreview } from '../';

describe('useScenaPreview', () => {
	describe('basic functionality', () => {
		it('should not be previewing initially', () => {
			const config = useScenaConfig({
				video: {
					src: ''
				}
			});

			const overrides = useScenaOverrides(config);
			const preview = useScenaPreview(config, overrides, useEventEmitter());

			expect(preview.api.isPreviewing).toBe(false);
		});

		it('should start previewing with start', () => {
			const config = useScenaConfig({
				video: {
					src: ''
				},
				preview: {
					videoLoader: false
				}
			});

			const overrides = useScenaOverrides(config);
			const preview = useScenaPreview(config, overrides, useEventEmitter());

			preview.api.start();

			expect(preview.api.isPreviewing).toBe(true);
		});

		it('should stop previewing with stop', () => {
			const config = useScenaConfig({
				video: {
					src: ''
				},
				preview: {
					videoLoader: false
				}
			});

			const overrides = useScenaOverrides(config);
			const preview = useScenaPreview(config, overrides, useEventEmitter());

			preview.api.start();
			preview.api.stop();

			expect(preview.api.isPreviewing).toBe(false);
		});

		it('should apply preview overrides on start', () => {
			const config = useScenaConfig({
				video: {
					src: ''
				},
				preview: {
					videoLoader: false
				}
			});

			const overrides = useScenaOverrides(config);
			const preview = useScenaPreview(config, overrides, useEventEmitter());

			preview.api.start();

			expect(overrides.resolved.videoLoader).toBe(false);
		});

		it('should clear overrides on stop', () => {
			const config = useScenaConfig({
				video: {
					src: ''
				},
				preview: {
					videoLoader: false
				}
			});

			const overrides = useScenaOverrides(config);
			const preview = useScenaPreview(config, overrides, useEventEmitter());

			preview.api.start();
			preview.api.stop();

			expect(overrides.resolved.videoLoader).toBeUndefined();
		});
	});

	describe('case handling', () => {
		it('should not start when config has no preview', () => {
			const config = useScenaConfig({
				video: {
					src: ''
				}
			});

			const overrides = useScenaOverrides(config);
			const preview = useScenaPreview(config, overrides, useEventEmitter());

			preview.api.start();

			expect(preview.api.isPreviewing).toBe(false);
		});

		it('should not call set when start is called twice', () => {
			const config = useScenaConfig({
				video: {
					src: ''
				},
				preview: {
					videoLoader: false
				}
			});

			const overrides = useScenaOverrides(config);
			const setSpy = vi.spyOn(overrides, 'set');
			const preview = useScenaPreview(config, overrides, useEventEmitter());

			preview.api.start();
			preview.api.start();

			expect(setSpy).toHaveBeenCalledTimes(1);
		});

		it('should not call set when stop is called without start', () => {
			const config = useScenaConfig({
				video: {
					src: ''
				}
			});

			const overrides = useScenaOverrides(config);
			const setSpy = vi.spyOn(overrides, 'set');
			const preview = useScenaPreview(config, overrides, useEventEmitter());

			preview.api.stop();

			expect(setSpy).not.toHaveBeenCalled();
		});

		it('should auto-start when apply is called with preview config', () => {
			const config = useScenaConfig({
				video: {
					src: ''
				},
				preview: {
					videoLoader: false
				}
			});

			const overrides = useScenaOverrides(config);
			const preview = useScenaPreview(config, overrides, useEventEmitter());

			preview.apply();

			expect(preview.api.isPreviewing).toBe(true);
		});

		it('should not start when apply is called without preview config', () => {
			const config = useScenaConfig({
				video: {
					src: ''
				}
			});

			const overrides = useScenaOverrides(config);
			const preview = useScenaPreview(config, overrides, useEventEmitter());

			preview.apply();

			expect(preview.api.isPreviewing).toBe(false);
		});
	});

	describe('edge cases', () => {
		it('should add preview CSS class to videoContainer overrides', () => {
			const config = useScenaConfig({
				video: {
					src: ''
				},
				preview: {
					videoLoader: false
				}
			});

			const overrides = useScenaOverrides(config);
			const preview = useScenaPreview(config, overrides, useEventEmitter());

			preview.api.start();

			expect(overrides.resolved.videoContainer).toEqual({
				customClasses: {
					root: [undefined, 'rs-video-container--preview']
				}
			});
		});

		it('should preserve existing videoContainer customClasses when preview starts', () => {
			const config = useScenaConfig({
				video: {
					src: ''
				},
				preview: {
					videoLoader: false
				},
				videoContainer: {
					customClasses: {
						root: 'existing'
					}
				}
			});

			const overrides = useScenaOverrides(config);
			const preview = useScenaPreview(config, overrides, useEventEmitter());

			preview.api.start();

			expect(overrides.resolved.videoContainer).toEqual({
				customClasses: {
					root: ['existing', 'rs-video-container--preview']
				}
			});
		});

		it('should allow restart after stop', () => {
			const config = useScenaConfig({
				video: {
					src: ''
				},
				preview: {
					videoLoader: false
				}
			});

			const overrides = useScenaOverrides(config);
			const preview = useScenaPreview(config, overrides, useEventEmitter());

			preview.api.start();
			preview.api.stop();
			preview.api.start();

			expect(preview.api.isPreviewing).toBe(true);
			expect(overrides.resolved.videoLoader).toBe(false);
		});
	});

	describe('consistency', () => {
		it('should not mutate base config on start', () => {
			const config = useScenaConfig({
				video: {
					src: ''
				},
				preview: {
					videoLoader: false
				}
			});

			const snapshot = config.getConfig();

			const overrides = useScenaOverrides(config);
			const preview = useScenaPreview(config, overrides, useEventEmitter());

			preview.api.start();

			expect(config.getConfig()).toEqual(snapshot);
		});

		it('should create independent instances', () => {
			const configA = useScenaConfig({
				video: {
					src: ''
				},
				preview: {
					videoLoader: false
				}
			});

			const overridesA = useScenaOverrides(configA);
			const previewA = useScenaPreview(configA, overridesA, useEventEmitter());

			const configB = useScenaConfig({
				video: {
					src: ''
				},
				preview: {
					closeButton: false
				}
			});

			const overridesB = useScenaOverrides(configB);
			const previewB = useScenaPreview(configB, overridesB, useEventEmitter());

			previewA.api.start();

			expect(previewB.api.isPreviewing).toBe(false);
		});
	});
});
