# Getting Started with Solid-TUI

## Installation

```bash
npm install solid-tui solid-js
# or
yarn add solid-tui solid-js
# or
pnpm add solid-tui solid-js
```

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

Run it:

```bash
tsx app.tsx
```

## Adding State

Use SolidJS's `createSignal` for reactive state:

```tsx
import { createSignal } from 'solid-js';
import { render, Box, Text } from 'solid-tui';

function Counter() {
  const [count, setCount] = createSignal(0);

  // Update every second
  setInterval(() => setCount(c => c + 1), 1000);

  return (
    <Box padding={2}>
      <Text>Count: {count()}</Text>
    </Box>
  );
}

render(() => <Counter />);
```

**Note**: Call signal getters with `count()` not `count`.

## Layout with Box

Use flexbox for layout:

```tsx
import { render, Box, Text } from 'solid-tui';

function Layout() {
  return (
    <Box flexDirection="column" padding={2}>
      <Text bold>Header</Text>

      <Box marginTop={1} flexDirection="row">
        <Box flexGrow={1}>
          <Text>Left column</Text>
        </Box>
        <Box flexGrow={1}>
          <Text>Right column</Text>
        </Box>
      </Box>

      <Box marginTop={1}>
        <Text dim>Footer</Text>
      </Box>
    </Box>
  );
}

render(() => <Layout />);
```

### Common Layout Patterns

**Vertical stack:**
```tsx
<Box flexDirection="column">
  <Text>Item 1</Text>
  <Text>Item 2</Text>
</Box>
```

**Horizontal row:**
```tsx
<Box flexDirection="row">
  <Text>Left</Text>
  <Text>Right</Text>
</Box>
```

**Centered:**
```tsx
<Box
  flexDirection="column"
  justifyContent="center"
  alignItems="center"
>
  <Text>Centered!</Text>
</Box>
```

**Space between:**
```tsx
<Box flexDirection="row" justifyContent="space-between">
  <Text>Left</Text>
  <Text>Right</Text>
</Box>
```

## Styling Text

```tsx
import { render, Box, Text } from 'solid-tui';

function Styles() {
  return (
    <Box flexDirection="column" padding={2}>
      <Text color="red">Red text</Text>
      <Text color="#00ff00">Hex color</Text>
      <Text bold>Bold text</Text>
      <Text italic>Italic text</Text>
      <Text underline>Underlined</Text>
      <Text strikethrough>Strikethrough</Text>
      <Text dim>Dimmed</Text>

      {/* Combine styles */}
      <Text bold color="cyan" underline>
        Bold cyan underlined
      </Text>
    </Box>
  );
}

render(() => <Styles />);
```

## Lists with For

```tsx
import { For } from 'solid-js';
import { render, Box, Text } from 'solid-tui';

function List() {
  const items = ['Apple', 'Banana', 'Cherry'];

  return (
    <Box flexDirection="column" padding={2}>
      <For each={items}>
        {(item, index) => (
          <Box marginTop={1}>
            <Text>
              {index() + 1}. {item}
            </Text>
          </Box>
        )}
      </For>
    </Box>
  );
}

render(() => <List />);
```

## Conditional Rendering

Use SolidJS's `Show`:

```tsx
import { createSignal, Show } from 'solid-js';
import { render, Box, Text } from 'solid-tui';

function Conditional() {
  const [isLoading, setIsLoading] = createSignal(true);

  setTimeout(() => setIsLoading(false), 2000);

  return (
    <Box padding={2}>
      <Show
        when={!isLoading()}
        fallback={<Text>Loading...</Text>}
      >
        <Text color="green">Done!</Text>
      </Show>
    </Box>
  );
}

render(() => <Conditional />);
```

## Keyboard Input

