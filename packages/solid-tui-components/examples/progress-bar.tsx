import { Box, render, Text } from '@sylphx/solid-tui';
import { createSignal, onCleanup, onMount } from 'solid-js';
import { ProgressBar } from '../src/ProgressBar.jsx';

function ProgressBarDemo() {
  const [progress, setProgress] = createSignal(0);

  onMount(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    onCleanup(() => clearInterval(interval));
  });

  return (
    <Box flexDirection="column">
      <Text bold>Progress Bar Demo</Text>
      <Box marginTop={1}>
        <ProgressBar value={progress()} total={100} width={30} />
      </Box>
      <Box marginTop={1}>
        <ProgressBar
          value={progress()}
          total={100}
          width={30}
          color="blue"
          completeCharacter="▓"
          incompleteCharacter="░"
        />
      </Box>
      <Box marginTop={1}>
        <ProgressBar
          value={progress()}
          total={100}
          width={30}
          showPercentage={false}
          color="yellow"
        />
      </Box>
    </Box>
  );
}

render(<ProgressBarDemo />);
