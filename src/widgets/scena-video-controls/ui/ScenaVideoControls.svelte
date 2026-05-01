<script lang="ts">
	import { getScenaVideoContext, ScenaVideoState } from '@/entities/video';
	import { IconPlay, IconPause } from '@/shared/assets/icons';
	import { ComponentSize } from '@/shared/enums';
	import { ScenaButton, ScenaButtonShape, ScenaButtonVariant } from '@/shared/ui/scena-button';
	import { ScenaIcon } from '@/shared/ui/scena-icons';
	import { formatComponentStyles } from '@/shared/utils';

	import type { ScenaVideoControlsProps } from '../model';

	let {
		id,
		size = ComponentSize.MD,
		aria = {
			play: { ariaLabel: 'Play' },
			pause: { ariaLabel: 'Pause' }
		},
		customClasses,
		customStyles
	}: Partial<ScenaVideoControlsProps> = $props();

	const scenaVideoContext = getScenaVideoContext();

	const isShownControls = $derived(!scenaVideoContext.isSeeking);

	let rootElement: HTMLDivElement | null = $state(null);

	let pauseButtonElement: ScenaButton | null = $state(null);

	let pauseIconElement: ScenaIcon | null = $state(null);

	let playButtonElement: ScenaButton | null = $state(null);

	let playIconElement: ScenaIcon | null = $state(null);

	const rootClasses = $derived(['rs-video-controls', customClasses?.root]);

	const rootStyles = $derived(formatComponentStyles(customStyles?.root));

	const videoState = $derived(scenaVideoContext.state);

	const isShownPause = $derived(ScenaVideoState.PLAYING === videoState);

	const isShownPlay = $derived([ScenaVideoState.IDLE, ScenaVideoState.PAUSED].includes(videoState));

	export function getElements() {
		return {
			root: rootElement,
			pauseButton: pauseButtonElement?.getElements(),
			pauseIcon: pauseIconElement?.getElements(),
			playButton: playButtonElement?.getElements(),
			playIcon: playIconElement?.getElements()
		};
	}
</script>

{#if isShownControls}
	<div {id} bind:this={rootElement} class={rootClasses} style={rootStyles}>
		<span role="status" aria-live="polite" aria-atomic="true" class="rs-sr-only">
			{#if isShownPause}
				Playing
			{:else if isShownPlay}
				Paused
			{/if}
		</span>
		{#if isShownPause}
			<ScenaButton
				bind:this={pauseButtonElement}
				{size}
				shape={ScenaButtonShape.CIRCLE}
				variant={ScenaButtonVariant.TEXT}
				aria={aria.pause}
				onclick={scenaVideoContext.pause}
			>
				<ScenaIcon
					bind:this={pauseIconElement}
					{size}
					viewBox="0 0 32 32"
					customClasses={{ root: customClasses?.pause }}
					customStyles={{ root: customStyles?.pause }}
				>
					<IconPause />
				</ScenaIcon>
			</ScenaButton>
		{:else if isShownPlay}
			<ScenaButton
				bind:this={playButtonElement}
				{size}
				shape={ScenaButtonShape.CIRCLE}
				variant={ScenaButtonVariant.TEXT}
				aria={aria.play}
				onclick={scenaVideoContext.play}
			>
				<ScenaIcon
					bind:this={playIconElement}
					{size}
					viewBox="0 0 32 32"
					customClasses={{ root: customClasses?.play }}
					customStyles={{ root: customStyles?.play }}
				>
					<IconPlay />
				</ScenaIcon>
			</ScenaButton>
		{/if}
	</div>
{/if}
