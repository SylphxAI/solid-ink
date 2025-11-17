import React, { useState, useEffect } from 'react';
import { render, Box, Text } from 'ink';

interface BenchmarkStats {
  updateCount: number;
  startTime: number;
  updates: number[];
}

function ListBenchmark() {
  const ITEM_COUNT = 100;
  const UPDATE_INTERVAL = 100; // 10 updates per second
  const DURATION = 10000; // 10 seconds

  const [items] = useState(() =>
    Array.from({ length: ITEM_COUNT }, (_, i) => ({
      id: i,
      label: `Item ${i}`,
      value: 0,
    }))
  );

  const [updateTrigger, setUpdateTrigger] = useState(0);
  const [stats, setStats] = useState<BenchmarkStats>({
    updateCount: 0,
    startTime: Date.now(),
    updates: [],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const updateStart = performance.now();

      // Update 5 random items
      for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * ITEM_COUNT);
        items[randomIndex].value++;
      }

      setUpdateTrigger((t) => t + 1);

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

      const totalTime = Date.now() - stats.startTime;
      const avgUpdateTime = stats.updates.reduce((a, b) => a + b, 0) / stats.updates.length;
      const maxUpdateTime = Math.max(...stats.updates);
      const minUpdateTime = Math.min(...stats.updates);

      console.log('\n=== React-Ink Benchmark Results ===');
      console.log(`Total Duration: ${totalTime}ms`);
      console.log(`Total Updates: ${stats.updateCount}`);
      console.log(`Average Update Time: ${avgUpdateTime.toFixed(2)}ms`);
      console.log(`Min Update Time: ${minUpdateTime.toFixed(2)}ms`);
      console.log(`Max Update Time: ${maxUpdateTime.toFixed(2)}ms`);
      console.log(`Memory: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB`);

      // Write results to file
      const fs = require('fs');
      fs.writeFileSync(
        'benchmark/react-results.json',
        JSON.stringify({
          framework: 'react-ink',
          totalTime,
          updateCount: stats.updateCount,
          avgUpdateTime,
          minUpdateTime,
          maxUpdateTime,
          memory: process.memoryUsage().heapUsed,
        }, null, 2)
      );

      process.exit(0);
    }, DURATION);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Box flexDirection="column" padding={1}>
      <Text bold color="cyan">
        React-Ink Benchmark
      </Text>

      <Box marginTop={1}>
        <Text>
          Updates: {stats.updateCount} | Avg: {(
            stats.updates.reduce((a, b) => a + b, 0) / Math.max(stats.updates.length, 1)
          ).toFixed(2)}ms
        </Text>
      </Box>

      <Box marginTop={1} flexDirection="column">
        {items.slice(0, 10).map((item) => (
          <Text key={item.id}>
            {item.label}: {item.value}
          </Text>
        ))}
        <Text dim>... {ITEM_COUNT - 10} more items</Text>
      </Box>
    </Box>
  );
}

render(<ListBenchmark />);
