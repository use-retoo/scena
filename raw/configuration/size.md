# Size

> Configure widget dimensions with ComponentSize — xs, sm, md, lg, xl, xxl.

Widget dimensions are controlled by the `size` property, which selects from a predefined scale ranging from `xs` to `xxl`. All internal elements — video container, buttons, progress bar — scale proportionally, so you never need to adjust individual components manually.

## Available sizes

<table>
<thead>
  <tr>
    <th>
      Value
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
        xs
      </code>
    </td>
    
    <td>
      Extra small — minimal footprint
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        sm
      </code>
    </td>
    
    <td>
      Small
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        md
      </code>
    </td>
    
    <td>
      Medium (default)
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        lg
      </code>
    </td>
    
    <td>
      Large
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        xl
      </code>
    </td>
    
    <td>
      Extra large
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        xxl
      </code>
    </td>
    
    <td>
      Maximum size
    </td>
  </tr>
</tbody>
</table>

## Extra small

<scena-container style="height: 240px">
<scena-component :config="{"video":{"src":"/examples/example-cat.mp4","autoplay":false},"size":"xs","shape":"circle","container":{"position":"absolute","placement":"middle-center"},"ctaButton":false,"closeButton":false}">



</scena-component>
</scena-container>

```ts
import { useScena, ComponentSize } from '@retoo/scena';

import '@retoo/scena/styles';

const scena = useScena();

await scena.mount({
  video: { src: '/video.mp4' },
  size: ComponentSize.XS,
});
```

## Small

<scena-container style="height: 280px">
<scena-component :config="{"video":{"src":"/examples/example-cat.mp4","autoplay":false},"size":"sm","shape":"circle","container":{"position":"absolute","placement":"middle-center"},"ctaButton":false,"closeButton":false}">



</scena-component>
</scena-container>

```ts
import { useScena, ComponentSize } from '@retoo/scena';

import '@retoo/scena/styles';

const scena = useScena();

await scena.mount({
  video: { src: '/video.mp4' },
  size: ComponentSize.SM,
});
```

## Medium

<scena-container style="height: 480px">
<scena-component :config="{"video":{"src":"/examples/example-cat.mp4","autoplay":false},"size":"md","shape":"circle","container":{"position":"absolute","placement":"middle-center"},"ctaButton":false,"closeButton":false}">



</scena-component>
</scena-container>

```ts
import { useScena, ComponentSize } from '@retoo/scena';

import '@retoo/scena/styles';

const scena = useScena();

await scena.mount({
  video: { src: '/video.mp4' },
  size: ComponentSize.MD,
});
```

## Large

<scena-container style="height: 560px">
<scena-component :config="{"video":{"src":"/examples/example-cat.mp4","autoplay":false},"size":"lg","shape":"circle","container":{"position":"absolute","placement":"middle-center"},"ctaButton":false,"closeButton":false}">



</scena-component>
</scena-container>

```ts
import { useScena, ComponentSize } from '@retoo/scena';

import '@retoo/scena/styles';

const scena = useScena();

await scena.mount({
  video: { src: '/video.mp4' },
  size: ComponentSize.LG,
});
```

## Extra large

<scena-container style="height: 600px">
<scena-component :config="{"video":{"src":"/examples/example-cat.mp4","autoplay":false},"size":"xl","shape":"circle","container":{"position":"absolute","placement":"middle-center"},"ctaButton":false,"closeButton":false}">



</scena-component>
</scena-container>

```ts
import { useScena, ComponentSize } from '@retoo/scena';

import '@retoo/scena/styles';

const scena = useScena();

await scena.mount({
  video: { src: '/video.mp4' },
  size: ComponentSize.XL,
});
```

## Extra extra large

<scena-container style="height: 700px">
<scena-component :config="{"video":{"src":"/examples/example-cat.mp4","autoplay":false},"size":"xxl","shape":"circle","container":{"position":"absolute","placement":"middle-center"},"ctaButton":false,"closeButton":false}">



</scena-component>
</scena-container>

```ts
import { useScena, ComponentSize } from '@retoo/scena';

import '@retoo/scena/styles';

const scena = useScena();

await scena.mount({
  video: { src: '/video.mp4' },
  size: ComponentSize.XXL,
});
```

## Runtime

```ts
import { useScena, ComponentSize } from '@retoo/scena';

import '@retoo/scena/styles';

const scena = useScena();

const instance = await scena.mount({
  video: { src: '/video.mp4' },
});

instance.config.mergeConfig({
  size: ComponentSize.LG,
});
```

The widget re-renders at the new size immediately. All child elements adapt automatically.

## Overrides

Global size applies to all components at once, but each component can override it individually. This is useful when one element needs to stand out or stay compact regardless of the overall scale:

```ts
{
  videoContainer: { size: ComponentSize };
  videoLoader:    { size: ComponentSize };
  videoProgress:  { size: ComponentSize };
  videoControls:  { size: ComponentSize };
  videoVolume:    { size: ComponentSize };
  closeButton:    { size: ComponentSize };
  ctaButton:      { size: ComponentSize };
}
```
