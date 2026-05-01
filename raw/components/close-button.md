# Close Button

> Configure or disable the close button that hides the widget.

Close button renders a cross icon in the corner of the widget. Clicking it unmounts the widget completely — the component is removed from the DOM and all event listeners are cleaned up. You can override this behavior with a custom `onClick` handler, or pass `false` to remove the button entirely.

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
        onClick
      </code>
    </td>
    
    <td>
      <code>
        (event: Event) => void
      </code>
    </td>
    
    <td>
      Custom click handler
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
        Partial<ScenaCloseButtonComponentClasses>
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
        Partial<ScenaCloseButtonComponentStyles>
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
<scena-component :config="{"video":{"src":"/examples/example-cat.mp4","autoplay":false},"size":"md","shape":"circle","container":{"position":"absolute","placement":"middle-center"},"ctaButton":false}" :close-event="true">



</scena-component>
</scena-container>

<callout color="neutral" icon="i-lucide-terminal">

Click the close button and open the browser console to see the `[scena] close:click` log.

</callout>

```ts
await scena.mount({
  video: { src: '/video.mp4' },
  closeButton: {
    onClick: (event) => {
      console.log('close:click');
    },
  },
});
```

## Disabling

Pass `false` to remove the close button from the DOM:

<scena-container>
<scena-component :config="{"video":{"src":"/examples/example-cat.mp4","autoplay":false},"size":"md","shape":"circle","container":{"position":"absolute","placement":"middle-center"},"ctaButton":false,"closeButton":false}">



</scena-component>
</scena-container>

```ts
await scena.mount({
  video: { src: '/video.mp4' },
  closeButton: false,
});
```

## Customization

Both `customClasses` and `customStyles` accept `root`, `button`, and `cross` as target keys.

`customClasses` accepts a string, array, or object:

```ts
await scena.mount({
  video: { src: '/video.mp4' },
  closeButton: {
    customClasses: {
      root: 'my-close-wrapper',
      button: 'bg-red-500',
      cross: 'text-white',
    },
  },
});
```

`customStyles` accepts a CSS string or a `CSSStyleDeclaration`-compatible object:

```ts
await scena.mount({
  video: { src: '/video.mp4' },
  closeButton: {
    customStyles: {
      root: {
        top: '8px', 
        right: '8px',
      },
      button: {
        background: 'rgb(239, 68, 68)' 
      },
      cross: {
        color: 'white'
      },
    },
  },
});
```

## Interface

```ts
interface ScenaCloseButtonProps {
  size: ComponentSize;
  aria: Partial<ComponentAriaProps>;
  onClick: (event: Event) => void;
  customClasses: Partial<ScenaCloseButtonComponentClasses>;
  customStyles: Partial<ScenaCloseButtonComponentStyles>;
}
```
