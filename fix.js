const fs = require('fs');
const path = require('path');

// Define the domains
const newDomain = 'http://attack-on-titan-wiki-api.vercel.app';
const oldDomains = [
  'https://api.attackontitanapi.com',
  'http://localhost:3001'
];

// List all data files
const dataFiles = ['characters', 'episodes', 'locations', 'organizations', 'titans'];

// Function to fix URLs in a file
function fixFile(fileName) {
  const filePath = path.join(__dirname, 'data', `${fileName}.json`);
  
  // Read the file
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace all occurrences of old domains
  oldDomains.forEach(oldDomain => {
    content = content.replace(new RegExp(oldDomain, 'g'), newDomain);
  });
  
  // Write back to the file
  fs.writeFileSync(filePath, content, 'utf8');
  
  console.log(`✅ Fixed ${fileName}.json`);
}

console.log(`🔄 Replacing old domains with ${newDomain}...`);

// Fix each file
dataFiles.forEach(fixFile);

console.log('✅ All files fixed!');
