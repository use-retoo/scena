# Video Events

> React to playback state changes — play, pause, ended, seeking, time update, volume change, buffering, and errors.

Video events fire in response to playback state changes. Each event handler receives an object with the current `ScenaVideoState` and the original browser `Event`:

```ts
interface ScenaVideoEventOptions {
  state: ScenaVideoState;
  event: Event;
}
```

The error event may carry an `error` field instead of `event`:

```ts
interface ScenaVideoEventOptionsWithError {
  state: ScenaVideoState;
  error: unknown;
}
```

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
        ON_VIDEO_READY
      </code>
    </td>
    
    <td>
      <code>
        video:on-ready
      </code>
    </td>
    
    <td>
      Video metadata is loaded and ready to play
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ON_VIDEO_CAN_PLAY
      </code>
    </td>
    
    <td>
      <code>
        video:on-can-play
      </code>
    </td>
    
    <td>
      Enough data buffered to start playback
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ON_VIDEO_PLAY
      </code>
    </td>
    
    <td>
      <code>
        video:on-play
      </code>
    </td>
    
    <td>
      Playback starts or resumes
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ON_VIDEO_PAUSE
      </code>
    </td>
    
    <td>
      <code>
        video:on-pause
      </code>
    </td>
    
    <td>
      Playback is paused
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ON_VIDEO_ENDED
      </code>
    </td>
    
    <td>
      <code>
        video:on-ended
      </code>
    </td>
    
    <td>
      Playback reaches the end
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ON_VIDEO_SEEKING
      </code>
    </td>
    
    <td>
      <code>
        video:on-seeking
      </code>
    </td>
    
    <td>
      Video is seeking to a new position
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ON_VIDEO_SEEKED
      </code>
    </td>
    
    <td>
      <code>
        video:on-seeked
      </code>
    </td>
    
    <td>
      Seek operation completes
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ON_VIDEO_SEEK_START
      </code>
    </td>
    
    <td>
      <code>
        video:on-seek-start
      </code>
    </td>
    
    <td>
      User begins dragging the progress bar
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ON_VIDEO_SEEK_END
      </code>
    </td>
    
    <td>
      <code>
        video:on-seek-end
      </code>
    </td>
    
    <td>
      User releases the progress bar
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ON_VIDEO_TIME_UPDATE
      </code>
    </td>
    
    <td>
      <code>
        video:on-time-update
      </code>
    </td>
    
    <td>
      Current playback time changes
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ON_VIDEO_VOLUME_CHANGE
      </code>
    </td>
    
    <td>
      <code>
        video:on-volume-change
      </code>
    </td>
    
    <td>
      Volume level or mute state changes
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ON_VIDEO_STATE_CHANGE
      </code>
    </td>
    
    <td>
      <code>
        video:on-state-change
      </code>
    </td>
    
    <td>
      Any video state property changes
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ON_VIDEO_LOAD_START
      </code>
    </td>
    
    <td>
      <code>
        video:on-load-start
      </code>
    </td>
    
    <td>
      Browser begins loading the video
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ON_VIDEO_LOADED
      </code>
    </td>
    
    <td>
      <code>
        video:on-loaded
      </code>
    </td>
    
    <td>
      Video data is fully loaded
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ON_VIDEO_WAITING
      </code>
    </td>
    
    <td>
      <code>
        video:on-waiting
      </code>
    </td>
    
    <td>
      Playback stalls due to buffering
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ON_VIDEO_PROGRESSED
      </code>
    </td>
    
    <td>
      <code>
        video:on-progressed
      </code>
    </td>
    
    <td>
      Browser downloads more video data
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ON_VIDEO_ERROR
      </code>
    </td>
    
    <td>
      <code>
        video:on-error
      </code>
    </td>
    
    <td>
      A playback or loading error occurs
    </td>
  </tr>
</tbody>
</table>

## Usage

```ts
import { ScenaEvent } from '@retoo/scena';

instance.api.events.on(ScenaEvent.ON_VIDEO_PLAY, ({ state, event }) => {
  console.log('Playing, current time:', state.currentTime);
});

instance.api.events.on(ScenaEvent.ON_VIDEO_TIME_UPDATE, ({ state }) => {
  console.log('Time:', state.currentTime, '/', state.duration);
});

instance.api.events.on(ScenaEvent.ON_VIDEO_ENDED, ({ state }) => {
  console.log('Finished');
});

instance.api.events.on(ScenaEvent.ON_VIDEO_ERROR, (data) => {
  if ('error' in data) {
    console.error('Error:', data.error);
  }
});
```

## Seek events

There are two levels of seek events:

- `ON_VIDEO_SEEKING` / `ON_VIDEO_SEEKED` — native browser seek events, fire on any seek operation.
- `ON_VIDEO_SEEK_START` / `ON_VIDEO_SEEK_END` — fire when the user interacts with the progress bar.

```ts
instance.api.events.on(ScenaEvent.ON_VIDEO_SEEK_START, ({ state }) => {
  console.log('User started seeking from', state.currentTime);
});

instance.api.events.on(ScenaEvent.ON_VIDEO_SEEK_END, ({ state }) => {
  console.log('User seeked to', state.currentTime);
});
```
