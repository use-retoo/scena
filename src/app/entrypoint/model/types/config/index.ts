import type { ComponentShape, ComponentSize } from '@/shared/enums';
import type { ScenaContainerProps } from '@/widgets/scena-container';
import type { ScenaCloseButtonProps } from '@/widgets/scena-controls';
import type { ScenaCtaButtonProps } from '@/widgets/scena-cta';
import type { ScenaVideoProps } from '@/widgets/scena-video';
import type { ScenaVideoContainerProps } from '@/widgets/scena-video-container';
import type { ScenaVideoControlsProps } from '@/widgets/scena-video-controls';
import type { ScenaVideoLoaderProps } from '@/widgets/scena-video-loader';
import type { ScenaVideoProgressProps } from '@/widgets/scena-video-progress';
import type { ScenaVideoVolumeProps } from '@/widgets/scena-video-volume';

import type { ScenaPreviewConfig } from '../preview';
import type { ScenaResponsiveConfig } from '../responsive';
import type { ScenaVisibilityConfig } from '../visibility';

/** Per-component property overrides. Pass `false` to disable a component entirely. */
export interface ScenaOverrides {
	size: ComponentSize;
	shape: ComponentShape;
	container: Partial<ScenaContainerProps>;
	video: Partial<ScenaVideoProps> & Pick<ScenaVideoProps, 'src'>;
	videoContainer: Partial<ScenaVideoContainerProps>;
	videoLoader: Partial<ScenaVideoLoaderProps> | false;
	videoProgress: Partial<ScenaVideoProgressProps> | false;
	videoControls: Partial<ScenaVideoControlsProps> | false;
	videoVolume: Partial<ScenaVideoVolumeProps> | false;
	closeButton: Partial<ScenaCloseButtonProps> | false;
	ctaButton: Partial<ScenaCtaButtonProps> | false;
}

/** Component override config. All overrides are optional except `video` which requires at least `src`. */
export type ScenaConfigOverrides = Partial<ScenaOverrides> & Pick<ScenaOverrides, 'video'>;

/** Feature-specific sections of the widget config. */
export interface ScenaFeatures {
	preview: Partial<ScenaPreviewConfig>;
	visibility: Partial<ScenaVisibilityConfig>;
	responsive: ScenaResponsiveConfig;
}

/** Optional feature config. All feature sections are optional at the top level. */
export type ScenaConfigFeatures = Partial<ScenaFeatures>;

/** Root configuration object accepted by `scena.mount()`. */
export type ScenaConfig = ScenaConfigOverrides & ScenaConfigFeatures;

/** Reactive config store returned by {@link useScenaConfig}. */
export interface UseScenaConfigReturns {
	/** Current resolved config snapshot. */
	current: ScenaConfig;
	/** Returns the current config object. */
	getConfig: () => ScenaConfig;
	/** Replaces the entire config with a new value. */
	setConfig: (value: ScenaConfig) => void;
	/** Deeply merges a partial config into the current one. */
	mergeConfig: (partial: Partial<ScenaConfig>) => void;
}
