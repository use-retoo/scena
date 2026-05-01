# useScena

> Widget factory function that returns mount, unmount, NAME, and VERSION.

The factory function that creates a widget manager. Call it once to get a reusable object with mount and unmount methods — each mount creates an independent instance.

```ts
import { useScena } from '@retoo/scena';

const scena = useScena();
```

## Returns

Returns a `UseScenaReturns` object with the following properties:

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
        NAME
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      Library name
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        VERSION
      </code>
    </td>
    
    <td>
      <code>
        string
      </code>
    </td>
    
    <td>
      Library version
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        mount
      </code>
    </td>
    
    <td>
      <code>
        (config: ScenaConfig, target?: ScenaTarget) => Promise<ScenaInstance>
      </code>
    </td>
    
    <td>
      Mount a widget into the DOM
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        unmount
      </code>
    </td>
    
    <td>
      <code>
        (instance: ScenaInstance) => Promise<void>
      </code>
    </td>
    
    <td>
      Destroy a mounted widget
    </td>
  </tr>
</tbody>
</table>

## mount

Mounts the widget into a target element and returns a promise that resolves with a `ScenaInstance` once the Svelte component is rendered and the event bus is ready. The only required config field is `video.src` — everything else uses sensible defaults.

```ts
const instance = await scena.mount({
  video: { src: '/video.mp4' },
  size: ComponentSize.MD,
  shape: ComponentShape.CIRCLE,
});
```

The second argument specifies the mount target — any `HTMLElement` or `ShadowRoot`. When omitted, the widget mounts into `document.body` as a floating overlay:

```ts
const container = document.getElementById('widget-root');

const instance = await scena.mount(
  { video: { src: '/video.mp4' } },
  container,
);
```

<callout icon="i-lucide-arrow-right" to="/api-reference/scena-instance">

See **Scena Instance** for the full shape of the returned object.

</callout>

## unmount

Destroys a previously mounted widget and removes it from the DOM:

```ts
await scena.unmount(instance);
```

After unmounting, all event handlers are cleared automatically.

## Multiple instances

Each `mount()` call creates an independent widget. You can run several instances on the same page:

```ts
const scena = useScena();

const widget1 = await scena.mount({ video: { src: '/a.mp4' } });
const widget2 = await scena.mount({ video: { src: '/b.mp4' } });

// Unmount individually
await scena.unmount(widget1);
```
