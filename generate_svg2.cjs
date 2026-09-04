const fs = require('fs');

const overlay = `<svg width="800" height="800" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- The mask cuts out a transparent hole in the middle of our opaque SVG -->
    <mask id="hole">
      <!-- Everything is white (opaque) -->
      <rect width="800" height="800" fill="white" />
      <!-- Except the hole which is black (transparent) -->
      <!-- Tilted 3 degrees right -->
      <g transform="translate(400, 380) rotate(3) translate(-400, -380)">
        <rect x="200" y="100" width="400" height="520" fill="black" />
      </g>
    </mask>
    
    <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
      <circle cx="10" cy="10" r="3" fill="#fff" opacity="0.6"/>
    </pattern>
  </defs>
  
  <!-- The main background with the hole cut out -->
  <g mask="url(#hole)">
    <!-- Pink Background -->
    <rect width="800" height="800" fill="#f4a5b9" />
    <polygon points="0,400 800,550 800,800 0,800" fill="#c46487" />
    
    <!-- The white scalloped frame (larger than the hole) -->
    <g transform="translate(400, 380) rotate(3) translate(-400, -380)">
      <rect x="180" y="80" width="440" height="560" rx="15" fill="white" />
      <!-- Inner dashed stroke for decoration -->
      <rect x="195" y="95" width="410" height="530" rx="5" fill="none" stroke="#ddd" stroke-width="2" stroke-dasharray="10 10"/>
    </g>
  </g>
  
  <!-- Tapes -->
  <g transform="translate(600, 100) rotate(-10)">
    <rect x="-60" y="-20" width="120" height="40" rx="5" fill="#ffb6c1" />
    <rect x="-60" y="-20" width="120" height="40" rx="5" fill="url(#dots)" />
  </g>
  <g transform="translate(180, 680) rotate(-5)">
    <rect x="-60" y="-20" width="120" height="40" rx="5" fill="#ffb6c1" />
    <rect x="-60" y="-20" width="120" height="40" rx="5" fill="url(#dots)" />
  </g>
  
  <!-- Flowers -->
  <g transform="translate(140, 250)">
    <circle cx="0" cy="-20" r="25" fill="#dcedc1" />
    <circle cx="20" cy="0" r="25" fill="#dcedc1" />
    <circle cx="0" cy="20" r="25" fill="#dcedc1" />
    <circle cx="-20" cy="0" r="25" fill="#dcedc1" />
    <circle cx="0" cy="0" r="18" fill="#ffb6c1" />
    <circle cx="0" cy="0" r="8" fill="#fff" />
  </g>
  
  <g transform="translate(680, 360)">
    <circle cx="0" cy="-20" r="25" fill="#dcedc1" />
    <circle cx="20" cy="0" r="25" fill="#dcedc1" />
    <circle cx="0" cy="20" r="25" fill="#dcedc1" />
    <circle cx="-20" cy="0" r="25" fill="#dcedc1" />
    <circle cx="0" cy="0" r="18" fill="#ffb6c1" />
    <circle cx="0" cy="0" r="8" fill="#fff" />
  </g>
  
  <!-- Text Ribbon -->
  <g transform="translate(400, 720) rotate(-2)">
    <path d="M-220,-35 Q0,-45 220,-35 L230,25 Q0,35 -220,25 Z" fill="white" />
    <text x="0" y="8" font-family="cursive, sans-serif" font-size="40" fill="#5c3a41" text-anchor="middle" font-weight="bold">Happy Easter</text>
  </g>
</svg>`;

console.log("export const OVERLAY_SVG_2 = 'data:image/svg+xml;base64," + Buffer.from(overlay).toString('base64') + "';");
