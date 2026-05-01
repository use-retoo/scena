<script lang="ts">
	import { getScenaVideoContext } from '@/entities/video';
	import { IconMute, IconUnmute } from '@/shared/assets/icons';
	import { ComponentSize, ComponentShape } from '@/shared/enums';
	import { ScenaButton, ScenaButtonShape, ScenaButtonVariant } from '@/shared/ui/scena-button';
	import { ScenaIcon } from '@/shared/ui/scena-icons';
	import { formatComponentStyles } from '@/shared/utils';

	import type { ScenaVideoVolumeProps } from '../model';

	let {
		id,
		size = ComponentSize.MD,
		shape = ComponentShape.CIRCLE,
		aria = {
			mute: { ariaLabel: 'Mute' },
			unmute: { ariaLabel: 'Unmute' }
		},
		customClasses,
		customStyles
	}: Partial<ScenaVideoVolumeProps> = $props();

	const scenaVideoContext = getScenaVideoContext();

	const isShownControls = $derived(!scenaVideoContext.isSeeking);

	let rootElement: HTMLDivElement | null = $state(null);

	let unmuteButtonElement: ScenaButton | null = $state(null);

	let unmuteIconElement: ScenaIcon | null = $state(null);

	let muteButtonElement: ScenaButton | null = $state(null);

	let muteIconElement: ScenaIcon | null = $state(null);

	const rootClasses = $derived([
		'rs-video-volume',
		`rs-video-volume--${shape}`,
		customClasses?.root
	]);

	const rootStyles = $derived(formatComponentStyles(customStyles?.root));

	export function getElements() {
		return {
			root: rootElement,
			unmuteButton: unmuteButtonElement?.getElements(),
			unmuteIcon: unmuteIconElement?.getElements(),
			muteButton: muteButtonElement?.getElements(),
			muteIcon: muteIconElement?.getElements()
		};
	}
</script>

{#if isShownControls}
	<div {id} bind:this={rootElement} class={rootClasses} style={rootStyles}>
		<span role="status" aria-live="polite" aria-atomic="true" class="rs-sr-only">
			{#if scenaVideoContext.isMuted}
				Muted
			{:else}
				Unmuted
			{/if}
		</span>
		{#if scenaVideoContext.isMuted}
			<ScenaButton
				bind:this={unmuteButtonElement}
				{size}
				shape={ScenaButtonShape.CIRCLE}
				variant={ScenaButtonVariant.TEXT}
				aria={aria.unmute}
				onclick={scenaVideoContext.unmute}
			>
				<ScenaIcon
					bind:this={unmuteIconElement}
					{size}
					customClasses={{ root: customClasses?.unmute }}
					customStyles={{ root: customStyles?.unmute }}
				>
					<IconUnmute />
				</ScenaIcon>
			</ScenaButton>
		{:else}
			<ScenaButton
				bind:this={muteButtonElement}
				{size}
				shape={ScenaButtonShape.CIRCLE}
				variant={ScenaButtonVariant.TEXT}
				aria={aria.mute}
				onclick={scenaVideoContext.mute}
			>
				<ScenaIcon
					bind:this={muteIconElement}
					{size}
					customClasses={{ root: customClasses?.mute }}
					customStyles={{ root: customStyles?.mute }}
				>
					<IconMute />
				</ScenaIcon>
			</ScenaButton>
		{/if}
	</div>
{/if}
