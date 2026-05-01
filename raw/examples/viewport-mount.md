# Viewport Mount

> Mount the widget only when its container enters the viewport using IntersectionObserver.

By default the widget is created, the video element is injected, and network requests begin immediately on page load. On pages where the widget is below the fold, this wastes resources the user may never consume.

This example defers mounting until the container enters the viewport. A mount observer fires once on first intersection, calls `scena.mount()`, then disconnects. A second visibility observer then takes over — showing the widget when it is fully in view and hiding it when less than 50% remains visible.

<callout color="warning">

Both observers hold references to DOM nodes and will prevent garbage collection if not disconnected. The widget instance also maintains internal state, event listeners, and a mounted Svelte component.

</callout>

## Demo

<scena-container>
<scena-component-viewport-mount :config="{"video":{"src":"/examples/example-cat.mp4","poster":"/examples/example-cat.jpg","loop":true,"muted":true},"size":"md","shape":"circle","ctaButton":false,"closeButton":false,"container":{"position":"absolute","placement":"middle-center"},"visibility":{"isHidden":true,"isAnimated":true,"isShownOnReady":false}}">



</scena-component-viewport-mount>
</scena-container>

## Code

The setup requires two elements with distinct roles:

- **wrapper** — a full-size container that sits in the normal document flow. Both observers watch this element to track its position in the viewport.
- **target** — an empty mount point passed to `scena.mount()`. The widget renders inside it, but since its container uses `position: absolute`, the visual widget is positioned independently from the flow.

Separating them is important: observing the widget's own root would produce incorrect ratios during show/hide animations, as the widget's bounding rect changes while animating.

```html [index.html]
<div id="widget-wrapper" style="width: 100%; height: 100%">
  <div id="widget-target"></div>
</div>
```

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
const wrapper = document.getElementById('widget-wrapper');
const target = document.getElementById('widget-target');

let instance = null;
let componentObserver = null;

const mountObserver = new IntersectionObserver(async ([mountEntry]) => {
  if (!mountEntry.isIntersecting || instance) return;

  mountObserver.disconnect();

  instance = await scena.mount({
    video: {
      src: '/video.mp4',
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
    visibility: {
      isHidden: true,
      isAnimated: true,
      isShownOnReady: false,
    },
  }, target);

  // Show when fully visible, hide when less than 50% in view
  componentObserver = new IntersectionObserver(([componentEntry]) => {
      if (!componentEntry) return;

      if (componentEntry.intersectionRatio >= 1) instance.visibility.show();
      else if (componentEntry.intersectionRatio < 0.5) instance.visibility.hide();
    },
    { threshold: [0, 0.5, 1] }
  );

  componentObserver.observe(wrapper);
}, { threshold: 0.1 });

mountObserver.observe(wrapper);
```

## Cleanup

Disconnect observers and unmount the instance any time the container leaves the DOM:

```ts [main.ts]
function destroy() {
  mountObserver.disconnect();
  componentObserver?.disconnect();
  
  if (instance) {
    scena.unmount(instance);
  }
}

// Example: single-page app route change
router.beforeEach(() => destroy());

// Example: modal close
modal.on('close', () => destroy());
```

<callout icon="i-lucide-arrow-right" to="/features/visibility">

To hide the widget after mount instead of deferring it — see **Visibility**.

</callout>
