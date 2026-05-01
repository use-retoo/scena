# CTA Button

> Configure or disable the call-to-action button with custom text and behavior.

CTA button displays a text label either inside the widget overlay or outside below the container. It has no default action — behavior is defined entirely through `onClick`. Placement can switch between `inside` and `outside` automatically based on widget size using the adaptive option. Pass `false` to disable.

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
        text
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      Button label text
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
        ScenaCtaButtonPlacement
      </code>
    </td>
    
    <td>
      <code>
        inside
      </code>
      
       or <code>
        outside
      </code>
      
       the widget container
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        adaptive
      </code>
    </td>
    
    <td>
      <code>
        ScenaCtaButtonAdaptive | false
      </code>
    </td>
    
    <td>
      Responsive placement rules
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
        onClick
      </code>
    </td>
    
    <td>
      <code>
        (event: Event) => void
      </code>
    </td>
    
    <td>
      Click handler
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
        Partial<ScenaCtaButtonComponentClasses>
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
        Partial<ScenaCtaButtonComponentStyles>
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
<scena-component :config="{"video":{"src":"/examples/example-cat.mp4","autoplay":false},"size":"md","shape":"circle","container":{"position":"absolute","placement":"middle-center"},"ctaButton":{"text":"Get in touch"},"closeButton":false}" :cta-event="true">



</scena-component>
</scena-container>

<callout color="neutral" icon="i-lucide-terminal">

Click the CTA button and open the browser console to see the `[scena] cta:click` log.

</callout>

```ts
await scena.mount({
  video: { src: '/video.mp4' },
  ctaButton: {
    text: 'Get in touch',
    onClick: (event) => {
      console.log('cta:click')
    },
  },
});
```

## Placement

The button can be placed inside the widget overlay or outside below the container:

```ts
// Inside the widget
await scena.mount({
  video: { src: '/video.mp4' },
  ctaButton: {
    text: 'Contact us',
    placement: ScenaCtaButtonPlacement.INSIDE,
  },
});

// Outside, below the widget
await scena.mount({
  video: { src: '/video.mp4' },
  ctaButton: {
    text: 'Contact us',
    placement: ScenaCtaButtonPlacement.OUTSIDE,
  },
});
```

## Adaptive placement

The `adaptive` option changes placement based on the widget size. This is useful when the button doesn't fit inside smaller sizes:

```ts
await scena.mount({
  video: { src: '/video.mp4' },
  ctaButton: {
    text: 'Contact us',
    placement: ScenaCtaButtonPlacement.INSIDE,
    adaptive: {
      sizes: [ComponentSize.XS, ComponentSize.SM],
      placement: ScenaCtaButtonPlacement.OUTSIDE,
    },
  },
});
```

When the widget is `xs` or `sm`, the button moves outside. At `md` and above, it stays inside.

## Disabling

```ts
await scena.mount({
  video: { src: '/video.mp4' },
  ctaButton: false,
});
```

## Customization

Both `customClasses` and `customStyles` accept `root` and `button` as target keys.

`customClasses` accepts a string, array, or object:

```ts
await scena.mount({
  video: { src: '/video.mp4' },
  ctaButton: {
    text: 'Buy now',
    customClasses: {
      root: 'my-cta-wrapper',
      button: 'bg-indigo-600 text-white',
    },
  },
});
```

`customStyles` accepts a CSS string or a `CSSStyleDeclaration`-compatible object:

```ts
await scena.mount({
  video: { src: '/video.mp4' },
  ctaButton: {
    text: 'Buy now',
    customStyles: {
      root: {
        marginTop: '8px'
      },
      button: {
        background: '#013EFB',
        borderRadius: '100%'
      },
    },
  },
});
```

## Interface

```ts
interface ScenaCtaButtonProps {
  text: string;
  size: ComponentSize;
  placement: ScenaCtaButtonPlacement;
  adaptive: ScenaCtaButtonAdaptive | false;
  aria: Partial<ComponentAriaProps>;
  onClick: (event: Event) => void;
  customClasses: Partial<ScenaCtaButtonComponentClasses>;
  customStyles: Partial<ScenaCtaButtonComponentStyles>;
}
```
