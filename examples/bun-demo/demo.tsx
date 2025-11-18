import { render, Box, Text } from '@sylphx/solid-tui';
import { createSignal, onCleanup } from 'solid-js';

function App() {
  const [count, setCount] = createSignal(0);
  
  const interval = setInterval(() => {
    setCount(c => c + 1);
  }, 100);
  
  onCleanup(() => clearInterval(interval));

  return (
    <Box flexDirection="column" padding={1}>
      <Text color="cyan" bold>🚀 Bun + SolidJS TUI Demo</Text>
      <Text color="green">Counter: {count()}</Text>
      <Text dimColor>Press Ctrl+C to exit</Text>
    </Box>
  );
}

render(() => <App />);
