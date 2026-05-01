# Integration

> Use the scena-video-widget custom element in React, Vue, Angular, and vanilla HTML.

Custom elements work in any framework. Register once at the app entry point, then use `<scena-video-widget>` in templates.

## Vue

```ts [main.ts]
import { defineScenaElement } from '@retoo/scena';

import '@retoo/scena/styles';

defineScenaElement();
```

```vue [ScenaWidget.vue]
<script setup lang="ts">
import { ComponentSize, ComponentShape } from '@retoo/scena';
import { ref, onMounted } from 'vue';

const widgetRef = ref<HTMLElement | null>(null);

onMounted(async () => {
  await widgetRef.value?.mount({
    video: { src: '/video.mp4' },
    size: ComponentSize.MD,
    shape: ComponentShape.CIRCLE,
  });
});
</script>

<template>
  <scena-video-widget ref="widgetRef" />
</template>
```

<callout color="info" icon="i-lucide-info">

Vue recognizes custom elements with hyphens in the tag name automatically. If you get a component resolution warning, add `scena-video-widget` to `compilerOptions.isCustomElement` in your Vue config.

</callout>

## React

```tsx [main.tsx]
import { defineScenaElement } from '@retoo/scena';

import '@retoo/scena/styles';

defineScenaElement();
```

```tsx [ScenaWidget.tsx]
import { ComponentSize, ComponentShape } from '@retoo/scena';
import { useRef, useEffect } from 'react';

export function ScenaWidget() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    ref.current?.mount({
      video: { src: '/video.mp4' },
      size: ComponentSize.MD,
      shape: ComponentShape.CIRCLE,
    });

    return () => {
      ref.current?.unmount();
    };
  }, []);

  return <scena-video-widget ref={ref} />;
}
```

<callout color="info" icon="i-lucide-info">

TypeScript may not know about the custom element tag. Add a JSX declaration to suppress type errors:

```ts [scena.d.ts]
declare namespace JSX {
  interface IntrinsicElements {
    'scena-video-widget': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  }
}
```

</callout>

## Angular

```ts [app.module.ts]
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
```

```ts [app.component.ts]
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { defineScenaElement, ComponentSize, ComponentShape } from '@retoo/scena';

import '@retoo/scena/styles';

defineScenaElement();

@Component({
  selector: 'app-root',
  template: `<scena-video-widget #widget></scena-video-widget>`,
})
export class AppComponent implements AfterViewInit {
  @ViewChild('widget') widgetRef!: ElementRef;

  async ngAfterViewInit() {
    await this.widgetRef.nativeElement.mount({
      video: { src: '/video.mp4' },
      size: ComponentSize.MD,
      shape: ComponentShape.CIRCLE,
    });
  }
}
```

## Vanilla JS

```html [index.html]
<head>
  <link rel="stylesheet" href="https://unpkg.com/@retoo/scena/dist/scena.css" />
</head>
<body>
  <scena-video-widget></scena-video-widget>

  <script src="https://unpkg.com/@retoo/scena/dist/scena.umd.js"></script>
  <script>
    window.defineScenaElement();

    const el = document.querySelector('scena-video-widget');
    
    el.mount({
      video: { src: '/video.mp4' },
      size: 'md',
      shape: 'circle',
    });
  </script>
</body>
```
