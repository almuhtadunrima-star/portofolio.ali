async function main() {
  const res = await fetch('https://activetheory.net/assets/js/app.1780406240914.js');
  const text = await res.text();
  const idx = text.indexOf('dataVersion');
  let pos = 0;
  while ((pos = text.indexOf('dataVersion', pos)) !== -1) {
    console.log('dataVersion match:\n', text.substring(Math.max(0, pos - 150), Math.min(text.length, pos + 150)));
    console.log('---');
    pos += 11;
  }
}

main();
