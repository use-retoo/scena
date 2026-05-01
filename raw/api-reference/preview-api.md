# Preview API

> Control preview mode with start(), stop(), and isPreviewing state.

The preview API is available at `instance.preview`. It controls the preview mode — a temporary visual state with config overrides that reverts when the user interacts with the widget.

```ts
const preview = instance.preview;
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
        isPreviewing
      </code>
    </td>
    
    <td>
      <code>
        boolean
      </code>
    </td>
    
    <td>
      Whether preview mode is currently active
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        isKeepTimeOnExpand
      </code>
    </td>
    
    <td>
      <code>
        boolean
      </code>
    </td>
    
    <td>
      Whether video position is preserved when expanding from preview
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        isKeepMuteOnExpand
      </code>
    </td>
    
    <td>
      <code>
        boolean
      </code>
    </td>
    
    <td>
      Whether mute state is preserved when expanding from preview
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
        start
      </code>
    </td>
    
    <td>
      <code>
        () => void
      </code>
    </td>
    
    <td>
      Activate preview mode, applying config overrides
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        stop
      </code>
    </td>
    
    <td>
      <code>
        () => void
      </code>
    </td>
    
    <td>
      Deactivate preview mode, removing overrides
    </td>
  </tr>
</tbody>
</table>

## Usage

```ts
// Start preview manually
instance.preview.start();

// Stop preview
instance.preview.stop();

// Check state
if (instance.preview.isPreviewing) {
  console.log('Preview is active');
}

// Read behavior flags set via config
console.log(instance.preview.isKeepTimeOnExpand);
console.log(instance.preview.isKeepMuteOnExpand);
```

## Events

Preview state changes emit events on the event bus:

```ts
import { ScenaEvent } from '@retoo/scena';

instance.api.events.on(ScenaEvent.ON_PREVIEW_START, () => {
  console.log('Preview activated');
});

instance.api.events.on(ScenaEvent.ON_PREVIEW_STOP, () => {
  console.log('Preview deactivated');
});
```

<callout icon="i-lucide-arrow-right" to="/features/preview">

See **Preview** feature guide for config structure and how overrides are applied.

</callout>
