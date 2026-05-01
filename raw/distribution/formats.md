# Formats

> Available build formats — ES Module, UMD, CommonJS, and their minified variants.

Scena is distributed in three module formats. Each format has a development build (readable, with comments) and a minified production build. All variants export the same API surface — the difference is how the module is loaded by the consumer.

## ES Module

The recommended format for projects using a bundler (Vite, Webpack 5+, Rollup, esbuild). ES Modules support static analysis, tree-shaking, and modern `import`/`export` syntax.

<table>
<thead>
  <tr>
    <th>
      File
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
        scena.es.js
      </code>
    </td>
    
    <td>
      Development build — unminified, suitable for debugging
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        scena.min.es.js
      </code>
    </td>
    
    <td>
      Production build — minified and optimized
    </td>
  </tr>
</tbody>
</table>

The `main` and `module` fields in `package.json` point to this build, so bundlers resolve it automatically.

```ts [main.ts]
import { useScena } from '@retoo/scena';

import '@retoo/scena/styles';

const scena = useScena();
```

## UMD

Universal Module Definition — works via `<script>` tags in the browser, AMD loaders, and CommonJS `require()`. Use this for environments without a bundler: static HTML pages, WordPress, Webflow, Squarespace, or any CMS that allows custom scripts.

<table>
<thead>
  <tr>
    <th>
      File
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
        scena.umd.js
      </code>
    </td>
    
    <td>
      Development build
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        scena.min.umd.js
      </code>
    </td>
    
    <td>
      Production build
    </td>
  </tr>
</tbody>
</table>

```html [index.html]
<link rel="stylesheet" href="https://unpkg.com/@retoo/scena/dist/scena.css" />
<script src="https://unpkg.com/@retoo/scena/dist/scena.min.umd.js"></script>
<script>
  const scena = window.scenaWidget();

  scena.mount({
    video: { src: '/video.mp4' }
  });
</script>
```

<callout icon="i-lucide-alert-triangle" color="warning">

In UMD mode, the factory function is exposed as `window.scenaWidget()`

</callout>

## CommonJS

For Node.js environments, SSR frameworks, or legacy build systems that use `require()`.

<table>
<thead>
  <tr>
    <th>
      File
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
        scena.cjs.js
      </code>
    </td>
    
    <td>
      Development build
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        scena.min.cjs.js
      </code>
    </td>
    
    <td>
      Production build
    </td>
  </tr>
</tbody>
</table>

```js [server.js]
const { useScena } = require('@retoo/scena');

const scena = useScena();
```

## Custom Element

Register Scena as a native Web Component to use it in any framework — or vanilla HTML:

<steps>

### Register the element

```ts [setup.ts]
import { defineScenaElement } from '@retoo/scena';

import '@retoo/scena/styles';

defineScenaElement();
```

### Use in HTML

```html [page.html]
<scena-video-widget></scena-video-widget>
```

</steps>

<callout icon="i-lucide-arrow-right" to="/custom-element/setup">

For detailed Custom Element docs — framework integration, attributes, and lifecycle — see the **Custom Element** section.

</callout>

## Stylesheets

CSS must be imported separately regardless of the JS format. Without styles, the widget mounts into the DOM but renders without any visual appearance.

<table>
<thead>
  <tr>
    <th>
      Import path
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
        @retoo/scena/styles
      </code>
    </td>
    
    <td>
      Development build — unminified, with source maps
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        @retoo/scena/styles/min
      </code>
    </td>
    
    <td>
      Production build — minified
    </td>
  </tr>
</tbody>
</table>

```ts
// ES Module / bundler
import '@retoo/scena/styles';        // dev
import '@retoo/scena/styles/min';    // prod
```

```html
<!-- UMD / script tag -->
<link rel="stylesheet" href="https://unpkg.com/@retoo/scena/dist/scena.css" />
```
