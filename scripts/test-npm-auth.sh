#!/bin/bash
# Test npm authentication and permissions

echo "Testing npm authentication..."
echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > ~/.npmrc

# Test authentication
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
