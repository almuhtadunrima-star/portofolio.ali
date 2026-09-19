import fs from 'fs';

async function findViews() {
  const res = await fetch('https://activetheory.net/assets/js/app.1780406240914.js');
  const text = await res.text();

  // Find views or navigation items
  const menuMatches = text.match(/class\s+\w+\s+extends\s+\w+/g) || [];
  console.log('Classes (first 30):', menuMatches.slice(0, 30));

  // Search for navigation items like Home, Work, About, Contact
  const navKeywords = text.match(/["'](home|work|about|contact|detail|intro|reel|menu|projects)["']/gi) || [];
  console.log('Nav keyword frequency:');
  const counts = {};
  for (const k of navKeywords) {
    const lk = k.toLowerCase().replace(/["']/g, '');
    counts[lk] = (counts[lk] || 0) + 1;
  }
  console.log(counts);

  // Search for routes or pushState or routing logic
  const pushState = text.match(/(?:history\.pushState|setRoute|navigate|onRoute)[^;\}]{0,100}/g) || [];
  console.log('PushState/route matches:', pushState);

  // Search for UI string literals
  const uiStrings = text.match(/"[A-Z][a-zA-Z\s]{2,20}"/g) || [];
  console.log('UI strings sample:', [...new Set(uiStrings)].slice(0, 30));
}

findViews();
