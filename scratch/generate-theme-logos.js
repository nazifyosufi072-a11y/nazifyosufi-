const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const inputPath = 'C:/Users/0731g/.gemini/antigravity/brain/02019eb3-a8fe-42fd-96ac-858b9f0953b9/artin_clean_a_logo_1786536406085.jpg';
const outDir = 'C:/Users/0731g/.gemini/antigravity/scratch/artin-team-website/public/images';

async function generateThemeLogos() {
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const channels = info.channels;

  // 1. Dark Mode Logo Data Buffer
  const darkData = Buffer.from(data);
  for (let i = 0; i < darkData.length; i += channels) {
    const r = darkData[i];
    const g = darkData[i + 1];
    const b = darkData[i + 2];
    const brightness = Math.max(r, g, b);

    if (brightness < 30) {
      darkData[i + 3] = 0; // Transparent background
    } else {
      // Dark moody charcoal theme matching reference
      const factor = 0.85;
      darkData[i] = Math.round(r * factor);
      darkData[i + 1] = Math.round(g * factor * 0.95);
      darkData[i + 2] = Math.round(b * factor * 1.05); // Subtle dark slate tint
      darkData[i + 3] = brightness < 60 ? Math.round(((brightness - 30) / 30) * 255) : 255;
    }
  }

  // 2. Light Mode Logo Data Buffer (Enhanced contrast for light background)
  const lightData = Buffer.from(data);
  for (let i = 0; i < lightData.length; i += channels) {
    const r = lightData[i];
    const g = lightData[i + 1];
    const b = lightData[i + 2];
    const brightness = Math.max(r, g, b);

    if (brightness < 28) {
      lightData[i + 3] = 0; // Transparent background
    } else {
      // Crisp silver/dark slate high contrast for light mode
      const factor = 1.15;
      lightData[i] = Math.min(255, Math.round(r * factor));
      lightData[i + 1] = Math.min(255, Math.round(g * factor));
      lightData[i + 2] = Math.min(255, Math.round(b * factor));
      lightData[i + 3] = brightness < 55 ? Math.round(((brightness - 28) / 27) * 255) : 255;
    }
  }

  // Save Dark Mode Logo
  await sharp(darkData, { raw: { width, height, channels } })
    .png()
    .toFile(path.join(outDir, 'logo-dark.png'));

  // Save Light Mode Logo
  await sharp(lightData, { raw: { width, height, channels } })
    .png()
    .toFile(path.join(outDir, 'logo-light.png'));

  console.log('Successfully generated logo-dark.png and logo-light.png');
}

generateThemeLogos().catch(console.error);
