# Video Controls

> Configure or disable the playback control panel (play, pause, etc.).

Video controls render a play/pause overlay on top of the video container. The overlay appears when the user hovers over the widget and fades out automatically — clicking it toggles playback.

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
      Description
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        aria
      </code>
    </td>
    
    <td>
      <code>
        Partial<ScenaVideoControlsComponentAria>
      </code>
    </td>
    
    <td>
      ARIA attributes
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        customClasses
      </code>
    </td>
    
    <td>
      <code>
        Partial<ScenaVideoControlsComponentClasses>
      </code>
    </td>
    
    <td>
      Custom CSS classes
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        customStyles
      </code>
    </td>
    
    <td>
      <code>
        Partial<ScenaVideoControlsComponentStyles>
      </code>
    </td>
    
    <td>
      Custom inline styles
    </td>
  </tr>
</tbody>
</table>

## Example

<scena-container>
<scena-component :config="{"video":{"src":"/examples/example-cat.mp4","autoplay":false},"size":"md","shape":"circle","container":{"position":"absolute","placement":"middle-center"},"ctaButton":false,"closeButton":false}">



</scena-component>
</scena-container>

```ts
await scena.mount({
  video: { src: '/video.mp4' },
  videoControls: {
    aria: {
      play: { 'aria-label': 'Play video' },
      pause: { 'aria-label': 'Pause video' },
    },
  },
});
```

## Disabling

<scena-container>
<scena-component :config="{"video":{"src":"/examples/example-cat.mp4","autoplay":false},"size":"md","shape":"circle","container":{"position":"absolute","placement":"middle-center"},"videoControls":false,"ctaButton":false,"closeButton":false}">



</scena-component>
</scena-container>

```ts
await scena.mount({
  video: { src: '/video.mp4' },
  videoControls: false,
});
```

## Customization

The controls accept `root`, `play`, and `pause` as target keys:

```ts
await scena.mount({
  video: { src: '/video.mp4' },
  videoControls: {
    customClasses: {
      root: 'my-controls',
      play: { icon: 'text-white' },
    },
  },
});
```

## Interface

```ts
interface ScenaVideoControlsProps {
  size: ComponentSize;
  aria: Partial<ScenaVideoControlsComponentAria>;
  customClasses: Partial<ScenaVideoControlsComponentClasses>;
  customStyles: Partial<ScenaVideoControlsComponentStyles>;
}
```
