const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// SVG Favicon with the brand initials "NK" (Nexvia Kapazi)
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none">
  <defs>
    <!-- Background Gradient -->
    <linearGradient id="bgGrad" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#060E26"/>
      <stop offset="45%" stop-color="#020716"/>
      <stop offset="100%" stop-color="#00040E"/>
    </linearGradient>

    <!-- Border Gradient -->
    <linearGradient id="borderGrad" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00F0FF" stop-opacity="0.9"/>
      <stop offset="50%" stop-color="#0066FF" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#38BDF8" stop-opacity="0.8"/>
    </linearGradient>

    <!-- Brand Cyan / Electric Gradient for 'N' -->
    <linearGradient id="brandCyan" x1="80" y1="120" x2="300" y2="400" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#38BDF8"/>
      <stop offset="40%" stop-color="#00F0FF"/>
      <stop offset="100%" stop-color="#0284C7"/>
    </linearGradient>

    <!-- Silver / Platinum Gradient for 'K' -->
    <linearGradient id="silverGrad" x1="260" y1="120" x2="440" y2="400" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="50%" stop-color="#E2E8F0"/>
      <stop offset="100%" stop-color="#94A3B8"/>
    </linearGradient>

    <!-- Soft Glow Filter -->
    <filter id="softGlow" x="-10%" y="-10%" width="120%" height="120%">
      <feGaussianBlur stdDeviation="8" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- Base Squircle -->
  <rect x="20" y="20" width="472" height="472" rx="116" fill="url(#bgGrad)" stroke="url(#borderGrad)" stroke-width="14"/>

  <!-- Subtle Accent Radial Highlight -->
  <ellipse cx="256" cy="180" rx="160" ry="100" fill="#00F0FF" opacity="0.08"/>

  <!-- Monogram Group (NK) italicized & geometric matching Exo 2 font-brand -->
  <g transform="skewX(-11) translate(46, 0)">
    <!-- Letter N (Cyan / Electric Gradient) -->
    <!-- Left vertical bar of N -->
    <path d="M100 135 H154 V375 H100 Z" fill="url(#brandCyan)"/>
    
    <!-- Diagonal stroke of N -->
    <path d="M136 135 H196 L278 375 H218 Z" fill="url(#brandCyan)"/>
    
    <!-- Right vertical bar of N (shared spine with K) -->
    <path d="M246 135 H300 V375 H246 Z" fill="url(#brandCyan)"/>

    <!-- Letter K (Silver / White Gradient) -->
    <!-- Upper diagonal of K -->
    <path d="M308 262 L394 135 H464 L360 286 Z" fill="url(#silverGrad)"/>
    
    <!-- Lower diagonal of K -->
    <path d="M344 266 L468 375 H396 L298 288 Z" fill="url(#silverGrad)"/>
  </g>

  <!-- Small Brand Accent Dot / Diamond -->
  <circle cx="432" cy="132" r="10" fill="#00F0FF" opacity="0.9"/>
