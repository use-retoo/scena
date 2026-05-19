<script lang="ts">
	import { ScenaEvent } from '@/entities/event';
	import { getScenaContext } from '@/entities/scena';
	import { ComponentSize } from '@/shared/enums';
	import { ScenaButton, ScenaButtonShape } from '@/shared/ui/scena-button';
	import { formatComponentStyles, resolveElements } from '@/shared/utils';

	import {
		ScenaCtaButtonPlacement,
		type ScenaCtaButtonElements,
		type ScenaCtaButtonProps
	} from '../model';

	let {
		id,
		text = 'Get in touch',
		size = ComponentSize.MD,
		placement = ScenaCtaButtonPlacement.INSIDE,
		adaptive = {
			sizes: [ComponentSize.XS, ComponentSize.SM],
			placement: ScenaCtaButtonPlacement.OUTSIDE
		},
		aria,
		customClasses,
		customStyles,
		customHtml,
		onClick
	}: Partial<ScenaCtaButtonProps> = $props();

	const { eventEmitter } = getScenaContext();

	const currentPlacement = $derived(
		adaptive && adaptive.sizes.includes(size) ? adaptive.placement : placement
	);

	let rootElement: HTMLDivElement | null = $state(null);

	let buttonElement: ScenaButton | null = $state(null);

	const rootClasses = $derived([
		'rs-cta-button',
		`rs-cta-button--${currentPlacement}`,
		customClasses?.root
	]);

	const rootStyles = $derived(formatComponentStyles(customStyles?.root));

	function onCtaButtonClick(event: Event) {
		eventEmitter.emit(ScenaEvent.ON_CTA_CLICK, event);

		if (onClick) {
			onClick(event);
		}
	}

	export function getElements(): ScenaCtaButtonElements {
		return {
			root: rootElement,
			button: resolveElements(buttonElement)
		};
	}
</script>

<div {id} bind:this={rootElement} class={rootClasses} style={rootStyles}>
	{#if customHtml?.button}
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html customHtml.button}
	{:else}
		<ScenaButton
			bind:this={buttonElement}
			{size}
			{aria}
			shape={ScenaButtonShape.RECTANGLE}
			customClasses={{ root: customClasses?.button }}
			customStyles={{ root: customStyles?.button }}
			onclick={onCtaButtonClick}
		>
			{text}
		</ScenaButton>
	{/if}
</div>
