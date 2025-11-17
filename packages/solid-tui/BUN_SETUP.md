# Using @sylphx/solid-tui with Bun

## Setup

1. Create `bunfig.toml` in your project root:

```toml
# Configure export conditions
conditions = ["browser", "import", "module", "default"]

# Preload SolidJS plugin for JSX transformation
preload = ["./node_modules/@sylphx/solid-tui/bun/preload.ts"]
```

2. Run your script with the browser condition:

```bash
bun --conditions=browser your-script.tsx
```

## Example

```tsx
import { render, Box, Text } from '@sylphx/solid-tui';
import { createSignal } from 'solid-js';

function App() {
  const [count, setCount] = createSignal(0);

  setInterval(() => setCount(c => c + 1), 100);

  return (
    <Box flexDirection="column">
      <Text color="green">✅ Bun + SolidJS TUI</Text>
      <Text>Count: {count()}</Text>
    </Box>
  );
}

render(() => <App />);
```

## Important Notes

- **Must run from project root** where `bunfig.toml` exists
- **Must use `--conditions=browser`** flag when running
- The plugin transforms JSX at runtime using babel-preset-solid

## Troubleshooting

### "React is not defined" error
- Make sure you're running from the directory with `bunfig.toml`
- Verify the preload path in bunfig.toml is correct
- Use `--conditions=browser` flag

### "document is not defined" error
- Make sure bunfig.toml has `conditions = ["browser", ...]`
- The browser condition loads the correct solid-js exports

### Plugin not loading
- Check that `bunfig.toml` is in the current working directory
- Verify the preload path points to the installed package
