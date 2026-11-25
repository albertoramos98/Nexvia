const fs = require("fs");
const path = require("path");

const srcDir = path.join(__dirname, "original_site", "assets");
const destDir = path.join(__dirname, "public", "assets");
const stylesDir = path.join(__dirname, "src", "styles");

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}
if (!fs.existsSync(stylesDir)) {
  fs.mkdirSync(stylesDir, { recursive: true });
}

// Copy styles.css to src/styles/main.css
fs.copyFileSync(path.join(__dirname, "original_site", "styles.css"), path.join(stylesDir, "main.css"));
console.log("Copied styles.css to src/styles/main.css");

const files = fs.readdirSync(srcDir);
for (const f of files) {
  if (f === "favicon.ico") {
    fs.copyFileSync(path.join(srcDir, f), path.join(__dirname, "public", "favicon.ico"));
    console.log(`Copied favicon.ico to public/`);
  }
  fs.copyFileSync(path.join(srcDir, f), path.join(destDir, f));
  console.log(`Copied ${f} to public/assets/`);
}

console.log("All assets copied successfully!");

