import { describe, it, expect, vi } from 'vitest';

import { useEventEmitter } from '../';
import { ScenaEvent } from '../../enums';

describe('useEventEmitter', () => {
	describe('basic functionality', () => {
		it('should call handler when event is emitted', () => {
			const emitter = useEventEmitter();
			const handler = vi.fn();

			emitter.on(ScenaEvent.ON_VIDEO_PLAY, handler);
			emitter.emit(ScenaEvent.ON_VIDEO_PLAY, {
				state: 'playing'
			});

			expect(handler).toHaveBeenCalledOnce();
			expect(handler).toHaveBeenCalledWith({
				state: 'playing'
			});
		});

		it('should call multiple handlers for same event', () => {
			const emitter = useEventEmitter();
			const first = vi.fn();
			const second = vi.fn();

			emitter.on(ScenaEvent.ON_VIDEO_PLAY, first);
			emitter.on(ScenaEvent.ON_VIDEO_PLAY, second);
			emitter.emit(ScenaEvent.ON_VIDEO_PLAY);

			expect(first).toHaveBeenCalledOnce();
			expect(second).toHaveBeenCalledOnce();
		});

		it('should unsubscribe handler with off', () => {
			const emitter = useEventEmitter();
			const handler = vi.fn();

			emitter.on(ScenaEvent.ON_VIDEO_PAUSE, handler);
			emitter.off(ScenaEvent.ON_VIDEO_PAUSE, handler);
			emitter.emit(ScenaEvent.ON_VIDEO_PAUSE);

			expect(handler).not.toHaveBeenCalled();
		});
	});

	describe('case handling', () => {
		it('should not call handler when different event is emitted', () => {
			const emitter = useEventEmitter();
			const handler = vi.fn();

			emitter.on(ScenaEvent.ON_VIDEO_PLAY, handler);
			emitter.emit(ScenaEvent.ON_VIDEO_PAUSE);

			expect(handler).not.toHaveBeenCalled();
		});

		it('should not add handler when same handler is added twice', () => {
			const emitter = useEventEmitter();
			const handler = vi.fn();

			emitter.on(ScenaEvent.ON_VIDEO_PLAY, handler);
			emitter.on(ScenaEvent.ON_VIDEO_PLAY, handler);
			emitter.emit(ScenaEvent.ON_VIDEO_PLAY);

			expect(handler).toHaveBeenCalledOnce();
		});

		it('should remove all handlers when remove is called for event', () => {
			const emitter = useEventEmitter();
			const first = vi.fn();
			const second = vi.fn();

			emitter.on(ScenaEvent.ON_VIDEO_PLAY, first);
			emitter.on(ScenaEvent.ON_VIDEO_PLAY, second);
			emitter.remove(ScenaEvent.ON_VIDEO_PLAY);
			emitter.emit(ScenaEvent.ON_VIDEO_PLAY);

			expect(first).not.toHaveBeenCalled();
			expect(second).not.toHaveBeenCalled();
		});

		it('should remove all handlers when clear is called', () => {
			const emitter = useEventEmitter();
			const playHandler = vi.fn();
			const pauseHandler = vi.fn();

			emitter.on(ScenaEvent.ON_VIDEO_PLAY, playHandler);
			emitter.on(ScenaEvent.ON_VIDEO_PAUSE, pauseHandler);
			emitter.clear();
			emitter.emit(ScenaEvent.ON_VIDEO_PLAY);
			emitter.emit(ScenaEvent.ON_VIDEO_PAUSE);

			expect(playHandler).not.toHaveBeenCalled();
			expect(pauseHandler).not.toHaveBeenCalled();
		});
	});

	describe('edge cases', () => {
		it('should not throw when event has no handlers', () => {
			const emitter = useEventEmitter();

			expect(() => emitter.emit(ScenaEvent.ON_VIDEO_PLAY)).not.toThrow();
		});

		it('should not throw when removing unregistered handler', () => {
			const emitter = useEventEmitter();

			expect(() => emitter.off(ScenaEvent.ON_VIDEO_PLAY, vi.fn())).not.toThrow();
		});

		it('should not throw when removing unregistered event', () => {
			const emitter = useEventEmitter();

			expect(() => emitter.remove(ScenaEvent.ON_VIDEO_PLAY)).not.toThrow();
		});

		it('should call handler with undefined when emitted without data', () => {
			const emitter = useEventEmitter();
			const handler = vi.fn();

			emitter.on(ScenaEvent.ON_CTA_CLICK, handler);
			emitter.emit(ScenaEvent.ON_CTA_CLICK);

			expect(handler).toHaveBeenCalledWith(undefined);
		});
	});

	describe('consistency', () => {
		it('should allow re-subscribing after off', () => {
			const emitter = useEventEmitter();
			const handler = vi.fn();

			emitter.on(ScenaEvent.ON_VIDEO_PLAY, handler);
			emitter.off(ScenaEvent.ON_VIDEO_PLAY, handler);
			emitter.on(ScenaEvent.ON_VIDEO_PLAY, handler);
			emitter.emit(ScenaEvent.ON_VIDEO_PLAY);

			expect(handler).toHaveBeenCalledOnce();
		});

		it('should allow re-subscribing after clear', () => {
			const emitter = useEventEmitter();
			const handler = vi.fn();

			emitter.on(ScenaEvent.ON_VIDEO_PLAY, handler);
			emitter.clear();
			emitter.on(ScenaEvent.ON_VIDEO_PLAY, handler);
			emitter.emit(ScenaEvent.ON_VIDEO_PLAY);

			expect(handler).toHaveBeenCalledOnce();
		});

		it('should create independent instances', () => {
			const emitter1 = useEventEmitter();
			const emitter2 = useEventEmitter();
			const handler = vi.fn();

			emitter1.on(ScenaEvent.ON_VIDEO_PLAY, handler);
			emitter2.emit(ScenaEvent.ON_VIDEO_PLAY);

			expect(handler).not.toHaveBeenCalled();
		});
	});
});
