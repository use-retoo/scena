import { describe, it, expect } from 'vitest';

import { useScenaConfig } from '@/app/entrypoint';
import { useEventEmitter } from '@/entities/event';

import { useScenaVisibility } from '../';

describe('useScenaVisibility', () => {
	describe('basic functionality', () => {
		it('should show widget with show', () => {
			const config = useScenaConfig({
				video: {
					src: ''
				},
				visibility: {
					isHidden: true
				}
			});

			const visibility = useScenaVisibility(config, useEventEmitter());

			visibility.api.show();

			expect(visibility.api.isHidden).toBe(false);
		});

		it('should hide widget with hide', () => {
			const config = useScenaConfig({
				video: {
					src: ''
				},
				visibility: { isHidden: false }
			});

			const visibility = useScenaVisibility(config, useEventEmitter());

			visibility.api.hide();

			expect(visibility.api.isHidden).toBe(true);
		});

		it('should reflect isHidden from config', () => {
			const config = useScenaConfig({
				video: {
					src: ''
				},
				visibility: {
					isHidden: true
				}
			});

			const visibility = useScenaVisibility(config, useEventEmitter());

			expect(visibility.api.isHidden).toBe(true);
		});

		it('should reflect isShownOnReady from config', () => {
			const config = useScenaConfig({
				video: {
					src: ''
				},
				visibility: { isShownOnReady: true }
			});

			const visibility = useScenaVisibility(config, useEventEmitter());

			expect(visibility.api.isShownOnReady).toBe(true);
		});
	});

	describe('case handling', () => {
		it('should default isHidden to false when not set', () => {
			const config = useScenaConfig({
				video: {
					src: ''
				},
				visibility: {}
			});

			const visibility = useScenaVisibility(config, useEventEmitter());

			expect(visibility.api.isHidden).toBe(false);
		});

		it('should default isShownOnReady to false when not set', () => {
			const config = useScenaConfig({
				video: {
					src: ''
				},
				visibility: {}
			});

			const visibility = useScenaVisibility(config, useEventEmitter());

			expect(visibility.api.isShownOnReady).toBe(false);
		});

		it('should default isHidden to false when no visibility config', () => {
			const config = useScenaConfig({
				video: {
					src: ''
				}
			});

			const visibility = useScenaVisibility(config, useEventEmitter());

			expect(visibility.api.isHidden).toBe(false);
		});
	});

	describe('apply', () => {
		it('should resolve defaults when isShownOnReady is false', () => {
			const config = useScenaConfig({
				video: {
					src: ''
				},
				visibility: {
					isShownOnReady: false
				}
			});

			const visibility = useScenaVisibility(config, useEventEmitter());

			visibility.apply();

			expect(config.getConfig().visibility).toEqual({
				isHidden: false,
				isAnimated: true,
				isShownOnReady: false
			});
		});

		it('should set isHidden to true when isShownOnReady is true and isHidden is not set', () => {
			const config = useScenaConfig({
				video: {
					src: ''
				},
				visibility: { isShownOnReady: true }
			});

			const visibility = useScenaVisibility(config, useEventEmitter());

			visibility.apply();

			expect(config.getConfig().visibility).toEqual({
				isHidden: true,
				isAnimated: true,
				isShownOnReady: true
			});
		});

		it('should preserve explicit isHidden when isShownOnReady is true', () => {
			const config = useScenaConfig({
				video: {
					src: ''
				},
				visibility: {
					isHidden: false,
					isShownOnReady: true
				}
			});

			const visibility = useScenaVisibility(config, useEventEmitter());

			visibility.apply();

			expect(config.getConfig().visibility).toEqual({
				isHidden: false,
				isAnimated: true,
				isShownOnReady: true
			});
		});

		it('should apply defaults when no visibility config', () => {
			const config = useScenaConfig({
				video: {
					src: ''
				}
			});

			const visibility = useScenaVisibility(config, useEventEmitter());

			visibility.apply();

			expect(config.getConfig().visibility).toEqual({
				isHidden: true,
				isAnimated: true,
				isShownOnReady: true
			});
		});
	});

	describe('edge cases', () => {
		it('should handle toggling visibility back and forth', () => {
			const config = useScenaConfig({
				video: {
					src: ''
				},
				visibility: { isHidden: false }
			});

			const visibility = useScenaVisibility(config, useEventEmitter());

			visibility.api.hide();
			visibility.api.show();
			visibility.api.hide();

			expect(visibility.api.isHidden).toBe(true);
		});

		it('should not change state when show is called while already visible', () => {
			const config = useScenaConfig({
				video: {
					src: ''
				},
				visibility: { isHidden: false }
			});

			const visibility = useScenaVisibility(config, useEventEmitter());

			visibility.api.show();

			expect(visibility.api.isHidden).toBe(false);
		});

		it('should not change state when hide is called while already hidden', () => {
			const config = useScenaConfig({
				video: {
					src: ''
				},
				visibility: {
					isHidden: true
				}
			});

			const visibility = useScenaVisibility(config, useEventEmitter());

			visibility.api.hide();

			expect(visibility.api.isHidden).toBe(true);
		});
	});

	describe('consistency', () => {
		it('should persist show/hide in config', () => {
			const config = useScenaConfig({
				video: {
					src: ''
				},
				visibility: { isHidden: false }
			});

			const visibility = useScenaVisibility(config, useEventEmitter());

			visibility.api.hide();

			expect(config.getConfig().visibility?.isHidden).toBe(true);
		});

		it('should create independent instances', () => {
			const configA = useScenaConfig({
				video: {
					src: ''
				},
				visibility: { isHidden: false }
			});

			const visibilityA = useScenaVisibility(configA, useEventEmitter());

			const configB = useScenaConfig({
				video: {
					src: ''
				},
				visibility: { isHidden: false }
			});

			const visibilityB = useScenaVisibility(configB, useEventEmitter());

			visibilityA.api.hide();

			expect(visibilityB.api.isHidden).toBe(false);
		});
	});
});
