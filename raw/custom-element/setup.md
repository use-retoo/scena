# Setup

> Register the custom element with defineScenaElement() and connect styles.

The `<scena-video-widget>` custom element must be registered before use by calling `defineScenaElement()`. Calling it more than once has no effect.

```ts [setup.ts]
import { defineScenaElement } from '@retoo/scena';

import '@retoo/scena/styles';

defineScenaElement();
```

After registration, `<scena-video-widget>` is available in the DOM like any native HTML element.

## UMD

When using a script tag instead of a bundler, the registration function is on `window`:

```html [index.html]
<head>
  <link rel="stylesheet" href="https://unpkg.com/@retoo/scena/dist/scena.css" />
</head>
<body>
  <script src="https://unpkg.com/@retoo/scena/dist/scena.umd.js"></script>
  <script>
    window.defineScenaElement();
  </script>
</body>
```
