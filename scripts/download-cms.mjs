import fs from 'fs';

async function downloadCMS() {
  const dir = 'public/data/cms';
  fs.mkdirSync(dir, { recursive: true });

  const keys = ['metadata', 'contact', 'projects', 'about'];
  for (const k of keys) {
    const res = await fetch(`https://storage.googleapis.com/activetheory-v6.appspot.com/cms/${k}-production.json`);
    if (res.status === 200) {
      const data = await res.json();
      fs.writeFileSync(`${dir}/${k}.json`, JSON.stringify(data, null, 2));
      console.log(`Saved ${k}.json (${Array.isArray(data) ? data.length + ' items' : Object.keys(data).length + ' keys'})`);
    } else {
      console.log(`Failed to fetch ${k}: ${res.status}`);
    }
  }
}

downloadCMS();
