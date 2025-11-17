# Examples

Run examples with:

```bash
npm run example:basic
npm run example:layout
npm run example:interactive
npm run example:spinner
npm run example:dashboard
npm run example:performance
```

Or with tsx directly:

```bash
tsx examples/basic.tsx
```

## Examples Overview

### `basic.tsx` - Counter

Simple counter that increments every second. Demonstrates:
- Basic component structure
- `createSignal` for state
- `onCleanup` for cleanup
- Text styling with colors

### `layout.tsx` - Layout Demo

Rotating selection in a list. Demonstrates:
- `For` component for lists
- Flexbox layout with Box
- Conditional styling
- Fine-grained reactivity (only selected item updates)

### `interactive.tsx` - Interactive Shopping List

Keyboard-controlled todo list. Demonstrates:
- `useInput` hook for keyboard handling
- Arrow key navigation
- Space/Enter to toggle items
- Complex state management
- Checkbox UI

### `spinner.tsx` - Loading Spinner

Animated loading screen with progress. Demonstrates:
- `Spinner` component
- `Show` component for conditional rendering
- Progress bar visualization
- Multi-step loading simulation

### `dashboard.tsx` - System Dashboard

Real-time metrics dashboard. Demonstrates:
- `useStdout` hook for terminal dimensions
- `Spacer` component for flexible layouts
- Multiple metrics updating simultaneously
- Progress bars and color-coded status
- Complex layouts with rows and columns

### `performance.tsx` - Performance Demo

Shows fine-grained reactivity with 100 items. Demonstrates:
- Scalability with many items
- Independent signal updates
- Performance characteristics
- Updates per second counter

## Running Examples

Each example demonstrates different aspects of solid-tui:

1. **Start simple**: `basic.tsx` for fundamental concepts
2. **Learn layout**: `layout.tsx` for flexbox and lists
3. **Add interaction**: `interactive.tsx` for keyboard input
4. **Polish UI**: `spinner.tsx` and `dashboard.tsx` for advanced UIs
5. **Understand performance**: `performance.tsx` for reactivity insights

## Keyboard Controls

Most examples support:
- **Ctrl+C**: Exit
- **↑/↓**: Navigate (in interactive.tsx)
- **Space/Enter**: Select (in interactive.tsx)
- **Q**: Quit (in interactive.tsx)

## Tips

1. **Terminal size**: Some examples look better in larger terminals (80x24 minimum)
2. **Colors**: Make sure your terminal supports ANSI colors
3. **Performance**: Watch how smooth updates are even with many items
4. **Reactivity**: Notice how only changed elements flicker (if at all)

## Next Steps

After running examples:
1. Modify them to see how changes affect output
2. Combine patterns from multiple examples
3. Build your own terminal UI!

## Example Template

```tsx
import { render, Box, Text } from '../src/index.js';

function MyApp() {
  return (
    <Box padding={2}>
      <Text bold color="cyan">Hello Solid-TUI!</Text>
    </Box>
  );
}

render(() => <MyApp />);
```
