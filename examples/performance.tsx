import { createSignal, For, onCleanup } from 'solid-js';
import { render, Box, Text, Spacer } from '../src/index.js';

/**
 * Performance demo: Shows fine-grained reactivity
 * Only the changed item updates, not the entire list
 */
function PerformanceDemo() {
  const ITEM_COUNT = 100;

  // Create many items with individual signals
  const items = Array.from({ length: ITEM_COUNT }, (_, i) => ({
    id: i,
    label: `Item ${i}`,
    count: createSignal(0),
  }));

  const [totalUpdates, setTotalUpdates] = createSignal(0);
  const [updatesPerSec, setUpdatesPerSec] = createSignal(0);

  let updateCount = 0;
  let lastSecond = Date.now();

  // Randomly update items
  const interval = setInterval(() => {
    // Update 5 random items
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * ITEM_COUNT);
      const [count, setCount] = items[randomIndex].count;
      setCount(count() + 1);
      updateCount++;
    }

    setTotalUpdates(t => t + 5);

    // Calculate updates per second
    const now = Date.now();
    if (now - lastSecond >= 1000) {
      setUpdatesPerSec(updateCount);
      updateCount = 0;
      lastSecond = now;
    }
  }, 100);

  onCleanup(() => clearInterval(interval));

  return (
    <Box flexDirection="column" padding={2}>
      <Box flexDirection="row" alignItems="center">
        <Text bold color="cyan">Performance Demo</Text>
        <Spacer />
        <Text dim>100 items, 5 random updates every 100ms</Text>
      </Box>

      <Box marginTop={1} flexDirection="row">
        <Text>Total Updates: </Text>
        <Text bold color="green">{totalUpdates()}</Text>
        <Box marginLeft={3}>
          <Text>Updates/sec: </Text>
          <Text bold color="yellow">{updatesPerSec()}</Text>
        </Box>
      </Box>

      <Box marginTop={1}>
        <Text dim>
          Fine-grained reactivity: Only changed items re-render
        </Text>
      </Box>

      <Box marginTop={2} flexDirection="column" height={15}>
        <For each={items.slice(0, 10)}>
          {item => {
            const [count] = item.count;
            return (
              <Box marginTop={1} flexDirection="row">
                <Text>{item.label}: </Text>
                <Text bold color={count() > 0 ? 'cyan' : undefined}>
                  {count()}
                </Text>
              </Box>
            );
          }}
        </For>
        <Box marginTop={1}>
          <Text dim>... {ITEM_COUNT - 10} more items</Text>
        </Box>
      </Box>

      <Box marginTop={2}>
        <Text bold color="magenta">Key Insight:</Text>
      </Box>
      <Box marginTop={1}>
        <Text>
          Each item's count is a separate signal. When one updates,
        </Text>
      </Box>
      <Box>
        <Text>
          ONLY that specific Text node re-renders - not the entire list!
        </Text>
      </Box>

      <Box marginTop={2}>
        <Text dim>Press Ctrl+C to exit</Text>
      </Box>
    </Box>
  );
}

render(() => <PerformanceDemo />);
