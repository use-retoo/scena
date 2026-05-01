# Placement

> Anchor the widget within the viewport or container using a 3x3 grid model.

Placement anchors the widget within its positioning context using a 3×3 grid — each position is a combination of a vertical row and a horizontal column. It works with both fixed and absolute positioning and defaults to `bottom-end`.

## Available values

<table>
<thead>
  <tr>
    <th>
      Value
    </th>
    
    <th>
      Position
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        top-start
      </code>
    </td>
    
    <td>
      Top left
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        top-center
      </code>
    </td>
    
    <td>
      Top center
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        top-end
      </code>
    </td>
    
    <td>
      Top right
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        middle-start
      </code>
    </td>
    
    <td>
      Middle left
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        middle-center
      </code>
    </td>
    
    <td>
      Center
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        middle-end
      </code>
    </td>
    
    <td>
      Middle right
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        bottom-start
      </code>
    </td>
    
    <td>
      Bottom left
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        bottom-center
      </code>
    </td>
    
    <td>
      Bottom center
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        bottom-end
      </code>
    </td>
    
    <td>
      Bottom right (default)
    </td>
  </tr>
</tbody>
</table>

## Example

<scena-container>
<scena-component :config="{"video":{"src":"/examples/example-cat.mp4","autoplay":false},"size":"xs","shape":"circle","container":{"position":"absolute","placement":"middle-center"},"ctaButton":false,"closeButton":false}">



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

await scena.mount({
  video: { src: '/video.mp4' },
  size: ComponentSize.XS,
  shape: ComponentShape.CIRCLE,
  container: {
    position: ComponentPosition.ABSOLUTE,
    placement: ComponentPlacement.MIDDLE_CENTER,
  },
});
```

## Runtime

```ts
import { useScena, ComponentPlacement } from '@retoo/scena';

import '@retoo/scena/styles';

const scena = useScena();

const instance = await scena.mount({
  video: { src: '/video.mp4' },
});

instance.config.mergeConfig({
  container: { placement: ComponentPlacement.TOP_END },
});
```
