# Visibility

> Control widget visibility with isHidden, isShownOnReady, and animated transitions.

The `visibility` config controls whether the widget starts hidden and how it transitions between shown and hidden states. By default, the widget mounts hidden and fades in once the video is ready — this avoids showing an empty container while the video loads.

## Config

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
        isHidden
      </code>
    </td>
    
    <td>
      <code>
        boolean
      </code>
    </td>
    
    <td>
      <code>
        true
      </code>
    </td>
    
    <td>
      Start the widget in a hidden state
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        isAnimated
      </code>
    </td>
    
    <td>
      <code>
        boolean
      </code>
    </td>
    
    <td>
      <code>
        true
      </code>
    </td>
    
    <td>
      Enable CSS animations for show/hide transitions
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        isShownOnReady
      </code>
    </td>
    
    <td>
      <code>
        boolean
      </code>
    </td>
    
    <td>
      <code>
        true
      </code>
    </td>
    
    <td>
      Automatically show the widget when the video is ready
    </td>
  </tr>
</tbody>
</table>

## Show on ready

The default behavior — the widget mounts hidden and appears once the video is ready to play:

<scena-container>
<scena-component :config="{"video":{"src":"/examples/example-cat.mp4","autoplay":false},"size":"md","shape":"circle","container":{"position":"absolute","placement":"middle-center"},"ctaButton":false,"closeButton":false,"visibility":{"isShownOnReady":true,"isAnimated":true}}">



</scena-component>
</scena-container>

```ts
await scena.mount({
  video: { src: '/video.mp4' },
  visibility: {
    isShownOnReady: true,
  },
});
```

## Manual control

Use `isHidden` to manage visibility without waiting for the video. The widget stays hidden until `instance.visibility.show()` is called:

<scena-container>
<scena-component :config="{"video":{"src":"/examples/example-cat.mp4","autoplay":false},"size":"md","shape":"circle","container":{"position":"absolute","placement":"middle-center"},"ctaButton":false,"closeButton":false,"visibility":{"isHidden":true}}" :---="null">



</scena-component>
</scena-container>

```ts
await scena.mount({
  video: { src: '/video.mp4' },
  visibility: {
    isHidden: true, 
  },
});

// Show when needed
instance.visibility.show();
```

## Disable animations

Set `isAnimated: false` to skip the CSS transition and toggle visibility instantly:

<scena-container>
<scena-component :config="{"video":{"src":"/examples/example-cat.mp4","autoplay":false},"size":"md","shape":"circle","container":{"position":"absolute","placement":"middle-center"},"ctaButton":false,"closeButton":false,"visibility":{"isShownOnReady":true,"isAnimated":false}}">



</scena-component>
</scena-container>

```ts
await scena.mount({
  video: { src: '/video.mp4' },
  visibility: {
    isAnimated: false,
  },
});
```

Unmounting also skips the hide transition and removes the widget immediately.

## Runtime API

Control visibility through the instance:

```ts
// Show the widget
instance.visibility.show();

// Hide the widget
instance.visibility.hide();

// Check current state
instance.visibility.isHidden; 
instance.visibility.isShownOnReady;
```
