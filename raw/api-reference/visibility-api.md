# Visibility API

> Programmatically show and hide the widget with show(), hide(), isHidden, and isShownOnReady.

The visibility API is available at `instance.visibility`. It provides reactive state and methods for showing and hiding the widget at runtime — useful for deferred rendering, conditional display, or toggling the widget in response to user actions on the host page.

```ts
const visibility = instance.visibility;
```

## Properties

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
        isHidden
      </code>
    </td>
    
    <td>
      <code>
        boolean
      </code>
    </td>
    
    <td>
      Whether the widget is currently hidden
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        isShownOnReady
      </code>
    </td>
    
    <td>
      <code>
        boolean
      </code>
    </td>
    
    <td>
      Whether the widget auto-shows when the video is ready
    </td>
  </tr>
</tbody>
</table>

## Methods

<table>
<thead>
  <tr>
    <th>
      Method
    </th>
    
    <th>
      Signature
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
        show
      </code>
    </td>
    
    <td>
      <code>
        () => void
      </code>
    </td>
    
    <td>
      Show the widget
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        hide
      </code>
    </td>
    
    <td>
      <code>
        () => void
      </code>
    </td>
    
    <td>
      Hide the widget
    </td>
  </tr>
</tbody>
</table>

## Usage

```ts
// Hide the widget
instance.visibility.hide();

// Show it later
instance.visibility.show();

// Check state
if (instance.visibility.isHidden) {
  instance.visibility.show();
}
```

## Events

Visibility changes emit events on the event bus:

```ts
import { ScenaEvent } from '@retoo/scena';

instance.api.events.on(ScenaEvent.ON_VISIBILITY_SHOW, () => {
  console.log('Widget is now visible');
});

instance.api.events.on(ScenaEvent.ON_VISIBILITY_HIDE, () => {
  console.log('Widget is now hidden');
});
```

<callout icon="i-lucide-arrow-right" to="/features/visibility">

See **Visibility** feature guide for config options like `isAnimated` and `isShownOnReady`.

</callout>
