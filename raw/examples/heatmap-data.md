# Heatmap Data

> Collect seek positions and visualize which parts of the video users rewatch most.

Every time the viewer seeks, `ON_VIDEO_SEEKED` fires with the new playback position. This example accumulates those positions into time buckets and renders them as a bar chart — giving a real-time view of which moments attract the most attention.

The heatmap resets on page reload. In production, persist bucket data to a backend and aggregate across sessions for meaningful results.

## Demo

Seek around to build up the heatmap.

<scena-container style="height:640px">
<scena-component-heatmap-data :config="{"video":{"src":"/examples/example-cat.mp4","poster":"/examples/example-cat.jpg","autoplay":false,"loop":true,"muted":true},"size":"md","shape":"circle","container":{"position":"absolute","placement":"middle-center"}}">



</scena-component-heatmap-data>
</scena-container>

## Code

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

const BUCKETS = 30;
const counts = new Array(BUCKETS).fill(0);
let duration = 0;

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
  },
  document.getElementById('target'),
);

instance.api.events.on(ScenaEvent.ON_VIDEO_LOADED, () => {
  duration = instance.api.controller.duration;
});

instance.api.events.on(ScenaEvent.ON_VIDEO_SEEKED, () => {
  if (!duration) return;

  const ratio = instance.api.controller.currentTime / duration;
  const index = Math.min(Math.floor(ratio * BUCKETS), BUCKETS - 1);

  counts[index]++;
  renderHeatmap(counts);
});
```

<callout icon="i-lucide-arrow-right" to="/events/widget-events">

Full list of available events — see **Events**.

</callout>
