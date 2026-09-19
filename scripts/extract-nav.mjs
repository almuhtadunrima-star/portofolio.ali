async function extractNav() {
  const res = await fetch('https://activetheory.net/assets/js/app.1780406240914.js');
  const text = await res.text();

  const search = `Class((function NavUI(`;
  const idx = text.indexOf(search);
  if (idx !== -1) {
    console.log(text.substring(idx, idx + 3000));
  }
}

extractNav();
