# Shape

> Set widget shape — circle, portrait, landscape, or square.

Shape controls the aspect ratio and border radius of the video container. Four presets cover the most common layouts — from a fully circular thumbnail to portrait and landscape video formats — without requiring any manual CSS.

## Available shapes

<table>
<thead>
  <tr>
    <th>
      Value
    </th>
    
    <th>
      Aspect ratio
    </th>
    
    <th>
      Border radius
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        circle
      </code>
    </td>
    
    <td>
      1:1
    </td>
    
    <td>
      Fully rounded
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        square
      </code>
    </td>
    
    <td>
      1:1
    </td>
    
    <td>
      Slightly rounded corners
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        portrait
      </code>
    </td>
    
    <td>
      3:4 (vertical)
    </td>
    
    <td>
      Rounded corners
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        landscape
      </code>
    </td>
    
    <td>
      4:3 (horizontal)
    </td>
    
    <td>
      Rounded corners
    </td>
  </tr>
</tbody>
</table>

## Circle

<scena-container>
<scena-component :config="{"video":{"src":"/examples/example-cat.mp4","autoplay":false},"size":"md","shape":"circle","container":{"position":"absolute","placement":"middle-center"},"ctaButton":false,"closeButton":false}">



</scena-component>
</scena-container>

```ts
import { useScena, ComponentShape } from '@retoo/scena';

import '@retoo/scena/styles';

const scena = useScena();

await scena.mount({
  video: { src: '/video.mp4' },
  shape: ComponentShape.CIRCLE,
});
```

## Square

<scena-container>
<scena-component :config="{"video":{"src":"/examples/example-cat.mp4","autoplay":false},"size":"md","shape":"square","container":{"position":"absolute","placement":"middle-center"},"ctaButton":false,"closeButton":false}">



</scena-component>
</scena-container>

```ts
import { useScena, ComponentShape } from '@retoo/scena';

import '@retoo/scena/styles';

const scena = useScena();

await scena.mount({
  video: { src: '/video.mp4' },
  shape: ComponentShape.SQUARE,
});
```

## Portrait

<scena-container>
<scena-component :config="{"video":{"src":"/examples/example-cat.mp4","autoplay":false},"size":"md","shape":"portrait","container":{"position":"absolute","placement":"middle-center"},"ctaButton":false,"closeButton":false}">



</scena-component>
</scena-container>

```ts
import { useScena, ComponentShape } from '@retoo/scena';

import '@retoo/scena/styles';

const scena = useScena();

await scena.mount({
  video: { src: '/video.mp4' },
  shape: ComponentShape.PORTRAIT,
});
```

## Landscape

<scena-container>
<scena-component :config="{"video":{"src":"/examples/example-cat.mp4","autoplay":false},"size":"md","shape":"landscape","container":{"position":"absolute","placement":"middle-center"},"ctaButton":false,"closeButton":false}">



</scena-component>
</scena-container>

```ts
import { useScena, ComponentShape } from '@retoo/scena';

import '@retoo/scena/styles';

const scena = useScena();

await scena.mount({
  video: { src: '/video.mp4' },
  shape: ComponentShape.LANDSCAPE,
});
```

## Runtime

```ts
import { useScena, ComponentShape } from '@retoo/scena';

import '@retoo/scena/styles';

const scena = useScena();

const instance = await scena.mount({
  video: { src: '/video.mp4' },
});

instance.config.mergeConfig({
  shape: ComponentShape.PORTRAIT,
});
```

## Shape and video content

The video fills the shape container using `object-fit: cover`. If the video's native aspect ratio differs from the shape, the edges are cropped to fit. Choose a shape that matches your video content — `portrait` for vertical video, `landscape` for horizontal, `circle` or `square` for cropped previews.
