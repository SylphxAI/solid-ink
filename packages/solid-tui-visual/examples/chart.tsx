import { render } from '@sylphx/solid-tui';
import { Chart } from '../src/Chart.jsx';
import { Box, Text } from '@sylphx/solid-tui';

function ChartDemo() {
  const barData = [
    { label: 'Jan', value: 45 },
    { label: 'Feb', value: 62 },
    { label: 'Mar', value: 38 },
    { label: 'Apr', value: 71 },
    { label: 'May', value: 55 },
  ];

  const lineData = [
    { label: 'Mon', value: 12 },
    { label: 'Tue', value: 19 },
    { label: 'Wed', value: 15 },
    { label: 'Thu', value: 25 },
    { label: 'Fri', value: 22 },
    { label: 'Sat', value: 30 },
    { label: 'Sun', value: 28 },
  ];

  return (
    <Box flexDirection="column">
      <Text bold>Bar Chart:</Text>
      <Box marginTop={1}>
        <Chart data={barData} type="bar" width={40} color="green" />
      </Box>

      <Box marginTop={3}>
        <Text bold>Line Chart:</Text>
        <Box marginTop={1}>
          <Chart data={lineData} type="line" height={10} color="blue" />
        </Box>
      </Box>

      <Box marginTop={3}>
        <Text bold>Bar Chart without Values:</Text>
        <Box marginTop={1}>
          <Chart data={barData} type="bar" showValues={false} color="magenta" />
        </Box>
      </Box>
    </Box>
  );
}

render(<ChartDemo />);
