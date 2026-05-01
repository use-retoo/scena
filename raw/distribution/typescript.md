# TypeScript

> Type declarations, exported interfaces, and TypeScript integration.

TypeScript declarations are bundled inside the package as `index.d.ts`. The compiler resolves them automatically — no separate `@types/*` package or manual `tsconfig` path mapping needed.

## Setup

Import from `@retoo/scena` and TypeScript resolves everything automatically. Enums, interfaces, and the composable are all available from the same entry point:

```ts
import { useScena, ScenaEvent, ComponentSize, ComponentShape } from '@retoo/scena';

const scena = useScena();

const instance = await scena.mount({
  video: { src: '/video.mp4' },
  size: ComponentSize.MD,
  shape: ComponentShape.CIRCLE,
});

instance.api.events.on(ScenaEvent.ON_CTA_CLICK, () => {
    console.log('CTA button click');
});
```

## Types

The types below cover the full public API surface — config input, instance handles, playback state, and runtime controls. Import only what you need; the rest is tree-shaken at build time.

#### ScenaConfig

Root config passed to `mount()`. Only `video.src` is required — everything else is optional.

```ts
type ScenaConfig = Partial<ScenaOverrides> & Pick<ScenaOverrides, 'video'> & Partial<ScenaFeatures>;
```

#### ScenaOverrides

Per-component field overrides. Pass `false` to disable a component entirely.

```ts
interface ScenaOverrides {
  size: ComponentSize;
  shape: ComponentShape;
  container: Partial<ScenaContainerProps>;
  video: Partial<ScenaVideoProps> & Pick<ScenaVideoProps, 'src'>;
  videoLoader: Partial<ScenaVideoLoaderProps> | false;
  videoProgress: Partial<ScenaVideoProgressProps> | false;
  videoControls: Partial<ScenaVideoControlsProps> | false;
  videoVolume: Partial<ScenaVideoVolumeProps> | false;
  closeButton: Partial<ScenaCloseButtonProps> | false;
  ctaButton: Partial<ScenaCtaButtonProps> | false;
}
```

#### ScenaFeatures

Optional feature sections: preview mode, visibility transitions, and responsive breakpoints.

```ts
interface ScenaFeatures {
  preview: Partial<ScenaPreviewConfig>;
  visibility: Partial<ScenaVisibilityConfig>;
  responsive: ScenaResponsiveConfig;
}
```

#### ScenaInstance

Handle returned by `mount()`. Entry point for all runtime APIs.

```ts
interface ScenaInstance {
  api: ScenaApi;
  component: ScenaRef;
  config: UseScenaConfigReturns;
  preview: ScenaPreviewApi;
  responsive: ScenaResponsiveApi;
  visibility: ScenaVisibilityApi;
}
```

#### ScenaApi

Top-level API surface exposed via `instance.api`.

```ts
interface ScenaApi {
  controller: UseVideoControllerReturns;
  components: ScenaComponents;
  events: ScenaEventEmitter;
}
```

#### UseScenaReturns

Return type of `useScena()` — the widget factory.

```ts
interface UseScenaReturns {
  NAME: string;
  VERSION: string;
  mount: (config: ScenaConfig, target?: ScenaTarget) => Promise<ScenaInstance>;
  unmount: (instance: ScenaInstance) => Promise<void>;
}
```

#### UseScenaConfigReturns

Reactive config store available via `instance.config`. Use `mergeConfig` to patch at runtime, `setConfig` to replace entirely.

```ts
interface UseScenaConfigReturns {
  current: ScenaConfig;
  getConfig: () => ScenaConfig;
  setConfig: (value: ScenaConfig) => void;
  mergeConfig: (partial: Partial<ScenaConfig>) => void;
}
```

#### ScenaVisibilityApi

Controls widget visibility at runtime. Available via `instance.visibility`.

```ts
interface ScenaVisibilityApi {
  isHidden: boolean;
  isShownOnReady: boolean;
  show: () => void;
  hide: () => void;
}
```

#### ScenaPreviewBehavior

Behavioral options for preview mode — passed inside the `preview` config key.

```ts
interface ScenaPreviewBehavior {
  keepTimeOnExpand: boolean;
  keepMuteOnExpand: boolean;
}
```

#### ScenaPreviewConfig

Full shape of the `preview` config key. Accepts all component overrides plus the two behavioral options.

```ts
type ScenaPreviewConfig = ScenaOverrides & ScenaPreviewBehavior;
```

#### ScenaPreviewApi

Controls preview mode at runtime. Available via `instance.preview`.

```ts
interface ScenaPreviewApi {
  isPreviewing: boolean;
  isKeepTimeOnExpand: boolean;
  isKeepMuteOnExpand: boolean;
  start: () => void;
  stop: () => void;
}
```

#### ScenaVideoData

Reactive playback state. Read via `instance.api.controller`.

```ts
interface ScenaVideoData {
  state: ScenaVideoState;
  currentTime: number;
  duration: number;
  progress: number;
  volume: number;
  buffer: number;
  isMuted: boolean;
  isBuffering: boolean;
  isSeeking: boolean;
}
```

