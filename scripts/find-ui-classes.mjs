async function searchViews() {
  const res = await fetch('https://activetheory.net/assets/js/app.1780406240914.js');
  const text = await res.text();

  // Find occurrences of "Class(function" or classes with Home, Work, About, Contact, Navigation, Menu, Footer
  const regex = /Class\(\(function\s+([A-Za-z0-9_]+)/g;
  const classes = [];
  let m;
  while ((m = regex.exec(text)) !== null) {
    classes.push(m[1]);
  }
  console.log('Total custom classes found:', classes.length);
  const relevant = classes.filter(c => /Nav|Menu|Header|Footer|Home|Work|About|Contact|Project|Detail|Reel|Stage|Intro/i.test(c));
  console.log('Relevant UI classes:', relevant);
}

searchViews();
