# useConfig

> Get, set, and deep merge widget configuration at runtime with getConfig, setConfig, and mergeConfig.

The config store is available on every `ScenaInstance` at `instance.config`. It provides reactive access to the current configuration and methods to update it without remounting.

```ts
const instance = await scena.mount({
  video: { src: '/video.mp4' },
  size: ComponentSize.MD,
});

const config = instance.config;
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
        current
      </code>
    </td>
    
    <td>
      <code>
        ScenaConfig
      </code>
    </td>
    
    <td>
      Current resolved config snapshot
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
        getConfig
      </code>
    </td>
    
    <td>
      <code>
        () => ScenaConfig
      </code>
    </td>
    
    <td>
      Returns the current config object
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        setConfig
      </code>
    </td>
    
    <td>
      <code>
        (value: ScenaConfig) => void
      </code>
    </td>
    
    <td>
      Replaces the entire config
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        mergeConfig
      </code>
    </td>
    
    <td>
      <code>
        (partial: Partial<ScenaConfig>) => void
      </code>
    </td>
    
    <td>
      Deep merges partial config into current
    </td>
  </tr>
</tbody>
</table>

## Reading config

```ts
const config = instance.config.getConfig();

console.log(config.size);
console.log(config.video.src);
```

The `current` property returns the same snapshot reactively:

```ts
console.log(instance.config.current.shape);
```

## Replacing config

Replaces the entire config. All properties must be provided:

```ts
instance.config.setConfig({
  video: { src: '/other.mp4' },
  size: ComponentSize.LG,
  shape: ComponentShape.PORTRAIT,
});
```

## Merging config

Deep merges a partial update into the existing config. Unmentioned properties stay unchanged:

```ts
instance.config.mergeConfig({
  size: ComponentSize.LG,
  ctaButton: { text: 'New label' },
});
```

This is the preferred way to update individual properties at runtime.
