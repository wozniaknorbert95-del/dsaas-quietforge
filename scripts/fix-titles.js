/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('./src');
let changedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Replace "Mappaid first step" with "Map · paid first step"
  content = content.replace(/Mappaid first step/g, 'Map · paid first step');

  // Find lines with title: '... | Quietforge',
  // and replace with title: '...',
  // We need to be careful not to strip it from layout.tsx default/template.
  if (!file.endsWith('layout.tsx') || content.includes('template:')) {
    // Actually, child layout.tsx files don't need ' | Quietforge' either if they are children,
    // because root layout handles it. But wait, child layout.tsx metadata overrides root metadata if it's absolute,
    // but typically Next.js uses string titles with the root template unless specified otherwise.
    // Let's just blindly replace ` | Quietforge'` with `'` for title fields.
    content = content.replace(/title:\s*['"](.*?) \| Quietforge['"]/g, "title: '$1'");
    content = content.replace(/title:\s*`([^`]*?) \| Quietforge`/g, "title: `$1`");
  } else {
      content = content.replace(/title:\s*['"](.*?) \| Quietforge['"]/g, "title: '$1'");
      content = content.replace(/title:\s*`([^`]*?) \| Quietforge`/g, "title: `$1`");
  }

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    changedCount++;
    console.log(`Updated: ${file}`);
  }
});

console.log(`Total files updated: ${changedCount}`);
