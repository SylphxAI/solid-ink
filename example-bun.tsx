#!/usr/bin/env bun
/**
 * Example of using solid-tui with Bun
 *
 * Run from project root:
 *   bun --conditions=browser example-bun.tsx
 */

import { render, Box, Text } from '@sylphx/solid-tui';
import { createSignal } from 'solid-js';

function App() {
  const [count, setCount] = createSignal(0);

  setInterval(() => setCount(c => c + 1), 100);

  return (
    <Box flexDirection="column">
      <Text color="green">✅ Bun + SolidJS + Terminal UI</Text>
      <Text>Reactive counter: {count()}</Text>
      <Box style:marginTop="1">
        <Text color="cyan">Press Ctrl+C to exit</Text>
      </Box>
    </Box>
  );
}

render(() => <App />);
