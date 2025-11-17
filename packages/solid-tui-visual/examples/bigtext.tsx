import { Box, render, Text } from '@sylphx/solid-tui';
import { BigText } from '../src/BigText.jsx';

function BigTextDemo() {
  return (
    <Box flexDirection="column">
      <Text bold>BigText Component Demo</Text>

      <Box marginTop={1}>
        <BigText color="cyan">HELLO</BigText>
      </Box>

      <Box marginTop={2}>
        <Text>Font: Banner</Text>
        <BigText font="Banner" color="green">
          CLI
        </BigText>
      </Box>

      <Box marginTop={2}>
        <Text>Font: Slant</Text>
        <BigText font="Slant" color="magenta">
          COOL
        </BigText>
      </Box>

      <Box marginTop={2}>
        <Text>Centered Alignment</Text>
        <BigText align="center" color="yellow">
          SOLID
        </BigText>
      </Box>
    </Box>
  );
}

render(<BigTextDemo />);
