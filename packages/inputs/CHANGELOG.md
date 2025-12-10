# @sylphx/solid-tui-inputs

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

- c742fc0: Initial release of solid-tui-inputs package

  - TextInput: Controlled text input component with cursor navigation, masking, and placeholder support
  - SelectInput: Menu selection component with keyboard navigation (arrow keys, j/k, number keys)
  - ConfirmInput: Yes/No confirmation component wrapping TextInput
  - MultiSelect: Multi-selection component with checkbox toggling (space to toggle, enter to confirm)
  - QuickSearchInput: Searchable dropdown with real-time filtering and keyboard navigation
  - Full API compatibility with ink-text-input, ink-select-input, ink-confirm-input, and ink-multi-select
  - Built with SolidJS fine-grained reactivity for blazing fast terminal UIs
