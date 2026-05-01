# Custom Styling

> Override CSS custom properties and component constants to match your brand.

Each UI component accepts a `customStyles` object with named keys for targeted inline overrides. Combine with `shape` and `size` config to match any design system without touching global CSS.

## Demo

Portrait shape with a branded CTA button and custom container shadow:

<scena-container>
<scena-component :config="{"video":{"src":"/examples/example-cat.mp4","poster":"/examples/example-cat.jpg","autoplay":false,"loop":true,"muted":true},"size":"md","shape":"portrait","container":{"position":"absolute","placement":"middle-center","customStyles":{"root":{"boxShadow":"0 8px 32px rgba(0,0,0,0.35)"}}},"ctaButton":{"text":"Shop now","customStyles":{"button":{"color":"rgb(255, 255, 255)","background":"#013EFB"}}},"videoProgress":{"customStyles":{"progress":{"background":"#8BED02"}}},"closeButton":false}">



</scena-component>
</scena-container>

## Code

```ts [main.ts]
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
  video: {
    src: '/video.mp4',
    poster: '/poster.jpg',
    autoplay: false,
    loop: true,
    muted: true,
  },
  size: ComponentSize.MD,
  shape: ComponentShape.PORTRAIT,
  container: {
    position: ComponentPosition.ABSOLUTE,
    placement: ComponentPlacement.MIDDLE_CENTER,
    customStyles: {
      root: {
        boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
      },
    },
  },
  ctaButton: {
    text: 'Shop now',
    customStyles: {
      button: {
        background: '#013EFB',
      },
    },
  },
  videoProgress: {
    customStyles: {
      progress: {
        background: '#8BED02',
      },
    },
  },
  closeButton: false,
});
```

## Alternative: CSS custom properties

The same result using CSS variables on the `.rs` root element — useful for global theming or when you can't pass config directly:

```css [styles.css]
.rs {
  --rs-video-container-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);
  --rs-cta-button-background: rgb(79, 70, 229);
  --rs-cta-button-background-hover: rgb(99, 90, 255);
  --rs-video-progress-progress-color: rgb(79, 70, 229);
}
```

<callout icon="i-lucide-arrow-right" to="/configuration/styles">

Full list of all CSS custom properties — see **Styles**.

</callout>
