import fs from 'fs';
import path from 'path';

async function downloadFile(url, dest) {
  try {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    const res = await fetch(url);
    if (!res.ok) {
      console.log(`Failed ${url}: ${res.status}`);
      return;
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(dest, buffer);
    console.log(`Downloaded ${dest} (${buffer.length} bytes)`);
  } catch (err) {
    console.error(`Error downloading ${url}:`, err.message);
  }
}

async function main() {
  const assets = [
    // Fonts
    { url: 'https://activetheory.net/assets/fonts/NBArchitektStd-Regular-export/NBArchitektStd-Regular.woff2', dest: 'public/fonts/NBArchitektStd-Regular.woff2' },
    { url: 'https://activetheory.net/assets/fonts/NBArchitektStd-Light-export/NBArchitektStd-Light.woff2', dest: 'public/fonts/NBArchitektStd-Light.woff2' },
    { url: 'https://activetheory.net/assets/fonts/NBArchitektStd-Bold-export/NBArchitektStd-Bold.woff2', dest: 'public/fonts/NBArchitektStd-Bold.woff2' },
    
    // UI Icons and images
    { url: 'https://activetheory.net/assets/images/ui/globe.png', dest: 'public/images/ui/globe.png' },
    { url: 'https://activetheory.net/assets/images/ui/arrow.png', dest: 'public/images/ui/arrow.png' },
    { url: 'https://activetheory.net/assets/images/ui/star.png', dest: 'public/images/ui/star.png' },
    { url: 'https://activetheory.net/assets/images/ui/ig.png', dest: 'public/images/ui/ig.png' },
    { url: 'https://activetheory.net/assets/images/ui/in.png', dest: 'public/images/ui/in.png' },
    { url: 'https://activetheory.net/assets/images/ui/tw.png', dest: 'public/images/ui/tw.png' },
    { url: 'https://activetheory.net/assets/images/ui/close.svg', dest: 'public/images/ui/close.svg' },
    { url: 'https://activetheory.net/assets/video/reel-frame.jpg', dest: 'public/images/reel-frame.jpg' },
    { url: 'https://activetheory.net/assets/meta/apple-touch-icon.png', dest: 'public/seo/apple-touch-icon.png' },
    { url: 'https://activetheory.net/assets/meta/favicon-32x32.png', dest: 'public/seo/favicon-32x32.png' },
    { url: 'https://activetheory.net/assets/meta/favicon-16x16.png', dest: 'public/seo/favicon-16x16.png' },
    { url: 'https://activetheory.net/assets/meta/safari-pinned-tab.svg', dest: 'public/seo/safari-pinned-tab.svg' }
  ];

  for (const item of assets) {
    await downloadFile(item.url, item.dest);
  }
}

main();
