import { render } from '@sylphx/solid-tui';
import { TitledBox } from '../src/TitledBox.jsx';
import { Box, Text } from '@sylphx/solid-tui';

function TitledBoxDemo() {
  return (
    <Box flexDirection="column">
      <TitledBox title="Default Style" width={40}>
        <Text>This is content inside a titled box with single border style.</Text>
      </TitledBox>

      <Box marginTop={1}>
        <TitledBox title="Double Border" borderStyle="double" width={40}>
          <Text>This box has a double border style.</Text>
        </TitledBox>
      </Box>

      <Box marginTop={1}>
        <TitledBox title="Round Corners" borderStyle="round" width={40} borderColor="blue">
          <Text>This box has round corners and blue border.</Text>
        </TitledBox>
      </Box>

      <Box marginTop={1}>
        <TitledBox
          title="Custom Colors"
          borderStyle="bold"
          width={40}
          borderColor="green"
          titleColor="yellow"
        >
          <Text>Bold border with custom colors!</Text>
        </TitledBox>
      </Box>
    </Box>
  );
}

render(<TitledBoxDemo />);
