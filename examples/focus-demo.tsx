import { createSignal } from 'solid-js';
import {
  render,
  Box,
  Text,
  useApp,
  useInput,
  useFocus,
  FocusProvider,
} from '../src/index.js';

function FocusableItem(props: { label: string }) {
  const { isFocused } = useFocus();

  return (
    <Box padding={1}>
      <Text
        bold={isFocused()}
        color={isFocused() ? 'green' : 'white'}
        dimColor={!isFocused()}
      >
        {isFocused() ? '▶ ' : '  '}
        {props.label}
      </Text>
    </Box>
  );
}

function App() {
  const app = useApp();
  const [selected, setSelected] = createSignal(0);

  useInput((input, key) => {
    if (key.escape || input === 'q') {
      app.exit();
    }
  });

  return (
    <Box flexDirection="column" padding={2}>
      <Text bold color="cyan">
        Focus Demo (Press Tab/Shift+Tab to navigate, q to quit)
      </Text>
      <Box marginTop={1} flexDirection="column">
        <FocusableItem label="Option 1" />
        <FocusableItem label="Option 2" />
        <FocusableItem label="Option 3" />
      </Box>
    </Box>
  );
}

render(() => (
  <FocusProvider>
    <App />
  </FocusProvider>
));
