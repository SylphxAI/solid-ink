import { createSignal, For, onCleanup } from 'solid-js';
import { render, Box, Text } from '../src/index.js';

interface BenchmarkStats {
  updateCount: number;
  startTime: number;
  updates: number[];
}

function ListBenchmark() {
  const ITEM_COUNT = 100;
  const UPDATE_INTERVAL = 100; // 10 updates per second
  const DURATION = 10000; // 10 seconds

  // Create items with individual signals
  const items = Array.from({ length: ITEM_COUNT }, (_, i) => ({
    id: i,
    label: `Item ${i}`,
    value: createSignal(0),
  }));

  const [stats, setStats] = createSignal<BenchmarkStats>({
    updateCount: 0,
    startTime: Date.now(),
    updates: [],
  });

  const interval = setInterval(() => {
    const updateStart = performance.now();

    // Update 5 random items
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * ITEM_COUNT);
      const [value, setValue] = items[randomIndex].value;
      setValue(value() + 1);
    }

    const updateEnd = performance.now();
    const updateTime = updateEnd - updateStart;

    setStats((s) => ({
      ...s,
      updateCount: s.updateCount + 1,
      updates: [...s.updates, updateTime],
    }));
  }, UPDATE_INTERVAL);

  const timeout = setTimeout(() => {
    clearInterval(interval);

    const currentStats = stats();
    const totalTime = Date.now() - currentStats.startTime;
    const avgUpdateTime = currentStats.updates.reduce((a, b) => a + b, 0) / currentStats.updates.length;
    const maxUpdateTime = Math.max(...currentStats.updates);
    const minUpdateTime = Math.min(...currentStats.updates);

    console.log('\n=== Solid-TUI Benchmark Results ===');
    console.log(`Total Duration: ${totalTime}ms`);
    console.log(`Total Updates: ${currentStats.updateCount}`);
    console.log(`Average Update Time: ${avgUpdateTime.toFixed(2)}ms`);
    console.log(`Min Update Time: ${minUpdateTime.toFixed(2)}ms`);
    console.log(`Max Update Time: ${maxUpdateTime.toFixed(2)}ms`);
    console.log(`Memory: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB`);

    // Write results to file
    const fs = require('fs');
    const path = require('path');
    fs.writeFileSync(
      path.join(process.cwd(), 'benchmark/solid-results.json'),
      JSON.stringify({
        framework: 'solid-tui',
        totalTime,
        updateCount: currentStats.updateCount,
        avgUpdateTime,
        minUpdateTime,
        maxUpdateTime,
        memory: process.memoryUsage().heapUsed,
      }, null, 2)
    );

    process.exit(0);
  }, DURATION);

  onCleanup(() => {
    clearInterval(interval);
    clearTimeout(timeout);
  });

  const avgUpdateTime = () => {
    const s = stats();
    if (s.updates.length === 0) return 0;
    return s.updates.reduce((a, b) => a + b, 0) / s.updates.length;
  };

  return (
    <Box flexDirection="column" padding={1}>
      <Text bold color="cyan">
        Solid-TUI Benchmark
      </Text>

      <Box marginTop={1}>
        <Text>
          Updates: {stats().updateCount} | Avg: {avgUpdateTime().toFixed(2)}ms
        </Text>
      </Box>

      <Box marginTop={1} flexDirection="column">
        <For each={items.slice(0, 10)}>
          {(item) => {
            const [value] = item.value;
            return (
              <Text>
                {item.label}: {value()}
              </Text>
            );
          }}
        </For>
        <Text dim>... {ITEM_COUNT - 10} more items</Text>
      </Box>
    </Box>
  );
}

render(() => <ListBenchmark />);
