async function main() {
  try {
    const res = await fetch('https://activetheory.net/assets/js/app.1780406240914.js');
    const text = await res.text();
    console.log('App JS length:', text.length);

    const jsonMatches = text.match(/assets\/[^\s"'`\)]+\.json/g) || [];
    console.log('JSON matches:', [...new Set(jsonMatches)]);

    const assetMatches = text.match(/assets\/[^\s"'`\)]+\.(?:png|jpg|jpeg|webp|mp4|webm|svg|woff2?|otf|hdr|bin|glb|gltf)/gi) || [];
    console.log('Asset matches (first 50):', [...new Set(assetMatches)].slice(0, 50));

    const cloudStorage = text.match(/https:\/\/storage\.googleapis\.com\/[^\s"'`\)]+/g) || [];
    console.log('Cloud storage (first 30):', [...new Set(cloudStorage)].slice(0, 30));

    // Look for routes or navigation or pages
    const routes = text.match(/path:\s*["']\/[^"']*["']/g) || [];
    console.log('Routes:', [...new Set(routes)]);

  } catch (err) {
    console.error(err);
  }
}

main();
