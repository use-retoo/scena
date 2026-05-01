# DOM Events

> Listen to scena:mount and scena:unmount events on the custom element via addEventListener.

The custom element dispatches two events on the DOM element itself. Both bubble and cross shadow DOM boundaries (`composed: true`).

## scena:mount

Fires after `.mount()` completes. The `ScenaInstance` is available in `event.detail`:

```ts
el.addEventListener('scena:mount', (event) => {
  const instance = event.detail;

  instance.visibility.show();
});
```

## scena:unmount

Fires after `.unmount()` completes or when the element is removed from the DOM. No detail payload:

```ts
el.addEventListener('scena:unmount', () => {
  console.log('Widget unmounted');
});
```

## Event summary

<table>
<thead>
  <tr>
    <th>
      Event
    </th>
    
    <th>
      Fires when
    </th>
    
    <th>
      <code>
        event.detail
      </code>
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        scena:mount
      </code>
    </td>
    
    <td>
      Widget is mounted inside the element
    </td>
    
    <td>
      <code>
        ScenaInstance
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        scena:unmount
      </code>
    </td>
    
    <td>
      Widget is unmounted or element is removed from DOM
    </td>
    
    <td>
      —
    </td>
  </tr>
</tbody>
</table>
