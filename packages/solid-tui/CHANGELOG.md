# @sylphx/solid-tui

## 1.1.0 (2025-12-10)

### ✨ Features

- **bun:** add custom SolidJS plugin for Bun compatibility ([3d98b10](https://github.com/SylphxAI/solid-tui/commit/3d98b10f70bf19fb995ec4c3feab4113c108ef6e))

### 🐛 Bug Fixes

- **solid-tui:** add Babel dependencies for Bun plugin ([84ef0e2](https://github.com/SylphxAI/solid-tui/commit/84ef0e26d4891cb5067a7b4a37f54d42f3748d87))
- **solid-tui:** remove Provider components for Bun compatibility ([1852cdd](https://github.com/SylphxAI/solid-tui/commit/1852cdd680ef4775fccac56bd8e4ee80594a9b12))

### 🔧 Chores

- prepare 1.0.4-beta.1 for CI release ([182e8ea](https://github.com/SylphxAI/solid-tui/commit/182e8eab8a89cd88e83d6f55e7c86fcf9fcc311d))
- version 1.0.4 with Bun support ([a6271d8](https://github.com/SylphxAI/solid-tui/commit/a6271d839c77010a35f4ce32684caf1b26d38890))
- add dist-bun to gitignore and update tsconfig ([9d17710](https://github.com/SylphxAI/solid-tui/commit/9d177106208b6dad15fac5096cfbbee72c508e9a))
- bump version to 1.0.4-debug.8 ([3c0d771](https://github.com/SylphxAI/solid-tui/commit/3c0d7715bf3d827d20f4e22e6e275c0842fd9e11))

## 1.0.8

### Patch Changes

- Fix preload export format for proper module resolution

  - Change `"./preload": "./bun/preload.ts"` to `"./preload": { "import": "./bun/preload.ts" }`
  - Matches export pattern used by @opentui/solid
  - Fixes "preload not found" error in some environments

## 1.0.7

### Patch Changes

- Fix monorepo module resolution by using main export for JSX runtime

  - Export JSX runtime functions from main package entry point
  - Change plugin moduleName from `@sylphx/solid-tui/reconciler` to `@sylphx/solid-tui`
  - Fixes subpath export resolution issues in monorepo workspaces
  - Matches pattern used by @opentui/solid

## 1.0.6

### Patch Changes

- Add short preload path export for simpler Bun configuration

  - Add `./preload` export to package.json
  - Users can now use `preload = ["@sylphx/solid-tui/preload"]`
  - Instead of long path `./node_modules/@sylphx/solid-tui/bun/preload.ts`

## 1.0.5

### Patch Changes

- 84ef0e2: Fix Bun support by adding required Babel dependencies

  - Add @babel/core, @babel/preset-typescript, and babel-preset-solid as dependencies
  - These are required by the Bun plugin for JSX transformation
  - Fixes "Cannot find module '@babel/core'" error

## 1.0.4

### Patch Changes

- d55d72d: Add Bun runtime support (beta testing)

  - Custom Babel plugin for JSX transformation
  - Custom spread/insert for terminal renderer
  - No DOM dependencies
  - Users need bunfig.toml setup (see BUN_SETUP.md)

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
