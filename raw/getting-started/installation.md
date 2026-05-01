# Installation

> Install @retoo/scena via npm, pnpm, yarn, or connect via CDN.

## Package manager

Install the package using your preferred package manager:

<tabs variant="link">
<tabs-item icon="i-simple-icons-npm" label="npm">

```bash [Terminal]
npm install @retoo/scena
```

</tabs-item>

<tabs-item icon="i-simple-icons-pnpm" label="pnpm">

```bash [Terminal]
pnpm add @retoo/scena
```

</tabs-item>

<tabs-item icon="i-simple-icons-yarn" label="yarn">

```bash [Terminal]
yarn add @retoo/scena
```

</tabs-item>

<tabs-item icon="i-simple-icons-bun" label="bun">

```bash [Terminal]
bun add @retoo/scena
```

</tabs-item>
</tabs>

The stylesheet must be imported separately — without it the widget mounts into the DOM but renders without any visual styling:

```ts
import '@retoo/scena/styles';
```

<callout icon="i-lucide-alert-triangle" color="warning">

Missing the CSS import is the most common setup issue. If the widget mounts but appears invisible or unstyled, check this import first.

</callout>

## CDN

For environments without a bundler (static HTML, WordPress, Webflow), load Scena via a `<script>` tag. See the [Formats](/distribution/formats#umd) page for full CDN setup instructions.

## Verify installation

Confirm that the package is resolved correctly by checking the exported metadata:

```ts
import { useScena } from '@retoo/scena';

const { NAME, VERSION } = useScena();

console.log(NAME, VERSION);
```

## Requirements

<field-group>
<field name="Browser" type="string">

Any modern browser supporting ES2020+ (Chrome 80+, Firefox 80+, Safari 14+, Edge 80+).

</field>

<field name="Node.js" type="string">

16.0 or later (for SSR / CommonJS usage).

</field>

<field name="Bundler" type="string">

Any bundler with ES Module support — Vite, Webpack 5+, Rollup, esbuild.

</field>
</field-group>

<callout icon="i-lucide-arrow-right" to="/getting-started/quick-start">

Package installed? Let's mount your first widget in the **Quick Start** guide.

</callout>
