import { Box, render, Text } from '@sylphx/solid-tui';
import { Link } from '../src/Link.jsx';

function LinkDemo() {
  return (
    <Box flexDirection="column">
      <Text bold>Link Component Demo</Text>

      <Box marginTop={1}>
        <Text>Visit: </Text>
        <Link url="https://github.com/SylphxAI/solid-tui">GitHub</Link>
      </Box>

      <Box marginTop={1}>
        <Text>Documentation: </Text>
        <Link url="https://solid-tui.sylphx.com" />
      </Box>

      <Box marginTop={1}>
        <Text>Without fallback: </Text>
        <Link url="https://example.com" fallback={false}>
          Click here
        </Link>
      </Box>
    </Box>
  );
}

render(<LinkDemo />);
