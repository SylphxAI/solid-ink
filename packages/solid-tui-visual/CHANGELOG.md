# @sylphx/solid-tui-visual

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

- 077ee23: Initial release of solid-tui-visual package

  - Gradient: Text gradient effects with multiple built-in themes

    - 13 pre-defined gradients (rainbow, atlas, cristal, teen, mind, morning, vice, passion, fruit, instagram, retro, summer, pastel)
    - Custom color arrays support
    - Powered by gradient-string

  - BigText: ASCII art text rendering

    - Multiple font options via figlet
    - Left, center, and right alignment
    - Color customization
    - Automatic fallback to default font

  - Chart: Terminal-based data visualization

    - Bar chart with horizontal bars
    - Line chart with connecting points
    - Configurable dimensions (width, height)
    - Optional value labels and axis display
    - Color customization
    - Auto-scaling based on data

  - Built with SolidJS fine-grained reactivity for blazing fast terminal UIs
