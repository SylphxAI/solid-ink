# NPM Token Publishing Configuration

## Issue
E404 errors when publishing packages from GitHub Actions. npm CLI was trying to use OIDC authentication (trusted publishing) first, which failed because packages weren't configured as trusted publishers.

## Root Cause
When `id-token: write` permission is present, npm CLI automatically tries OIDC authentication before falling back to tokens. This caused E404 errors because packages aren't configured as trusted publishers.

Since configuring trusted publishers for hundreds of packages isn't practical, we disabled OIDC to force token-only authentication.

## Solution Applied

Removed OIDC/provenance from workflow:
- ❌ Removed `id-token: write` permission
- ❌ Removed `NPM_CONFIG_PROVENANCE: true`
- ✅ Using NPM_TOKEN only for authentication

## Token Requirements

The NPM_TOKEN in GitHub secrets must be a **granular access token** with:
- **Permissions**: Read and write
- **Packages**: All packages in @sylphx scope (or select individually)

## Verify Token

Test the token locally:
```bash
echo "//registry.npmjs.org/:_authToken=YOUR_TOKEN" > .npmrc
npm whoami
npm publish --dry-run
```

## Update GitHub Secret

If you need to regenerate the token:
1. Go to https://www.npmjs.com/settings/YOUR_USERNAME/tokens
2. Generate new Granular Access Token
3. Set permissions: Read and write for @sylphx packages
4. Update https://github.com/SylphxAI/solid-tui/settings/secrets/actions

## Notes

- Token-only authentication (no OIDC/trusted publishing)
- No provenance attestations
- Granular tokens expire after 90 days maximum
- Set reminder to regenerate before expiration
