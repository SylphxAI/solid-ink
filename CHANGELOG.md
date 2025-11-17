# @sylphx/solid-tui

## 1.0.1

### Patch Changes

- 6bfb8e6: Initial release of Solid-TUI (renamed from solid-ink)

  - Package renamed from `@sylphx/solid-ink` to `@sylphx/solid-tui` to avoid confusion with React Ink ecosystem
  - TUI (Terminal User Interface) is industry standard term used by Textual, Bubble Tea, etc.
  - SolidJS renderer for blazing fast terminal applications with fine-grained reactivity
  - Core components: Box, Text, Spinner, Spacer, Newline, Static, Transform
  - Hooks: useInput, useFocus, useApp, useStdout, useStdin, useStderr
  - Focus management with Tab/Shift+Tab navigation
  - Full test coverage (65/65 tests passing)
  - TypeScript support with full type safety

## 1.1.0

### Minor Changes

- c7f371b: Fix package imports and useFocus hook for universal renderer compatibility

  - Fix imports to reference .jsx files instead of .js (fixes user-reported import errors)
  - Fix useFocus to register immediately instead of in onMount for universal renderer compatibility
  - All tests now pass (65/65)
