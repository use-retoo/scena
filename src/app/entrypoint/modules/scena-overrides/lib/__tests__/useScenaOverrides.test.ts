import { describe, it, expect } from 'vitest';

import { useScenaConfig } from '@/app/entrypoint';
import { OverrideLayer } from '@/shared/enums';

import { useScenaOverrides } from '../';

describe('useScenaOverrides', () => {
	describe('basic functionality', () => {
		it('should return base config when no overrides set', () => {
			const config = useScenaConfig({
				video: {
					src: ''
				},
				visibility: { isHidden: false }
			});

			const overrides = useScenaOverrides(config);

			expect(overrides.resolved).toEqual({
				video: {
					src: ''
				},
				visibility: { isHidden: false }
			});
		});

		it('should merge overrides into base config', () => {
			const config = useScenaConfig({
				video: {
					src: ''
				},
				visibility: { isHidden: false }
			});

			const overrides = useScenaOverrides(config);

			overrides.set(OverrideLayer.PREVIEW, () => ({
				visibility: {
					isHidden: true
				}
			}));

			expect(overrides.resolved).toEqual({
				video: {
					src: ''
				},
				visibility: {
					isHidden: true
				}
			});
		});

		it('should add new keys from overrides', () => {
			const config = useScenaConfig({
				video: {
					src: ''
				},
				visibility: { isHidden: false }
			});

			const overrides = useScenaOverrides(config);

			overrides.set(OverrideLayer.PREVIEW, () => ({
				videoLoader: false
			}));

			expect(overrides.resolved).toEqual({
				video: {
					src: ''
				},
				visibility: { isHidden: false },
				videoLoader: false
			});
		});
	});

	describe('case handling', () => {
		it('should clear overrides when set receives null', () => {
			const config = useScenaConfig({
				video: {
					src: ''
				},
				visibility: { isHidden: false }
			});

			const overrides = useScenaOverrides(config);

			overrides.set(OverrideLayer.PREVIEW, () => ({
				visibility: {
					isHidden: true
				}
			}));
			overrides.set(OverrideLayer.PREVIEW, null);

			expect(overrides.resolved).toEqual({
				video: {
					src: ''
				},
				visibility: { isHidden: false }
			});
		});

		it('should replace previous overrides when set is called again', () => {
			const config = useScenaConfig({
				video: {
					src: ''
				},
				visibility: { isHidden: false }
			});

			const overrides = useScenaOverrides(config);

			overrides.set(OverrideLayer.PREVIEW, () => ({
				videoLoader: false
			}));

			overrides.set(OverrideLayer.PREVIEW, () => ({
				closeButton: false
			}));

			expect(overrides.resolved.videoLoader).toBeUndefined();
			expect(overrides.resolved.closeButton).toBe(false);
		});

		it('should deeply merge nested overrides', () => {
			const config = useScenaConfig({
				video: {
					src: ''
				},
				visibility: {
					isHidden: false,
					isShownOnReady: true
				}
			});

			const overrides = useScenaOverrides(config);

			overrides.set(OverrideLayer.PREVIEW, () => ({
				visibility: {
					isHidden: true
				}
			}));

			expect(overrides.resolved.visibility).toEqual({
				isHidden: true,
				isShownOnReady: true
			});
		});
	});

	describe('edge cases', () => {
		it('should apply overrides when base config is minimal', () => {
			const config = useScenaConfig({
				video: {
					src: ''
				}
			});

			const overrides = useScenaOverrides(config);

			overrides.set(OverrideLayer.PREVIEW, () => ({
				visibility: {
					isHidden: true
				}
			}));

			expect(overrides.resolved).toEqual({
				video: {
					src: ''
				},
				visibility: {
					isHidden: true
				}
			});
		});

		it('should return base config when overrides return empty object', () => {
			const config = useScenaConfig({
				video: {
					src: ''
				},
				visibility: { isHidden: false }
			});

			const overrides = useScenaOverrides(config);

			overrides.set(OverrideLayer.PREVIEW, () => ({}));

			expect(overrides.resolved).toEqual({
				video: {
					src: ''
				},
				visibility: { isHidden: false }
			});
		});

		it('should disable component when override sets false', () => {
			const config = useScenaConfig({
				video: {
					src: ''
				},
				videoControls: {}
			});

			const overrides = useScenaOverrides(config);

			overrides.set(OverrideLayer.PREVIEW, () => ({
				videoControls: false
			}));

			expect(overrides.resolved.videoControls).toBe(false);
		});
	});

	describe('consistency', () => {
		it('should not mutate base config', () => {
			const config = useScenaConfig({
				video: {
					src: ''
				},
				visibility: { isHidden: false }
			});

			const snapshot = {
				video: {
					src: ''
				},
				visibility: { isHidden: false }
			};

			const overrides = useScenaOverrides(config);

			overrides.set(OverrideLayer.PREVIEW, () => ({
				visibility: {
					isHidden: true
				}
			}));

			expect(overrides.resolved).toBeDefined();
			expect(config.getConfig()).toEqual(snapshot);
		});

		it('should reflect base config changes after setConfig', () => {
			const config = useScenaConfig({
				video: {
					src: ''
				},
				visibility: { isHidden: false }
			});

			const overrides = useScenaOverrides(config);

			config.setConfig({
				video: {
					src: ''
				},
				visibility: {
					isHidden: true
				}
			});

			expect(overrides.resolved).toEqual({
				video: {
					src: ''
				},
				visibility: {
					isHidden: true
				}
			});
		});

		it('should create independent instances', () => {
			const configA = useScenaConfig({
				video: {
					src: ''
				},
				visibility: { isHidden: false }
			});

			const configB = useScenaConfig({
				video: {
					src: ''
				},
				visibility: {
					isHidden: true
				}
			});

			const overridesA = useScenaOverrides(configA);
			const overridesB = useScenaOverrides(configB);

			overridesA.set(OverrideLayer.PREVIEW, () => ({
				videoLoader: false
			}));

			expect(overridesB.resolved.videoLoader).toBeUndefined();
		});
	});

	describe('named layers', () => {
		it('should merge responsive layer below preview layer', () => {
			const config = useScenaConfig({
				video: {
					src: ''
				}
			});

			const overrides = useScenaOverrides(config);

			overrides.set(OverrideLayer.RESPONSIVE, () => ({
				videoLoader: false,
				closeButton: false
			}));

			overrides.set(OverrideLayer.PREVIEW, () => ({
				videoLoader: { id: 'preview-loader' }
			}));

			expect(overrides.resolved.videoLoader).toEqual({ id: 'preview-loader' });
			expect(overrides.resolved.closeButton).toBe(false);
		});

		it('should keep preview when responsive is cleared', () => {
			const config = useScenaConfig({
				video: {
					src: ''
				}
			});

			const overrides = useScenaOverrides(config);

			overrides.set(OverrideLayer.RESPONSIVE, () => ({
				closeButton: false
			}));

			overrides.set(OverrideLayer.PREVIEW, () => ({
				videoLoader: false
			}));

			overrides.set(OverrideLayer.RESPONSIVE, null);

			expect(overrides.resolved.videoLoader).toBe(false);
			expect(overrides.resolved.closeButton).toBeUndefined();
		});

		it('should keep responsive when preview is cleared', () => {
			const config = useScenaConfig({
				video: {
					src: ''
				}
			});

			const overrides = useScenaOverrides(config);

			overrides.set(OverrideLayer.RESPONSIVE, () => ({
				closeButton: false
			}));

			overrides.set(OverrideLayer.PREVIEW, () => ({
				videoLoader: false
			}));

			overrides.set(OverrideLayer.PREVIEW, null);

			expect(overrides.resolved.closeButton).toBe(false);
			expect(overrides.resolved.videoLoader).toBeUndefined();
		});
	});
});
