import { render } from '@sylphx/solid-tui';
import { createSignal } from 'solid-js';
import { ConfirmInput } from '../src/ConfirmInput.jsx';
import { Box, Text } from '@sylphx/solid-tui';

function ConfirmInputDemo() {
  const [confirmed, setConfirmed] = createSignal<boolean | null>(null);

  return (
    <Box flexDirection="column">
      <Text>Do you want to continue? (y/n)</Text>
      <ConfirmInput
        placeholder="y/n"
        isChecked={true}
        onSubmit={(value) => {
          setConfirmed(value);
        }}
      />
      {confirmed() !== null && (
        <Text color={confirmed() ? 'green' : 'red'}>
          {confirmed() ? 'Confirmed!' : 'Cancelled'}
        </Text>
      )}
    </Box>
  );
}

render(<ConfirmInputDemo />);
