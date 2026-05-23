const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, 'design', 'image_797669995937629.png');
const outputDir = path.join(__dirname, 'src', 'static', 'tabbar');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const iconNames = ['home', 'member', 'recharge', 'consume', 'settings'];

async function cropIcons() {
  try {
    // Get image metadata
    const metadata = await sharp(inputPath).metadata();
    console.log(`Image size: ${metadata.width}x${metadata.height}`);

    // Assume 5 icons evenly spaced horizontally
    const iconWidth = Math.floor(metadata.width / 5);
    const iconHeight = metadata.height;

    console.log(`Each icon size: ${iconWidth}x${iconHeight}`);

    // Crop each icon
    for (let i = 0; i < 5; i++) {
      const left = i * iconWidth;
      const name = iconNames[i];

      // Crop normal icon (gray)
      await sharp(inputPath)
        .extract({ left, top: 0, width: iconWidth, height: iconHeight })
        .resize(81, 81) // Recommended size for uni-app tabBar
        .png()
        .toFile(path.join(outputDir, `${name}.png`));

      console.log(`Created: ${name}.png`);

      // For active icon, we'll create a version with teal tint later
      // For now, just copy the same for active
      await sharp(inputPath)
        .extract({ left, top: 0, width: iconWidth, height: iconHeight })
        .resize(81, 81)
        .png()
        .toFile(path.join(outputDir, `${name}-active.png`));

      console.log(`Created: ${name}-active.png`);
    }

    console.log('All icons cropped successfully!');
  } catch (error) {
    console.error('Error cropping icons:', error);
  }
}

cropIcons();
