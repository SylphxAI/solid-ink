# @sylphx/solid-tui-components

## 0.1.6 (2025-12-10)

### 🐛 Bug Fixes

- **solid-tui:** eliminate solid-js/web imports to fix Bun compatibility ([5712574](https://github.com/SylphxAI/solid-tui/commit/57125749e127dc268e344c7d8e8de087d9e12073))

### 🔧 Chores

- test reusable workflow ([0c145b8](https://github.com/SylphxAI/solid-tui/commit/0c145b8a2ff79e9a2d8f9a51687761af4bee2ba1))

## 0.1.5

### Patch Changes

- Updated dependencies [29e778d]
  - @sylphx/solid-tui@1.0.2

## 0.1.4

### Patch Changes

- e2c596b: fix: resolve workspace:\* dependencies in published packages

  Now using prepare-publish script to replace workspace:\* with actual versions before publishing.

## 0.1.3

### Patch Changes

- 004253e: fix: test zen-style release workflow

## 0.1.2

### Patch Changes

- 40a87f6: fix: republish packages with resolved dependencies (not workspace:\*)

## 0.1.1

### Patch Changes

- 8cd80a6: fix: resolve workspace protocol in published packages

## 0.1.0

### Minor Changes

- 1d02d6c: Initial release of solid-tui-components package

  - ProgressBar: Customizable progress bar with percentage display and custom characters
  - Table: Feature-rich table component with borders, alignment, and striping support
  - Divider: Horizontal divider with optional title and custom characters
  - Link: Clickable hyperlink with terminal support detection and fallback
  - TitledBox: Bordered box container with title and multiple border styles (single, double, round, bold, classic)
  - Built with SolidJS fine-grained reactivity for blazing fast terminal UIs
