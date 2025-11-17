import { Box, Text } from '@sylphx/solid-tui';
import { createMemo, For } from 'solid-js';

export interface ChartDataPoint {
  label: string;
  value: number;
}

export interface ChartProps {
  data: ChartDataPoint[];
  type?: 'bar' | 'line';
  width?: number;
  height?: number;
  color?: string;
  showValues?: boolean;
  showAxis?: boolean;
}

export function Chart(props: ChartProps) {
  const {
    data,
    type = 'bar',
    width = 50,
    height = 10,
    color = 'blue',
    showValues = true,
    showAxis = true,
  } = props;

  const maxValue = createMemo(() => {
    return Math.max(...data.map((d) => d.value), 0);
  });

  const normalizeValue = (value: number) => {
    const max = maxValue();
    if (max === 0) return 0;
    return (value / max) * height;
  };

  const renderBarChart = () => {
    const maxLabelWidth = Math.max(...data.map((d) => d.label.length));

    return (
      <Box flexDirection="column">
        <For each={data}>
          {(point) => {
            const barWidth = Math.round((point.value / maxValue()) * width);
            const bar = '█'.repeat(barWidth);

            return (
              <Box>
                <Text>{point.label.padEnd(maxLabelWidth + 2, ' ')}</Text>
                <Text color={color}>{bar}</Text>
                {showValues && <Text dim> {point.value}</Text>}
              </Box>
            );
          }}
        </For>
      </Box>
    );
  };

  const renderLineChart = () => {
    const points = data.map((d) => normalizeValue(d.value));
    const lines: string[] = [];

    // Build chart line by line from top to bottom
    for (let row = height; row >= 0; row--) {
      let line = '';

      for (let i = 0; i < data.length; i++) {
        const value = points[i];
        const rounded = Math.round(value);

        if (rounded === row) {
          line += '●';
        } else if (i > 0) {
          const prevValue = Math.round(points[i - 1]);
          // Draw connecting line
          if ((prevValue > row && rounded < row) || (prevValue < row && rounded > row)) {
            line += '│';
          } else {
            line += ' ';
          }
        } else {
          line += ' ';
        }

        if (i < data.length - 1) {
          line += ' ';
        }
      }

      lines.push(line);
    }

    return (
      <Box flexDirection="column">
        <For each={lines}>{(line) => <Text color={color}>{line}</Text>}</For>
        {showAxis && (
          <Box marginTop={1}>
            <For each={data}>
              {(point, i) => (
                <Text dim>
                  {point.label}
                  {i() < data.length - 1 ? '  ' : ''}
                </Text>
              )}
            </For>
          </Box>
        )}
        {showValues && (
          <Box marginTop={1}>
            <For each={data}>
              {(point, i) => (
                <Text>
                  {String(point.value).padEnd(point.label.length, ' ')}
                  {i() < data.length - 1 ? '  ' : ''}
                </Text>
              )}
            </For>
          </Box>
        )}
      </Box>
    );
  };

  return type === 'bar' ? renderBarChart() : renderLineChart();
}
