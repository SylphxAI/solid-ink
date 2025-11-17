---
"@sylphx/solid-tui": patch
---

Fix Bun compatibility by eliminating solid-js/web imports

- Updated internal imports to use .jsx extensions for JSX files
- Dist files now only import from 'solid-js', not 'solid-js/web'
- Removed requirement for --conditions=browser flag when using Bun
- Library now works seamlessly with Bun's default export conditions

This fixes the "setProp not found in module server.js" error that occurred when using solid-tui with Bun.
