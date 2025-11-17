# Getting Started

## Installation

Solid-TUI is organized into focused packages. Install only what you need:

### Core Package (Required)

::: code-group
```bash [npm]
npm install @sylphx/solid-tui solid-js
```

```bash [yarn]
yarn add @sylphx/solid-tui solid-js
```

```bash [bun]
bun add @sylphx/solid-tui solid-js
```
:::

### Optional Component Packages

::: code-group
```bash [npm]
# Input components (TextInput, SelectInput, etc.)
npm install @sylphx/solid-tui-inputs

# UI components (ProgressBar, Table, etc.)
npm install @sylphx/solid-tui-components

# Markdown rendering
npm install @sylphx/solid-tui-markdown

# Visual effects (Gradient, BigText, Charts)
npm install @sylphx/solid-tui-visual
```

```bash [All at once]
npm install @sylphx/solid-tui @sylphx/solid-tui-inputs \
  @sylphx/solid-tui-components @sylphx/solid-tui-markdown \
  @sylphx/solid-tui-visual solid-js
```
:::

## Your First App

Create a file `app.tsx`:

```tsx
import { render, Box, Text } from 'solid-tui';

function App() {
  return (
    <Box padding={2}>
      <Text color="green">Hello from Solid-TUI!</Text>
    </Box>
  );
}

render(() => <App />);
```

Run it with tsx:

```bash
npx tsx app.tsx
```

## TypeScript Setup

Configure `tsconfig.json`:

```json
{
  "compilerOptions": {
    "jsx": "preserve",
    "jsxImportSource": "solid-js",
    "module": "ES2022",
    "target": "ES2022",
    "moduleResolution": "bundler"
  }
}
```

## Adding State

Use SolidJS's `createSignal` for reactive state:

```tsx
import { createSignal } from 'solid-js';
import { render, Box, Text } from '@sylphx/solid-tui';

function Counter() {
  const [count, setCount] = createSignal(0);

  setInterval(() => setCount(c => c + 1), 1000);

  return (
    <Box padding={2}>
      <Text>Count: {count()}</Text>
    </Box>
  );
}

render(() => <Counter />);
```

::: tip
Remember to call signals as functions: `count()` not `count`
:::

## Layout with Flexbox

Use `<Box>` for layout with flexbox properties:

```tsx
import { render, Box, Text } from 'solid-tui';

function Layout() {
  return (
    <Box flexDirection="column" padding={2}>
      <Text bold>Header</Text>

      <Box marginTop={1} flexDirection="row">
        <Box flexGrow={1}>
          <Text>Left</Text>
        </Box>
        <Box flexGrow={1}>
          <Text>Right</Text>
        </Box>
      </Box>
    </Box>
  );
}

render(() => <Layout />);
```

## Handling Input

Use the `useInput` hook for keyboard input:

```tsx
import { createSignal } from 'solid-js';
import { render, Box, Text, useInput } from '@sylphx/solid-tui';

function App() {
  const [key, setKey] = createSignal('');

  useInput((input, key) => {
    if (key.escape) {
      process.exit(0);
    }
    setKey(input);
  });

  return (
    <Box padding={2}>
      <Text>Last key pressed: {key()}</Text>
      <Text dim>Press ESC to exit</Text>
    </Box>
  );
}

render(() => <App />);
```

## Using Component Packages

### Input Components

```tsx
import { render, Box, Text } from '@sylphx/solid-tui';
import { TextInput } from '@sylphx/solid-tui-inputs';
import { createSignal } from 'solid-js';

function Form() {
  const [name, setName] = createSignal('');

  return (
    <Box flexDirection="column">
      <Text>Enter your name:</Text>
      <TextInput
        value={name()}
        onChange={setName}
        placeholder="Type here..."
      />
      {name() && <Text color="green">Hello, {name()}!</Text>}
    </Box>
  );
}

render(<Form />);
```

### Data Visualization

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
      <Chart data={data} type="bar" color="green" />
      <Box marginTop={2}>
        <ProgressBar value={75} total={100} width={30} />
      </Box>
    </Box>
  );
}

render(<Dashboard />);
```

## Next Steps

- [Learn about fine-grained reactivity](/guide/reactivity)
- [Explore the layout system](/guide/layout)
- [Input Components API](/api/inputs/)
- [UI Components API](/api/components/)
- [Visual Effects API](/api/visual/)
- [Browse examples](/examples/)
- [Testing Guide](/guide/testing)
