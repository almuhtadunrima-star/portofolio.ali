async function extractFooterAndContact() {
  const res = await fetch('https://activetheory.net/assets/js/app.1780406240914.js');
  const text = await res.text();

  for (const name of ['Footer', 'ContactUI', 'WorkItems', 'WorkItem']) {
    const search = `Class((function ${name}(`;
    const idx = text.indexOf(search);
    if (idx !== -1) {
      console.log(`\n=================== ${name} ===================`);
      console.log(text.substring(idx, idx + 2000));
    }
  }
}

extractFooterAndContact();
