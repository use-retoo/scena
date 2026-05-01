# Video

> Configure video source, poster, preload, autoplay, loop, muted, volume, and playback options.

Video configuration controls the underlying `<video>` element — its source, poster image, autoplay behavior, looping, volume, and more. Only `src` is required; all other fields have sensible defaults that work out of the box.

<scena-container>
<scena-component :config="{"video":{"src":"/examples/example-cat.mp4","poster":"/examples/example-cat.jpg","autoplay":false,"loop":true,"muted":true},"size":"md","shape":"circle","container":{"position":"absolute","placement":"middle-center"},"ctaButton":false,"closeButton":false}">



</scena-component>
</scena-container>

```ts
import { useScena } from '@retoo/scena';

import '@retoo/scena/styles';

const scena = useScena();

await scena.mount({
  video: {
    src: '/video.mp4',
    poster: '/poster.jpg',
    autoplay: false,
    loop: true,
    muted: true,
  },
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
        src
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      —
    </td>
    
    <td>
      Video file URL. <strong>
        Required.
      </strong>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        poster
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      —
    </td>
    
    <td>
      Image shown before playback starts
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        type
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      —
    </td>
    
    <td>
      MIME type hint (e.g. <code>
        video/mp4
      </code>
      
      )
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        autoplay
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
      Start playing automatically on mount
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        loop
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
      Restart playback when the video ends
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        muted
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
      Start with audio muted
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        volume
      </code>
    </td>
    
    <td>
      <code>
        number
      </code>
    </td>
    
    <td>
      <code>
        1
      </code>
    </td>
    
    <td>
      Initial volume level (0.0 to 1.0)
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        startTime
      </code>
    </td>
    
    <td>
      <code>
        number
      </code>
    </td>
    
    <td>
      <code>
        0
      </code>
    </td>
    
    <td>
      Start playback from this time in seconds
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        preload
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      <code>
        metadata
      </code>
    </td>
    
    <td>
      Preload strategy — <code>
        none
      </code>
      
      , <code>
        auto
      </code>
      
      , <code>
        metadata
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        crossorigin
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      —
    </td>
    
    <td>
      CORS setting — <code>
        anonymous
      </code>
      
      , <code>
        use-credentials
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        playsinline
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
      Play inline on mobile instead of fullscreen
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        controls
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
      Show native browser video controls
    </td>
  </tr>
</tbody>
</table>

## Autoplay

Most mobile browsers block autoplay with sound. Set both `autoplay: true` and `muted: true` to ensure autoplay works across all devices — this is the default configuration.

Unmuting after a user interaction is allowed by all browsers:

```ts
import { ScenaEvent } from '@retoo/scena';

instance.api.events.on(ScenaEvent.ON_VIDEO_CONTAINER_CLICK, () => {
  instance.api.controller.unmute();
});
```

## Poster image

The `poster` is displayed before playback starts and while the video is loading. With `autoplay: false`, the poster stays visible until the user initiates playback.

<scena-container>
<scena-component :config="{"video":{"src":"/examples/example-cat.mp4","poster":"/examples/example-cat.jpg","autoplay":false},"size":"md","shape":"square","container":{"position":"absolute","placement":"middle-center"},"ctaButton":false,"closeButton":false}" :posterOnly="true">



</scena-component>
</scena-container>

```ts
import { useScena } from '@retoo/scena';

import '@retoo/scena/styles';

const scena = useScena();

await scena.mount({
  video: {
    src: '/video.mp4',
    poster: '/poster.jpg',
    autoplay: false,
  },
});
```

## Preload strategy

Controls how much video data the browser downloads before playback:

<table>
<thead>
  <tr>
    <th>
      Value
    </th>
    
    <th>
      Behavior
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        none
      </code>
    </td>
    
    <td>
      No data preloaded — minimal bandwidth
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        metadata
      </code>
    </td>
    
    <td>
      Duration, dimensions, and first frame only (default)
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        auto
      </code>
    </td>
    
    <td>
      Browser decides how much to buffer
    </td>
  </tr>
</tbody>
</table>

## Runtime

Swap the source or change playback settings without remounting:

```ts
import { useScena } from '@retoo/scena';

import '@retoo/scena/styles';

const scena = useScena();

const instance = await scena.mount({
  video: { src: '/video.mp4' },
});

instance.config.mergeConfig({
  video: { src: '/new-video.mp4', poster: '/new-poster.jpg' },
});
```

## Customization

```ts
import { useScena } from '@retoo/scena';

import '@retoo/scena/styles';

const scena = useScena();

await scena.mount({
  video: {
    src: '/video.mp4',
    customClasses: { root: 'rounded-none' },
    customStyles: {
      root: { objectFit: 'contain' },
    },
  },
});
```
