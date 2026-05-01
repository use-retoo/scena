# Video State

> Playback state machine — idle, loading, playing, paused, ended, error.

An enum representing the current playback state of the video element. The value is available as a reactive property at `controller.state` and is also included in every video event payload.

```ts
import { ScenaVideoState } from '@retoo/scena';
```

## States

<table>
<thead>
  <tr>
    <th>
      Value
    </th>
    
    <th>
      String
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
        IDLE
      </code>
    </td>
    
    <td>
      <code>
        idle
      </code>
    </td>
    
    <td>
      Initial state before any playback action
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        LOADING
      </code>
    </td>
    
    <td>
      <code>
        loading
      </code>
    </td>
    
    <td>
      Video data is being loaded
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        PLAYING
      </code>
    </td>
    
    <td>
      <code>
        playing
      </code>
    </td>
    
    <td>
      Video is actively playing
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        PAUSED
      </code>
    </td>
    
    <td>
      <code>
        paused
      </code>
    </td>
    
    <td>
      Playback is paused
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ENDED
      </code>
    </td>
    
    <td>
      <code>
        ended
      </code>
    </td>
    
    <td>
      Playback reached the end
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ERROR
      </code>
    </td>
    
    <td>
      <code>
        error
      </code>
    </td>
    
    <td>
      A playback or loading error occurred
    </td>
  </tr>
</tbody>
</table>

## Usage

```ts
const controller = instance.api.controller;

if (controller.state === ScenaVideoState.PLAYING) {
  controller.pause();
}

if (controller.state === ScenaVideoState.ENDED) {
  controller.seek(0);
  await controller.play();
}
```

## With events

The `ON_VIDEO_STATE_CHANGE` event fires whenever the state transitions. The handler receives the new state:

```ts
import { ScenaEvent, ScenaVideoState } from '@retoo/scena';

instance.api.events.on(ScenaEvent.ON_VIDEO_STATE_CHANGE, ({ state }) => {
  switch (state) {
    case ScenaVideoState.PLAYING:
      console.log('Started playing');
      break;
    case ScenaVideoState.PAUSED:
      console.log('Paused');
      break;
    case ScenaVideoState.ENDED:
      console.log('Finished');
      break;
    case ScenaVideoState.ERROR:
      console.log('Error occurred');
      break;
  }
});
```
