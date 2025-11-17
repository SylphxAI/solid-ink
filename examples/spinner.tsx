import { createSignal, onCleanup, Show } from 'solid-js';
import { render, Box, Text, Spinner } from '../src/index.js';

function LoadingDemo() {
  const [loading, setLoading] = createSignal(true);
  const [progress, setProgress] = createSignal(0);
  const [step, setStep] = createSignal('Initializing...');

  const steps = [
    'Initializing...',
    'Loading dependencies...',
    'Compiling code...',
    'Running tests...',
    'Building output...',
    'Complete!',
  ];

  const timer = setInterval(() => {
    setProgress(p => {
      const next = p + 1;
      if (next < steps.length) {
        setStep(steps[next]);
        return next;
      } else {
        setLoading(false);
        return p;
      }
    });
  }, 1500);

  onCleanup(() => clearInterval(timer));

  return (
    <Box flexDirection="column" padding={2}>
      <Text bold color="cyan">Build Progress</Text>

      <Box marginTop={2} flexDirection="row" alignItems="center">
        <Show
          when={loading()}
          fallback={<Text color="green">✓ </Text>}
        >
          <Spinner type="dots" color="cyan" />
          <Text> </Text>
        </Show>

        <Text bold={loading()}>
          {step()}
        </Text>
      </Box>

      <Box marginTop={1}>
        <Text dim>
          Step {progress() + 1} of {steps.length}
        </Text>
      </Box>

      <Box marginTop={1}>
        <Text>
          {'█'.repeat(progress() + 1)}
          {'░'.repeat(steps.length - progress() - 1)}
        </Text>
      </Box>

      <Show when={!loading()}>
        <Box marginTop={2}>
          <Text color="green" bold>Build successful! 🎉</Text>
        </Box>
      </Show>

      <Box marginTop={2}>
        <Text dim>Press Ctrl+C to exit</Text>
      </Box>
    </Box>
  );
}

render(() => <LoadingDemo />);
