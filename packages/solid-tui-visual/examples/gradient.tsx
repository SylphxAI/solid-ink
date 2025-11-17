import { render } from '@sylphx/solid-tui';
import { Gradient } from '../src/Gradient.jsx';
import { Box, Text } from '@sylphx/solid-tui';

function GradientDemo() {
  return (
    <Box flexDirection="column">
      <Text bold>Gradient Component Demo</Text>

      <Box marginTop={1}>
        <Gradient name="rainbow">
          Rainbow Gradient Text
        </Gradient>
      </Box>

      <Box marginTop={1}>
        <Gradient name="passion">
          Passion Gradient
        </Gradient>
      </Box>

      <Box marginTop={1}>
        <Gradient name="instagram">
          Instagram Gradient
        </Gradient>
      </Box>

      <Box marginTop={1}>
        <Gradient name="summer">
          Summer Gradient
        </Gradient>
      </Box>

      <Box marginTop={1}>
        <Gradient colors={['#FF0000', '#00FF00', '#0000FF']}>
          Custom RGB Gradient
        </Gradient>
      </Box>

      <Box marginTop={1}>
        <Gradient name="retro">
          Retro Gradient with Multiple Colors
        </Gradient>
      </Box>
    </Box>
  );
}

render(<GradientDemo />);
