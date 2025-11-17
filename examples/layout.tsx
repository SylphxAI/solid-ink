import { createSignal, For, onCleanup } from 'solid-js';
import { render, Box, Text } from '../src/index.js';

function LayoutDemo() {
  const [items, setItems] = createSignal([
    { id: 1, label: 'Item 1', color: 'red' },
    { id: 2, label: 'Item 2', color: 'green' },
    { id: 3, label: 'Item 3', color: 'blue' },
  ]);

  const [selected, setSelected] = createSignal(0);

  // Rotate selection every 2 seconds
  const interval = setInterval(() => {
    setSelected(s => (s + 1) % items().length);
  }, 2000);

  onCleanup(() => clearInterval(interval));

  return (
    <Box flexDirection="column" padding={2}>
      <Text bold color="cyan">Layout Demo - Fine-grained Reactivity</Text>

      <Box marginTop={1} flexDirection="column">
        <For each={items()}>
          {(item, index) => (
            <Box
              marginTop={1}
              padding={1}
              flexDirection="row"
              alignItems="center"
            >
              <Text>{selected() === index() ? '→ ' : '  '}</Text>
              <Text
                bold={selected() === index()}
                color={item.color as any}
              >
                {item.label}
              </Text>
            </Box>
          )}
        </For>
      </Box>

      <Box marginTop={2}>
        <Text dim>Selection changes every 2 seconds</Text>
      </Box>

      <Box marginTop={1}>
        <Text dim>Press Ctrl+C to exit</Text>
      </Box>
    </Box>
  );
}

render(() => <LayoutDemo />);
