import { defineScenaElement } from '@/app/custom-element';
import { useScena } from '@/app/entrypoint';
import { isBrowser } from '@/shared/utils';

if (isBrowser) {
	/** Exposes the widget factory for programmatic usage by host apps. */
	window.scenaWidget = useScena;

	/** Exposes the custom element registration for declarative usage by host apps. */
	window.defineScenaElement = defineScenaElement;
}

export * from '@/app/entrypoint';
export * from '@/app/custom-element';
export * from '@/entities/scena/model';
export * from '@/entities/video/model';
export * from '@/entities/event/model';
export * from '@/shared/enums';
export * from '@/shared/ui/scena-progress/model';
export * from '@/shared/ui/scena-icons/model';
export * from '@/shared/ui/scena-button/model';
export * from '@/shared/ui/scena-loader/model';
export * from '@/widgets/scena-container/model';
export * from '@/widgets/scena-controls/model';
export * from '@/widgets/scena-cta/model';
export * from '@/widgets/scena-video/model';
export * from '@/widgets/scena-video-container/model';
export * from '@/widgets/scena-video-controls/model';
export * from '@/widgets/scena-video-loader/model';
export * from '@/widgets/scena-video-progress/model';
export * from '@/widgets/scena-video-volume/model';
export type * from '@/shared/types';
