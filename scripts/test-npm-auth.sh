#!/bin/bash
# Test npm authentication and permissions

echo "Testing npm authentication..."

# Check if .npmrc exists and what's in it
echo "Checking .npmrc files..."
if [ -f ~/.npmrc ]; then
  echo "~/.npmrc exists"
  cat ~/.npmrc | head -1
fi
if [ -n "$NPM_CONFIG_USERCONFIG" ] && [ -f "$NPM_CONFIG_USERCONFIG" ]; then
  echo "$NPM_CONFIG_USERCONFIG exists"
  cat "$NPM_CONFIG_USERCONFIG" | head -1
fi

# Test authentication (using the .npmrc created by setup-node)
echo "Running npm whoami..."
npm whoami

# Test if can view package
echo "Checking package visibility..."
npm view @sylphx/solid-tui-inputs version

# Test write access (dry-run)
echo "Testing publish permissions (dry-run)..."
cd packages/inputs
npm publish --dry-run

echo "✅ Authentication test complete"
