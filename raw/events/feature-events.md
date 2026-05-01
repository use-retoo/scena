# Feature Events

> React to visibility and preview state changes with show, hide, start, and stop events.

Feature events fire when the widget's visibility or preview mode changes. They carry no payload.

## Visibility Events

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
        ON_VISIBILITY_SHOW
      </code>
    </td>
    
    <td>
      <code>
        visibility:show
      </code>
    </td>
    
    <td>
      Widget becomes visible
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ON_VISIBILITY_HIDE
      </code>
    </td>
    
    <td>
      <code>
        visibility:hide
      </code>
    </td>
    
    <td>
      Widget becomes hidden
    </td>
  </tr>
</tbody>
</table>

```ts
import { ScenaEvent } from '@retoo/scena';

instance.api.events.on(ScenaEvent.ON_VISIBILITY_SHOW, () => {
  console.log('Widget is visible');
});

instance.api.events.on(ScenaEvent.ON_VISIBILITY_HIDE, () => {
  console.log('Widget is hidden');
});
```

## Preview Events

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
        ON_PREVIEW_START
      </code>
    </td>
    
    <td>
      <code>
        preview:start
      </code>
    </td>
    
    <td>
      Preview mode is activated
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ON_PREVIEW_STOP
      </code>
    </td>
    
    <td>
      <code>
        preview:stop
      </code>
    </td>
    
    <td>
      Preview mode is deactivated
    </td>
  </tr>
</tbody>
</table>

```ts
instance.api.events.on(ScenaEvent.ON_PREVIEW_START, () => {
  console.log('Preview started');
});

instance.api.events.on(ScenaEvent.ON_PREVIEW_STOP, () => {
  console.log('Preview stopped');
});
```
