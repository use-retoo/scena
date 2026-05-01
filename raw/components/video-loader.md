# Video Loader

> Configure or disable the loading indicator shown during video buffering.

Video loader displays a spinner while the video is buffering or loading. It appears automatically when the video enters a waiting state and disappears once playback resumes — no manual control needed. Pass `false` to remove it if you prefer no loading indicator.

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
        customClasses
      </code>
    </td>
    
    <td>
      <code>
        Partial<ScenaVideoLoaderComponentClasses>
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
        Partial<ScenaVideoLoaderComponentStyles>
      </code>
    </td>
    
    <td>
      Custom inline styles
    </td>
  </tr>
</tbody>
</table>

## Example

```ts
await scena.mount({
  video: { src: '/video.mp4' },
  videoLoader: {
    customClasses: {
      root: 'my-loader-wrapper',
    },
  },
});
```

## Disabling

Pass `false` to remove the loader. The video will still buffer, but no visual indicator is shown:

```ts
await scena.mount({
  video: { src: '/video.mp4' },
  videoLoader: false,
});
```

## Customization

The loader accepts `root` and `loader` as target keys:

```ts
await scena.mount({
  video: { src: '/video.mp4' },
  videoLoader: {
    customStyles: {
      loader: { borderColor: 'rgba(255, 255, 255, 0.3)' },
    },
  },
});
```

## Interface

```ts
interface ScenaVideoLoaderProps {
  size: ComponentSize;
  customClasses: Partial<ScenaVideoLoaderComponentClasses>;
  customStyles: Partial<ScenaVideoLoaderComponentStyles>;
}
```
