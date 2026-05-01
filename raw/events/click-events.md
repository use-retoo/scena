# Click Events

> Handle user clicks on the video container, CTA button, and close button.

Click events fire when the user clicks on a widget element. Each handler receives the native DOM `MouseEvent`, which can be used to inspect the target element, cursor position, or modifier keys.

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
        ON_VIDEO_CONTAINER_CLICK
      </code>
    </td>
    
    <td>
      <code>
        video-container:click
      </code>
    </td>
    
    <td>
      User clicks the video container
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ON_CTA_CLICK
      </code>
    </td>
    
    <td>
      <code>
        cta:click
      </code>
    </td>
    
    <td>
      User clicks the CTA button
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ON_CLOSE_CLICK
      </code>
    </td>
    
    <td>
      <code>
        close:click
      </code>
    </td>
    
    <td>
      User clicks the close button
    </td>
  </tr>
</tbody>
</table>

## Usage

```ts
import { ScenaEvent } from '@retoo/scena';

instance.api.events.on(ScenaEvent.ON_VIDEO_CONTAINER_CLICK, (event) => {
  console.log('Video container clicked');
});

instance.api.events.on(ScenaEvent.ON_CTA_CLICK, (event) => {
  window.open('https://example.com', '_blank');
});

instance.api.events.on(ScenaEvent.ON_CLOSE_CLICK, (event) => {
  console.log('Close button clicked');
});
```
