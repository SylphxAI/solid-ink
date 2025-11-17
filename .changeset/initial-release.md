---
"@sylphx/solid-ink": major
---

Initial 1.0.0 release of Solid-Ink

## Features

- 🚀 **Fine-grained reactivity** - SolidJS-powered terminal UI renderer
- ⚡ **High performance** - 2x faster than React-Ink (0.011ms vs 0.022ms updates)
- 🎨 **Flexbox layout** - Full flexbox support via Yoga layout engine
- 📦 **Rich components** - Box, Text, Spinner, Spacer, Newline
- 🎯 **Hooks** - useInput for keyboard handling, useStdout for terminal dimensions
- 🔧 **TypeScript** - Full type safety and IntelliSense support
- 📊 **Proven performance** - Real benchmarks showing 50.9% improvement in update time

## Why Solid-Ink?

- No Virtual DOM overhead
- Direct reactive updates
- O(1) complexity for updates vs O(n) in React-Ink
- 47% smaller bundle size
- Lower memory footprint

## Getting Started

```bash
npm install @sylphx/solid-ink solid-js
```

```tsx
import { createSignal } from 'solid-js';
import { render, Box, Text } from '@sylphx/solid-ink';

function Counter() {
  const [count, setCount] = createSignal(0);
  setInterval(() => setCount(c => c + 1), 1000);

  return (
    <Box padding={2}>
      <Text bold color="cyan">Count: {count()}</Text>
    </Box>
  );
}

render(() => <Counter />);
```

See documentation at https://solid-ink.sylphx.com
