# Deployment Guide

## NPM Release (Automated with Changesets)

### 1. Create a changeset

```bash
npx changeset
```

Select the type of change:
- `major` - Breaking changes (1.x.x → 2.0.0)
- `minor` - New features (1.0.x → 1.1.0)
- `patch` - Bug fixes (1.0.0 → 1.0.1)

### 2. Commit and push

```bash
git add .
git commit -m "feat: your feature description"
git push
```

### 3. Automated release

GitHub Actions will:
1. Create a "Release PR" with version bump
2. Merge the PR when ready
3. Automatically publish to NPM
4. Create GitHub release

### Setup NPM Token

Add `NPM_TOKEN` to GitHub Secrets:

1. Generate token: https://www.npmjs.com/settings/[username]/tokens
2. Add to repo: Settings → Secrets → New secret
3. Name: `NPM_TOKEN`
4. Value: Your npm token

## Docs Deployment (Vercel)

### First time setup

```bash
cd docs
npm install -g vercel
vercel login
```

### Deploy docs

```bash
# Preview
vercel

# Production
vercel --prod
```

Or use Vercel GitHub integration for auto-deployment.

### Configure custom domain

In Vercel dashboard:
1. Add domain: `solid-ink.sylphx.com`
2. Add DNS records as shown
3. Done!

## Manual Release (if needed)

```bash
# Version bump
npm run version

# Build
npm run build

# Publish
npm publish --access public
```

## Release Checklist

- [ ] All tests pass
- [ ] Benchmarks run successfully
- [ ] Documentation is up to date
- [ ] CHANGELOG is generated
- [ ] Version is bumped correctly
- [ ] Git tag is created
- [ ] NPM package is published
- [ ] Docs are deployed
- [ ] GitHub release is created
- [ ] Tweet about release! 🐦
