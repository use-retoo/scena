# Bundle Size

> Size of each distribution format and tree-shaking capabilities.

The production bundle (minified JS + CSS) weighs **~35 KB gzipped**. Scena has no runtime dependencies and loads nothing beyond the video source you provide.

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
      119.46 KB
    </td>
    
    <td>
      32.87 KB
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
      123.87 KB
    </td>
    
    <td>
      33.23 KB
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
      119.80 KB
    </td>
    
    <td>
      32.91 KB
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
      264.17 KB
    </td>
    
    <td>
      60.03 KB
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
      273.72 KB
    </td>
    
    <td>
      60.78 KB
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
      265.33 KB
    </td>
    
    <td>
      60.18 KB
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
      18.69 KB
    </td>
    
    <td>
      2.95 KB
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
      21.10 KB
    </td>
    
    <td>
      3.10 KB
    </td>
  </tr>
</tbody>
</table>
