import { createSignal, For } from 'solid-js';
import { render, Box, Text, useInput } from '../src/index.js';

function InteractiveList() {
  const items = ['Apple 🍎', 'Banana 🍌', 'Cherry 🍒', 'Date 🌴', 'Elderberry 🫐'];
  const [selected, setSelected] = createSignal(0);
  const [completed, setCompleted] = createSignal<number[]>([]);

  useInput((input, key) => {
    if (key.upArrow) {
      setSelected((s) => (s > 0 ? s - 1 : items.length - 1));
    } else if (key.downArrow) {
      setSelected((s) => (s < items.length - 1 ? s + 1 : 0));
    } else if (key.return || input === ' ') {
      const current = selected();
      setCompleted((c) => (c.includes(current) ? c.filter((i) => i !== current) : [...c, current]));
    } else if (key.escape || input === 'q') {
      process.exit(0);
    }
  });

  return (
    <Box flexDirection="column" padding={2}>
      <Text bold color="cyan">
        Interactive Shopping List
      </Text>

      <Box marginTop={1}>
        <Text dim>Use ↑↓ to navigate, Space/Enter to toggle, Q to quit</Text>
      </Box>

      <Box marginTop={2} flexDirection="column">
        <For each={items}>
          {(item, index) => {
            const isSelected = () => selected() === index();
            const isCompleted = () => completed().includes(index());

            return (
              <Box marginTop={1} flexDirection="row" alignItems="center">
                <Text bold={isSelected()}>{isSelected() ? '→ ' : '  '}</Text>

                <Text bold={isSelected()}>{isCompleted() ? '[✓] ' : '[ ] '}</Text>

                <Text
                  bold={isSelected()}
                  color={isCompleted() ? 'green' : undefined}
                  strikethrough={isCompleted()}
                >
                  {item}
                </Text>
              </Box>
            );
          }}
        </For>
      </Box>

      <Box marginTop={2}>
        <Text dim>
          Completed: {completed().length}/{items.length}
        </Text>
      </Box>
    </Box>
  );
}

render(() => <InteractiveList />);
