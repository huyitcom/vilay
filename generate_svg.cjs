const bg = `<svg width="800" height="800" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="800" fill="#fba1b7"/>
  <polygon points="0,200 800,400 800,800 0,800" fill="#d26c8b"/>
</svg>`;

const overlay = `<svg width="800" height="800" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <mask id="hole">
      <rect width="800" height="800" fill="white" />
      <g transform="translate(400, 400) rotate(-7) translate(-400, -400)">
        <rect x="180" y="130" width="440" height="540" rx="10" fill="black" />
      </g>
    </mask>
  </defs>
  
  <rect width="800" height="800" fill="white" mask="url(#hole)" />
  
  <!-- Tape 1 -->
  <rect x="580" y="80" width="160" height="40" fill="#ffb6c1" rx="5" transform="rotate(-5 580 80)"/>
  
  <!-- Tape 2 -->
  <rect x="60" y="600" width="160" height="40" fill="#ffb6c1" rx="5" transform="rotate(5 60 600)"/>
  
  <!-- Flowers -->
  <circle cx="150" cy="250" r="40" fill="#c1e1c1"/>
  <circle cx="150" cy="250" r="20" fill="#ffb6c1"/>
  
  <circle cx="650" cy="350" r="50" fill="#c1e1c1"/>
  <circle cx="650" cy="350" r="25" fill="#ffb6c1"/>
</svg>`;

console.log("export const BG_SVG = 'data:image/svg+xml;base64," + Buffer.from(bg).toString('base64') + "';");
console.log("export const OVERLAY_SVG = 'data:image/svg+xml;base64," + Buffer.from(overlay).toString('base64') + "';");
