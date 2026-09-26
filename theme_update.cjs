const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const replacements = [
  [/bg-cream/g, 'bg-slate-900'],
  [/bg-white/g, 'bg-slate-800'],
  [/bg-gray-50/g, 'bg-slate-800/50'],
  [/bg-gray-100/g, 'bg-slate-700'],
  [/bg-gray-200/g, 'bg-slate-600'],
  [/text-gray-900/g, 'text-white'],
  [/text-gray-800/g, 'text-slate-100'],
  [/text-gray-700/g, 'text-slate-200'],
  [/text-gray-600/g, 'text-slate-300'],
  [/text-gray-500/g, 'text-slate-400'],
  [/text-gray-400/g, 'text-slate-500'],
  [/border-gray-100/g, 'border-slate-700'],
  [/border-gray-200/g, 'border-slate-600'],
  [/border-gray-300/g, 'border-slate-500'],
  [/border-white/g, 'border-slate-800'],
  [/sage-/g, 'emerald-'],
  [/serene-/g, 'cyan-'],
  [/text-slate-100 bg-slate-900/g, 'text-white bg-slate-900'], // text-gray-800 bg-cream
];

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let newContent = content;
      for (const [regex, replacement] of replacements) {
        newContent = newContent.replace(regex, replacement);
      }
      if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDir(srcDir);
console.log('Done');
