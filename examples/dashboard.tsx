import { createSignal, onCleanup, For } from 'solid-js';
import { render, Box, Text, Spacer, useStdout } from '../src/index.js';

interface Metric {
  label: string;
  value: () => number;
  unit: string;
  color: string;
}

function Dashboard() {
  const dimensions = useStdout();

  const [cpu, setCpu] = createSignal(45);
  const [memory, setMemory] = createSignal(62);
  const [requests, setRequests] = createSignal(1234);
  const [latency, setLatency] = createSignal(23);

  // Simulate metric updates
  const interval = setInterval(() => {
    setCpu(prev => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 10)));
    setMemory(prev => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 8)));
    setRequests(prev => Math.max(0, prev + Math.floor(Math.random() * 20 - 5)));
    setLatency(prev => Math.max(0, prev + Math.floor(Math.random() * 10 - 5)));
  }, 1000);

  onCleanup(() => clearInterval(interval));

  const metrics: Metric[] = [
    { label: 'CPU', value: cpu, unit: '%', color: cpu() > 80 ? 'red' : cpu() > 60 ? 'yellow' : 'green' },
    { label: 'Memory', value: memory, unit: '%', color: memory() > 80 ? 'red' : memory() > 60 ? 'yellow' : 'green' },
    { label: 'Requests', value: requests, unit: '/s', color: 'cyan' },
    { label: 'Latency', value: latency, unit: 'ms', color: latency() > 50 ? 'red' : latency() > 30 ? 'yellow' : 'green' },
  ];

  const getBar = (value: number, max: number = 100, width: number = 20) => {
    const filled = Math.floor((value / max) * width);
    return '█'.repeat(filled) + '░'.repeat(width - filled);
  };

  return (
    <Box flexDirection="column" padding={2}>
      <Box flexDirection="row" alignItems="center">
        <Text bold color="cyan">System Dashboard</Text>
        <Spacer />
        <Text dim>Terminal: {dimensions().columns}x{dimensions().rows}</Text>
      </Box>

      <Box marginTop={2} flexDirection="column">
        <For each={metrics}>
          {metric => (
            <Box marginTop={1} flexDirection="column">
              <Box flexDirection="row">
                <Text bold>{metric.label}</Text>
                <Spacer />
                <Text color={metric.color as any} bold>
                  {metric.value().toFixed(0)}{metric.unit}
                </Text>
              </Box>

              <Box marginTop={1}>
                <Text color={metric.color as any}>
                  {getBar(metric.value())}
                </Text>
              </Box>
            </Box>
          )}
        </For>
      </Box>

      <Box marginTop={2}>
        <Text dim>Updates every second • Press Ctrl+C to exit</Text>
      </Box>
    </Box>
  );
}

render(() => <Dashboard />);
