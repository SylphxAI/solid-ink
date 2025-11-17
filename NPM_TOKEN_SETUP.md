# Trusted Publishing Configuration Required

## Issue
E404 errors when publishing packages from GitHub Actions. Provenance is being generated (OIDC works), but packages reject the publish because GitHub Actions workflow is not configured as a trusted publisher on npm.com.

## Root Cause
Packages need to be configured on npm.com to accept publishing from the GitHub Actions workflow. Trusted publishing (OIDC) eliminates the need for NPM_TOKEN, but requires per-package configuration.

## Fix Steps

Configure each package on npm.com to trust the GitHub Actions workflow:

### For Each Package

Repeat for all 5 packages:
- @sylphx/solid-tui
- @sylphx/solid-tui-inputs
- @sylphx/solid-tui-components
- @sylphx/solid-tui-markdown
- @sylphx/solid-tui-visual

**Steps:**

1. Go to package settings on npm.com:
   - `https://www.npmjs.com/package/@sylphx/PACKAGE_NAME/access`
   - Or navigate: Package page → Settings → Publishing access

2. Find "Trusted publishers" section

3. Click "Add trusted publisher"

4. Select "GitHub Actions"

5. Fill in the form:
   - **GitHub user or organization**: `SylphxAI`
   - **Repository name**: `solid-tui`
   - **Workflow filename**: `release.yml`
   - **Environment name**: (leave blank)

6. Click "Add"

7. Verify configuration saved successfully

### After Configuration

Once all 5 packages are configured, trigger a new release:

```bash
git commit --allow-empty -m "chore: trigger release after trusted publisher setup"
git push
```

## Notes

- ✅ Workflow already has correct OIDC permissions (`id-token: write`)
- ✅ Provenance is already working (confirmed in logs)
- ⏳ Just need to authorize the workflow on npm.com
- 🔒 No NPM_TOKEN needed with trusted publishing (more secure)
- ♻️ No token expiration to manage
