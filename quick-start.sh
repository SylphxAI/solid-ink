#!/bin/bash

# Solid-Ink Quick Start Script

echo "🚀 Solid-Ink Quick Start"
echo ""

# Check if in correct directory
if [ ! -f "package.json" ]; then
  echo "❌ Error: package.json not found"
  echo "Please run this script from the solid-ink directory"
  exit 1
fi

echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
  echo "❌ Failed to install dependencies"
  exit 1
fi

echo ""
echo "✅ Installation complete!"
echo ""
echo "🎯 Try these examples:"
echo ""
echo "  1. Basic Counter:"
echo "     npm run example:basic"
echo ""
echo "  2. Interactive Shopping List (use arrow keys):"
echo "     npm run example:interactive"
echo ""
echo "  3. Real-time Dashboard:"
echo "     npm run example:dashboard"
echo ""
echo "  4. Performance Demo (100 items):"
echo "     npm run example:performance"
echo ""
echo "  5. Loading Spinner:"
echo "     npm run example:spinner"
echo ""
echo "  6. Layout Demo:"
echo "     npm run example:layout"
echo ""
echo "📚 Documentation:"
echo "  - README.md - Main documentation"
echo "  - GETTING_STARTED.md - Beginner guide"
echo "  - ARCHITECTURE.md - Technical details"
echo "  - 專案說明.md - Chinese documentation"
echo ""
echo "🛠️  Development:"
echo "  - npm run build - Build the project"
echo "  - npm test - Run tests"
echo "  - npm run dev - Watch mode"
echo ""
echo "Ready! Run an example to get started 🎉"
