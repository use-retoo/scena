<script lang="ts">
	import { getScenaVideoContext, ScenaVideoState } from '@/entities/video';
	import { ComponentSize, ComponentShape } from '@/shared/enums';
	import { ScenaProgressLine, ScenaProgressCircle } from '@/shared/ui/scena-progress';

	import type { ScenaVideoProgressProps } from '../model';

	let {
		id,
		size = ComponentSize.MD,
		shape = ComponentShape.CIRCLE,
		hasBuffer = true,
		customThickness,
		customClasses,
		customStyles,
		aria
	}: Partial<ScenaVideoProgressProps> = $props();

	let rootElement: ScenaProgressLine | ScenaProgressCircle | null = $state(null);

	const scenaVideoContext = getScenaVideoContext();

	let previousState = $state<ScenaVideoState | null>(null);

	const linearShapes = [ComponentShape.PORTRAIT, ComponentShape.LANDSCAPE, ComponentShape.SQUARE];

	const circleShapes = [ComponentShape.CIRCLE];

	const isLine = $derived(linearShapes.includes(shape));

	const isCircle = $derived(circleShapes.includes(shape));

	function onSeek(progress: number): void {
		const time = progress * scenaVideoContext.duration;
		scenaVideoContext.seek(time);
	}

	function onSeekStart(event: Event): void {
		previousState = scenaVideoContext.state;

		scenaVideoContext.handleSeekStart(event, previousState);
	}

	async function onSeekEnd(event: Event): Promise<void> {
		if (!previousState) return;

		await scenaVideoContext.handleSeekEnd(event, previousState);
		previousState = null;
	}

	export function getElements() {
		return rootElement?.getElements() ?? null;
	}
</script>

{#if isLine}
	<ScenaProgressLine
		{id}
		bind:this={rootElement}
		{size}
		buffer={scenaVideoContext.buffer}
		progress={scenaVideoContext.progress}
		customThickness={customThickness?.line}
		{hasBuffer}
		{onSeek}
		{onSeekStart}
		{onSeekEnd}
		{customClasses}
		{customStyles}
		{aria}
	/>
{:else if isCircle}
	<ScenaProgressCircle
		{id}
		bind:this={rootElement}
		{size}
		buffer={scenaVideoContext.buffer}
		progress={scenaVideoContext.progress}
		customThickness={customThickness?.circle}
		{hasBuffer}
		{onSeek}
		{onSeekStart}
		{onSeekEnd}
		{customClasses}
		{customStyles}
		{aria}
	/>
{/if}
