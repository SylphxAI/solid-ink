# @sylphx/solid-tui-inputs

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
