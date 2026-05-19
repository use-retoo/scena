# Bundle Size

> Size of each distribution format and tree-shaking capabilities.

The production bundle (minified JS + CSS) weighs **~30 KB gzipped**. Scena has no runtime dependencies and loads nothing beyond the video source you provide.

## Distribution files

Each module format ships in two variants: a minified production build and an unminified development build with readable code and comments.

<table>
<thead>
  <tr>
    <th>
      File
    </th>
    
    <th>
      Format
    </th>
    
    <th>
      Raw
    </th>
    
    <th>
      Gzip
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        scena.min.es.js
      </code>
    </td>
    
    <td>
      ES Module
    </td>
    
    <td>
      119.42 KB
    </td>
    
    <td>
      33.17 KB
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        scena.min.umd.js
      </code>
    </td>
    
    <td>
      UMD
    </td>
    
    <td>
      123.83 KB
    </td>
    
    <td>
      33.44 KB
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        scena.min.cjs.js
      </code>
    </td>
    
    <td>
      CommonJS
    </td>
    
    <td>
      119.75 KB
    </td>
    
    <td>
      33.21 KB
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        scena.es.js
      </code>
    </td>
    
    <td>
      ES Module
    </td>
    
    <td>
      264.15 KB
    </td>
    
    <td>
      60.39 KB
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        scena.umd.js
      </code>
    </td>
    
    <td>
      UMD
    </td>
    
    <td>
      273.67 KB
    </td>
    
    <td>
      61.04 KB
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        scena.cjs.js
      </code>
    </td>
    
    <td>
      CommonJS
    </td>
    
    <td>
      265.28 KB
    </td>
    
    <td>
      60.54 KB
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        scena.min.css
      </code>
    </td>
    
    <td>
      CSS
    </td>
    
    <td>
      21.4 KB
    </td>
    
    <td>
      3.2 KB
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        scena.css
      </code>
    </td>
    
    <td>
      CSS
    </td>
    
    <td>
      24.1 KB
    </td>
    
    <td>
      3.3 KB
    </td>
  </tr>
</tbody>
</table>
