import type { ScenaElement } from '@/app/custom-element';
import type { UseScenaReturns, ScenaInstance } from '@/app/entrypoint';

declare global {
	const __VERSION__: string;
	const __NAME__: string;

	interface Window {
		scenaWidget: () => UseScenaReturns;
		defineScenaElement: () => void;
	}

	interface HTMLElementTagNameMap {
		'scena-video-widget': ScenaElement;
	}

	interface HTMLElementEventMap {
		'scena:mount': CustomEvent<ScenaInstance>;
		'scena:unmount': CustomEvent<void>;
	}
}
