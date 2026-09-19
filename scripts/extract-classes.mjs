async function extractClasses() {
  const res = await fetch('https://activetheory.net/assets/js/app.1780406240914.js');
  const text = await res.text();

  const targetClasses = ['NavUI', 'Footer', 'About', 'Contact', 'Home', 'WorkUI', 'WorkDetailContent'];

  for (const name of targetClasses) {
    const search = `Class((function ${name}(`;
    const idx = text.indexOf(search);
    if (idx !== -1) {
      console.log(`\n=================== ${name} ===================`);
      // take first 1500 characters
      console.log(text.substring(idx, idx + 1500));
    }
  }
}

extractClasses();
