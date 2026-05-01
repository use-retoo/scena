# Container

> Configure the widget container with position and placement options.

Container is the root wrapper that positions the widget on the page. It controls both the CSS position strategy — fixed, absolute, relative — and the anchor point within the viewport or parent element, so you can place the widget exactly where it fits your layout.

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
        position
      </code>
    </td>
    
    <td>
      <code>
        ComponentPosition
      </code>
    </td>
    
    <td>
      CSS position value
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        placement
      </code>
    </td>
    
    <td>
      <code>
        ComponentPlacement
      </code>
    </td>
    
    <td>
      Position within the viewport or parent element
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
        Partial<ScenaContainerCustomClasses>
      </code>
    </td>
    
    <td>
      Custom CSS classes for the container
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
        Partial<ScenaContainerCustomStyles>
      </code>
    </td>
    
    <td>
      Custom inline styles for the container
    </td>
  </tr>
</tbody>
</table>

## Example

<scena-container>
<scena-component :config="{"video":{"src":"/examples/example-cat.mp4","autoplay":false},"size":"md","shape":"circle","container":{"position":"absolute","placement":"bottom-end"},"ctaButton":false,"closeButton":false}">



</scena-component>
</scena-container>

```ts
await scena.mount({
  video: { src: '/video.mp4' },
  container: {
    position: ComponentPosition.ABSOLUTE,
    placement: ComponentPlacement.BOTTOM_END,
  },
});
```

## Customization

The container accepts `root` as the target key for class and style overrides:

```ts
await scena.mount({
  video: { src: '/video.mp4' },
  container: {
    customClasses: {
      root: 'my-widget-container',
    },
    customStyles: {
      root: {
        padding: '16px',
      },
    },
  },
});
```

## Interface

```ts
interface ScenaContainerProps {
  position: ComponentPosition;
  placement: ComponentPlacement;
  customClasses: Partial<ScenaContainerCustomClasses>;
  customStyles: Partial<ScenaContainerCustomStyles>;
}
```
