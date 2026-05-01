# Basic Setup

> Minimal widget mounted with a single required field — video.src.

Scena is a video widget that mounts into any container with a single `mount()` call. It supports a wide range of configuration options — from size and shape to playback behavior, overlay controls, and visibility transitions.

The configuration panel below lets you adjust every available parameter in real time. Each change is applied to the running instance without remounting, so you can explore how the widget responds to different settings immediately.

## Demo

<scena-component-basic-setup :config="{"video":{"src":"/examples/example-cat.mp4","poster":"/examples/example-cat.jpg","autoplay":false,"loop":true,"muted":true},"size":"md","shape":"circle","ctaButton":{"text":"Custom action"},"container":{"position":"absolute","placement":"middle-center"},"visibility":{"isShownOnReady":true},"preview":{"size":"sm","ctaButton":false,"closeButton":false}}">



</scena-component-basic-setup>

## Code

```ts [main.ts]
import {
  useScena,
  ComponentSize,
  ComponentShape,
  ComponentPosition,
  ComponentPlacement,
} from '@retoo/scena';

import '@retoo/scena/styles';

const scena = useScena();

const instance = await scena.mount({
  video: {
    src: '/video.mp4',
    autoplay: false,
    loop: true,
    muted: true,
  },
  size: ComponentSize.MD,
  shape: ComponentShape.CIRCLE,
  ctaButton: {
    text: 'Custom action',
  },
  container: {
    position: ComponentPosition.ABSOLUTE,
    placement: ComponentPlacement.MIDDLE_CENTER,
  },
  visibility: {
    isShownOnReady: true,
  },
  preview: {
    size: ComponentSize.SM,
    ctaButton: false,
    closeButton: false,
  },
});
```

The `mount()` call is async — it resolves once the widget is mounted in the DOM. The returned `instance` exposes the full API: playback control, runtime config updates, event listeners, visibility management, and preview state.

<callout icon="i-lucide-arrow-right" to="/getting-started/quick-start">

See **Quick Start** for the next steps: controlling playback, listening to events, and updating config at runtime.

</callout>
