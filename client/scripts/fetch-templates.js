import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REPO_URL = 'https://github.com/amruthpillai/reactive-resume/archive/refs/heads/main.zip';
const ZIP_FILE = path.join(__dirname, 'reactive-resume-main.zip');
const EXTRACT_DIR = path.join(__dirname, 'temp_extract');
const CLIENT_DIR = path.join(__dirname, '..');

console.log('📦 Downloading Reactive Resume source code (this may take a minute)...');

async function downloadAndExtract() {
  try {
    const res = await fetch(REPO_URL);
    if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);
    
    const arrayBuffer = await res.arrayBuffer();
    fs.writeFileSync(ZIP_FILE, Buffer.from(arrayBuffer));
    console.log('✅ Download complete.');

    console.log('📂 Extracting archive...');
      if (fs.existsSync(EXTRACT_DIR)) {
        fs.rmSync(EXTRACT_DIR, { recursive: true, force: true });
      }
      fs.mkdirSync(EXTRACT_DIR);
      
      // Use PowerShell to extract zip natively on Windows
      execSync(`powershell -command "Expand-Archive -Path '${ZIP_FILE}' -DestinationPath '${EXTRACT_DIR}' -Force"`);
      
      console.log('✅ Extraction complete.');

      const extractContents = fs.readdirSync(EXTRACT_DIR);
      let sourceRoot = EXTRACT_DIR;
      if (extractContents.length === 1 && fs.statSync(path.join(EXTRACT_DIR, extractContents[0])).isDirectory()) {
        sourceRoot = path.join(EXTRACT_DIR, extractContents[0]);
      } else {
        sourceRoot = path.join(EXTRACT_DIR, 'reactive-resume-main');
      }

      const targetResumeComponents = path.join(CLIENT_DIR, 'src', 'components', 'resume');
      
      if (!fs.existsSync(targetResumeComponents)) {
        fs.mkdirSync(targetResumeComponents, { recursive: true });
      }

      console.log('🚚 Moving required folders...');
      
      const copyDir = (src, dest) => {
        if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
        const entries = fs.readdirSync(src, { withFileTypes: true });
        for (let entry of entries) {
          const srcPath = path.join(src, entry.name);
          const destPath = path.join(dest, entry.name);
          if (entry.isDirectory()) {
            copyDir(srcPath, destPath);
          } else {
            fs.copyFileSync(srcPath, destPath);
          }
        }
      };

      // 1. Templates
      const templatesSrc = path.join(sourceRoot, 'apps', 'client', 'src', 'components', 'resume', 'templates');
      const templatesDest = path.join(targetResumeComponents, 'templates');
      if (fs.existsSync(templatesSrc)) {
        copyDir(templatesSrc, templatesDest);
        console.log('   - Copied templates/');
      }

      // 2. Shared components
      const sharedSrc = path.join(sourceRoot, 'apps', 'client', 'src', 'components', 'resume', 'shared');
      const sharedDest = path.join(targetResumeComponents, 'shared');
      if (fs.existsSync(sharedSrc)) {
        copyDir(sharedSrc, sharedDest);
        console.log('   - Copied shared/');
      }

      // 3. Utils
      const utilsSrc = path.join(sourceRoot, 'apps', 'client', 'src', 'utils');
      const utilsDest = path.join(CLIENT_DIR, 'src', 'utils');
      if (fs.existsSync(utilsSrc)) {
        copyDir(utilsSrc, utilsDest);
        console.log('   - Copied utils/');
      }

      // 4. Schema (DTO)
      const schemaSrc = path.join(sourceRoot, 'libs', 'dto', 'src', 'resume');
      const schemaDest = path.join(CLIENT_DIR, 'src', 'schema', 'resume');
      if (fs.existsSync(schemaSrc)) {
        copyDir(schemaSrc, schemaDest);
        console.log('   - Copied schema/resume/');
      }

      // 5. Globals CSS for styles
      const cssSrc = path.join(sourceRoot, 'apps', 'client', 'src', 'styles', 'globals.css');
      const cssDest = path.join(CLIENT_DIR, 'src', 'reactive-resume-globals.css');
      if (fs.existsSync(cssSrc)) {
        fs.copyFileSync(cssSrc, cssDest);
        console.log('   - Copied globals.css');
      }

      console.log('🧹 Cleaning up temporary files...');
      fs.rmSync(ZIP_FILE);
      fs.rmSync(EXTRACT_DIR, { recursive: true, force: true });
      
      console.log('Please make sure you have run: npm install zustand immer zundo zod clsx tailwind-merge @phosphor-icons/react');

  } catch (err) {
    console.error('❌ Error:', err);
    if (fs.existsSync(ZIP_FILE)) fs.unlinkSync(ZIP_FILE);
  }
}

downloadAndExtract();
