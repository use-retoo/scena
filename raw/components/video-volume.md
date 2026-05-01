# Video Volume

> Configure or disable the volume control component.

Volume control renders a mute/unmute toggle on the widget. It reflects the current mute state and lets users toggle audio without any additional configuration. Pass `false` to remove it if your use case doesn't require audio controls.

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
        Partial<ScenaVideoVolumeComponentAria>
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
        Partial<ScenaVideoVolumeComponentClasses>
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
        Partial<ScenaVideoVolumeComponentStyles>
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
<scena-component :config="{"video":{"src":"/examples/example-cat.mp4","autoplay":false},"size":"md","shape":"circle","container":{"position":"absolute","placement":"middle-center"}}">



</scena-component>
</scena-container>

```ts
await scena.mount({
  video: { src: '/video.mp4' },
  videoVolume: {
    aria: {
      mute: { 'aria-label': 'Mute' },
      unmute: { 'aria-label': 'Unmute' },
    },
  },
});
```

## Disabling

<scena-container>
<scena-component :config="{"video":{"src":"/examples/example-cat.mp4","autoplay":false},"size":"md","shape":"circle","container":{"position":"absolute","placement":"middle-center"},"videoVolume":false}">



</scena-component>
</scena-container>

```ts
await scena.mount({
  video: { src: '/video.mp4' },
  videoVolume: false,
});
```

## Customization

The volume component accepts `root`, `mute`, and `unmute` as target keys:

```ts
await scena.mount({
  video: { src: '/video.mp4' },
  videoVolume: {
    customClasses: {
      root: 'my-volume-control',
      mute: { icon: 'text-white' },
    },
  },
});
```

## Interface

```ts
interface ScenaVideoVolumeProps {
  size: ComponentSize;
  aria: Partial<ScenaVideoVolumeComponentAria>;
  customClasses: Partial<ScenaVideoVolumeComponentClasses>;
  customStyles: Partial<ScenaVideoVolumeComponentStyles>;
}
```
