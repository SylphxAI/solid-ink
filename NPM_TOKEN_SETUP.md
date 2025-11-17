# NPM Token Configuration Required

## Issue
E404 errors when publishing packages from GitHub Actions. Provenance is working, but token lacks publish permissions.

## Root Cause
NPM_TOKEN secret needs granular access token with "Read and write" permissions for @sylphx organization packages.

## Fix Steps

### 1. Create Granular Access Token on npm.com

1. Go to https://www.npmjs.com/settings/YOUR_USERNAME/tokens
2. Click "Generate New Token" → "Granular Access Token"
3. Fill in:
   - **Token name**: `GitHub Actions - solid-tui`
   - **Expiration**: 90 days (maximum for granular tokens)
   - **Packages and scopes**:
     - **Permissions**: `Read and write`
     - **Select packages**: Choose one:
       - Option A: All packages in @sylphx organization
       - Option B: Individual packages:
         - @sylphx/solid-tui
         - @sylphx/solid-tui-inputs
         - @sylphx/solid-tui-components
         - @sylphx/solid-tui-markdown
         - @sylphx/solid-tui-visual
4. Click "Generate Token"
5. Copy the token (starts with `npm_...`)

### 2. Update GitHub Secret

1. Go to https://github.com/SylphxAI/solid-tui/settings/secrets/actions
2. Find `NPM_TOKEN` secret
3. Click "Update"
4. Paste new token
5. Click "Update secret"

### 3. Trigger Release

After updating the token, push an empty commit or manually trigger the workflow:

```bash
git commit --allow-empty -m "chore: trigger release"
git push
```

## Notes

- Granular tokens expire after 90 days maximum
- Set calendar reminder to regenerate token before expiration
- Token needs "Read and write" permission, not just "Read-only"
- OIDC and provenance are already configured correctly in workflow
