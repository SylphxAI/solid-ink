# Release Checklist for v1.0.0

## Pre-release Setup

### 1. NPM Setup
- [ ] Login to npm: `npm login`
- [ ] Verify org access: `npm org ls sylphx`
- [ ] Add NPM_TOKEN to GitHub Secrets
  - Generate: https://www.npmjs.com/settings/[username]/tokens/new
  - Type: "Automation" token
  - Add to: https://github.com/SylphxAI/solid-ink/settings/secrets/actions

### 2. Vercel Setup
```bash
cd docs
npm install
vercel login
vercel link  # Link to project
vercel --prod  # Deploy to production
```

Configure custom domain in Vercel:
- Domain: `solid-ink.sylphx.com`
- Follow DNS instructions from Vercel

### 3. GitHub Repository Settings
- [ ] Add description: "SolidJS renderer for blazing fast terminal UIs"
- [ ] Add topics: `solidjs`, `terminal`, `cli`, `tui`, `reactive`, `typescript`
- [ ] Enable GitHub Pages (optional, for badge)
- [ ] Set up branch protection on `main`

## Release Process

### Option A: Automated (Recommended)

1. **Changeset already created** ✅
   - `.changeset/initial-release.md` exists

2. **Push to main** ✅
   - Already pushed!

3. **Wait for GitHub Actions**
   - CI will run tests
   - Changesets bot will create a "Release PR"
   - Review the PR (check version bump, changelog)

4. **Merge the Release PR**
   - Once merged, GitHub Actions will:
     - Build the package
     - Publish to NPM
     - Create GitHub release
     - Tag the version

### Option B: Manual Release

```bash
# 1. Build
npm run build

# 2. Version (applies changeset)
npm run version

# 3. Commit version changes
git add .
git commit -m "chore: release v1.0.0"
git push

# 4. Publish to NPM
npm publish --access public

# 5. Create GitHub release
gh release create v1.0.0 --generate-notes
```

## Post-release

### 1. Verify NPM Package
- [ ] Check package page: https://www.npmjs.com/package/@sylphx/solid-ink
- [ ] Test installation: `npm install @sylphx/solid-ink`
- [ ] Verify exports work

### 2. Verify Documentation
- [ ] Docs site live: https://solid-ink.sylphx.com
- [ ] All links work
- [ ] Examples display correctly

### 3. Announce Release

**Twitter (@SylphxAI):**
```
🎉 Solid-Ink v1.0.0 is here!

SolidJS-powered terminal UIs with:
⚡ 2x faster than React-Ink
🎨 Flexbox layout
📦 50% smaller bundle
🔥 Fine-grained reactivity

npm install @sylphx/solid-ink

Docs: https://solid-ink.sylphx.com
Repo: https://github.com/SylphxAI/solid-ink

#SolidJS #CLI #TypeScript
```

**Dev.to / Medium (optional):**
- Write release announcement
- Include benchmarks
- Show code examples
- Link to docs

### 4. Community

- [ ] Post in SolidJS Discord
- [ ] Post in relevant Reddit communities (r/node, r/javascript)
- [ ] Add to awesome-solidjs list
- [ ] Submit to This Week in Solid newsletter

## Monitoring

### First Week
- [ ] Watch for issues
- [ ] Monitor download stats: https://npm-stat.com/charts.html?package=@sylphx/solid-ink
- [ ] Respond to questions/feedback
- [ ] Fix critical bugs immediately

### GitHub Badge
Add to README if desired:
```markdown
[![Downloads](https://img.shields.io/npm/dm/@sylphx/solid-ink.svg)](https://www.npmjs.com/package/@sylphx/solid-ink)
```

## Next Steps

### v1.0.1 (Bug fixes)
- Fix any reported issues
- Documentation updates

### v1.1.0 (Minor features)
- Additional components (Select, TextInput, etc.)
- More hooks
- Performance improvements

### v2.0.0 (Major features)
- TBD based on community feedback

## Quick Commands Reference

```bash
# Create changeset for future releases
npx changeset

# Version bump (for next release)
npm run version

# Build
npm run build

# Test
npm test

# Run examples
npm run example:interactive

# Deploy docs
cd docs && vercel --prod

# Check package contents
npm pack --dry-run
```

## Troubleshooting

### NPM Publish Failed
- Verify logged in: `npm whoami`
- Check token: `npm token list`
- Try manual publish: `npm publish --access public`

### GitHub Actions Failed
- Check logs: https://github.com/SylphxAI/solid-ink/actions
- Verify NPM_TOKEN secret is set
- Re-run failed jobs

### Docs Not Deploying
- Check Vercel dashboard
- Verify vercel.json is correct
- Try manual deploy: `vercel --prod`
