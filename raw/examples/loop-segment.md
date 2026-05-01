# Loop Segment

> Loop playback between two timestamps by seeking back to the start point when the end is reached.

By default the widget loops the full video. This example constrains playback to a specific segment — when `currentTime` reaches the defined end point, `seek()` resets it back to the start. This is useful for product demos, tutorial highlights, or any scenario where only a portion of the video is relevant.

## Demo

<scena-container>
<scena-component-loop-segment :config="{"video":{"src":"/examples/example-cat.mp4","poster":"/examples/example-cat.jpg","autoplay":false,"loop":false,"muted":true},"size":"md","shape":"circle","container":{"position":"absolute","placement":"middle-center"}}" :segmentEnd="8" :segmentStart="2">



</scena-component-loop-segment>
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

const SEGMENT_START = 2;
const SEGMENT_END = 8;

const scena = useScena();

const instance = await scena.mount(
  {
    video: {
      src: '/video.mp4',
      startTime: SEGMENT_START,
      loop: false,
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

  if (currentTime >= SEGMENT_END) {
    instance.api.controller.seek(SEGMENT_START);
  }
});
```

<callout icon="i-lucide-arrow-right" to="/api-reference/scena-instance">

Full controller API including `seek()` — see **Instance API**.

</callout>
