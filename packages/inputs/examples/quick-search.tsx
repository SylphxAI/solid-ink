import { Box, render, Text } from '@sylphx/solid-tui';
import { createSignal } from 'solid-js';
import { QuickSearchInput } from '../src/QuickSearchInput.jsx';

function QuickSearchDemo() {
  const [selected, setSelected] = createSignal<string | null>(null);

  const items = [
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Angular', value: 'angular' },
    { label: 'Svelte', value: 'svelte' },
    { label: 'SolidJS', value: 'solidjs' },
    { label: 'Preact', value: 'preact' },
    { label: 'Lit', value: 'lit' },
    { label: 'Alpine.js', value: 'alpine' },
  ];

  return (
    <Box flexDirection="column">
      <Text bold>Search for a JavaScript framework:</Text>
      <Box marginTop={1}>
        <QuickSearchInput
          items={items}
          placeholder="Type to search..."
          limit={5}
          onSelect={(item) => {
            setSelected(item.label);
          }}
        />
      </Box>
      {selected() && (
        <Box marginTop={1}>
          <Text color="green">You selected: {selected()}</Text>
        </Box>
      )}
    </Box>
  );
}

render(<QuickSearchDemo />);
