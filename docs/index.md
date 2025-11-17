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

features:
  - icon: ⚡
    title: Fine-grained Reactivity
    details: Only updates what changed. No Virtual DOM overhead, no reconciliation. Up to 5x faster than React-Ink.

  - icon: 🎨
    title: Flexbox Layout
    details: Use familiar CSS flexbox properties powered by Yoga layout engine for pixel-perfect terminal UIs.

  - icon: 🪶
    title: Lightweight
    details: ~50KB bundle size with no reconciler overhead. Half the size of React-Ink with better performance.

  - icon: 🎯
    title: Familiar API
    details: If you know SolidJS, you already know Solid-TUI. Simple, predictable, and powerful.

  - icon: 🔧
    title: TypeScript First
    details: Fully typed API with excellent IntelliSense support. Catch errors before runtime.

  - icon: 📦
    title: Rich Components
    details: Box, Text, Spinner, and hooks for input handling. Build complex UIs with ease.
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

```bash
npm install @sylphx/solid-tui solid-js
```

[Get Started →](/guide/getting-started)
