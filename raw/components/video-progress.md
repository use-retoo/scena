# Video Progress

> Configure or disable the video progress bar.

Video progress bar shows the current playback position and adapts its shape to match the widget — a horizontal line for square, portrait, and landscape shapes, and a circular track for the circle shape. Users can drag it to seek to any point in the video.

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
        hasBuffer
      </code>
    </td>
    
    <td>
      <code>
        boolean
      </code>
    </td>
    
    <td>
      Show the buffered range indicator
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        aria
      </code>
    </td>
    
    <td>
      <code>
        Partial<ComponentAriaProps>
      </code>
    </td>
    
    <td>
      ARIA attributes
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        customThickness
      </code>
    </td>
    
    <td>
      <code>
        Partial<ScenaVideoProgressComponentThickness>
      </code>
    </td>
    
    <td>
      Override track thickness
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
        Partial<ScenaVideoProgressComponentClasses>
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
        Partial<ScenaVideoProgressComponentStyles>
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
  videoProgress: {
    hasBuffer: true,
  },
});
```

## Variants

The progress bar automatically adapts to the widget shape:

<table>
<thead>
  <tr>
    <th>
      Variant
    </th>
    
    <th>
      Shape
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
        line
      </code>
    </td>
    
    <td>
      <code>
        square
      </code>
      
      , <code>
        portrait
      </code>
      
      , <code>
        landscape
      </code>
    </td>
    
    <td>
      Horizontal bar at the bottom
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        circle
      </code>
    </td>
    
    <td>
      <code>
        circle
      </code>
    </td>
    
    <td>
      Circular track around the widget
    </td>
  </tr>
</tbody>
</table>

## Disabling

<scena-container>
<scena-component :config="{"video":{"src":"/examples/example-cat.mp4","autoplay":false},"size":"md","shape":"circle","container":{"position":"absolute","placement":"middle-center"},"videoProgress":false}">



</scena-component>
</scena-container>

```ts
await scena.mount({
  video: { src: '/video.mp4' },
  videoProgress: false,
});
```

## Customization

The progress bar accepts `root`, `track`, `progress`, and `buffered` as target keys:

```ts
await scena.mount({
  video: { src: '/video.mp4' },
  videoProgress: {
    customClasses: {
      progress: 'bg-blue-500',
      buffered: 'bg-white/20',
    },
  },
});
```

## Interface

```ts
interface ScenaVideoProgressProps {
  size: ComponentSize;
  hasBuffer: boolean;
  aria: Partial<ComponentAriaProps>;
  customThickness: Partial<ScenaVideoProgressComponentThickness>;
  customClasses: Partial<ScenaVideoProgressComponentClasses>;
  customStyles: Partial<ScenaVideoProgressComponentStyles>;
}
```
