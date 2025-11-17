# Solid-TUI

> SolidJS renderer for building blazing fast terminal/CLI applications

[![npm version](https://img.shields.io/npm/v/@sylphx/solid-tui.svg)](https://www.npmjs.com/package/@sylphx/solid-tui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Twitter](https://img.shields.io/twitter/follow/SylphxAI?style=social)](https://x.com/SylphxAI)

Solid-TUI brings SolidJS's fine-grained reactivity to terminal UIs. Build interactive CLIs with the performance and simplicity of SolidJS.

📚 **[Documentation](https://solid-tui.sylphx.com)** ·
🐦 **[Twitter](https://x.com/SylphxAI)** ·
💬 **[Issues](https://github.com/SylphxAI/solid-tui/issues)**

## ⚡ Performance First

**Up to 26x faster** than React-Ink with large datasets.

- **Fine-grained reactivity** - Only updates changed nodes, not entire component tree
- **No Virtual DOM** - Direct updates without reconciliation overhead
- **Lower memory** - 57% less memory usage vs React-Ink
- **Smaller bundle** - 50KB vs 100KB (React-Ink)

[See benchmark →](./benchmark/README.md)

## 📦 Packages

Solid-TUI is organized into focused packages for different use cases:

### Core Package
- **[@sylphx/solid-tui](./packages/solid-tui)** - Core renderer and primitives (Box, Text, Spinner, etc.)

### Component Packages
- **[@sylphx/solid-tui-inputs](./packages/solid-tui-inputs)** - Input components (TextInput, SelectInput, MultiSelect, etc.)
- **[@sylphx/solid-tui-components](./packages/solid-tui-components)** - UI components (ProgressBar, Table, Divider, etc.)
- **[@sylphx/solid-tui-markdown](./packages/solid-tui-markdown)** - Markdown rendering with syntax highlighting
- **[@sylphx/solid-tui-visual](./packages/solid-tui-visual)** - Visual effects (Gradient, BigText, Charts)

## 🛠️ All Components

### Core Components (@sylphx/solid-tui)
- **Box** - Flexbox layout container
- **Text** - Styled text rendering
- **Spinner** - Loading spinners
- **Newline** - Line breaks
- **Spacer** - Flexible spacing
- **Static** - Static output preservation
- **Transform** - Transform children output

### Input Components (@sylphx/solid-tui-inputs)
- **TextInput** - Text input with cursor navigation
- **SelectInput** - Single selection from list
- **MultiSelect** - Multiple selection with checkboxes
- **ConfirmInput** - Yes/No confirmation
- **QuickSearchInput** - Searchable dropdown with filtering

### UI Components (@sylphx/solid-tui-components)
- **ProgressBar** - Progress indicator with customization
- **Table** - Data tables with borders and alignment
- **Divider** - Horizontal dividers with optional titles
- **Link** - Clickable hyperlinks (OSC 8 support)
- **TitledBox** - Bordered containers with titles

### Markdown Components (@sylphx/solid-tui-markdown)
- **Markdown** - Full markdown rendering (headers, lists, code blocks, tables)
- **SyntaxHighlight** - Code syntax highlighting (190+ languages)

### Visual Components (@sylphx/solid-tui-visual)
- **Gradient** - Gradient text effects (13 presets + custom)
- **BigText** - ASCII art text (multiple fonts)
- **Chart** - Bar and line charts

## 🚀 Quick Start

### Installation

```bash
# Core package
npm install @sylphx/solid-tui solid-js

# Optional: Install component packages as needed
npm install @sylphx/solid-tui-inputs
npm install @sylphx/solid-tui-components
npm install @sylphx/solid-tui-markdown
npm install @sylphx/solid-tui-visual
```

### Basic Example

```tsx
import { createSignal } from 'solid-js';
import { render, Box, Text } from '@sylphx/solid-tui';

function Counter() {
  const [count, setCount] = createSignal(0);

  setInterval(() => setCount(c => c + 1), 1000);

  return (
    <Box flexDirection="column" padding={1}>
      <Text color="green" bold>
        Counter: {count()}
      </Text>
    </Box>
  );
}

render(<Counter />);
```

### Interactive Input Example

```tsx
import { render, Box, Text } from '@sylphx/solid-tui';
import { TextInput } from '@sylphx/solid-tui-inputs';
import { createSignal } from 'solid-js';

function App() {
  const [name, setName] = createSignal('');

  return (
    <Box flexDirection="column">
      <Text>What's your name?</Text>
      <TextInput
        value={name()}
        onChange={setName}
        placeholder="Enter your name..."
      />
      {name() && <Text color="green">Hello, {name()}!</Text>}
    </Box>
  );
}

render(<App />);
```

### Data Visualization Example

```tsx
import { render, Box, Text } from '@sylphx/solid-tui';
import { Chart } from '@sylphx/solid-tui-visual';
import { ProgressBar } from '@sylphx/solid-tui-components';

function Dashboard() {
  const data = [
    { label: 'Jan', value: 45 },
    { label: 'Feb', value: 62 },
    { label: 'Mar', value: 38 },
  ];

  return (
    <Box flexDirection="column">
      <Text bold>Sales Dashboard</Text>
      <Box marginTop={1}>
        <Chart data={data} type="bar" color="green" />
      </Box>
      <Box marginTop={2}>
        <ProgressBar value={75} total={100} width={30} />
      </Box>
    </Box>
  );
}

render(<Dashboard />);
```

## 📖 Documentation

### Core Concepts
- [Components](./packages/solid-tui/README.md) - Core components and layout
- [Hooks](./packages/solid-tui/README.md#hooks) - useInput, useFocus, etc.
- [Styling](./packages/solid-tui/README.md#styling) - Colors and text styles

### Component Libraries
- [Input Components](./packages/solid-tui-inputs/README.md) - Forms and user input
- [UI Components](./packages/solid-tui-components/README.md) - Tables, progress, etc.
- [Markdown](./packages/solid-tui-markdown/README.md) - Rendering markdown content
- [Visual Effects](./packages/solid-tui-visual/README.md) - Gradients, charts, big text

## 🎯 Features

- **Fine-grained reactivity** - Powered by SolidJS signals
- **Flexbox layout** - Familiar CSS flexbox using Yoga layout engine
- **Rich components** - 25+ components across 5 packages
- **Keyboard input** - Built-in hooks for handling user interactions
- **TypeScript** - Full type safety and excellent IntelliSense
- **Lightweight** - ~50KB core with zero dependencies on React
- **Modular** - Install only what you need

## 🏗️ Monorepo Structure

```
solid-tui/
├── packages/
│   ├── solid-tui/              # Core renderer
│   ├── solid-tui-inputs/       # Input components
│   ├── solid-tui-components/   # UI components
│   ├── solid-tui-markdown/     # Markdown rendering
│   └── solid-tui-visual/       # Visual effects
```

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](./CONTRIBUTING.md) for details.

## 📄 License

MIT © [SylphxAI](https://github.com/SylphxAI)

## 🙏 Acknowledgments

- [SolidJS](https://www.solidjs.com/) - For the amazing reactive primitives
- [Ink](https://github.com/vadimdemedes/ink) - For the inspiration
- [Yoga](https://yogalayout.com/) - For the layout engine
