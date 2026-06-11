// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { useScenaConfig, useScenaOverrides } from '@/app/entrypoint';

import { useScenaResponsive } from '../';

let mediaListeners: Map<string, Set<() => void>>;
let mediaMatches: Map<string, boolean>;

function setupMatchMedia() {
	mediaListeners = new Map();
	mediaMatches = new Map();

	window.matchMedia = vi.fn((query: string) => {
		const listeners = new Set<() => void>();

		mediaListeners.set(query, listeners);

		return {
			get matches() {
				return mediaMatches.get(query) ?? false;
			},
			media: query,
			addEventListener(_event: string, handler: () => void) {
				listeners.add(handler);
			},
			removeEventListener(_event: string, handler: () => void) {
				listeners.delete(handler);
			},
			onchange: null,
			addListener: vi.fn(),
			removeListener: vi.fn(),
			dispatchEvent: vi.fn()
		} as unknown as MediaQueryList;
	});
}

function simulateResize(width: number) {
	Object.defineProperty(window, 'innerWidth', { value: width, writable: true });

	for (const [, listeners] of mediaListeners) {
		for (const handler of listeners) {
			handler();
		}
	}
}

describe('useScenaResponsive', () => {
	beforeEach(() => {
		setupMatchMedia();
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe('basic functionality', () => {
		it('should have null activeBreakpoint initially', () => {
			const config = useScenaConfig({
				video: { src: '' }
			});

			const overrides = useScenaOverrides(config);
			const responsive = useScenaResponsive(config, overrides);

			expect(responsive.api.activeBreakpoint).toBe(null);
		});

		it('should match the smallest breakpoint where width <= breakpoint', () => {
			Object.defineProperty(window, 'innerWidth', { value: 400, writable: true });

			const config = useScenaConfig({
				video: { src: '' },
				responsive: {
					480: { videoLoader: false },
					768: { closeButton: false }
				}
			});

			const overrides = useScenaOverrides(config);
			const responsive = useScenaResponsive(config, overrides);

			responsive.apply();

			expect(responsive.api.activeBreakpoint).toBe(480);
			expect(overrides.resolved.videoLoader).toBe(false);
			expect(overrides.resolved.closeButton).toBeUndefined();
		});

		it('should match the next breakpoint when width exceeds the smaller one', () => {
			Object.defineProperty(window, 'innerWidth', { value: 600, writable: true });

			const config = useScenaConfig({
				video: { src: '' },
				responsive: {
					480: { videoLoader: false },
					768: { closeButton: false }
				}
			});

			const overrides = useScenaOverrides(config);
			const responsive = useScenaResponsive(config, overrides);

			responsive.apply();

			expect(responsive.api.activeBreakpoint).toBe(768);
			expect(overrides.resolved.closeButton).toBe(false);
			expect(overrides.resolved.videoLoader).toBeUndefined();
		});

		it('should clear overrides when width exceeds all breakpoints', () => {
			Object.defineProperty(window, 'innerWidth', { value: 400, writable: true });

			const config = useScenaConfig({
				video: { src: '' },
				responsive: {
					480: { videoLoader: false }
				}
			});

			const overrides = useScenaOverrides(config);
			const responsive = useScenaResponsive(config, overrides);

			responsive.apply();

			expect(responsive.api.activeBreakpoint).toBe(480);

			simulateResize(600);

			expect(responsive.api.activeBreakpoint).toBe(null);
			expect(overrides.resolved.videoLoader).toBeUndefined();
		});
	});

	describe('case handling', () => {
		it('should be a no-op when no responsive config', () => {
			const config = useScenaConfig({
				video: { src: '' }
			});

			const overrides = useScenaOverrides(config);
			const responsive = useScenaResponsive(config, overrides);

			responsive.apply();

			expect(window.matchMedia).not.toHaveBeenCalled();
		});

		it('should be a no-op when responsive config is empty', () => {
			const config = useScenaConfig({
				video: { src: '' },
				responsive: {}
			});

			const overrides = useScenaOverrides(config);
			const responsive = useScenaResponsive(config, overrides);

			responsive.apply();

			expect(window.matchMedia).not.toHaveBeenCalled();
		});

		it('should not re-set overrides when breakpoint has not changed', () => {
			Object.defineProperty(window, 'innerWidth', { value: 400, writable: true });

			const config = useScenaConfig({
				video: { src: '' },
				responsive: {
					480: { videoLoader: false }
				}
			});

			const overrides = useScenaOverrides(config);
			const setSpy = vi.spyOn(overrides, 'set');
			const responsive = useScenaResponsive(config, overrides);

			responsive.apply();

			simulateResize(450);

			expect(setSpy).toHaveBeenCalledTimes(1);
		});
	});

	describe('destroy', () => {
		it('should remove listeners and clear overrides', () => {
			Object.defineProperty(window, 'innerWidth', { value: 400, writable: true });

			const config = useScenaConfig({
				video: { src: '' },
				responsive: {
					480: { videoLoader: false }
				}
			});

			const overrides = useScenaOverrides(config);
			const responsive = useScenaResponsive(config, overrides);

			responsive.apply();

			expect(responsive.api.activeBreakpoint).toBe(480);

			responsive.destroy();

			expect(responsive.api.activeBreakpoint).toBe(null);
			expect(overrides.resolved.videoLoader).toBeUndefined();

			for (const [, listeners] of mediaListeners) {
				expect(listeners.size).toBe(0);
			}
		});
	});
});
