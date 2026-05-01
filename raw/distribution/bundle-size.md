# Bundle Size

> Size of each distribution format and tree-shaking capabilities.

The production bundle (minified JS + CSS) weighs under **30 KB gzipped**. Scena has no runtime dependencies and loads nothing beyond the video source you provide.

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
      81.90 KB
    </td>
    
    <td>
      26.47 KB
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
      82.16 KB
    </td>
    
    <td>
      26.57 KB
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
      82.17 KB
    </td>
    
    <td>
      26.52 KB
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
      224.05 KB
    </td>
    
    <td>
      44.16 KB
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
      239.41 KB
    </td>
    
    <td>
      45.27 KB
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
      225.13 KB
    </td>
    
    <td>
      44.31 KB
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
