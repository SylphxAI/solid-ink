#!/usr/bin/env node
/**
 * Fix workspace:* dependencies before publishing
 * Replaces workspace:* with actual version ranges
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

// Read all package.json files
const packagesDir = join(rootDir, 'packages');
const packageDirs = readdirSync(packagesDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => join('packages', dirent.name, 'package.json'));

// Read the main solid-tui version
const solidTuiPkg = JSON.parse(
  readFileSync(join(rootDir, 'packages/solid-tui/package.json'), 'utf-8')
);
const solidTuiVersion = solidTuiPkg.version;

console.log(`Fixing workspace:* dependencies to use @sylphx/solid-tui@${solidTuiVersion}`);

for (const file of packageDirs) {
  const filePath = join(rootDir, file);
  const pkg = JSON.parse(readFileSync(filePath, 'utf-8'));

  let modified = false;

  // Fix dependencies
  if (pkg.dependencies && pkg.dependencies['@sylphx/solid-tui'] === 'workspace:*') {
    pkg.dependencies['@sylphx/solid-tui'] = `^${solidTuiVersion}`;
    modified = true;
    console.log(`  ✓ Fixed ${pkg.name} dependencies`);
  }

  // Fix devDependencies
  if (pkg.devDependencies && pkg.devDependencies['@sylphx/solid-tui'] === 'workspace:*') {
    pkg.devDependencies['@sylphx/solid-tui'] = `^${solidTuiVersion}`;
    modified = true;
    console.log(`  ✓ Fixed ${pkg.name} devDependencies`);
  }

  // Fix peerDependencies
  if (pkg.peerDependencies && pkg.peerDependencies['@sylphx/solid-tui'] === 'workspace:*') {
    pkg.peerDependencies['@sylphx/solid-tui'] = `^${solidTuiVersion}`;
    modified = true;
    console.log(`  ✓ Fixed ${pkg.name} peerDependencies`);
  }

  if (modified) {
    writeFileSync(filePath, JSON.stringify(pkg, null, 2) + '\n');
  }
}

console.log('Done!');
