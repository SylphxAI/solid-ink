import { Box, render, Text } from '@sylphx/solid-tui';
import { createSignal } from 'solid-js';
import { MultiSelect } from '../src/MultiSelect.jsx';

function MultiSelectDemo() {
  const [selected, setSelected] = createSignal<string[]>([]);

  const items = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Cherry', value: 'cherry' },
    { label: 'Date', value: 'date' },
    { label: 'Elderberry', value: 'elderberry' },
  ];

  return (
    <Box flexDirection="column">
      <Text bold>Select your favorite fruits (Space to toggle, Enter to confirm):</Text>
      <Box marginTop={1}>
        <MultiSelect
          items={items}
          defaultValue={['apple']}
          onSelect={(items) => {
            setSelected(items.map((item) => item.label));
          }}
        />
      </Box>
      {selected().length > 0 && (
        <Box marginTop={1}>
          <Text color="green">Selected: {selected().join(', ')}</Text>
        </Box>
      )}
    </Box>
  );
}

render(<MultiSelectDemo />);
