# Scena Instance

> Object returned by mount() providing access to api, constants, visibility, and preview.

The handle returned by a successful mount call. It groups the video controller, event bus, config store, and feature APIs into a single object that lives for the lifetime of the widget.

```ts
const instance = await scena.mount({
  video: { src: '/video.mp4' },
});
```

## Properties

<table>
<thead>
  <tr>
    <th>
      Property
    </th>
    
    <th>
      Type
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
        api
      </code>
    </td>
    
    <td>
      <code>
        ScenaApi
      </code>
    </td>
    
    <td>
      Video controller, component refs, and event bus
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        component
      </code>
    </td>
    
    <td>
      <code>
        ScenaRef
      </code>
    </td>
    
    <td>
      Reference to the mounted Svelte component
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        config
      </code>
    </td>
    
    <td>
      <code>
        UseScenaConfigReturns
      </code>
    </td>
    
    <td>
      Reactive config store
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        preview
      </code>
    </td>
    
    <td>
      <code>
        PreviewApi
      </code>
    </td>
    
    <td>
      Preview mode controls
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        visibility
      </code>
    </td>
    
    <td>
      <code>
        VisibilityApi
      </code>
    </td>
    
    <td>
      Show/hide controls
    </td>
  </tr>
</tbody>
</table>

## api

The main API surface for interacting with a mounted widget.

<table>
<thead>
  <tr>
    <th>
      Property
    </th>
    
    <th>
      Type
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
        api.controller
      </code>
    </td>
    
    <td>
      <code>
        UseVideoControllerReturns
      </code>
    </td>
    
    <td>
      Video playback control (play, pause, seek, volume)
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        api.components
      </code>
    </td>
    
    <td>
      <code>
        ScenaComponents
      </code>
    </td>
    
    <td>
      References to all child component instances
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        api.events
      </code>
    </td>
    
    <td>
      <code>
        ScenaEventEmitter
      </code>
    </td>
    
    <td>
      Pub/sub event bus
    </td>
  </tr>
</tbody>
</table>

```ts
// Control playback
instance.api.controller.play();

// Subscribe to events
instance.api.events.on(ScenaEvent.ON_VIDEO_PLAY, ({ state }) => {
  console.log('Playing at', state.currentTime);
});
```

<callout icon="i-lucide-arrow-right" to="/api-reference/video-controller">

See **Video Controller** for the full playback API.

</callout>

## config

Reactive config store with get, set, and merge methods.

```ts
instance.config.mergeConfig({
  size: ComponentSize.LG,
});
```

<callout icon="i-lucide-arrow-right" to="/api-reference/use-config">

See **useConfig()** for all available methods.

</callout>

## preview

Controls preview mode at runtime.

```ts
instance.preview.start();
instance.preview.stop();
instance.preview.isPreviewing;
```

<callout icon="i-lucide-arrow-right" to="/api-reference/preview-api">

See **Preview API** for details.

</callout>

## visibility

Controls widget visibility at runtime.

```ts
instance.visibility.show();
instance.visibility.hide();
instance.visibility.isHidden;
```

<callout icon="i-lucide-arrow-right" to="/api-reference/visibility-api">

See **Visibility API** for details.

</callout>

## components

Provides references to all child component instances. Nullable refs correspond to components that can be disabled via config (`false`).

<table>
<thead>
  <tr>
    <th>
      Property
    </th>
    
    <th>
      Type
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        container
      </code>
    </td>
    
    <td>
      <code>
        ScenaContainerRef
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        video
      </code>
    </td>
    
    <td>
      <code>
        ScenaVideoRef
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        videoContainer
      </code>
    </td>
    
    <td>
      <code>
        ScenaVideoContainerRef
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        videoLoader
      </code>
    </td>
    
    <td>
      <code>
        ScenaVideoLoaderRef | null
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        videoProgress
      </code>
    </td>
    
    <td>
      <code>
        ScenaVideoProgressRef | null
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        videoControls
      </code>
    </td>
    
    <td>
      <code>
        ScenaVideoControlsRef | null
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        videoVolume
      </code>
    </td>
    
    <td>
      <code>
        ScenaVideoVolumeRef | null
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        closeButton
      </code>
    </td>
    
    <td>
      <code>
        ScenaCloseButtonRef | null
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ctaButton
      </code>
    </td>
    
    <td>
      <code>
        ScenaCtaButtonRef | null
      </code>
    </td>
  </tr>
</tbody>
</table>

Each ref exposes a `getElements()` method that returns the underlying DOM nodes:

```ts
const { root, video } = instance.api.components.video.getElements();

console.log(video.currentTime);
```
