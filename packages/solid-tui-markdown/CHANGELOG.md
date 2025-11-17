# @sylphx/solid-tui-markdown

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

- 7781618: Initial release of solid-tui-markdown package

  - Markdown: Full-featured markdown rendering component

    - Headers (H1-H6) with color coding
    - Paragraphs and text formatting
    - Code blocks with syntax highlighting
    - Blockquotes with visual indicators
    - Ordered and unordered lists
    - Horizontal rules
    - Tables with formatted columns
    - Powered by marked.js for parsing

  - SyntaxHighlight: Code syntax highlighting component

    - Powered by highlight.js
    - Support for 190+ languages
    - Dark and light themes
    - Line numbers toggle
    - Auto language detection
    - Terminal-optimized color schemes

  - Built with SolidJS fine-grained reactivity for blazing fast terminal UIs
