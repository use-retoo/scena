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
      119.40 KB
    </td>
    
    <td>
      32.54 KB
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
      123.81 KB
    </td>
    
    <td>
      32.81 KB
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
      119.71 KB
    </td>
    
    <td>
      32.58 KB
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
      263.10 KB
    </td>
    
    <td>
      60.02 KB
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
      272.55 KB
    </td>
    
    <td>
      60.65 KB
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
      264.20 KB
    </td>
    
    <td>
      60.16 KB
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
      18.33 KB
    </td>
    
    <td>
      2.87 KB
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
      20.69 KB
    </td>
    
    <td>
      3.01 KB
    </td>
  </tr>
</tbody>
</table>
