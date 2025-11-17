#!/usr/bin/env bun
/**
 * Prepare packages for publishing by replacing workspace:* with actual versions
 * This is needed because Bun + Changesets doesn't auto-replace workspace protocol
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const packagesDir = join(import.meta.dir, '../packages');
const packageDirs = readdirSync(packagesDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

// Build version map: package name -> version
const versionMap = new Map<string, string>();
for (const dir of packageDirs) {
  const pkgPath = join(packagesDir, dir, 'package.json');
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
  versionMap.set(pkg.name, pkg.version);
}

console.log('📦 Replacing workspace:* with actual versions...\n');

// Fix all packages
for (const dir of packageDirs) {
  const pkgPath = join(packagesDir, dir, 'package.json');
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));

  let modified = false;

  // Fix dependencies, devDependencies, peerDependencies
  for (const depType of ['dependencies', 'devDependencies', 'peerDependencies']) {
    const deps = pkg[depType];
    if (!deps) continue;

    for (const [name, range] of Object.entries(deps)) {
      if (typeof range === 'string' && range.startsWith('workspace:')) {
        const version = versionMap.get(name);
        if (version) {
          // workspace:* -> ^version
          // workspace:^ -> ^version
          // workspace:~ -> ~version
          const prefix = range.includes('~') ? '~' : '^';
          deps[name] = `${prefix}${version}`;
          modified = true;
          console.log(`  ✓ ${pkg.name} ${depType}: ${name} workspace:* -> ${prefix}${version}`);
        }
      }
    }
  }

  if (modified) {
    writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
  }
}

console.log('\n✅ Done! All workspace:* references replaced.');
