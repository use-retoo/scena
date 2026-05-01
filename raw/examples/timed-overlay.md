# Timed Overlay

> Show a contextual overlay at a specific point in the video using playback time events.

`ON_VIDEO_TIME_UPDATE` fires continuously during playback with the current position in seconds. This example uses it to show an overlay between two defined timestamps — useful for CTAs, chapter markers, or annotations tied to specific moments.

## Demo

The overlay appears between 5 and 25 seconds of playback.

<scena-container style="height: 560px">
<scena-component-timed-overlay :config="{"video":{"src":"/examples/example-cat.mp4","poster":"/examples/example-cat.jpg","autoplay":false,"loop":true,"muted":true},"size":"md","shape":"circle","container":{"position":"absolute","placement":"middle-center"},"ctaButton":false,"closeButton":false}" :overlayTimeHide="25" :overlayTimeShow="5">



</scena-component-timed-overlay>
</scena-container>

## Code

```html [index.html]
<div class="wrapper">
  <div id="target"></div>

  <div id="overlay" class="overlay hidden">
    <div class="overlay-card">
      <p>Special offer — limited time only!</p>
      <button id="action">Got it</button>
    </div>
  </div>
</div>
```

```ts [main.ts]
import {
  useScena,
  ScenaEvent,
  ComponentSize,
  ComponentShape,
  ComponentPosition,
  ComponentPlacement,
} from '@retoo/scena';

import '@retoo/scena/styles';

const OVERLAY_TIME_SHOW = 5;
const OVERLAY_TIME_HIDE = 25;

const overlay = document.getElementById('overlay')!;
const action = document.getElementById('action')!;

const scena = useScena();

const instance = await scena.mount(
  {
    video: {
      src: '/video.mp4',
      autoplay: false,
      loop: true,
      muted: true,
    },
    size: ComponentSize.MD,
    shape: ComponentShape.CIRCLE,
    container: {
      position: ComponentPosition.ABSOLUTE,
      placement: ComponentPlacement.MIDDLE_CENTER,
    },
    ctaButton: false,
    closeButton: false,
  },
  document.getElementById('target'),
);

instance.api.events.on(ScenaEvent.ON_VIDEO_TIME_UPDATE, () => {
  const { currentTime } = instance.api.controller;
  const visible = currentTime >= OVERLAY_TIME_SHOW && currentTime < OVERLAY_TIME_HIDE;

  overlay.classList.toggle('hidden', !visible);
});

action.addEventListener('click', () => {
  overlay.classList.add('hidden');
});
```

<callout icon="i-lucide-arrow-right" to="/events/widget-events">

Full list of time-based and interaction events — see **Events**.

</callout>
