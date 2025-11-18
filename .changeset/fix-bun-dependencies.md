---
"@sylphx/solid-tui": patch
---

Fix Bun support by adding required Babel dependencies

- Add @babel/core, @babel/preset-typescript, and babel-preset-solid as dependencies
- These are required by the Bun plugin for JSX transformation
- Fixes "Cannot find module '@babel/core'" error
