import fs from 'fs';

async function main() {
  const res = await fetch('https://activetheory.net/assets/js/app.1780406240914.js');
  const text = await res.text();
  
  // Find where cms or storage is accessed
  const cmsMatches = text.match(/storage\.googleapis\.com\/activetheory-v6\.appspot\.com\/[^\s"'`\)]+/g) || [];
  console.log('CMS url occurrences:', [...new Set(cmsMatches)]);

  // Let's search for keywords around CMS
  const regex = /["']https:\/\/storage\.googleapis\.com\/activetheory-v6\.appspot\.com[^"']*["']/g;
  let m;
  while ((m = regex.exec(text)) !== null) {
    const start = Math.max(0, m.index - 200);
    const end = Math.min(text.length, m.index + 200);
    console.log('Context around match:\n', text.substring(start, end));
    console.log('---');
  }
}

main();
