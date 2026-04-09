const fs = require('fs');

const replaceMapping = {
  'bg-[#111827]': 'bg-background',
  'bg-[#1f2937]': 'bg-surface',
  'text-[#cc9543]': 'text-primary',
  'bg-[#cc9543]': 'bg-primary',
  'hover:text-[#cc9543]': 'hover:text-primary',
  'hover:bg-[#b07f35]': 'hover:bg-primary/80',
  'border-[#cc9543]': 'border-primary',
  'text-white': 'text-text-main', // Will fix btn text manually or rely on context
  'text-gray-400': 'text-text-secondary',
  'text-gray-500': 'text-text-muted',
  'bg-gray-800': 'bg-surface',
  'border-gray-800': 'border-border',
  'border-gray-700': 'border-border',
  'hover:border-gray-500': 'hover:border-primary',
  'hover:border-gray-700': 'hover:border-primary',
  'border-gray-600': 'border-border',
  'text-gray-300': 'text-text-muted',
  'bg-[#10b981]': 'bg-success', // assuming no bg-success, actually I'll map it to bg-blue-600 for now or whatever primary
  'hover:bg-[#059669]': 'hover:bg-blue-700',
  'text-[#10b981]': 'text-success-text',
};

// A slightly more contextual mapping script was needed, but I'll do string replaces.
const files = [
  'client/src/pages/Home.jsx',
  'client/src/pages/Login.jsx',
  'client/src/pages/Signup.jsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Custom manual replacements for the big blocks
  content = content.replace(/bg-\[#111827\]/g, 'bg-background');
  content = content.replace(/bg-\[#1f2937\]/g, 'bg-surface');
  content = content.replace(/text-\[#cc9543\]/g, 'text-primary');
  content = content.replace(/bg-\[#cc9543\]/g, 'bg-primary');
  content = content.replace(/hover:text-\[#cc9543\]/g, 'hover:text-primary');
  content = content.replace(/hover:bg-\[#b07f35\]/g, 'hover:bg-primary/80');
  content = content.replace(/border-\[#cc9543\]/g, 'border-primary');
  content = content.replace(/text-white/g, 'text-text-main');
  content = content.replace(/text-gray-400/g, 'text-text-secondary');
  content = content.replace(/text-gray-500/g, 'text-text-muted');
  content = content.replace(/bg-gray-800/g, 'bg-surface');
  content = content.replace(/border-gray-800/g, 'border-border');
  content = content.replace(/border-gray-700/g, 'border-border');
  content = content.replace(/hover:border-gray-500/g, 'hover:border-primary');
  content = content.replace(/hover:border-gray-700/g, 'hover:border-primary');
  content = content.replace(/border-gray-600/g, 'border-border');
  content = content.replace(/text-gray-300/g, 'text-text-muted');
  
  content = content.replace(/bg-\[#10b981\]/g, 'bg-primary');
  content = content.replace(/hover:bg-\[#059669\]/g, 'hover:bg-primary/80');
  content = content.replace(/text-\[#10b981\]/g, 'text-primary');

  // Fix DotGrid colors
  content = content.replace(/baseColor="#1f2937"/g, 'baseColor="#374151"');
  content = content.replace(/activeColor="#cc9543"/g, 'activeColor="#0052FF"');
  
  // Fix button text to be white/black depending on what we want, actually wait, text-text-main might be good enough.
  // In our dashboard, buttons have standard text.
  // For the `C` logo
  content = content.replace(/bg-gradient-to-br from-\[#111827\] via-\[#111827\] to-\[#cc9543\]\/20/g, 'bg-gradient-to-br from-background via-background to-primary/20');
  content = content.replace(/bg-gradient-to-bl from-\[#111827\] via-\[#111827\] to-\[#10b981\]\/20/g, 'bg-gradient-to-bl from-background via-background to-primary/20');

  // Any leftover #111827 etc
  content = content.replace(/text-\[#111827\]/g, 'text-white'); 
  
  // Re-fix button text inside primary buttons
  content = content.replace(/bg-primary text-text-main/g, 'bg-primary text-white');

  fs.writeFileSync(file, content, 'utf8');
});

console.log('Styles replaced.');
