# Quick Start

> Mount your first video widget in under 5 minutes.

## Basic setup

<steps>

### Import Scena

Import the factory function and the required stylesheet:

```ts
import { useScena } from '@retoo/scena';

import '@retoo/scena/styles';
```

### Create a factory

`useScena()` returns a factory object that manages widget instances. One factory can create multiple independent widgets:

```ts
const scena = useScena();
```

### Mount the widget

Pass a config object to `mount()`. The only required field is `video.src` — all other options use defaults:

```ts
const instance = await scena.mount({
  video: { src: '/video.mp4' }
});
```

`mount()` is async — it resolves after the widget is rendered and attached to the DOM. By default, the widget appears in the bottom-right corner of the viewport.

</steps>

## Full example

A complete setup with a custom shape, poster image, and CTA button:

<scena-container>
<scena-component :config="{"video":{"src":"/examples/example-cat.mp4","poster":"/examples/example-cat.jpg","autoplay":false,"loop":true,"muted":true},"size":"md","shape":"circle","container":{"position":"absolute","placement":"middle-center"},"ctaButton":{"text":"Get in touch","customClasses":{"button":"bg-red"}}}">



</scena-component>
</scena-container>

```ts [main.ts]
import {
  useScena,
  ComponentSize,
  ComponentShape,
  ComponentPosition,
} from '@retoo/scena';

import '@retoo/scena/styles';

const scena = useScena();

const instance = await scena.mount({
  video: {
    src: '/video.mp4',
    poster: '/poster.jpg',
    autoplay: false,
    loop: true,
    muted: true,
  },
  size: ComponentSize.MD,
  shape: ComponentShape.CIRCLE,
  container: { position: ComponentPosition.RELATIVE },
  ctaButton: { text: 'Get in touch' },
});
```

## Controlling playback

The `instance.api.controller` interface provides full control over the video element. All methods are available immediately after mount:

```ts
// Play and pause
await instance.api.controller.play();
instance.api.controller.pause();

// Seek to a specific time in seconds
instance.api.controller.seek(15);

// Volume control (0.0 to 1.0)
instance.api.controller.setVolume(0.5);
instance.api.controller.mute();
instance.api.controller.unmute();
```

You can also read the current playback state at any time:

```ts
instance.api.controller.currentTime; 
instance.api.controller.duration;
instance.api.controller.progress;
instance.api.controller.isMuted;
instance.api.controller.state;
```

## Listening to events

Subscribe to typed events through `instance.api.events` to connect the widget with your application logic:

```ts [events.ts]
import { ScenaEvent } from '@retoo/scena';

// User clicked the CTA button
instance.api.events.on(ScenaEvent.ON_CTA_CLICK, () => {
  window.location.href = '/contact';
});

// Video finished playing
instance.api.events.on(ScenaEvent.ON_VIDEO_ENDED, () => {
  showNextStep();
});

// Track playback progress
instance.api.events.on(ScenaEvent.ON_VIDEO_TIME_UPDATE, ({ state }) => {
  analytics.track('video_progress', { time: state.currentTime });
});
```

To remove a specific handler, pass the same function reference to `off()`:

```ts
const handler = () => console.log('played');

instance.api.events.on(ScenaEvent.ON_VIDEO_PLAY, handler);

// Later
instance.api.events.off(ScenaEvent.ON_VIDEO_PLAY, handler);
```

## Runtime

Modify any config property after mount without recreating the widget. `mergeConfig()` performs a deep merge — only the fields you pass are updated:

```ts [runtime.ts]
import { ComponentSize, ComponentShape } from '@retoo/scena';

// Change size and shape
instance.config.mergeConfig({
  size: ComponentSize.LG,
  shape: ComponentShape.PORTRAIT,
});

// Update CTA button text
instance.config.mergeConfig({ ctaButton: { text: 'Buy now' } });

// Disable a component entirely
instance.config.mergeConfig({ ctaButton: false });
```

To replace the entire config at once, use `setConfig()`:

```ts
import { ComponentSize, ComponentShape } from '@retoo/scena';

instance.config.setConfig({
  video: { src: '/video.mp4' },
  size: ComponentSize.SM,
  shape: ComponentShape.SQUARE,
});
```

<callout icon="i-lucide-arrow-right" to="/configuration/overview">

For full config reference — video, size, shape, position, UI elements — see the **Configuration** section.

</callout>
