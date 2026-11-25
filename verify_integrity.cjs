const fs = require('fs');
const path = require('path');

const productsFile = fs.readFileSync(path.join(__dirname, 'src', 'data', 'products.js'), 'utf8');

console.log("=== INTEGRITY VERIFICATION ===");

// Check products count
const productMatches = (productsFile.match(/slug:\s*"[^"]+"/g) || []);
console.log(`Total products declared: ${productMatches.length}`);

// Check categories count
const catMatches = (productsFile.match(/id:\s*"(entrada|trafego|conforto|molhadas|lazer)"/g) || []);
console.log(`Total categories declared: ${catMatches.length}`);

// Check all image paths on disk
const imgMatches = productsFile.match(/\/assets\/[a-zA-Z0-9_\-\.]+\.webp/g) || [];
const uniqueImgs = Array.from(new Set(imgMatches));
console.log(`Checking ${uniqueImgs.length} unique image paths on disk...`);

let missing = 0;
for (const imgPath of uniqueImgs) {
  const filePath = path.join(__dirname, 'public', imgPath.replace(/^\//, ''));
  if (!fs.existsSync(filePath)) {
    console.error(`MISSING IMAGE: ${filePath}`);
    missing++;
  } else {
    const stat = fs.statSync(filePath);
    if (stat.size === 0) {
      console.error(`EMPTY IMAGE: ${filePath}`);
      missing++;
    }
  }
}

if (missing === 0) {
  console.log("SUCCESS: All images exist on disk and have valid file sizes!");
} else {
  console.error(`FAILURE: ${missing} images are missing or empty.`);
}

// Verify favicon
const favPath = path.join(__dirname, 'public', 'favicon.ico');
if (fs.existsSync(favPath) && fs.statSync(favPath).size > 0) {
  console.log("SUCCESS: Favicon exists and is non-empty!");
} else {
  console.error("FAILURE: Favicon missing or empty.");
}

