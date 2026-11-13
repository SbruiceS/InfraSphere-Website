const fs = require('fs');
const path = require('path');
const files = ['index.html', ...fs.readdirSync('resources').filter(f => f.endsWith('.html')).map(f => 'resources/' + f)];
let errors = 0;
files.forEach(f => {
  const html = fs.readFileSync(f, 'utf8');
  if (!/<title>[^<]+<\/title>/.test(html)) { console.error('Missing title:', f); errors++; }
  if (!/name="description"/.test(html)) { console.error('Missing description:', f); errors++; }
  if (!/rel="canonical"/.test(html)) { console.error('Missing canonical:', f); errors++; }
  if ((html.match(/<h1/g) || []).length !== 1) { console.error('H1 count not 1:', f); errors++; }
  if (!html.includes('sbruices.github.io/InfraSphere-Website')) { console.error('Bad base URL:', f); errors++; }
});
if (errors) process.exit(1);
console.log('SEO audit passed for', files.length, 'pages');
