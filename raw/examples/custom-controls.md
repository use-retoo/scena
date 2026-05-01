# Custom Controls

> Build your own UI on top of the instance API — progress bar, buttons, and overlays.

All built-in controls — `videoControls`, `videoProgress`, `videoVolume`, `ctaButton`, and `closeButton` — can be individually disabled via config, leaving the widget as a bare video surface without any interactive elements.

UI state is managed through two APIs on the returned instance: `instance.api.controller` for imperative playback control (`play`, `pause`, `stop`, `seek`, `toggleMute`) and `instance.api.events` for subscribing to state changes that should be reflected in your own components.

<callout color="warning">

Disabling built-in controls does not affect the widget's internal state machine — events still fire and the controller API remains fully functional.

</callout>

## Demo

<scena-container>
<scena-component-custom-controls :config="{"video":{"src":"/examples/example-cat.mp4","poster":"/examples/example-cat.jpg","autoplay":false,"loop":true,"muted":true},"size":"md","shape":"circle","container":{"position":"relative"}}">



</scena-component-custom-controls>
</scena-container>

## Code

Disable the built-in controls and wire up your own buttons to the controller:

```html [index.html]
<div id="widget-target"></div>
<div id="controls">
  <button id="rewind">Rewind</button>
  <button id="play">Play</button>
  <button id="stop">Stop</button>
  <button id="forward">Forward</button>
  <button id="mute">Mute</button>
</div>
```

```ts [main.ts]
import {
  useScena,
  ScenaEvent,
  ComponentSize,
  ComponentShape,
  ComponentPosition,
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
  container: {
    position: ComponentPosition.RELATIVE,
  },
  videoControls: false,
  videoProgress: false,
  videoVolume: false,
  ctaButton: false,
  closeButton: false,
}, document.getElementById('widget-target'));

const { controller, events } = instance.api;

let isPlaying = false;

let isMuted = controller.isMuted;

events.on(ScenaEvent.ON_VIDEO_PLAY, () => {
  isPlaying = true;
});

events.on(ScenaEvent.ON_VIDEO_PAUSE, () => {
  isPlaying = false;
});

events.on(ScenaEvent.ON_VIDEO_VOLUME_CHANGE, () => {
  isMuted = controller.isMuted;
});

document.getElementById('rewind').addEventListener('click', () => {
  controller.seek(Math.max(0, controller.currentTime - 10));
});

document.getElementById('play').addEventListener('click', () => {
  isPlaying ? controller.pause() : controller.play();
});

document.getElementById('stop').addEventListener('click', () => {
  controller.stop();
});

document.getElementById('forward').addEventListener('click', () => {
  controller.seek(Math.min(controller.duration, controller.currentTime + 10));
});

document.getElementById('mute').addEventListener('click', () => {
  controller.toggleMute();
});
```

<callout icon="i-lucide-arrow-right" to="/api-reference/scena-instance">

Full list of controller methods and reactive state — see **Instance API**.

</callout>
