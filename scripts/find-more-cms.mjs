async function testMore() {
  const keys = [
    'about', 'team', 'awards', 'news', 'press', 'info', 'home', 'work', 
    'case-studies', 'clients', 'culture', 'jobs', 'careers', 'reel', 'services'
  ];
  for (const k of keys) {
    for (const v of ['production', 'dev']) {
      const url = `https://storage.googleapis.com/activetheory-v6.appspot.com/cms/${k}-${v}.json`;
      const res = await fetch(url);
      if (res.status === 200) {
        console.log(`Found: ${k}-${v}.json`);
      }
    }
  }
}
testMore();
