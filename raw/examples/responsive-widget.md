# Responsive Widget

> Adapt widget size and shape across breakpoints using the responsive constants.

The `responsive` key maps max-width breakpoints (in px) to partial config overrides. When the viewport matches a breakpoint the overrides are applied on top of the base config — without remounting.

Resize the browser window or open DevTools device toolbar to see the widget adapt.

<callout icon="i-lucide-info" color="info">

Breakpoints react to **viewport width**, not the container. Use DevTools → toggle device toolbar (Ctrl+Shift+M / Cmd+Shift+M) to simulate different widths.

</callout>

## Demo

<scena-container>
<scena-component :config="{"video":{"src":"/examples/example-cat.mp4","autoplay":false,"loop":true,"muted":true},"size":"md","shape":"circle","container":{"position":"absolute","placement":"middle-center"},"ctaButton":false,"closeButton":false,"responsive":{"lg":{"shape":"square"},"md":{"size":"sm","shape":"square"},"sm":{"size":"xs","shape":"square"}}}">



</scena-component>
</scena-container>

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

await scena.mount({
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
  responsive: {
    1024: {
      shape: ComponentShape.SQUARE,
    },
    768: {
      size: ComponentSize.SM,
      shape: ComponentShape.SQUARE,
    },
    480: {
      size: ComponentSize.XS,
      shape: ComponentShape.SQUARE,
    },
  },
});
```

Breakpoints use `matchMedia` under the hood and update reactively as the window resizes — no scroll or resize handlers needed.

<callout icon="i-lucide-arrow-right" to="/features/responsive">

Full breakpoint reference and override shape — see **Responsive**.

</callout>
