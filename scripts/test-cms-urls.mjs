async function test() {
  for (const version of ['latest', 'dev', 'production', 'v6']) {
    for (const key of ['metadata', 'contact', 'projects']) {
      const url = `https://storage.googleapis.com/activetheory-v6.appspot.com/cms/${key}-${version}.json`;
      const res = await fetch(url);
      console.log(url, res.status, res.headers.get('content-type'));
      if (res.status === 200) {
        const text = await res.text();
        console.log(` -> SUCCESS! length: ${text.length}, starts with: ${text.substring(0, 50)}`);
      }
    }
  }
}
test();
