<script lang="ts">
	import { onMount } from 'svelte';

	import { defineScenaElement } from '@/app/custom-element';
	import { useScena } from '@/app/entrypoint';
	import { ScenaEvent } from '@/entities/event';
	import { ComponentShape, ComponentSize } from '@/shared/enums';

	const widget = useScena();

	defineScenaElement();

	onMount(async () => {
		const instance = await widget.mount({
			shape: ComponentShape.PORTRAIT,
			video: {
				src: './examples/example-dog.mp4',
				poster: './examples/example-dog.jpg'
			},
			preview: {
				size: ComponentSize.SM,
				videoProgress: false,
				videoControls: false,
				videoVolume: false,
				ctaButton: false
			},
			responsive: {
				1024: {
					size: ComponentSize.LG
				}
			}
		});

		instance.api.events.on(ScenaEvent.ON_CTA_CLICK, () => {
			instance.preview.start();
		});

		instance.api.events.on(ScenaEvent.ON_VIDEO_ENDED, () => {
			widget.unmount(instance);
		});

		instance.api.events.on(ScenaEvent.ON_PREVIEW_START, () => {
			console.log(instance.preview);
		});

		instance.api.events.on(ScenaEvent.ON_VISIBILITY_SHOW, () => {
			console.log(instance.visibility);
		});
	});
</script>

<div></div>
