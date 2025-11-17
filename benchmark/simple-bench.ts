/**
 * Simple benchmark without JSX to measure raw update performance
 */

import { createSignal } from 'solid-js';

interface BenchStats {
  updates: number[];
  startTime: number;
}

console.log('=== Solid-Ink Simple Benchmark ===\n');
console.log('Testing fine-grained reactivity...');

const ITEM_COUNT = 100;
const UPDATE_INTERVAL = 100; // ms
const DURATION = 10000; // 10 seconds

// Create items with individual signals
const items = Array.from({ length: ITEM_COUNT }, (_, i) => ({
  id: i,
  value: createSignal(0),
}));

const stats: BenchStats = {
  updates: [],
  startTime: Date.now(),
};

let updateCount = 0;

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

  stats.updates.push(updateTime);
  updateCount++;

  // Progress indicator
  if (updateCount % 10 === 0) {
    process.stdout.write(`\rUpdates: ${updateCount}/~100`);
  }
}, UPDATE_INTERVAL);

setTimeout(async () => {
  clearInterval(interval);

  const totalTime = Date.now() - stats.startTime;
  const avgUpdateTime = stats.updates.reduce((a, b) => a + b, 0) / stats.updates.length;
  const maxUpdateTime = Math.max(...stats.updates);
  const minUpdateTime = Math.min(...stats.updates);

  console.log('\n\n=== Results ===');
  console.log(`Total Duration: ${totalTime}ms`);
  console.log(`Total Updates: ${updateCount}`);
  console.log(`Average Update Time: ${avgUpdateTime.toFixed(3)}ms`);
  console.log(`Min Update Time: ${minUpdateTime.toFixed(3)}ms`);
  console.log(`Max Update Time: ${maxUpdateTime.toFixed(3)}ms`);
  console.log(`Memory: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB`);

  // Write results
  const fs = await import('fs');
  const path = await import('path');
  fs.writeFileSync(
    'solid-results.json',
    JSON.stringify({
      framework: 'solid-ink',
      totalTime,
      updateCount,
      avgUpdateTime,
      minUpdateTime,
      maxUpdateTime,
      memory: process.memoryUsage().heapUsed,
    }, null, 2)
  );

  console.log('\n✅ Results saved to solid-results.json');
  process.exit(0);
}, DURATION);
