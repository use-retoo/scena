# Responsive

> Automatically adapt widget size and shape to viewport width using breakpoint-based constants overrides.

The `responsive` config maps viewport breakpoints (max-width in px) to partial config overrides. When the viewport width matches a breakpoint, the corresponding overrides are applied on top of the base config — without remounting. Breakpoints use `matchMedia` under the hood and update reactively as the window resizes.

## Example

Resize the browser window or use DevTools responsive mode to see the widget adapt between breakpoints.

<callout color="info" icon="i-lucide-info">

Breakpoints react to the **viewport width**, not the container. Resize the browser window manually or open DevTools → toggle device toolbar (Ctrl+Shift+M / Cmd+Shift+M).

</callout>

<scena-container>
<scena-component :config="{"video":{"src":"/examples/example-cat.mp4","autoplay":false},"size":"md","shape":"circle","container":{"position":"absolute","placement":"middle-center"},"ctaButton":false,"closeButton":false,"responsive":{"lg":{"size":"sm"},"md":{"size":"xs"}}}">



</scena-component>
</scena-container>

## Config

The `responsive` key is a plain object where each key is a max-width breakpoint in pixels and the value is a partial override — the same shape as `ScenaOverrides`:

```ts
await scena.mount({
  video: { src: '/video.mp4' },
  size: ComponentSize.MD,
  shape: ComponentShape.CIRCLE,
  responsive: {
    1024: {
      size: ComponentSize.SM,
    },
    768: {
      size: ComponentSize.XS,
    },
  },
});
```

At viewport widths of 769–1024px the widget renders at `sm`. At 768px and below it switches to `xs`. Above 1024px the base config applies.

## How it works

1. Breakpoints are sorted ascending and matched against `window.innerWidth`.
2. The first breakpoint where `width <= breakpoint` wins.
3. The matched override is applied as a layer below `preview` — so preview always takes priority.
4. When no breakpoint matches, all responsive overrides are cleared and the base config is restored.

## Breakpoint priority

Override layers are applied in fixed order:

```text
base config → responsive → preview
```

Preview always wins — if preview is active, its overrides take precedence over the matched breakpoint.

## Runtime API

The responsive API is available at `instance.responsive`:

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
        activeBreakpoint
      </code>
    </td>
    
    <td>
      <code>
        number | null
      </code>
    </td>
    
    <td>
      The currently matched breakpoint in px, or <code>
        null
      </code>
      
       if none matched
    </td>
  </tr>
</tbody>
</table>

```ts
console.log(instance.responsive.activeBreakpoint);
```
