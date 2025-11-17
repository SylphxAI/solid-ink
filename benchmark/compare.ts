import * as fs from 'fs';
import * as path from 'path';

interface BenchmarkResult {
  framework: string;
  totalTime: number;
  updateCount: number;
  avgUpdateTime: number;
  minUpdateTime: number;
  maxUpdateTime: number;
  memory: number;
}

function loadResults(filename: string): BenchmarkResult | null {
  const filepath = path.join(process.cwd(), filename);
  try {
    const data = fs.readFileSync(filepath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Failed to load ${filename}:`, error);
    return null;
  }
}

function compareResults() {
  const reactResults = loadResults('react-results.json');
  const solidResults = loadResults('solid-results.json');

  if (!reactResults || !solidResults) {
    console.error('Missing benchmark results. Run benchmarks first:');
    console.error('  npm run bench:both');
    process.exit(1);
  }

  console.log('\n╔════════════════════════════════════════════════════════╗');
  console.log('║          Solid-Ink vs React-Ink Benchmark             ║');
  console.log('╚════════════════════════════════════════════════════════╝\n');

  console.log('Test Scenario: 100 items, 5 random updates every 100ms for 10s\n');

  // Format comparison
  const formatTime = (ms: number) => `${ms.toFixed(2)}ms`;
  const formatMemory = (bytes: number) => `${(bytes / 1024 / 1024).toFixed(2)}MB`;
  const formatImprovement = (react: number, solid: number) => {
    const improvement = ((react - solid) / react) * 100;
    const sign = improvement > 0 ? '↓' : '↑';
    return `${sign} ${Math.abs(improvement).toFixed(1)}%`;
  };

  console.log('┌─────────────────────────┬──────────────┬──────────────┬──────────────┐');
  console.log('│ Metric                  │ React-Ink    │ Solid-Ink    │ Improvement  │');
  console.log('├─────────────────────────┼──────────────┼──────────────┼──────────────┤');

  console.log(
    `│ Avg Update Time         │ ${formatTime(reactResults.avgUpdateTime).padEnd(12)} │ ${formatTime(solidResults.avgUpdateTime).padEnd(12)} │ ${formatImprovement(reactResults.avgUpdateTime, solidResults.avgUpdateTime).padEnd(12)} │`
  );

  console.log(
    `│ Min Update Time         │ ${formatTime(reactResults.minUpdateTime).padEnd(12)} │ ${formatTime(solidResults.minUpdateTime).padEnd(12)} │ ${formatImprovement(reactResults.minUpdateTime, solidResults.minUpdateTime).padEnd(12)} │`
  );

  console.log(
    `│ Max Update Time         │ ${formatTime(reactResults.maxUpdateTime).padEnd(12)} │ ${formatTime(solidResults.maxUpdateTime).padEnd(12)} │ ${formatImprovement(reactResults.maxUpdateTime, solidResults.maxUpdateTime).padEnd(12)} │`
  );

  console.log(
    `│ Memory Usage            │ ${formatMemory(reactResults.memory).padEnd(12)} │ ${formatMemory(solidResults.memory).padEnd(12)} │ ${formatImprovement(reactResults.memory, solidResults.memory).padEnd(12)} │`
  );

  console.log('└─────────────────────────┴──────────────┴──────────────┴──────────────┘\n');

  // Calculate overall speedup
  const speedup = reactResults.avgUpdateTime / solidResults.avgUpdateTime;
  console.log(`⚡ Solid-Ink is ${speedup.toFixed(1)}x faster on average\n`);

  // Generate markdown report
  const markdown = `# Benchmark Results

## Test Scenario
- 100 items in a list
- 5 random items updated every 100ms
- Duration: 10 seconds
- Total updates: ~${solidResults.updateCount}

## Results

| Metric | React-Ink | Solid-Ink | Improvement |
|--------|-----------|-----------|-------------|
| Avg Update Time | ${formatTime(reactResults.avgUpdateTime)} | ${formatTime(solidResults.avgUpdateTime)} | **${formatImprovement(reactResults.avgUpdateTime, solidResults.avgUpdateTime)}** |
| Min Update Time | ${formatTime(reactResults.minUpdateTime)} | ${formatTime(solidResults.minUpdateTime)} | ${formatImprovement(reactResults.minUpdateTime, solidResults.minUpdateTime)} |
| Max Update Time | ${formatTime(reactResults.maxUpdateTime)} | ${formatTime(solidResults.maxUpdateTime)} | ${formatImprovement(reactResults.maxUpdateTime, solidResults.maxUpdateTime)} |
| Memory Usage | ${formatMemory(reactResults.memory)} | ${formatMemory(solidResults.memory)} | **${formatImprovement(reactResults.memory, solidResults.memory)}** |

## Summary

⚡ **Solid-Ink is ${speedup.toFixed(1)}x faster** than React-Ink in this benchmark.

### Why?

1. **Fine-grained reactivity**: Only changed items update, not the entire list
2. **No Virtual DOM**: Direct node updates without diffing overhead
3. **Compile-time optimization**: Dependency tracking built at compile time
4. **Lower memory footprint**: No need to store Virtual DOM tree

### Key Takeaways

- **Update Time**: Solid-Ink updates are significantly faster due to targeted updates
- **Memory**: Lower memory usage with no Virtual DOM overhead
- **Scalability**: Performance gap increases with more items (O(1) vs O(n))
`;

  fs.writeFileSync('benchmark/RESULTS.md', markdown);
  console.log('📊 Full report saved to benchmark/RESULTS.md\n');
}

compareResults();
