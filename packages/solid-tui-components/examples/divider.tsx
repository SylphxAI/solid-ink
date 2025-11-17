import { render } from '@sylphx/solid-tui';
import { Divider } from '../src/Divider.jsx';
import { Box, Text } from '@sylphx/solid-tui';

function DividerDemo() {
  return (
    <Box flexDirection="column">
      <Text>Content above</Text>
      <Divider />
      <Text>Content below</Text>

      <Box marginTop={2}>
        <Divider title="Section Title" width={40} />
      </Box>

      <Box marginTop={2}>
        <Divider title="Custom" character="=" color="blue" titleColor="green" />
      </Box>

      <Box marginTop={2}>
        <Divider title="Stars" character="*" width={30} />
      </Box>
    </Box>
  );
}

render(<DividerDemo />);
