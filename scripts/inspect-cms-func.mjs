async function main() {
  const res = await fetch('https://activetheory.net/assets/js/app.1780406240914.js');
  const text = await res.text();
  const idx = text.indexOf('activetheory-v6.appspot.com/cms');
  if (idx !== -1) {
    console.log(text.substring(idx - 500, idx + 500));
  }
}

main();
