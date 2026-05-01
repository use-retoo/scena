# Positioning

> Control CSS position of the widget container — fixed, absolute, relative, static.

Position determines how the widget container is placed in the document — whether it floats over the viewport, sits inside a specific parent element, or flows with the rest of the content. It maps directly to the CSS `position` property and defaults to `fixed`.

## Available values

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
        fixed
      </code>
    </td>
    
    <td>
      Stays in place relative to the viewport during scroll (default)
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        absolute
      </code>
    </td>
    
    <td>
      Positioned relative to the nearest positioned ancestor
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        relative
      </code>
    </td>
    
    <td>
      Flows in the document, offsets from its normal position
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        static
      </code>
    </td>
    
    <td>
      Normal document flow, no positioning
    </td>
  </tr>
</tbody>
</table>

## Absolute

Positioned relative to the nearest positioned ancestor — useful for placing the widget inside a specific container:

<scena-container>
<scena-component :config="{"video":{"src":"/examples/example-cat.mp4","autoplay":false},"size":"sm","shape":"circle","container":{"position":"absolute","placement":"bottom-end"},"ctaButton":false,"closeButton":false}">



</scena-component>
</scena-container>

```ts
import { useScena, ComponentPosition } from '@retoo/scena';

import '@retoo/scena/styles';

const scena = useScena();

await scena.mount({
  video: { src: '/video.mp4' },
  container: { position: ComponentPosition.ABSOLUTE },
});
```

## Relative

Renders the widget inside the document flow — useful for embedding in content sections, cards, or demo areas:

<scena-container className="flex,flex-col,p-4">
<div className="size-28,mb-4,rounded-md,bg-muted">



</div>

<scena-component :config="{"video":{"src":"/examples/example-cat.mp4","autoplay":false},"size":"sm","container":{"position":"relative","placement":"middle-center"},"ctaButton":false,"closeButton":false}">



</scena-component>
</scena-container>

```ts
import { useScena, ComponentPosition } from '@retoo/scena';

import '@retoo/scena/styles';

const scena = useScena();

await scena.mount({
  video: { src: '/video.mp4' },
  container: { position: ComponentPosition.RELATIVE },
});
```

## Mount target

By default, Scena mounts to `document.body`. Pass a DOM element as the second argument to `mount()` to render inside a specific container:

```ts
import { useScena, ComponentPosition } from '@retoo/scena';

import '@retoo/scena/styles';

const scena = useScena();

const target = document.getElementById('widget-area');

await scena.mount(
  {
    video: { src: '/video.mp4' },
    container: { position: ComponentPosition.RELATIVE },
  },
  target
);
```

## Customization

For precise positioning beyond the defaults, use `customStyles`:

```ts
import { useScena, ComponentPosition } from '@retoo/scena';

import '@retoo/scena/styles';

const scena = useScena();

await scena.mount({
  video: { src: '/video.mp4' },
  container: {
    position: ComponentPosition.FIXED,
    customStyles: {
      root: {
        bottom: '24px',
        right: '24px',
      },
    },
  },
});
```
