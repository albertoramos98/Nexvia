const fs = require("fs");
const path = require("path");

const srcDir = path.join(__dirname, "original_site", "assets");
const destDir = path.join(__dirname, "public", "assets");

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

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

