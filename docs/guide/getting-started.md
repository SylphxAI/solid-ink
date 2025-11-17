# Getting Started

## Installation

Install Solid-TUI and SolidJS:

::: code-group
```bash [npm]
npm install @sylphx/solid-tui solid-js
```

```bash [yarn]
yarn add @sylphx/solid-tui solid-js
```

```bash [pnpm]
pnpm add @sylphx/solid-tui solid-js
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

## Next Steps

- [Learn about fine-grained reactivity](/guide/reactivity)
- [Explore the layout system](/guide/layout)
- [Browse examples](/examples/)
- [Read the API reference](/api/components)
