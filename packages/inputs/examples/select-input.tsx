import { render } from '@sylphx/solid-tui';
import { createSignal } from 'solid-js';
import { SelectInput } from '../src/SelectInput.jsx';
import { Box, Text } from '@sylphx/solid-tui';

function SelectInputDemo() {
  const [selected, setSelected] = createSignal<string | null>(null);

  const items = [
    { label: 'Red', value: 'red' },
    { label: 'Green', value: 'green' },
    { label: 'Blue', value: 'blue' },
    { label: 'Yellow', value: 'yellow' },
  ];

  return (
    <Box flexDirection="column">
      <Text>Select your favorite color:</Text>
      <SelectInput
        items={items}
        onSelect={(item) => {
          setSelected(item.value);
        }}
      />
      {selected() && (
        <Text color="green">
          You selected: {selected()}
        </Text>
      )}
    </Box>
  );
}

render(<SelectInputDemo />);
