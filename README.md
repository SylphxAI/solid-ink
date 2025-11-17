# Solid-Ink

> SolidJS renderer for building blazing fast terminal/CLI applications

[![npm version](https://img.shields.io/npm/v/solid-ink.svg)](https://www.npmjs.com/package/solid-ink)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Solid-Ink brings SolidJS's fine-grained reactivity to terminal UIs. Build interactive CLIs with the performance and simplicity of SolidJS.

## ⚡ Performance First

**Up to 26x faster** than React-Ink with large datasets.

- **Fine-grained reactivity** - Only updates changed nodes, not entire component tree
- **No Virtual DOM** - Direct updates without reconciliation overhead
- **Lower memory** - 57% less memory usage vs React-Ink
- **Smaller bundle** - 50KB vs 100KB (React-Ink)

[See benchmark →](./benchmark/README.md)

## 🚀 Features

- **Fine-grained reactivity** - Powered by SolidJS signals
- **Flexbox layout** - Familiar CSS flexbox using Yoga layout engine
- **Rich components** - Box, Text, Spinner, and more
- **Keyboard input** - Built-in hooks for handling user interactions
- **TypeScript** - Full type safety and excellent IntelliSense
- **Lightweight** - ~50KB with zero dependencies on React

## 📦 Installation

```bash
npm install solid-ink solid-js
```

## 🎯 Quick Start

```tsx
import { createSignal } from 'solid-js';
import { render, Box, Text } from 'solid-ink';

function Counter() {
  const [count, setCount] = createSignal(0);

  setInterval(() => setCount(c => c + 1), 1000);

  return (
    <Box flexDirection="column" padding={2}>
      <Text bold color="cyan">Count: {count()}</Text>
    </Box>
  );
}

render(() => <Counter />);
```

Run with:
```bash
npx tsx app.tsx
```

## 💡 Why Solid-Ink?

### vs React-Ink

| Feature | Solid-Ink | React-Ink |
|---------|-----------|-----------|
| **Update Time** (100 items) | 2.8ms | 12.5ms |
| **Memory Usage** | 3.5MB | 8.2MB |
| **Bundle Size** | 52KB | 98KB |
| **Reactivity** | Fine-grained | Virtual DOM |

When updating 1 item in a 1000-item list:
- **React-Ink**: Diffs all 1000 items (O(n))
- **Solid-Ink**: Updates 1 item (O(1))

[Full benchmark results →](./benchmark/README.md)

### vs Plain Terminal

- ✅ Declarative components instead of imperative draw calls
- ✅ Flexbox layout instead of manual positioning
- ✅ Reactive updates - state changes automatically update UI
- ✅ Composable and reusable components

## 📚 Documentation

- [Getting Started](./GETTING_STARTED.md) - Beginner-friendly guide
- [Architecture](./ARCHITECTURE.md) - How it works under the hood
- [API Reference](#api-reference) - Complete API documentation
- [Examples](./examples/README.md) - Code examples
- [VitePress Docs](./docs/) - Full documentation site

## 🎨 Examples

### Interactive List

```tsx
import { createSignal, For } from 'solid-js';
import { render, Box, Text, useInput } from 'solid-ink';

function TodoList() {
  const items = ['Buy milk', 'Walk dog', 'Write code'];
  const [selected, setSelected] = createSignal(0);

  useInput((input, key) => {
    if (key.upArrow) setSelected(s => Math.max(0, s - 1));
    if (key.downArrow) setSelected(s => Math.min(items.length - 1, s + 1));
    if (key.escape) process.exit(0);
  });

  return (
    <Box flexDirection="column" padding={2}>
      <For each={items}>
        {(item, i) => (
          <Text bold={selected() === i()}>
            {selected() === i() ? '→ ' : '  '}
            {item}
          </Text>
        )}
      </For>
    </Box>
  );
}

render(() => <TodoList />);
```

### Real-time Dashboard

```tsx
import { createSignal } from 'solid-js';
import { render, Box, Text, Spacer } from 'solid-ink';

function Dashboard() {
  const [cpu, setCpu] = createSignal(0);
  const [memory, setMemory] = createSignal(0);

  setInterval(() => {
    setCpu(Math.random() * 100);
    setMemory(Math.random() * 100);
  }, 1000);

  return (
    <Box flexDirection="column" padding={2}>
      <Text bold color="cyan">System Monitor</Text>

      <Box marginTop={2} flexDirection="row">
        <Text>CPU: </Text>
        <Text color="green">{cpu().toFixed(0)}%</Text>
        <Spacer />
        <Text>Memory: </Text>
        <Text color="blue">{memory().toFixed(0)}%</Text>
      </Box>
    </Box>
  );
}

render(() => <Dashboard />);
```

[More examples →](./examples/)

## 🔧 API Reference

### Components

#### `<Box>`

Flexbox container for layout.

```tsx
<Box
  flexDirection="column"      // 'row' | 'column' | 'row-reverse' | 'column-reverse'
  justifyContent="center"     // 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around'
  alignItems="center"         // 'flex-start' | 'center' | 'flex-end' | 'stretch'
  padding={2}
  margin={1}
  width={20}
  height={10}
  flexGrow={1}
>
  {children}
</Box>
```

#### `<Text>`

Styled text component.

```tsx
<Text
  color="red"           // Color name or hex (#ff0000)
  bold
  italic
  underline
  strikethrough
  dim
>
  Hello World
</Text>
```

#### `<Spinner>`

Animated loading spinner.

```tsx
<Spinner type="dots" color="cyan" />
// types: 'dots' | 'line' | 'arc' | 'arrow'
```

#### `<Spacer>`

Flexible space (flex-grow: 1).

```tsx
<Box flexDirection="row">
  <Text>Left</Text>
  <Spacer />
  <Text>Right</Text>
</Box>
```

### Hooks

#### `useInput(handler, options?)`

Handle keyboard input.

```tsx
useInput((input, key) => {
  if (key.upArrow) { /* ... */ }
  if (key.downArrow) { /* ... */ }
  if (key.return) { /* ... */ }
  if (input === 'q') process.exit(0);
});
```

**Key object:**
- `upArrow`, `downArrow`, `leftArrow`, `rightArrow`
- `return`, `escape`, `tab`, `backspace`, `delete`
- `pageUp`, `pageDown`
- `ctrl`, `shift`, `meta`

#### `useStdout(stream?)`

Get terminal dimensions.

```tsx
const dimensions = useStdout();
// dimensions().columns, dimensions().rows
```

### Rendering

#### `render(component, options?)`

Render component to terminal.

```tsx
const cleanup = render(() => <App />, {
  output: process.stdout,  // Output stream
  exitOnCtrlC: true        // Exit on Ctrl+C (default: true)
});

// Call cleanup() to unmount
cleanup();
```

## 🏗️ How It Works

Solid-Ink uses SolidJS's Universal Renderer API to target terminal output:

```
SolidJS Component
      ↓
Fine-grained Signals (only changed values update)
      ↓
Universal Renderer (solid-js/universal)
      ↓
Terminal Renderer (ANSI output)
      ↓
Yoga Layout (flexbox)
      ↓
Terminal Display
```

**Key innovation:** No Virtual DOM. SolidJS's compiler tracks dependencies at build time and generates optimized update code.

```tsx
// Your code
<Text>Count: {count()}</Text>

// Compiler generates (simplified)
const el = createTextNode();
createEffect(() => {
  el.textContent = `Count: ${count()}`;
});
// Only runs when count() changes!
```

[Read architecture docs →](./ARCHITECTURE.md)

## 📊 Benchmark

Run benchmarks yourself:

```bash
cd benchmark
npm install

# Run React-Ink benchmark
npm run bench:react

# Run Solid-Ink benchmark
npm run bench:solid

# Compare results
npm run bench:compare
```

**Test scenario:** 100 items, 5 random updates every 100ms for 10 seconds

### Results

| Metric | React-Ink | Solid-Ink | Improvement |
|--------|-----------|-----------|-------------|
| Avg Update Time | 12.5ms | 2.8ms | **4.5x faster** ⚡ |
| Memory Usage | 8.2MB | 3.5MB | **57% less** 📉 |
| Bundle Size | 98KB | 52KB | **47% smaller** 📦 |

With 1000 items: **26x faster** than React-Ink.

[Full benchmark details →](./benchmark/README.md)

## 🧪 Testing

```bash
npm test
```

## 🛠️ Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Watch mode
npm run dev

# Run examples
npm run example:basic
npm run example:interactive
npm run example:dashboard
npm run example:performance

# Run benchmarks
npm run bench:both
npm run bench:compare

# Documentation site
npm run docs:dev    # Start VitePress dev server
npm run docs:build  # Build docs
```

## 🤝 Contributing

Contributions welcome! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) first.

## 📄 License

MIT © 2024

## 🙏 Acknowledgments

- [Ink](https://github.com/vadimdemedes/ink) - Inspiration for terminal rendering
- [SolidJS](https://www.solidjs.com/) - Fine-grained reactive framework
- [Yoga](https://yogalayout.com/) - Flexbox layout engine

---

**Built with SolidJS** ⚡ | **Blazing Fast** 🔥 | **Minimal Bundle** 📦
