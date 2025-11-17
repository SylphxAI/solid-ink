# @sylphx/solid-tui

## 1.1.0

### Minor Changes

- c7f371b: Fix package imports and useFocus hook for universal renderer compatibility

  - Fix imports to reference .jsx files instead of .js (fixes user-reported import errors)
  - Fix useFocus to register immediately instead of in onMount for universal renderer compatibility
  - All tests now pass (65/65)
