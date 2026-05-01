# Overview

> Structure of ScenaConfig and the principle of disabling components with false.

Every aspect of the widget — from the video source to the appearance of each UI element — is controlled through a single configuration object, `ScenaConfig`, passed to `scena.mount()`. The only required field is `video.src`; everything else has a sensible default or can be disabled entirely.

<scena-container>
<scena-component :config="{"video":{"src":"/examples/example-cat.mp4","autoplay":false},"size":"md","shape":"circle","container":{"position":"absolute","placement":"middle-center"},"ctaButton":{"text":"Get in touch"}}">



</scena-component>
</scena-container>

```ts
import {
  useScena,
  ComponentSize,
  ComponentShape,
  ComponentPosition,
  ComponentPlacement,
} from '@retoo/scena';

import '@retoo/scena/styles';

const scena = useScena();

const instance = await scena.mount({
  video: { src: '/video.mp4' },
  size: ComponentSize.MD,
  shape: ComponentShape.CIRCLE,
  container: {
    position: ComponentPosition.ABSOLUTE,
    placement: ComponentPlacement.MIDDLE_CENTER,
  },
  ctaButton: { text: 'Get in touch' },
});
```

## Config structure

`ScenaConfig` is a flat object that combines component overrides and feature configs:

<table>
<thead>
  <tr>
    <th>
      Key
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
        video
      </code>
    </td>
    
    <td>
      Video source, poster, autoplay, loop, muted, volume. <strong>
        Required.
      </strong>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        size
      </code>
    </td>
    
    <td>
      Widget size — <code>
        xs
      </code>
      
      , <code>
        sm
      </code>
      
      , <code>
        md
      </code>
      
      , <code>
        lg
      </code>
      
      , <code>
        xl
      </code>
      
      , <code>
        xxl
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        shape
      </code>
    </td>
    
    <td>
      Widget shape — <code>
        circle
      </code>
      
      , <code>
        square
      </code>
      
      , <code>
        portrait
      </code>
      
      , <code>
        landscape
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        container
      </code>
    </td>
    
    <td>
      Positioning — <code>
        position
      </code>
      
      , <code>
        placement
      </code>
      
      , custom classes/styles
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        videoContainer
      </code>
    </td>
    
    <td>
      Video container customization
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        videoLoader
      </code>
    </td>
    
    <td>
      Loading indicator. Pass <code>
        false
      </code>
      
       to disable.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        videoProgress
      </code>
    </td>
    
    <td>
      Progress bar. Pass <code>
        false
      </code>
      
       to disable.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        videoControls
      </code>
    </td>
    
    <td>
      Play/pause controls overlay. Pass <code>
        false
      </code>
      
       to disable.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        videoVolume
      </code>
    </td>
    
    <td>
      Volume control. Pass <code>
        false
      </code>
      
       to disable.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        closeButton
      </code>
    </td>
    
    <td>
      Close button. Pass <code>
        false
      </code>
      
       to disable.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ctaButton
      </code>
    </td>
    
    <td>
      Call-to-action button. Pass <code>
        false
      </code>
      
       to disable.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        visibility
      </code>
    </td>
    
    <td>
      Initial visibility state and animation
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        preview
      </code>
    </td>
    
    <td>
      Preview mode overrides
    </td>
  </tr>
</tbody>
</table>

## Disabling components

Pass `false` to any component key to remove it from the widget entirely:

<scena-container>
<scena-component :config="{"video":{"src":"/examples/example-cat.mp4","autoplay":false},"size":"md","shape":"circle","container":{"position":"absolute","placement":"middle-center"},"ctaButton":false,"closeButton":false,"videoControls":false,"videoProgress":false,"videoVolume":false}">



</scena-component>
</scena-container>

```ts
import { useScena } from '@retoo/scena';

import '@retoo/scena/styles';

const scena = useScena();

await scena.mount({
  video: { src: '/video.mp4' },
  ctaButton: false,
  closeButton: false,
  videoControls: false,
  videoProgress: false,
  videoVolume: false,
});
```

This is different from hiding — a disabled component is never rendered in the DOM.

## Runtime updates

After mount, modify any config property through the instance:

```ts
import { useScena, ComponentSize } from '@retoo/scena';

import '@retoo/scena/styles';

const scena = useScena();

const instance = await scena.mount({
  video: { src: '/video.mp4' },
});

// Deep merge — only the specified fields are updated
instance.config.mergeConfig({
  size: ComponentSize.LG,
  ctaButton: { text: 'Buy now' },
});

// Full replacement
instance.config.setConfig({
  video: { src: '/new-video.mp4' },
  size: ComponentSize.SM,
});
```

Both methods trigger a reactive update — the widget re-renders immediately without remounting.

## Customization

Most components accept `customClasses` and `customStyles` for visual overrides without modifying the source. Classes are merged with the defaults; styles are applied as inline CSS.

```ts
import { useScena } from '@retoo/scena';

import '@retoo/scena/styles';

const scena = useScena();

await scena.mount({
  video: { src: '/video.mp4' },
  ctaButton: {
    text: 'Contact us',
    customClasses: { 
      button: 'bg-red-500 text-white'
    },
    customStyles: { 
      root: {
        marginTop: '8px'
      } 
    },
  },
});
```
