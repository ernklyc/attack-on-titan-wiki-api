import * as fs from 'node:fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// The current domain from environment variables
const dns = 'http://attack-on-titan-wiki-api.vercel.app';

// The domains to replace (both the original API domain and localhost)
const oldDomains = [
  'https://api.attackontitanapi.com',
  'http://localhost:3001'
];

// Function to fix URLs in a specific data file
const fixUrlsInFile = (fileName: string): void => {
  try {
    const dataPath = path.join(process.cwd(), 'data', `${fileName}.json`);
    
    // Read the file
    const fileContent = fs.readFileSync(dataPath, 'utf-8');
    
    // Create a new variable to hold the updated content
    let updatedContent = fileContent;
    
    // Replace all occurrences of each old domain with the new domain
    oldDomains.forEach(domain => {
      updatedContent = updatedContent.replace(new RegExp(domain, 'g'), dns);
    });
    
    // Write the updated content back to the file
    fs.writeFileSync(dataPath, updatedContent, 'utf-8');
    
    console.log(`✅ Fixed URLs in ${fileName}.json`);
  } catch (error) {
    console.error(`❌ Error fixing URLs in ${fileName}.json:`, error);
  }
};

// Function to fix URLs in all data files
export const fixAllUrls = (): void => {
  const dataFiles = ['characters', 'episodes', 'locations', 'organizations', 'titans'];
  
  // Check if DNS is set
  if (!dns) {
    console.error('❌ DNS environment variable is not set. Please set it in .env file.');
    return;
  }
  
  console.log(`🔄 Replacing old domain URLs with ${dns} in all data files...`);
  
  // Fix URLs in each data file
  dataFiles.forEach(file => fixUrlsInFile(file));
  
  console.log('✅ URL fix complete!');
};

// Execute the function if this file is run directly
if (require.main === module) {
  fixAllUrls();
}