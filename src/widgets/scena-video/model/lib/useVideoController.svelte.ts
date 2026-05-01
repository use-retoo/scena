import { onDestroy } from 'svelte';

import { ScenaEvent } from '@/entities/event';
import { type ScenaVideoEventOptions, ScenaVideoState } from '@/entities/video';

import type { UseVideoControllerOptions, UseVideoControllerReturns } from '../types';

export default function useVideoController({
	getVideoElement,
	eventEmitter
}: UseVideoControllerOptions): UseVideoControllerReturns {
	let state = $state<ScenaVideoState>(ScenaVideoState.IDLE);
	let currentTime = $state<number>(0);
	let duration = $state<number>(0);
	let progress = $state<number>(0);
	let progressAnimationFrameId = $state<number | null>(null);
	let volume = $state<number>(1);
	let buffer = $state<number>(0);
	let buffered = $state<TimeRanges | null>(null);
	let isMuted = $state<boolean>(false);
	let isSeeking = $state<boolean>(false);
	let isBuffering = $state<boolean>(false);

	function getVideoElementSafe(): HTMLVideoElement {
		const video = getVideoElement();

		if (!video) {
			throw new Error('Video element is not available');
		}

		return video;
	}

	function setState(value: ScenaVideoState, event: Event): void {
		if (state === value) {
			return;
		}

		state = value;

		eventEmitter.emit<ScenaVideoEventOptions>(ScenaEvent.ON_VIDEO_STATE_CHANGE, {
			state,
			event
		});
	}

	function setBuffering(value: boolean): void {
		if (isBuffering === value) {
			return;
		}

		isBuffering = value;
	}

	function setSeeking(value: boolean): void {
		if (isSeeking === value) {
			return;
		}

		isSeeking = value;
	}

	async function play(): Promise<void> {
		const video = getVideoElementSafe();

		try {
			await video.play();
		} catch (error) {
			eventEmitter.emit(ScenaEvent.ON_VIDEO_ERROR, { state, error });
		}
	}

	function pause(): void {
		const video = getVideoElementSafe();

		video.pause();
	}

	function stop(): void {
		const video = getVideoElementSafe();

		video.pause();
		video.currentTime = 0;

		stopProgressAnimation();
	}

	function seek(time: number): void {
		const video = getVideoElementSafe();

		video.currentTime = Math.max(0, Math.min(video.duration || 0, time));
	}

	function mute(): void {
		getVideoElementSafe().muted = true;
	}

	function unmute(): void {
		getVideoElementSafe().muted = false;
	}

	function toggleMute(): void {
		const video = getVideoElementSafe();

		video.muted = !video.muted;
	}

	function setVolume(value: number): void {
		const video = getVideoElementSafe();

		video.volume = Math.max(0, Math.min(1, value));
	}

	function stopProgressAnimation(): void {
		if (progressAnimationFrameId !== null) {
			cancelAnimationFrame(progressAnimationFrameId);
			progressAnimationFrameId = null;
		}
	}

	function progressRequestAnimation() {
		const video = getVideoElement();

		if (video) {
			currentTime = isFinite(video.currentTime) ? video.currentTime : 0;
			progress = video.duration > 0 ? currentTime / video.duration : 0;

			const end =
				video.buffered && video.buffered.length > 0
					? video.buffered.end(video.buffered.length - 1)
					: 0;

			buffer = video.duration > 0 ? end / video.duration : 0;

			progressAnimationFrameId = requestAnimationFrame(progressRequestAnimation);
		}
	}

	function handleLoadedMetadata(event: Event): void {
		const video = getVideoElement();

		setBuffering(false);

		if (video) {
			duration = isFinite(video.duration) ? video.duration : 0;
			volume = video.volume;
			isMuted = video.muted;
		}

		eventEmitter.emit<ScenaVideoEventOptions>(ScenaEvent.ON_VIDEO_READY, {
			state,
			event
		});
	}

	function handlePlay(event: Event): void {
		setBuffering(false);

		setState(ScenaVideoState.PLAYING, event);

		eventEmitter.emit<ScenaVideoEventOptions>(ScenaEvent.ON_VIDEO_PLAY, {
			state,
			event
		});

		progressAnimationFrameId = requestAnimationFrame(progressRequestAnimation);
	}

	function handlePause(event: Event): void {
		setState(ScenaVideoState.PAUSED, event);

		eventEmitter.emit<ScenaVideoEventOptions>(ScenaEvent.ON_VIDEO_PAUSE, {
			state,
			event
		});
	}

	function handleSeeking(event: Event): void {
		eventEmitter.emit<ScenaVideoEventOptions>(ScenaEvent.ON_VIDEO_SEEKING, {
			state,
			event
		});
	}

	function handleSeeked(event: Event): void {
		eventEmitter.emit<ScenaVideoEventOptions>(ScenaEvent.ON_VIDEO_SEEKED, {
			state,
			event
		});
	}

	function handleSeekStart(event: Event, previousState: ScenaVideoState): void {
		setSeeking(true);

		if (previousState === ScenaVideoState.PLAYING) {
			pause();
		}

		/** Start the rAF loop for smooth ~60fps progress updates while dragging. */
		if (progressAnimationFrameId === null) {
			progressAnimationFrameId = requestAnimationFrame(progressRequestAnimation);
		}

		eventEmitter.emit<ScenaVideoEventOptions>(ScenaEvent.ON_VIDEO_SEEK_START, {
			state,
			event
		});
	}

	async function handleSeekEnd(event: Event, previousState: ScenaVideoState): Promise<void> {
		setSeeking(false);

		setState(previousState, event);

		if (previousState === ScenaVideoState.PLAYING) {
			await play();
		} else {
			stopProgressAnimation();
		}

		eventEmitter.emit<ScenaVideoEventOptions>(ScenaEvent.ON_VIDEO_SEEK_END, {
			state,
			event
		});
	}

	function handleEnded(event: Event): void {
		const video = getVideoElement();

		if (!video?.loop) {
			stopProgressAnimation();
		}

		setBuffering(false);
		setState(ScenaVideoState.ENDED, event);

		eventEmitter.emit<ScenaVideoEventOptions>(ScenaEvent.ON_VIDEO_ENDED, {
			state,
			event
		});
	}

	function handleLoadStart(event: Event): void {
		setState(ScenaVideoState.LOADING, event);

		eventEmitter.emit<ScenaVideoEventOptions>(ScenaEvent.ON_VIDEO_LOAD_START, {
			state,
			event
		});
	}

	function handleLoaded(event: Event): void {
		eventEmitter.emit<ScenaVideoEventOptions>(ScenaEvent.ON_VIDEO_LOADED, {
			state,
			event
		});
	}

	function handleWaiting(event: Event): void {
		setBuffering(true);
		setState(ScenaVideoState.LOADING, event);

		eventEmitter.emit<ScenaVideoEventOptions>(ScenaEvent.ON_VIDEO_WAITING, {
			state,
			event
		});
	}

	function handleCanPlay(event: Event): void {
		setBuffering(false);

		const video = getVideoElement();

		if (video) {
			switch (state) {
				case ScenaVideoState.LOADING:
					setState(video.paused ? ScenaVideoState.IDLE : ScenaVideoState.PLAYING, event);
					break;
			}

			eventEmitter.emit<ScenaVideoEventOptions>(ScenaEvent.ON_VIDEO_CAN_PLAY, {
				state,
				event
			});
		}
	}

	function handleTimeUpdate(event: Event): void {
		const video = getVideoElement();

		if (video) {
			currentTime = isFinite(video.currentTime) ? video.currentTime : 0;
			progress = video.duration > 0 ? currentTime / video.duration : 0;
		}

		eventEmitter.emit<ScenaVideoEventOptions>(ScenaEvent.ON_VIDEO_TIME_UPDATE, {
			state,
			event
		});
	}

	function handleVolumeChange(event: Event): void {
		const video = getVideoElement();

		if (video) {
			volume = video.volume;
			isMuted = video.muted;
		}

		eventEmitter.emit<ScenaVideoEventOptions>(ScenaEvent.ON_VIDEO_VOLUME_CHANGE, {
			state,
			event
		});
	}

	function handleProgress(event: Event): void {
		const video = getVideoElement();

		if (video) {
			buffered = video.buffered;

			const end =
				video.buffered && video.buffered.length > 0
					? video.buffered.end(video.buffered.length - 1)
					: 0;

			buffer = video.duration > 0 ? end / video.duration : 0;
		}

		eventEmitter.emit<ScenaVideoEventOptions>(ScenaEvent.ON_VIDEO_PROGRESSED, {
			state,
			event
		});
	}

	function handleError(event: Event) {
		stopProgressAnimation();

		setBuffering(false);
		setState(ScenaVideoState.ERROR, event);

		eventEmitter.emit<ScenaVideoEventOptions>(ScenaEvent.ON_VIDEO_ERROR, {
			state,
			event
		});
	}

	onDestroy(() => {
		stopProgressAnimation();
	});

	return {
		get state() {
			return state;
		},
		get currentTime() {
			return currentTime;
		},
		get duration() {
			return duration;
		},
		get progress() {
			return progress;
		},
		get progressAnimationFrameId() {
			return progressAnimationFrameId;
		},
		get volume() {
			return volume;
		},
		get buffer() {
			return buffer;
		},
		get buffered() {
			return buffered;
		},
		get isBuffering() {
			return isBuffering;
		},
		get isSeeking() {
			return isSeeking;
		},
		get isMuted() {
			return isMuted;
		},
		play,
		pause,
		stop,
		seek,
		mute,
		unmute,
		toggleMute,
		setVolume,
		handleLoadedMetadata,
		handlePlay,
		handlePause,
		handleSeeking,
		handleSeeked,
		handleSeekStart,
		handleSeekEnd,
		handleEnded,
		handleLoadStart,
		handleLoaded,
		handleWaiting,
		handleCanPlay,
		handleTimeUpdate,
		handleVolumeChange,
		handleProgress,
		handleError
	};
}
