// @vitest-environment jsdom
import { mount as _mount, unmount as _unmount } from 'svelte';
import { beforeEach, expect, describe, it, vi } from 'vitest';

import { ScenaEvent, useEventEmitter } from '@/entities/event';

import { useScena } from '../';

vi.mock('svelte', async (importOriginal) => {
	const actual = await importOriginal<typeof import('svelte')>();
	return {
		...actual,
		mount: vi.fn(),
		unmount: vi.fn()
	};
});

vi.mock('@/app/scena/ui', () => ({
	Scena: {}
}));

function createMockComponent() {
	const events = useEventEmitter();

	return {
		api: {
			events,
			controller: {
				play: vi.fn(),
				pause: vi.fn(),
				seek: vi.fn(),
				stop: vi.fn(),
				mute: vi.fn(),
				unmute: vi.fn()
			},
			components: {}
		}
	};
}

function setupMount(mockComponent = createMockComponent()) {
	vi.mocked(_mount).mockImplementation((_comp, options: Record<string, unknown>) => {
		const props = options.props as Record<string, () => void>;

		Promise.resolve().then(() => props.mount());

		return mockComponent;
	});

	return mockComponent;
}

describe('useScena', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe('basic functionality', () => {
		it('should return NAME as string', () => {
			const scena = useScena();

			expect(typeof scena.NAME).toBe('string');
		});

		it('should return VERSION as string', () => {
			const scena = useScena();

			expect(typeof scena.VERSION).toBe('string');
		});

		it('should return mount and unmount functions', () => {
			const scena = useScena();

			expect(typeof scena.mount).toBe('function');
			expect(typeof scena.unmount).toBe('function');
		});

		it('should resolve instance with api, config, component, visibility, preview', async () => {
			const mockComponent = setupMount();

			const scena = useScena();

			const instance = await scena.mount({
				video: {
					src: ''
				}
			});

			expect(instance.api).toBe(mockComponent.api);
			expect(instance.config).toBeDefined();
			expect(instance.component).toBe(mockComponent);
			expect(instance.visibility).toBeDefined();
			expect(instance.preview).toBeDefined();
			expect(instance.responsive).toBeDefined();
		});

		it('should call svelte unmount with component when unmount is called', async () => {
			const mockComponent = setupMount();

			const scena = useScena();

			const instance = await scena.mount({
				video: {
					src: ''
				}
			});

			await scena.unmount(instance);

			expect(_unmount).toHaveBeenCalledWith(mockComponent);
		});
	});

	describe('case handling', () => {
		it('should mount to document.body when no target provided', async () => {
			setupMount();

			const scena = useScena();

			await scena.mount({
				video: {
					src: ''
				}
			});

			expect(_mount).toHaveBeenCalledWith(
				expect.anything(),
				expect.objectContaining({
					target: document.body
				})
			);
		});

		it('should mount to provided target element', async () => {
			setupMount();

			const scena = useScena();

			const target = document.createElement('div');

			await scena.mount(
				{
					video: {
						src: ''
					}
				},
				target
			);

			expect(_mount).toHaveBeenCalledWith(
				expect.anything(),
				expect.objectContaining({
					target
				})
			);
		});

		it('should show widget on ON_VIDEO_READY when isShownOnReady is true', async () => {
			const mockComponent = setupMount();

			const scena = useScena();

			const instance = await scena.mount({
				video: {
					src: ''
				},
				visibility: {
					isShownOnReady: true
				}
			});

			mockComponent.api.events.emit(ScenaEvent.ON_VIDEO_READY);

			expect(instance.config.getConfig().visibility?.isHidden).toBe(false);
		});

		it('should not show widget on ON_VIDEO_READY when isShownOnReady is false', async () => {
			const mockComponent = setupMount();

			const scena = useScena();

			const instance = await scena.mount({
				video: {
					src: ''
				},
				visibility: {
					isHidden: true,
					isShownOnReady: false
				}
			});

			mockComponent.api.events.emit(ScenaEvent.ON_VIDEO_READY);

			expect(instance.config.getConfig().visibility?.isHidden).toBe(true);
		});

		it('should stop preview on ON_VIDEO_CONTAINER_CLICK when previewing', async () => {
			const mockComponent = setupMount();

			const scena = useScena();

			const instance = await scena.mount({
				video: {
					src: ''
				},
				preview: {
					videoLoader: false
				}
			});

			mockComponent.api.events.emit(ScenaEvent.ON_VIDEO_CONTAINER_CLICK);

			expect(instance.preview.isPreviewing).toBe(false);
		});

		it('should not stop preview on ON_VIDEO_CONTAINER_CLICK when not previewing', async () => {
			const mockComponent = setupMount();

			const scena = useScena();

			const instance = await scena.mount({
				video: {
					src: ''
				}
			});

			mockComponent.api.events.emit(ScenaEvent.ON_VIDEO_CONTAINER_CLICK);

			expect(instance.preview.isPreviewing).toBe(false);
		});
	});

	describe('edge cases', () => {
		it('should not throw when unmount is called with no component', async () => {
			const scena = useScena();

			const instance = {
				api: {} as never,
				config: {} as never,
				component: undefined as never,
				visibility: {} as never,
				preview: {} as never,
				responsive: { activeBreakpoint: null } as never
			};

			await expect(scena.unmount(instance)).resolves.not.toThrow();
		});
	});

	describe('consistency', () => {
		it('should not mutate config on mount', async () => {
			setupMount();

			const scena = useScena();

			const config = {
				video: {
					src: ''
				},
				visibility: {
					isHidden: false
				}
			};

			const snapshot = {
				video: {
					src: ''
				},
				visibility: {
					isHidden: false
				}
			};

			await scena.mount(config);

			expect(config).toEqual(snapshot);
		});

		it('should create independent instances', async () => {
			const mockComponentA = setupMount();

			const scenaA = useScena();

			const instanceA = await scenaA.mount({
				video: {
					src: ''
				}
			});

			const mockComponentB = setupMount();

			const scenaB = useScena();

			const instanceB = await scenaB.mount({
				video: {
					src: ''
				}
			});

			expect(instanceA.component).toBe(mockComponentA);
			expect(instanceB.component).toBe(mockComponentB);
			expect(instanceA.component).not.toBe(instanceB.component);
		});
	});
});
