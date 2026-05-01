# Widget Events

> Handle widget mounting and destruction with ON_SCENA_MOUNT and ON_SCENA_DESTROY.

Widget events fire when the scena instance is mounted into the DOM and when it is destroyed. They carry no payload and require no arguments in the handler. These events are useful for running setup or teardown logic tied to the widget's DOM presence.

## Events

<table>
<thead>
  <tr>
    <th>
      Event
    </th>
    
    <th>
      String value
    </th>
    
    <th>
      When
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        ON_SCENA_MOUNT
      </code>
    </td>
    
    <td>
      <code>
        scena:on-mount
      </code>
    </td>
    
    <td>
      Widget component is mounted and ready
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ON_SCENA_DESTROY
      </code>
    </td>
    
    <td>
      <code>
        scena:on-destroy
      </code>
    </td>
    
    <td>
      Widget is about to be destroyed, before cleanup
    </td>
  </tr>
</tbody>
</table>

## Usage

```ts
import { ScenaEvent } from '@retoo/scena';

instance.api.events.on(ScenaEvent.ON_SCENA_MOUNT, () => {
  console.log('Widget is ready');
});

instance.api.events.on(ScenaEvent.ON_SCENA_DESTROY, () => {
  console.log('Widget is being destroyed');
});
```

## Unsubscribing

Pass the same handler reference to `off()`:

```ts
const onMount = () => console.log('Mounted');

instance.api.events.on(ScenaEvent.ON_SCENA_MOUNT, onMount);

// Later
instance.api.events.off(ScenaEvent.ON_SCENA_MOUNT, onMount);
```

## Notes

- `ON_SCENA_MOUNT` fires after the Svelte component is mounted — the DOM is fully rendered at this point, so it is safe to query elements or initialize libraries that depend on the DOM.
- `ON_SCENA_DESTROY` fires before cleanup. After this event, the event emitter is cleared and all handlers are removed automatically, so there is no need to unsubscribe manually.
