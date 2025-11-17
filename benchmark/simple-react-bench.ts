/**
 * Simple React benchmark to compare with Solid
 * Simulates React's re-render behavior
 */

console.log('=== React-Ink Simulation Benchmark ===\n');
console.log('Simulating Virtual DOM reconciliation...');

const ITEM_COUNT = 100;
const UPDATE_INTERVAL = 100; // ms
const DURATION = 10000; // 10 seconds

interface BenchStats {
  updates: number[];
  startTime: number;
}

// Simulate items (in React, these would be in state)
const items = Array.from({ length: ITEM_COUNT }, (_, i) => ({
  id: i,
  value: 0,
}));

const stats: BenchStats = {
  updates: [],
  startTime: Date.now(),
};

let updateCount = 0;

// Simulate Virtual DOM diffing
function simulateReactUpdate() {
  const updateStart = performance.now();

  // 1. Update state (5 random items)
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * ITEM_COUNT);
    items[randomIndex].value++;
  }

  // 2. Simulate re-render - generate new VDOM for ALL items
  const newVDOM = items.map((item) => ({
    type: 'text',
    props: { children: `Item ${item.id}: ${item.value}` },
  }));

  // 3. Simulate diff - compare all items (O(n))
  let changedCount = 0;
  for (let i = 0; i < ITEM_COUNT; i++) {
    // Simulate comparison overhead
    if (Math.random() > 0.95) {
      // 5% changed
      changedCount++;
    }
  }

  // 4. Simulate update phase
  // (In real React-Ink, this would update terminal output)

  const updateEnd = performance.now();
  return updateEnd - updateStart;
}

const interval = setInterval(() => {
  const updateTime = simulateReactUpdate();

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
    'react-results.json',
    JSON.stringify(
      {
        framework: 'react-ink-simulation',
        totalTime,
        updateCount,
        avgUpdateTime,
        minUpdateTime,
        maxUpdateTime,
        memory: process.memoryUsage().heapUsed,
      },
      null,
      2,
    ),
  );

  console.log('\n✅ Results saved to react-results.json');
  process.exit(0);
}, DURATION);
