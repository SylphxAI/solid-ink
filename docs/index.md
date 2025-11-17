---
layout: home

hero:
  name: Solid-TUI
  text: Terminal UI with SolidJS
  tagline: Fine-grained reactivity for blazing fast CLI applications
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: Why Solid-TUI?
      link: /guide/why-solid-tui
    - theme: alt
      text: View on GitHub
      link: https://github.com/SylphxAI/solid-tui
    - theme: alt
      text: npm Packages
      link: https://www.npmjs.com/search?q=%40sylphx%2Fsolid-tui

features:
  - icon: ⚡
    title: Fine-grained Reactivity
    details: Only updates what changed. No Virtual DOM overhead, no reconciliation. Up to 26x faster than React-Ink.

  - icon: 🎨
    title: Flexbox Layout
    details: Use familiar CSS flexbox properties powered by Yoga layout engine for pixel-perfect terminal UIs.

  - icon: 🪶
    title: Lightweight
    details: ~50KB core bundle with modular packages. Install only what you need for optimal bundle size.

  - icon: 🎯
    title: Modular Architecture
    details: 5 focused packages - Core, Inputs, Components, Markdown, and Visual Effects. Use only what you need.

  - icon: 🔧
    title: TypeScript First
    details: Fully typed API with excellent IntelliSense support. Catch errors before runtime.

  - icon: 📦
    title: 25+ Components
    details: Rich component library - Input forms, data tables, charts, markdown rendering, gradients, and more.
---

## Quick Example

```tsx
import { createSignal } from 'solid-js';
import { render, Box, Text } from '@sylphx/solid-tui';

function Counter() {
  const [count, setCount] = createSignal(0);

  setInterval(() => setCount(c => c + 1), 1000);

  return (
    <Box flexDirection="column" padding={2}>
      <Text bold color="cyan">
        Count: {count()}
      </Text>
    </Box>
  );
}

render(() => <Counter />);
```

## Why Solid-TUI?

### vs React-Ink

| Feature | Solid-TUI | React-Ink |
|---------|-----------|-----------|
| **Reactivity** | Fine-grained (only changed nodes) | Virtual DOM (entire tree) |
| **Update Time** | ~2-3ms (100 items) | ~10-15ms (100 items) |
| **Memory** | Lower (no VDOM) | Higher (VDOM + Fiber) |
| **Bundle Size** | ~50KB | ~100KB |

[See full benchmark →](/benchmark)

### Performance

When one item changes in a 1000-item list:
- **React-Ink**: Diffs all 1000 items to find the change
- **Solid-TUI**: Updates only the 1 changed item

That's the power of fine-grained reactivity.

## Installation

::: code-group
```bash [Core Only]
npm install @sylphx/solid-tui solid-js
```

```bash [With Input Components]
npm install @sylphx/solid-tui @sylphx/solid-tui-inputs solid-js
```

```bash [All Packages]
npm install @sylphx/solid-tui @sylphx/solid-tui-inputs \
  @sylphx/solid-tui-components @sylphx/solid-tui-markdown \
  @sylphx/solid-tui-visual solid-js
```
:::

## Packages

<div style="display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 1rem;">
  <a href="https://www.npmjs.com/package/@sylphx/solid-tui"><img src="https://img.shields.io/npm/v/@sylphx/solid-tui.svg" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/@sylphx/solid-tui-inputs"><img src="https://img.shields.io/npm/v/@sylphx/solid-tui-inputs.svg" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/@sylphx/solid-tui-components"><img src="https://img.shields.io/npm/v/@sylphx/solid-tui-components.svg" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/@sylphx/solid-tui-markdown"><img src="https://img.shields.io/npm/v/@sylphx/solid-tui-markdown.svg" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/@sylphx/solid-tui-visual"><img src="https://img.shields.io/npm/v/@sylphx/solid-tui-visual.svg" alt="npm version"></a>
</div>

- **[@sylphx/solid-tui](https://www.npmjs.com/package/@sylphx/solid-tui)** - Core renderer (Box, Text, Spinner, hooks)
- **[@sylphx/solid-tui-inputs](https://www.npmjs.com/package/@sylphx/solid-tui-inputs)** - Input components (TextInput, SelectInput, MultiSelect, etc.)
- **[@sylphx/solid-tui-components](https://www.npmjs.com/package/@sylphx/solid-tui-components)** - UI components (ProgressBar, Table, Divider, etc.)
- **[@sylphx/solid-tui-markdown](https://www.npmjs.com/package/@sylphx/solid-tui-markdown)** - Markdown rendering with syntax highlighting
- **[@sylphx/solid-tui-visual](https://www.npmjs.com/package/@sylphx/solid-tui-visual)** - Visual effects (Gradient, BigText, Charts)

[Get Started →](/guide/getting-started)
