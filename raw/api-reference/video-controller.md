# Video Controller

> Control playback with play, pause, stop, seek, mute, unmute, setVolume, and reactive state properties.

The video controller lives at `instance.api.controller` and combines imperative playback methods (play, pause, seek, volume) with reactive state properties that update automatically during playback.

```ts
const controller = instance.api.controller;
```

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
        play
      </code>
    </td>
    
    <td>
      <code>
        () => Promise<void>
      </code>
    </td>
    
    <td>
      Start or resume playback
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        pause
      </code>
    </td>
    
    <td>
      <code>
        () => void
      </code>
    </td>
    
    <td>
      Pause playback
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
      Stop playback and reset to the beginning
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        seek
      </code>
    </td>
    
    <td>
      <code>
        (value: number) => void
      </code>
    </td>
    
    <td>
      Seek to a specific time in seconds
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        setVolume
      </code>
    </td>
    
    <td>
      <code>
        (value: number) => void
      </code>
    </td>
    
    <td>
      Set volume level (0--1)
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        mute
      </code>
    </td>
    
    <td>
      <code>
        () => void
      </code>
    </td>
    
    <td>
      Mute the video
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        unmute
      </code>
    </td>
    
    <td>
      <code>
        () => void
      </code>
    </td>
    
    <td>
      Unmute the video
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        toggleMute
      </code>
    </td>
    
    <td>
      <code>
        () => void
      </code>
    </td>
    
    <td>
      Toggle between muted and unmuted
    </td>
  </tr>
</tbody>
</table>

## Usage

```ts
// Start playback
await controller.play();

// Seek to 30 seconds
controller.seek(30);

// Set volume to 50%
controller.setVolume(0.5);

// Stop and reset
controller.stop();
```

## Reactive state

The controller also exposes reactive state properties from `ScenaVideoData`. These update automatically during playback.

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
        state
      </code>
    </td>
    
    <td>
      <code>
        ScenaVideoState
      </code>
    </td>
    
    <td>
      Current playback state
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        currentTime
      </code>
    </td>
    
    <td>
      <code>
        number
      </code>
    </td>
    
    <td>
      Current playback position in seconds
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        duration
      </code>
    </td>
    
    <td>
      <code>
        number
      </code>
    </td>
    
    <td>
      Total video duration in seconds
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        progress
      </code>
    </td>
    
    <td>
      <code>
        number
      </code>
    </td>
    
    <td>
      Playback progress as a fraction (0--1)
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        volume
      </code>
    </td>
    
    <td>
      <code>
        number
      </code>
    </td>
    
    <td>
      Current volume level (0--1)
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        buffer
      </code>
    </td>
    
    <td>
      <code>
        number
      </code>
    </td>
    
    <td>
      Buffered amount as a fraction (0--1)
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        buffered
      </code>
    </td>
    
    <td>
      <code>
        TimeRanges | null
      </code>
    </td>
    
    <td>
      Raw <code>
        TimeRanges
      </code>
      
       from the video element
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        isBuffering
      </code>
    </td>
    
    <td>
      <code>
        boolean
      </code>
    </td>
    
    <td>
      Whether the video is currently buffering
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        isSeeking
      </code>
    </td>
    
    <td>
      <code>
        boolean
      </code>
    </td>
    
    <td>
      Whether a seek operation is in progress
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        isMuted
      </code>
    </td>
    
    <td>
      <code>
        boolean
      </code>
    </td>
    
    <td>
      Whether the video is muted
    </td>
  </tr>
</tbody>
</table>

```ts
console.log(controller.currentTime); 
console.log(controller.duration);    
console.log(controller.progress);
console.log(controller.state);
```

<callout icon="i-lucide-arrow-right" to="/api-reference/video-state">

See **Video State** for the full list of playback states.

</callout>
