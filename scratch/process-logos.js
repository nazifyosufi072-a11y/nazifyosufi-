const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const img1Path = 'C:/Users/0731g/.gemini/antigravity/brain/02019eb3-a8fe-42fd-96ac-858b9f0953b9/artin_clean_a_logo_1786536406085.jpg';
const img2Path = 'C:/Users/0731g/.gemini/antigravity/brain/02019eb3-a8fe-42fd-96ac-858b9f0953b9/artin_flat_a_logo_1786536419542.jpg';
const outDir = 'C:/Users/0731g/.gemini/antigravity/scratch/artin-team-website/public/images';

async function processImage(inputPath, outputFileName) {
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const channels = info.channels; // 4 (RGBA)

  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    
    const brightness = Math.max(r, g, b);

    if (brightness < 30) {
      data[i + 3] = 0; // Fully transparent
    } else if (brightness < 70) {
      // Smooth alpha transition
      const alpha = Math.round(((brightness - 30) / 40) * 255);
      data[i + 3] = alpha;
    } else {
      data[i + 3] = 255;
    }
  }

  const outputPath = path.join(outDir, outputFileName);
  await sharp(data, {
    raw: {
      width,
      height,
      channels,
    },
  })
    .png()
    .toFile(outputPath);

  console.log(`Saved transparent logo: ${outputPath}`);
}

async function main() {
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  await processImage(img1Path, 'logo-option1-transparent.png');
  await processImage(img2Path, 'logo-option2-transparent.png');
}

main().catch(console.error);
