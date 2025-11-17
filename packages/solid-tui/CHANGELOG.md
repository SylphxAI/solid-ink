# @sylphx/solid-tui

## 1.0.4

### Patch Changes

- Add Bun runtime support with custom SolidJS plugin

  Implemented custom Babel plugin for Bun compatibility. Users need to configure bunfig.toml - see BUN_SETUP.md for instructions.

## 1.0.4

### Patch Changes

- Fix Bun compatibility by removing Provider components and using global context injection

## 1.0.3

### Patch Changes

- d3850d7: Fix Bun compatibility by eliminating solid-js/web imports

  - Updated internal imports to use .jsx extensions for JSX files
  - Dist files now only import from 'solid-js', not 'solid-js/web'
  - Removed requirement for --conditions=browser flag when using Bun
  - Library now works seamlessly with Bun's default export conditions

  This fixes the "setProp not found in module server.js" error that occurred when using solid-tui with Bun.

## 1.0.2

### Patch Changes

- 29e778d: Fix missing ./testing export in published package

  The ./testing export was defined in package.json but not included in the published v1.0.1 package. This fixes test imports from '@sylphx/solid-tui/testing'.
