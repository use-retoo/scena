# Preview

> Configure preview mode with temporary visual overrides before the user interacts with the widget.

Preview mode applies temporary config overrides on top of the base config. When the user clicks the video container, preview mode stops and the widget returns to its original configuration.

This is useful for showing a compact or simplified version of the widget that expands on interaction — for example, a small circle that grows into a full portrait player with buttons and controls.

## Config

The `preview` key accepts the same shape as `ScenaOverrides` — size, shape, and any component property can be overridden — plus two behavioral options. The base config defines how the widget looks after preview ends, and the preview config defines how it looks before the user interacts:

<scena-container>
<scena-component :config="{"video":{"src":"/examples/example-cat.mp4","autoplay":false},"size":"md","shape":"circle","container":{"position":"absolute","placement":"middle-center"},"preview":{"size":"sm","shape":"circle","closeButton":false,"ctaButton":false}}">



</scena-component>
</scena-container>

```ts
await scena.mount({
  video: { src: '/video.mp4' },
  size: ComponentSize.MD,
  shape: ComponentShape.CIRCLE,
  preview: {
    size: ComponentSize.SM,
    shape: ComponentShape.CIRCLE,
    closeButton: false,
    ctaButton: false,
  },
});
```

When preview is active, the widget renders at `sm` / `circle` with no buttons. Clicking the video container stops preview and the widget transitions to `md` with all components visible.

### Behavior options

Two boolean flags control what happens when preview stops:

<table>
<thead>
  <tr>
    <th>
      Option
    </th>
    
    <th>
      Type
    </th>
    
    <th>
      Default
    </th>
    
    <th>
      Description
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        keepTimeOnExpand
      </code>
    </td>
    
    <td>
      <code>
        boolean
      </code>
    </td>
    
    <td>
      <code>
        false
      </code>
    </td>
    
    <td>
      Preserve the current video position when expanding from preview
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        keepMuteOnExpand
      </code>
    </td>
    
    <td>
      <code>
        boolean
      </code>
    </td>
    
    <td>
      <code>
        false
      </code>
    </td>
    
    <td>
      Preserve the mute state when expanding from preview
    </td>
  </tr>
</tbody>
</table>

```ts
await scena.mount({
  video: { src: '/video.mp4' },
  size: ComponentSize.MD,
  shape: ComponentShape.CIRCLE,
  preview: {
    size: ComponentSize.SM,
    closeButton: false,
    ctaButton: false,
    keepTimeOnExpand: true,
    keepMuteOnExpand: true,
  },
});
```

## How it works

1. If `preview` is present in the config, preview mode activates automatically on mount.
2. Preview overrides are layered on top of the base config — the original config is never mutated.
3. Clicking the video container stops preview mode and removes the overrides.
4. The widget re-renders with the base config values immediately after preview stops.

During preview, the video container receives the `rs-video-container--preview` CSS class for custom styling.

## Runtime API

Control preview through the instance:

```ts
// Start preview (applies overrides)
instance.preview.start();

// Stop preview (removes overrides)
instance.preview.stop();

// Check current state
console.log(instance.preview.isPreviewing);

// Read behavior flags set via config
console.log(instance.preview.isKeepTimeOnExpand);
console.log(instance.preview.isKeepMuteOnExpand);
```
