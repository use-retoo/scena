import '@testing-library/jest-dom/vitest';

class ResizeObserverMock {
	private callback: ResizeObserverCallback;

	constructor(callback: ResizeObserverCallback) {
		this.callback = callback;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	observe(target: Element) {
		this.callback(
			[{ contentRect: { width: 100, height: 100 } } as ResizeObserverEntry],
			this as unknown as ResizeObserver
		);
	}

	unobserve() {}
	disconnect() {}
}

globalThis.ResizeObserver = ResizeObserverMock as unknown as typeof ResizeObserver;