```tsx
import { createSignal } from 'solid-js';
import { render, Box, Text, useInput } from 'solid-tui';

function KeyboardApp() {
  const [lastKey, setLastKey] = createSignal('');

  useInput((input, key) => {
    if (key.upArrow) setLastKey('Up Arrow');
    else if (key.downArrow) setLastKey('Down Arrow');
    else if (key.return) setLastKey('Enter');
    else setLastKey(input);
  });

  return (
    <Box padding={2}>
      <Text>Press any key: {lastKey()}</Text>
    </Box>
  );
}

render(() => <KeyboardApp />);
```

## Cleanup

Use `onCleanup` for cleanup logic:

```tsx
import { createSignal, onCleanup } from 'solid-js';
import { render, Box, Text } from 'solid-tui';

function Timer() {
  const [count, setCount] = createSignal(0);

  const interval = setInterval(() => {
    setCount(c => c + 1);
  }, 1000);

  // Clean up interval when component unmounts
  onCleanup(() => {
    clearInterval(interval);
  });

  return (
    <Box padding={2}>
      <Text>Timer: {count()}s</Text>
    </Box>
  );
}

render(() => <Timer />);
```

## Loading Spinner

```tsx
import { render, Box, Text, Spinner } from 'solid-tui';

function Loading() {
  return (
    <Box padding={2} flexDirection="row">
      <Spinner type="dots" color="cyan" />
      <Text> Loading...</Text>
    </Box>
  );
}

render(() => <Loading />);
```

## Terminal Dimensions

```tsx
import { render, Box, Text, useStdout } from 'solid-tui';

function Dimensions() {
  const dimensions = useStdout();

  return (
    <Box padding={2}>
      <Text>
        Terminal: {dimensions().columns}x{dimensions().rows}
      </Text>
    </Box>
  );
}

render(() => <Dimensions />);
```

## Common Patterns

### Navigation Menu

```tsx
import { createSignal, For } from 'solid-js';
import { render, Box, Text, useInput } from 'solid-tui';

function Menu() {
  const items = ['Option 1', 'Option 2', 'Option 3'];
  const [selected, setSelected] = createSignal(0);

  useInput((input, key) => {
    if (key.upArrow) {
      setSelected(s => Math.max(0, s - 1));
    } else if (key.downArrow) {
      setSelected(s => Math.min(items.length - 1, s + 1));
    }
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

render(() => <Menu />);
```

### Progress Bar

```tsx
import { createSignal } from 'solid-js';
import { render, Box, Text } from 'solid-tui';

function ProgressBar() {
  const [progress, setProgress] = createSignal(0);

  const interval = setInterval(() => {
    setProgress(p => {
      if (p >= 100) {
        clearInterval(interval);
        return 100;
      }
      return p + 10;
    });
  }, 500);

  const getBar = () => {
    const width = 20;
    const filled = Math.floor((progress() / 100) * width);
    return '█'.repeat(filled) + '░'.repeat(width - filled);
  };

  return (
    <Box flexDirection="column" padding={2}>
      <Text>{getBar()}</Text>
      <Text>{progress()}%</Text>
    </Box>
  );
}

render(() => <ProgressBar />);
```

## Best Practices

1. **Use signals for reactive state**: `createSignal`, not `useState`
2. **Call signal getters**: `count()` not `count`
3. **Clean up side effects**: Use `onCleanup` for intervals, listeners
4. **Use For for lists**: More efficient than `.map()`
5. **Leverage fine-grained reactivity**: Each signal updates independently

## Next Steps

1. Explore the [examples](./examples/) directory
2. Read the [API documentation](./README.md#api-reference)
3. Check out [SolidJS docs](https://www.solidjs.com/) for reactive patterns
4. Build something cool! 🚀

## Troubleshooting

**"X is not a function"**: Make sure to call signal getters: `count()` not `count`

**No output**: Check that you're calling `render(() => <App />)` at the end

**Flickering**: Minimize state changes, batch updates when possible

**Layout issues**: Use flexbox properties on Box, check terminal size

**TypeScript errors**: Make sure JSX is configured in tsconfig.json:
```json
{
  "compilerOptions": {
    "jsx": "preserve",
    "jsxImportSource": "solid-js"
  }
}
```
