<script lang="ts">
	import { ComponentSize } from '@/shared/enums';
	import { formatComponentStyles } from '@/shared/utils';

	import { useProgressLine, scenaProgressLineThicknessMap } from '../model';
	import type { ScenaProgressLineEvents, ScenaProgressLineProps } from '../model';

	let {
		id,
		size = ComponentSize.MD,
		buffer = 0,
		progress = 0,
		hasBuffer,
		aria = { ariaLabel: 'Progress' },
		customThickness,
		customClasses,
		customStyles,
		onSeek,
		onSeekStart,
		onSeekEnd
	}: Partial<ScenaProgressLineProps & ScenaProgressLineEvents> = $props();

	let rootElement: HTMLDivElement;

	let trackElement: HTMLDivElement;

	let bufferElement: HTMLDivElement | null = $state(null);

	let progressElement: HTMLDivElement;

	const rootClasses = $derived(['rs-progress', 'rs-progress--line', customClasses?.root]);

	const rootStyles = $derived(formatComponentStyles(customStyles?.root));

	const trackClasses = $derived(['rs-progress__track', customClasses?.track]);

	const trackStyles = $derived(formatComponentStyles(customStyles?.track));

	const bufferClasses = $derived(['rs-progress__buffer', customClasses?.buffer]);

	const bufferStyles = $derived(formatComponentStyles(customStyles?.buffer));

	const progressClasses = $derived(['rs-progress__progress', customClasses?.progress]);

	const progressStyles = $derived(formatComponentStyles(customStyles?.progress));

	export function getElements() {
		return {
			root: rootElement,
			track: trackElement,
			buffer: bufferElement,
			progress: progressElement
		};
	}

	const progressLine = useProgressLine({
		getRootElement: () => rootElement,
		getProgress: () => progress,
		getSize: () => size,
		onSeek: (progress, event) => onSeek?.(progress, event),
		onSeekStart: (event: Event) => onSeekStart?.(event),
		onSeekEnd: (event: Event) => onSeekEnd?.(event),
		getCustomThickness: () => {
			return {
				...scenaProgressLineThicknessMap,
				...customThickness
			};
		}
	});
</script>

<div
	{id}
	bind:this={rootElement}
	class={rootClasses}
	style={rootStyles}
	role="slider"
	tabindex={0}
	aria-label={aria.ariaLabel}
	aria-labelledby={aria.ariaLabelledby}
	aria-describedby={aria.ariaDescribedby}
	aria-valuenow={progress * 100}
	aria-valuemin={0}
	aria-valuemax={100}
	aria-valuetext="{Math.round(progress * 100)}%"
>
	<div
		bind:this={trackElement}
		class={trackClasses}
		style={trackStyles}
		style:height="{progressLine.thickness}px"
		{...progressLine.events}
	>
		{#if hasBuffer}
			<div
				bind:this={bufferElement}
				class={bufferClasses}
				style={bufferStyles}
				style:width="{buffer * 100}%"
			></div>
		{/if}

		<div
			bind:this={progressElement}
			class={progressClasses}
			style={progressStyles}
			style:width="{progress * 100}%"
			style:transition={progressLine.transition}
		></div>
	</div>
</div>
