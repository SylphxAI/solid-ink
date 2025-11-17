import { createSignal } from 'solid-js';
import {
  render,
  Box,
  Text,
  Static,
  Transform,
  useApp,
  useInput,
} from '../src/index.js';

function App() {
  const app = useApp();
  const [logs] = createSignal([
    'Starting application...',
    'Loading configuration...',
    'Connecting to database...',
    'Server started on port 3000',
    'Ready to accept connections',
  ]);

  useInput((input, key) => {
    if (key.escape || input === 'q') {
      app.exit();
    }
  });

  return (
    <Box flexDirection="column" padding={2}>
      <Text bold color="cyan">
        Static & Transform Demo (Press q to quit)
      </Text>

      <Box marginTop={1} flexDirection="column">
        <Text bold>Application Logs:</Text>
        <Static items={logs()}>
          {(log, index) => (
            <Text dimColor>
              [{index}] {log}
            </Text>
          )}
        </Static>
      </Box>

      <Box marginTop={2} flexDirection="column">
        <Text bold>Transform Demo:</Text>
        <Transform transform={(text) => text.toUpperCase()}>
          <Text color="green">This text will be transformed to uppercase</Text>
        </Transform>
        <Transform transform={(text) => text.split('').reverse().join('')}>
          <Text color="yellow">This text will be reversed</Text>
        </Transform>
      </Box>
    </Box>
  );
}

render(() => <App />);
