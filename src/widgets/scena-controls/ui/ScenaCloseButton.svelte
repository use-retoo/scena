<script lang="ts">
	import { ScenaEvent } from '@/entities/event';
	import { getScenaContext } from '@/entities/scena';
	import { IconCross } from '@/shared/assets/icons';
	import { ComponentSize, ComponentShape } from '@/shared/enums';
	import { ScenaButton, ScenaButtonShape, ScenaButtonVariant } from '@/shared/ui/scena-button';
	import { ScenaIcon } from '@/shared/ui/scena-icons';
	import { formatComponentStyles, resolveElements } from '@/shared/utils';

	import type { ScenaCloseButtonElements, ScenaCloseButtonProps } from '../model';

	let {
		id,
		size = ComponentSize.MD,
		shape = ComponentShape.CIRCLE,
		aria = { ariaLabel: 'Close' },
		customClasses,
		customStyles,
		onClick
	}: Partial<ScenaCloseButtonProps> = $props();

	const { eventEmitter, unmount } = getScenaContext();

	let rootElement: HTMLDivElement | null = $state(null);

	let buttonElement: ScenaButton | null = $state(null);

	let crossElement: ScenaIcon | null = $state(null);

	const rootClasses = $derived([
		'rs-close-button',
		`rs-close-button--${size}`,
		`rs-close-button--${shape}`,
		customClasses?.root
	]);

	const rootStyles = $derived(formatComponentStyles(customStyles?.root));

	function onCloseButtonClick(event: Event) {
		eventEmitter.emit(ScenaEvent.ON_CLOSE_CLICK, event);

		if (onClick) {
			onClick(event);
			return;
		}

		unmount();
	}

	export function getElements(): ScenaCloseButtonElements {
		return {
			root: rootElement,
			button: resolveElements(buttonElement),
			cross: resolveElements(crossElement)
		};
	}
</script>

<div {id} bind:this={rootElement} class={rootClasses} style={rootStyles}>
	<ScenaButton
		bind:this={buttonElement}
		{aria}
		autosize
		shape={ScenaButtonShape.CIRCLE}
		variant={ScenaButtonVariant.FILLED}
		customClasses={{ root: customClasses?.button }}
		customStyles={{ root: customStyles?.button }}
		onclick={onCloseButtonClick}
	>
		<ScenaIcon
			bind:this={crossElement}
			{size}
			customClasses={{ root: customClasses?.cross }}
			customStyles={{ root: customStyles?.cross }}
		>
			<IconCross />
		</ScenaIcon>
	</ScenaButton>
</div>
