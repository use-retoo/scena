import { describe, it, expect, vi, beforeEach } from 'vitest';

import { useEventEmitter, ScenaEvent } from '@/entities/event';
import { ScenaVideoState } from '@/entities/video';

import useVideoController from '../useVideoController.svelte';

vi.mock('svelte', () => {
	return {
		onDestroy: vi.fn(),
		createContext: vi.fn(() => {
			return [vi.fn(), vi.fn()];
		})
	};
});

function createMockVideoElement(): HTMLVideoElement {
	return {
		play: vi.fn().mockResolvedValue(undefined),
		pause: vi.fn(),
		currentTime: 0,
		duration: 100,
		volume: 1,
		muted: false,
		loop: false,
		buffered: {
			length: 0,
			start: vi.fn(),
			end: vi.fn()
		}
	} as unknown as HTMLVideoElement;
}

function createController() {
	const video = createMockVideoElement();
	const eventEmitter = useEventEmitter();

	const controller = useVideoController({
		getVideoElement: () => video,
		eventEmitter
	});

	return { controller, video, eventEmitter };
}

describe('useVideoController', () => {
	beforeEach(() => {
		vi.restoreAllMocks();

		vi.stubGlobal('requestAnimationFrame', vi.fn().mockReturnValue(1));
		vi.stubGlobal('cancelAnimationFrame', vi.fn());
	});

	describe('basic functionality', () => {
		it('should return initial state as IDLE', () => {
			const { controller } = createController();

			expect(controller.state).toBe(ScenaVideoState.IDLE);
		});

		it('should return initial currentTime as 0', () => {
			const { controller } = createController();

			expect(controller.currentTime).toBe(0);
		});

		it('should return initial duration as 0', () => {
			const { controller } = createController();

			expect(controller.duration).toBe(0);
		});

		it('should return initial progress as 0', () => {
			const { controller } = createController();

			expect(controller.progress).toBe(0);
		});

		it('should return initial volume as 1', () => {
			const { controller } = createController();

			expect(controller.volume).toBe(1);
		});

		it('should return initial isMuted as false', () => {
			const { controller } = createController();

			expect(controller.isMuted).toBe(false);
		});

		it('should return initial isSeeking as false', () => {
			const { controller } = createController();

			expect(controller.isSeeking).toBe(false);
		});

		it('should return initial isBuffering as false', () => {
			const { controller } = createController();

			expect(controller.isBuffering).toBe(false);
		});
	});

	describe('case handling', () => {
		it('should call video.play when play is called', async () => {
			const { controller, video } = createController();

			await controller.play();

			expect(video.play).toHaveBeenCalledOnce();
		});

		it('should call video.pause when pause is called', () => {
			const { controller, video } = createController();

			controller.pause();

			expect(video.pause).toHaveBeenCalledOnce();
		});

		it('should pause and reset currentTime when stop is called', () => {
			const { controller, video } = createController();

			controller.stop();

			expect(video.pause).toHaveBeenCalledOnce();
			expect(video.currentTime).toBe(0);
		});

		it('should clamp seek value within duration bounds', () => {
			const { controller, video } = createController();

			controller.seek(200);

			expect(video.currentTime).toBe(100);
		});

		it('should clamp seek value to 0 for negative values', () => {
			const { controller, video } = createController();

			controller.seek(-10);

			expect(video.currentTime).toBe(0);
		});

		it('should set muted to true when mute is called', () => {
			const { controller, video } = createController();

			controller.mute();

			expect(video.muted).toBe(true);
		});

		it('should set muted to false when unmute is called', () => {
			const { controller, video } = createController();

			video.muted = true;
			controller.unmute();

			expect(video.muted).toBe(false);
		});

		it('should toggle muted state when toggleMute is called', () => {
			const { controller, video } = createController();

			controller.toggleMute();

			expect(video.muted).toBe(true);
		});

		it('should clamp volume between 0 and 1', () => {
			const { controller, video } = createController();

			controller.setVolume(2);

			expect(video.volume).toBe(1);
		});

		it('should clamp volume to 0 for negative values', () => {
			const { controller, video } = createController();

			controller.setVolume(-1);

			expect(video.volume).toBe(0);
		});
	});

	describe('event handlers', () => {
		it('should set state to PLAYING on handlePlay', () => {
			const { controller } = createController();
			const event = new Event('play');

			controller.handlePlay(event);

			expect(controller.state).toBe(ScenaVideoState.PLAYING);
		});

		it('should set state to PAUSED on handlePause', () => {
			const { controller } = createController();
			const event = new Event('pause');

			controller.handlePause(event);

			expect(controller.state).toBe(ScenaVideoState.PAUSED);
		});

		it('should set state to ENDED on handleEnded', () => {
			const { controller } = createController();
			const event = new Event('ended');

			controller.handleEnded(event);

			expect(controller.state).toBe(ScenaVideoState.ENDED);
		});

		it('should set state to LOADING on handleLoadStart', () => {
			const { controller } = createController();
			const event = new Event('loadstart');

			controller.handleLoadStart(event);

			expect(controller.state).toBe(ScenaVideoState.LOADING);
		});

		it('should set state to ERROR on handleError', () => {
			const { controller } = createController();
			const event = new Event('error');

			controller.handleError(event);

			expect(controller.state).toBe(ScenaVideoState.ERROR);
		});

		it('should set state to IDLE on handleLoadedMetadata', () => {
			const { controller } = createController();
			const event = new Event('loadedmetadata');

			controller.handleLoadedMetadata(event);

			expect(controller.state).toBe(ScenaVideoState.IDLE);
		});

		it('should update duration on handleLoadedMetadata', () => {
			const { controller } = createController();
			const event = new Event('loadedmetadata');

			controller.handleLoadedMetadata(event);

			expect(controller.duration).toBe(100);
		});

		it('should set isBuffering to true on handleWaiting', () => {
			const { controller } = createController();
			const event = new Event('waiting');

			controller.handleWaiting(event);

			expect(controller.isBuffering).toBe(true);
		});

		it('should set isBuffering to false on handleCanPlay', () => {
			const { controller } = createController();

			controller.handleWaiting(new Event('waiting'));
			controller.handleCanPlay(new Event('canplay'));

			expect(controller.isBuffering).toBe(false);
		});
	});

	describe('event emissions', () => {
		it('should emit ON_VIDEO_STATE_CHANGE when state changes', () => {
			const { controller, eventEmitter } = createController();
			const handler = vi.fn();

			eventEmitter.on(ScenaEvent.ON_VIDEO_STATE_CHANGE, handler);
			controller.handlePlay(new Event('play'));

			expect(handler).toHaveBeenCalledOnce();
			expect(handler).toHaveBeenCalledWith({
				state: ScenaVideoState.PLAYING,
				event: expect.any(Event)
			});
		});

		it('should emit ON_VIDEO_PLAY on handlePlay', () => {
			const { controller, eventEmitter } = createController();
			const handler = vi.fn();

			eventEmitter.on(ScenaEvent.ON_VIDEO_PLAY, handler);
			controller.handlePlay(new Event('play'));

			expect(handler).toHaveBeenCalledOnce();
		});

		it('should emit ON_VIDEO_PAUSE on handlePause', () => {
			const { controller, eventEmitter } = createController();
			const handler = vi.fn();

			eventEmitter.on(ScenaEvent.ON_VIDEO_PAUSE, handler);
			controller.handlePause(new Event('pause'));

			expect(handler).toHaveBeenCalledOnce();
		});

		it('should emit ON_VIDEO_READY on handleLoadedMetadata', () => {
			const { controller, eventEmitter } = createController();
			const handler = vi.fn();

			eventEmitter.on(ScenaEvent.ON_VIDEO_READY, handler);
			controller.handleLoadedMetadata(new Event('loadedmetadata'));

			expect(handler).toHaveBeenCalledOnce();
		});

		it('should emit ON_VIDEO_ERROR on play failure', async () => {
			const video = createMockVideoElement();
			const eventEmitter = useEventEmitter();
			const handler = vi.fn();

			(video.play as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('play failed'));

			const controller = useVideoController({
				getVideoElement: () => video,
				eventEmitter
			});

			eventEmitter.on(ScenaEvent.ON_VIDEO_ERROR, handler);
			await controller.play();

			expect(handler).toHaveBeenCalledOnce();
		});

		it('should not emit ON_VIDEO_STATE_CHANGE when state is same', () => {
			const { controller, eventEmitter } = createController();
			const handler = vi.fn();

			controller.handlePlay(new Event('play'));

			eventEmitter.on(ScenaEvent.ON_VIDEO_STATE_CHANGE, handler);
			controller.handlePlay(new Event('play'));

			expect(handler).not.toHaveBeenCalled();
		});
	});

	describe('edge cases', () => {
		it('should throw when video element is not available for play', async () => {
			const eventEmitter = useEventEmitter();
			const controller = useVideoController({
				getVideoElement: () => null as unknown as HTMLVideoElement,
				eventEmitter
			});

			await expect(controller.play()).rejects.toThrow('Video element is not available');
		});

		it('should throw when video element is not available for pause', () => {
			const eventEmitter = useEventEmitter();
			const controller = useVideoController({
				getVideoElement: () => null as unknown as HTMLVideoElement,
				eventEmitter
			});

			expect(() => controller.pause()).toThrow('Video element is not available');
		});

		it('should set isSeeking on handleSeekStart', () => {
			const { controller } = createController();

			controller.handleSeekStart(new Event('seekstart'), ScenaVideoState.PLAYING);

			expect(controller.isSeeking).toBe(true);
		});

		it('should pause video on handleSeekStart when previously playing', () => {
			const { controller, video } = createController();

			controller.handleSeekStart(new Event('seekstart'), ScenaVideoState.PLAYING);

			expect(video.pause).toHaveBeenCalledOnce();
		});

		it('should resume play on handleSeekEnd when previously playing', async () => {
			const { controller, video } = createController();

			await controller.handleSeekEnd(new Event('seekend'), ScenaVideoState.PLAYING);

			expect(controller.isSeeking).toBe(false);
			expect(video.play).toHaveBeenCalledOnce();
		});
	});
});
