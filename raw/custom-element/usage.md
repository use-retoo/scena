# Usage

> Use scena-video-widget in HTML — mount via DOM element, pass constants, and manage instances.

Add the element to HTML and call `.mount()` with a `ScenaConfig`:

```html [page.html]
<scena-video-widget></scena-video-widget>
```

```ts [app.ts]
const el = document.querySelector('scena-video-widget');

const instance = await el.mount({
  video: { src: '/video.mp4' },
  size: ComponentSize.MD,
  shape: ComponentShape.CIRCLE,
});
```

The method returns a `Promise<ScenaInstance>` — the same instance object you get when mounting through `scena.mount()`, with full access to the widget API, config, visibility, and preview controls.

## Updating config

If the widget is already mounted, a repeated call to `.mount()` will not create a new instance. Instead, it updates the existing config through `setConfig()`, keeping the current widget state intact:

```ts
// First call — mounts the widget
await el.mount({ video: { src: '/video.mp4' }, size: ComponentSize.SM });

// Second call — updates the constants without remounting
await el.mount({ video: { src: '/other.mp4' }, size: ComponentSize.LG });
```

For partial updates, use the instance directly:

```ts
const instance = await el.mount({ video: { src: '/video.mp4' } });

instance.config.mergeConfig({ size: ComponentSize.LG });
```

## Instance access

The element exposes `instance` and `scena` properties:

```ts
el.instance;
el.scena;
```

Both are `null` before `.mount()` is called.

## Unmounting

```ts
await el.unmount();
```

Removes the widget from the element and resets `instance` and `scena` to `null`. Also fires automatically when the element is removed from the DOM.

## Programmatic creation

```ts
const el = document.createElement('scena-video-widget');

document.body.appendChild(el);

const instance = await el.mount({
  video: { src: '/video.mp4' },
  size: ComponentSize.MD,
});
```