#### ScenaVideoMethods

Imperative playback controls. Available via `instance.api.controller`.

```ts
interface ScenaVideoMethods {
  play: () => Promise<void>;
  pause: () => void;
  stop: () => void;
  seek: (value: number) => void;
  setVolume: (value: number) => void;
  mute: () => void;
  unmute: () => void;
  toggleMute: () => void;
}
```

#### UseVideoControllerReturns

Full controller type — combines reactive state and imperative methods.

```ts
type UseVideoControllerReturns = ScenaVideoData & ScenaVideoMethods;
```

## Enums

All enums are re-exported from the package root. Each value has a string equivalent — pass either form and Scena will accept both.

#### ComponentSize

T-shirt size scale used across all sizeable components.

```ts
enum ComponentSize {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
  XXL = 'xxl',
}
```

#### ComponentShape

Affects aspect ratio and border-radius of the video container.

```ts
enum ComponentShape {
  CIRCLE = 'circle',
  SQUARE = 'square',
  PORTRAIT = 'portrait',
  LANDSCAPE = 'landscape',
}
```

#### ComponentPosition

CSS `position` value for the outer container.

```ts
enum ComponentPosition {
  STATIC = 'static',
  RELATIVE = 'relative',
  ABSOLUTE = 'absolute',
  FIXED = 'fixed',
}
```

#### ComponentPlacement

Anchor position within the container — a 3×3 grid of named slots.

```ts
enum ComponentPlacement {
  TOP_START = 'top-start',
  TOP_CENTER = 'top-center',
  TOP_END = 'top-end',
  MIDDLE_START = 'middle-start',
  MIDDLE_CENTER = 'middle-center',
  MIDDLE_END = 'middle-end',
  BOTTOM_START = 'bottom-start',
  BOTTOM_CENTER = 'bottom-center',
  BOTTOM_END = 'bottom-end',
}
```

#### ScenaVideoState

Current playback state of the video element.

```ts
enum ScenaVideoState {
  IDLE = 'idle',
  LOADING = 'loading',
  PLAYING = 'playing',
  PAUSED = 'paused',
  ENDED = 'ended',
  ERROR = 'error',
}
```

#### ScenaVideoPreload

Preload strategy passed to the `<video>` element.

```ts
enum ScenaVideoPreload {
  NONE = 'none',
  AUTO = 'auto',
  METADATA = 'metadata',
}
```

#### ScenaCtaButtonPlacement

Whether the CTA button renders inside or outside the video container.

```ts
enum ScenaCtaButtonPlacement {
  INSIDE = 'inside',
  OUTSIDE = 'outside',
}
```

## Usage examples

Common patterns for integrating Scena's types into your own code — config authoring, event handling, controller access, and runtime API control.

#### Typing the config

Annotate the config object explicitly to get IDE completion and catch invalid values before mounting.

```ts
import {
  useScena,
  ComponentSize,
  ComponentShape,
  type ScenaConfig,
} from '@retoo/scena';

const config: ScenaConfig = {
  video: { src: '/video.mp4' },
  size: ComponentSize.MD,
  shape: ComponentShape.CIRCLE,
};

const scena = useScena();
const instance = await scena.mount(config);
```

#### Typing an event handler

Use `ScenaEventHandler` to annotate callbacks passed to the event emitter.

```ts
import { ScenaEvent, type ScenaEventHandler } from '@retoo/scena';

const onCtaClick: ScenaEventHandler = () => {
  window.location.href = '/contact';
};

instance.api.events.on(ScenaEvent.ON_CTA_CLICK, onCtaClick);
```

#### Working with the video controller

`UseVideoControllerReturns` combines reactive state and imperative methods — useful when passing the controller to helper functions.

```ts
import type { UseVideoControllerReturns } from '@retoo/scena';

function logPlaybackState(controller: UseVideoControllerReturns) {
  console.log(controller.state);
  console.log(controller.currentTime);
  console.log(controller.duration);
  console.log(controller.progress);
  console.log(controller.isMuted);
}

logPlaybackState(instance.api.controller);
```

#### Controlling visibility and preview

Annotate references to the visibility and preview APIs for safe access in service layers or framework wrappers.

```ts
import type { ScenaVisibilityApi, ScenaPreviewApi } from '@retoo/scena';

const visibility: ScenaVisibilityApi = instance.visibility;
visibility.hide();

const preview: ScenaPreviewApi = instance.preview;
preview.start();
```

#### Using enums in config

Enum values are the recommended way to set shape, size, position, and other discrete options. The string equivalents also work, but enums give you autocomplete and catch typos at compile time.

```ts
import {
  useScena,
  ComponentSize,
  ComponentShape,
  ComponentPosition,
  ComponentPlacement,
} from '@retoo/scena';

const scena = useScena();

const instance = await scena.mount({
  video: { src: '/video.mp4' },
  size: ComponentSize.MD,
  shape: ComponentShape.PORTRAIT,
  container: {
    position: ComponentPosition.FIXED,
    placement: ComponentPlacement.BOTTOM_END,
  },
});
```
