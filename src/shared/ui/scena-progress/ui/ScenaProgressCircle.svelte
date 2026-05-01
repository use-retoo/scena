<script lang="ts">
	import { ComponentSize } from '@/shared/enums';
	import { formatComponentStyles } from '@/shared/utils';

	import { useProgressCircle, scenaProgressCircleThicknessMap } from '../model';
	import type { ScenaProgressCircleEvents, ScenaProgressCircleProps } from '../model';

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
	}: Partial<ScenaProgressCircleProps & ScenaProgressCircleEvents> = $props();

	let rootElement: SVGSVGElement;

	let trackElement: SVGCircleElement | null = $state(null);

	let bufferElement: SVGCircleElement | null = $state(null);

	let progressElement: SVGCircleElement | null = $state(null);

	const rootClasses = $derived(['rs-progress', 'rs-progress--circle', customClasses?.root]);

	const rootStyles = $derived(formatComponentStyles(customStyles?.root));

	const trackClasses = $derived(['rs-progress__track', customClasses?.track]);

	const trackStyles = $derived(formatComponentStyles(customStyles?.track));

	const bufferClasses = $derived(['rs-progress__buffer', customClasses?.buffer]);

	const bufferStyles = $derived(formatComponentStyles(customStyles?.buffer));

	const progressClasses = $derived(['rs-progress__progress', customClasses?.progress]);

	const progressStyles = $derived(formatComponentStyles(customStyles?.progress));

	const progressCircle = useProgressCircle({
		getRootElement: () => rootElement,
		getProgress: () => progress,
		getBuffer: () => buffer,
		getSize: () => size,
		onSeek: (progress, event) => onSeek?.(progress, event),
		onSeekStart: (event: Event) => onSeekStart?.(event),
		onSeekEnd: (event: Event) => onSeekEnd?.(event),
		getCustomThickness: () => ({
			...scenaProgressCircleThicknessMap,
			...customThickness
		})
	});

	export function getElements() {
		return {
			root: rootElement,
			track: trackElement,
			buffer: bufferElement,
			progress: progressElement
		};
	}

	function overrideTransition(componentStyles: string | undefined): string | undefined {
		const transitionOverride = progressCircle.transition;

		if (!transitionOverride) {
			return componentStyles;
		}

		const transitionStyle = `transition: ${transitionOverride};`;

		if (!componentStyles) {
			return transitionStyle;
		}

		return `${transitionStyle} ${componentStyles}`;
	}
</script>

<svg
	{id}
	bind:this={rootElement}
	class={rootClasses}
	style={rootStyles}
	viewBox="0 0 {progressCircle.radialSize} {progressCircle.radialSize}"
	tabindex={0}
	role="slider"
	aria-label={aria.ariaLabel}
	aria-labelledby={aria.ariaLabelledby}
	aria-describedby={aria.ariaDescribedby}
	aria-valuenow={progress * 100}
	aria-valuemin={0}
	aria-valuemax={100}
	aria-valuetext="{Math.round(progress * 100)}%"
	xmlns="http://www.w3.org/2000/svg"
>
	{#if progressCircle.radialSize}
		<circle
			bind:this={trackElement}
			class={trackClasses}
			style={overrideTransition(trackStyles)}
			cx={progressCircle.radialSize / 2}
			cy={progressCircle.radialSize / 2}
			r={progressCircle.radialRadius}
			fill="none"
			stroke="rgba(255, 255, 255, 0.2)"
			stroke-width={progressCircle.thickness}
			pointer-events="none"
		/>

		{#if hasBuffer}
			<circle
				bind:this={bufferElement}
				class={bufferClasses}
				style={overrideTransition(bufferStyles)}
				cx={progressCircle.radialSize / 2}
				cy={progressCircle.radialSize / 2}
				r={progressCircle.radialRadius}
				fill="none"
				stroke="rgba(255, 255, 255, 0.4)"
				stroke-width={progressCircle.thickness}
				stroke-dasharray={progressCircle.radialCircumference}
				stroke-dashoffset={progressCircle.radialBufferOffset}
				stroke-linecap="round"
				transform="rotate(-90 {progressCircle.radialSize / 2} {progressCircle.radialSize / 2})"
				pointer-events="none"
			/>
		{/if}

		<circle
			bind:this={progressElement}
			class={progressClasses}
			style={overrideTransition(progressStyles)}
			cx={progressCircle.radialSize / 2}
			cy={progressCircle.radialSize / 2}
			r={progressCircle.radialRadius}
			fill="none"
			stroke="rgba(255, 255, 255, 1)"
			stroke-width={progressCircle.thickness}
			stroke-dasharray={progressCircle.radialCircumference}
			stroke-dashoffset={progressCircle.radialProgressOffset}
			stroke-linecap="round"
			transform="rotate(-90 {progressCircle.radialSize / 2} {progressCircle.radialSize / 2})"
			pointer-events="none"
		/>

		<circle
			class="rs-progress__hit-area"
			cx={progressCircle.radialSize / 2}
			cy={progressCircle.radialSize / 2}
			r={progressCircle.radialRadius}
			fill="none"
			stroke="transparent"
			stroke-width={progressCircle.hitAreaThickness}
			{...progressCircle.events}
		/>
	{/if}
</svg>
