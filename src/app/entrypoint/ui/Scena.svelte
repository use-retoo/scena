<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	import { ScenaEvent } from '@/entities/event';
	import { setScenaContext } from '@/entities/scena';
	import { useAnimator } from '@/shared/lib/animator';
	import { ScenaContainer } from '@/widgets/scena-container';
	import { ScenaCloseButton } from '@/widgets/scena-controls';
	import { ScenaCtaButton } from '@/widgets/scena-cta';
	import { ScenaVideo } from '@/widgets/scena-video';
	import { ScenaVideoContainer } from '@/widgets/scena-video-container';
	import { ScenaVideoControls } from '@/widgets/scena-video-controls';
	import { ScenaVideoLoader } from '@/widgets/scena-video-loader';
	import { ScenaVideoProgress } from '@/widgets/scena-video-progress';
	import { ScenaVideoVolume } from '@/widgets/scena-video-volume';

	import type { ScenaApi, ScenaProps } from '../model';

	const { config, eventEmitter, mount, unmount }: ScenaProps = $props();

	let scenaContainer: ScenaContainer;

	let scenaVideoContainer: ScenaVideoContainer;

	let scenaVideo: ScenaVideo;

	let scenaVideoLoader: ScenaVideoLoader | null = $state(null);

	let scenaVideoProgress: ScenaVideoProgress | null = $state(null);

	let scenaVideoControls: ScenaVideoControls | null = $state(null);

	let scenaVideoVolume: ScenaVideoVolume | null = $state(null);

	let scenaCloseButton: ScenaCloseButton | null = $state(null);

	let scenaCtaButton: ScenaCtaButton | null = $state(null);

	setScenaContext({
		get eventEmitter() {
			return eventEmitter;
		},
		mount: () => mount(),
		unmount: () => unmount()
	});

	const isAnimated = $derived(config.visibility?.isAnimated ?? true);

	const isHidden = $derived(config.visibility?.isHidden ?? false);

	const isShownOnReady = $derived(config.visibility?.isShownOnReady ?? false);

	const containerAnimator = useAnimator({
		getIsAnimated: () => isAnimated,
		getIsShownOnReady: () => isShownOnReady,
		getIsHidden: () => isHidden,
		classNames: {
			hidden: 'rs-container--hidden',
			in: 'rs-pop-in',
			out: 'rs-pop-out'
		}
	});

	const size = $derived(config.size);

	const shape = $derived(config.shape);

	const containerProps = $derived({
		...config.container,
		customClasses: {
			...config.container?.customClasses,
			root: [config.container?.customClasses?.root, containerAnimator.classes]
		}
	});

	const videoProps = $derived(config.video);

	const videoLoaderProps = $derived(config.videoLoader);

	const videoContainerProps = $derived(config.videoContainer);

	const videoControlsProps = $derived(config.videoControls);

	const videoProgressProps = $derived(config.videoProgress);

	const videoVolumeProps = $derived(config.videoVolume);

	const closeButtonProps = $derived(config.closeButton);

	const ctaButtonProps = $derived(config.ctaButton);

	const rootClasses = $derived(['rs']);

	export const api: ScenaApi = {
		get controller() {
			return scenaVideo.controller;
		},
		get components() {
			return {
				container: scenaContainer,
				video: scenaVideo,
				videoContainer: scenaVideoContainer,
				videoLoader: scenaVideoLoader,
				videoProgress: scenaVideoProgress,
				videoControls: scenaVideoControls,
				videoVolume: scenaVideoVolume,
				closeButton: scenaCloseButton,
				ctaButton: scenaCtaButton
			};
		},
		get events() {
			return eventEmitter;
		}
	};

	onMount(() => {
		mount();
		eventEmitter.emit(ScenaEvent.ON_SCENA_MOUNT);
	});

	onDestroy(() => {
		eventEmitter.emit(ScenaEvent.ON_SCENA_DESTROY);
		eventEmitter.clear();
	});
</script>

<div class={rootClasses}>
	<ScenaContainer bind:this={scenaContainer} {...containerProps}>
		<ScenaVideoContainer bind:this={scenaVideoContainer} {size} {shape} {...videoContainerProps}>
			<ScenaVideo bind:this={scenaVideo} {...videoProps}>
				{#if videoLoaderProps !== false}
					<ScenaVideoLoader bind:this={scenaVideoLoader} {size} {...videoLoaderProps} />
				{/if}

				{#if videoProgressProps !== false}
					<ScenaVideoProgress
						bind:this={scenaVideoProgress}
						{size}
						{shape}
						{...videoProgressProps}
					/>
				{/if}

				{#if videoControlsProps !== false}
					<ScenaVideoControls bind:this={scenaVideoControls} {size} {...videoControlsProps} />
				{/if}

				{#if videoVolumeProps !== false}
					<ScenaVideoVolume bind:this={scenaVideoVolume} {size} {shape} {...videoVolumeProps} />
				{/if}
			</ScenaVideo>
		</ScenaVideoContainer>

		{#if closeButtonProps !== false}
			<ScenaCloseButton bind:this={scenaCloseButton} {size} {shape} {...closeButtonProps} />
		{/if}

		{#if ctaButtonProps !== false}
			<ScenaCtaButton bind:this={scenaCtaButton} {size} {...ctaButtonProps} />
		{/if}
	</ScenaContainer>
</div>