</svg>`;

// Save SVG favicon
const publicDir = path.join(__dirname, 'public');
const assetsDir = path.join(publicDir, 'assets');

fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgContent, 'utf8');
console.log('Saved public/favicon.svg');

// Now let's create a crisp 64x64 PNG programmatically
// Create a 64x64 RGBA buffer
const width = 64;
const height = 64;
const rgba = Buffer.alloc(width * height * 4);

// Helper function to draw pixels
function setPixel(x, y, r, g, b, a = 255) {
  if (x < 0 || x >= width || y < 0 || y >= height) return;
  const idx = (y * width + x) * 4;
  // Blend with existing pixel
  const srcA = a / 255;
  const dstA = rgba[idx + 3] / 255;
  const outA = srcA + dstA * (1 - srcA);
  if (outA > 0) {
    rgba[idx] = Math.round((r * srcA + rgba[idx] * dstA * (1 - srcA)) / outA);
    rgba[idx + 1] = Math.round((g * srcA + rgba[idx + 1] * dstA * (1 - srcA)) / outA);
    rgba[idx + 2] = Math.round((b * srcA + rgba[idx + 2] * dstA * (1 - srcA)) / outA);
    rgba[idx + 3] = Math.round(outA * 255);
  }
}

// Draw rounded rectangle background (Navy)
const cornerRadius = 14;
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    // Check distance to corners
    let inside = true;
    let dist = 0;
    if (x < cornerRadius && y < cornerRadius) {
      dist = Math.hypot(cornerRadius - x, cornerRadius - y);
      if (dist > cornerRadius) inside = false;
    } else if (x >= width - cornerRadius && y < cornerRadius) {
      dist = Math.hypot(x - (width - cornerRadius - 1), cornerRadius - y);
      if (dist > cornerRadius) inside = false;
    } else if (x < cornerRadius && y >= height - cornerRadius) {
      dist = Math.hypot(cornerRadius - x, y - (height - cornerRadius - 1));
      if (dist > cornerRadius) inside = false;
    } else if (x >= width - cornerRadius && y >= height - cornerRadius) {
      dist = Math.hypot(x - (width - cornerRadius - 1), y - (height - cornerRadius - 1));
      if (dist > cornerRadius) inside = false;
    }

    if (inside) {
      // Border detection (1-2px)
      const isBorder = (x <= 1 || x >= width - 2 || y <= 1 || y >= height - 2 || dist >= cornerRadius - 2);
      if (isBorder) {
        // Cyan border
        setPixel(x, y, 0, 240, 255, 230);
      } else {
        // Dark navy gradient
        const gradRatio = (x + y) / (width + height);
        const r = Math.round(4 + gradRatio * 2);
        const g = Math.round(10 + gradRatio * 5);
        const b = Math.round(34 + gradRatio * 15);
        setPixel(x, y, r, g, b, 255);
      }
    }
  }
}

// Helper to draw italic filled polygons for letters "N" and "K"
// Map from 512x512 coordinates to 64x64
function mapCoord(origX, origY) {
  // Account for skew: origX - 0.194 * origY + 46
  const skewedX = origX - 0.194 * origY + 54;
  const px = (skewedX / 512) * 64;
  const py = (origY / 512) * 64;
  return [px, py];
}

// Simple point-in-polygon test
function pointInPoly(px, py, poly) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i][0], yi = poly[i][1];
    const xj = poly[j][0], yj = poly[j][1];
    const intersect = ((yi > py) !== (yj > py)) &&
      (px < (xj - xi) * (py - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

const nLeft = [[100, 135], [154, 135], [154, 375], [100, 375]].map(p => mapCoord(p[0], p[1]));
const nDiag = [[136, 135], [196, 135], [278, 375], [218, 375]].map(p => mapCoord(p[0], p[1]));
const nRight = [[246, 135], [300, 135], [300, 375], [246, 375]].map(p => mapCoord(p[0], p[1]));
const kTop = [[308, 262], [394, 135], [464, 135], [360, 286]].map(p => mapCoord(p[0], p[1]));
const kBot = [[344, 266], [468, 375], [396, 375], [298, 288]].map(p => mapCoord(p[0], p[1]));

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const px = x + 0.5;
    const py = y + 0.5;
    
    // Draw N (Cyan / Electric)
    if (pointInPoly(px, py, nLeft) || pointInPoly(px, py, nDiag) || pointInPoly(px, py, nRight)) {
      const gradRatio = y / height;
      const r = Math.round(0 * (1 - gradRatio) + 0 * gradRatio);
      const g = Math.round(240 * (1 - gradRatio) + 150 * gradRatio);
      const b = 255;
      setPixel(x, y, r, g, b, 255);
    }
    
    // Draw K (Silver / White)
    else if (pointInPoly(px, py, kTop) || pointInPoly(px, py, kBot)) {
      const gradRatio = y / height;
      const val = Math.round(255 * (1 - gradRatio * 0.3));
      setPixel(x, y, val, val, val, 255);
    }
  }
}

// Convert RGBA buffer to valid PNG buffer
function createPng(width, height, rgbaBuffer) {
  // PNG signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr.writeUInt8(8, 8); // bit depth 8
  ihdr.writeUInt8(6, 9); // RGBA color type
  ihdr.writeUInt8(0, 10); // compression method 0
  ihdr.writeUInt8(0, 11); // filter method 0
  ihdr.writeUInt8(0, 12); // interlace method 0

  function makeChunk(type, data) {
    const len = data.length;
    const buf = Buffer.alloc(4 + 4 + len + 4);
    buf.writeUInt32BE(len, 0);
    buf.write(type, 4, 4, 'ascii');
    data.copy(buf, 8);
    const crc = crc32(buf.subarray(4, 8 + len));
    buf.writeUInt32BE(crc, 8 + len);
    return buf;
  }

  // Raw image data with filter byte 0 at start of each scanline
  const scanlines = Buffer.alloc(height * (width * 4 + 1));
  for (let y = 0; y < height; y++) {
    const scanlineOffset = y * (width * 4 + 1);
    scanlines[scanlineOffset] = 0; // Filter None
    rgbaBuffer.copy(scanlines, scanlineOffset + 1, y * width * 4, (y + 1) * width * 4);
  }

  const idatData = zlib.deflateSync(scanlines);
  const idatChunk = makeChunk('IDAT', idatData);
  const ihdrChunk = makeChunk('IHDR', ihdr);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

// CRC32 table
const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    if (c & 1) c = 0xedb88320 ^ (c >>> 1);
    else c = c >>> 1;
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

const pngBuffer = createPng(width, height, rgba);
fs.writeFileSync(path.join(publicDir, 'favicon.png'), pngBuffer);
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), pngBuffer);
console.log('Saved public/favicon.png and public/apple-touch-icon.png');

// Create standard ICO file embedding the PNG
function createIco(pngBuf, w = 64, h = 64) {
  const icoHeader = Buffer.alloc(6);
  icoHeader.writeUInt16LE(0, 0); // reserved
  icoHeader.writeUInt16LE(1, 2); // icon type
  icoHeader.writeUInt16LE(1, 4); // 1 image

  const icoEntry = Buffer.alloc(16);
  icoEntry.writeUInt8(w === 256 ? 0 : w, 0);
  icoEntry.writeUInt8(h === 256 ? 0 : h, 1);
  icoEntry.writeUInt8(0, 2); // palette colors
  icoEntry.writeUInt8(0, 3); // reserved
  icoEntry.writeUInt16LE(1, 4); // color planes
  icoEntry.writeUInt16LE(32, 6); // bpp
  icoEntry.writeUInt32LE(pngBuf.length, 8); // size of image data
  icoEntry.writeUInt32LE(22, 12); // offset of image data

  return Buffer.concat([icoHeader, icoEntry, pngBuf]);
}

const icoBuffer = createIco(pngBuffer, 64, 64);
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
fs.writeFileSync(path.join(assetsDir, 'favicon.ico'), icoBuffer);
console.log('Saved public/favicon.ico and public/assets/favicon.ico');
