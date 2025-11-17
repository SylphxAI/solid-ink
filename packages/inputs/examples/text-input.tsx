import { render } from '@sylphx/solid-tui';
import { createSignal } from 'solid-js';
import { TextInput } from '../src/TextInput.jsx';
import { Box, Text } from '@sylphx/solid-tui';

function TextInputDemo() {
  const [value, setValue] = createSignal('');
  const [submitted, setSubmitted] = createSignal('');

  return (
    <Box flexDirection="column">
      <Text>Enter your name:</Text>
      <TextInput
        value={value()}
        placeholder="Type here..."
        onChange={setValue}
        onSubmit={(val) => {
          setSubmitted(val);
        }}
      />
      {submitted() && (
        <Text color="green">
          Submitted: {submitted()}
        </Text>
      )}
    </Box>
  );
}

render(<TextInputDemo />);
