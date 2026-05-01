import { describe, it, expect } from 'vitest';

import { useScenaConfig } from '../';

describe('useScenaConfig', () => {
	describe('basic functionality', () => {
		it('should return initial config with current', () => {
			const initial = {
				video: {
					src: ''
				},
				visibility: { isHidden: false }
			};

			const config = useScenaConfig(initial);

			expect(config.current).toEqual(initial);
		});

		it('should return initial config with getConfig', () => {
			const initial = {
				video: {
					src: ''
				},
				visibility: { isHidden: false }
			};

			const config = useScenaConfig(initial);

			expect(config.getConfig()).toEqual(initial);
		});

		it('should replace config with setConfig', () => {
			const config = useScenaConfig({
				video: {
					src: ''
				},
				visibility: { isHidden: false }
			});

			config.setConfig({
				video: {
					src: ''
				},
				visibility: {
					isHidden: true
				}
			});

			expect(config.getConfig()).toEqual({
				video: {
					src: ''
				},
				visibility: {
					isHidden: true
				}
			});
		});

		it('should deeply merge partial config with mergeConfig', () => {
			const config = useScenaConfig({
				video: {
					src: ''
				},
				visibility: {
					isHidden: false,
					isShownOnReady: true
				}
			});

			config.mergeConfig({
				visibility: {
					isHidden: true
				}
			});

			expect(config.getConfig().visibility).toEqual({
				isHidden: true,
				isShownOnReady: true
			});
		});
	});

	describe('case handling', () => {
		it('should overwrite value when mergeConfig has same key', () => {
			const config = useScenaConfig({
				video: {
					src: ''
				},
				visibility: { isHidden: false }
			});

			config.mergeConfig({
				visibility: {
					isHidden: true
				}
			});

			expect(config.getConfig().visibility?.isHidden).toBe(true);
		});

		it('should add key when mergeConfig has new key', () => {
			const config = useScenaConfig({
				video: {
					src: ''
				}
			});

			config.mergeConfig({
				visibility: {
					isHidden: true
				}
			});

			expect(config.getConfig().visibility).toEqual({
				isHidden: true
			});
		});
	});

	describe('edge cases', () => {
		it('should not change config when mergeConfig receives empty object', () => {
			const initial = {
				video: {
					src: ''
				},
				visibility: { isHidden: false }
			};

			const config = useScenaConfig(initial);

			config.mergeConfig({});

			expect(config.getConfig()).toEqual(initial);
		});

		it('should reset config when setConfig receives minimal object', () => {
			const config = useScenaConfig({
				video: {
					src: ''
				},
				visibility: { isHidden: false }
			});

			config.setConfig({
				video: {
					src: ''
				}
			});

			expect(config.getConfig()).toEqual({
				video: {
					src: ''
				}
			});
		});

		it('should disable component when mergeConfig sets false', () => {
			const config = useScenaConfig({
				video: {
					src: ''
				},
				videoLoader: {}
			});

			config.mergeConfig({
				videoLoader: false
			});

			expect(config.getConfig().videoLoader).toBe(false);
		});

		it('should disable multiple components when setConfig sets false', () => {
			const config = useScenaConfig({
				video: {
					src: ''
				}
			});

			config.setConfig({
				video: {
					src: ''
				},
				videoControls: false,
				closeButton: false
			});

			expect(config.getConfig().videoControls).toBe(false);
			expect(config.getConfig().closeButton).toBe(false);
		});

		it('should re-enable component when mergeConfig replaces false with object', () => {
			const config = useScenaConfig({
				video: {
					src: ''
				},
				videoProgress: false
			});

			config.mergeConfig({
				videoProgress: {}
			});

			expect(config.getConfig().videoProgress).toEqual({});
			expect(config.getConfig().videoProgress).not.toBe(false);
		});
	});

	describe('consistency', () => {
		it('should not mutate initial object', () => {
			const initial = {
				video: {
					src: ''
				},
				visibility: { isHidden: false }
			};

			const snapshot = {
				video: {
					src: ''
				},
				visibility: { isHidden: false }
			};

			const config = useScenaConfig(initial);

			config.setConfig({
				video: {
					src: ''
				},
				visibility: {
					isHidden: true
				}
			});

			expect(initial).toEqual(snapshot);
		});

		it('should return new reference after setConfig', () => {
			const config = useScenaConfig({
				video: {
					src: ''
				}
			});

			const value = {
				video: {
					src: ''
				},
				visibility: { isHidden: false }
			};

			config.setConfig(value);

			expect(config.getConfig()).not.toBe(value);
		});
	});
});
