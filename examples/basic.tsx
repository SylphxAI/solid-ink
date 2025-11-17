import { createSignal, onCleanup } from 'solid-js';
import { render, Box, Text } from '../src/index.js';

function Counter() {
  const [count, setCount] = createSignal(0);

  // Increment every second
  const interval = setInterval(() => {
    setCount((c) => c + 1);
  }, 1000);

  onCleanup(() => clearInterval(interval));

  return (
    <Box flexDirection="column" padding={2} justifyContent="center" alignItems="center">
      <Text bold color="cyan">
        Solid-TUI Counter Example
      </Text>

      <Box marginTop={1}>
        <Text>Count: </Text>
        <Text bold color="green">
          {count()}
        </Text>
      </Box>

      <Box marginTop={2}>
        <Text dim>Press Ctrl+C to exit</Text>
      </Box>
    </Box>
  );
}

render(() => <Counter />);
