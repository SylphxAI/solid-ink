# Benchmark

Performance comparison between Solid-Ink and React-Ink.

## Running Benchmarks

```bash
# From project root
cd /tmp/solid-ink

# Install dependencies (first time only)
cd benchmark && npm install && cd ..

# Run React-Ink benchmark
npm run bench:react

# Run Solid-Ink benchmark
npm run bench:solid

# Run both and compare
npm run bench:both
npm run bench:compare
```

## Test Scenario

The benchmark tests a common CLI use case: a list of items with frequent updates.

- **100 items** in a list
- **5 random items** updated every 100ms (10 updates/second)
- **10 second** duration (~100 total updates)
- Measures update time and memory usage

## Metrics

- **Average Update Time**: Mean time to process state change and render
- **Min/Max Update Time**: Best and worst case performance
- **Memory Usage**: Heap memory after benchmark completion

## Expected Results

Solid-Ink should show:
- **3-5x faster** update times (fine-grained reactivity)
- **40-60% less** memory usage (no Virtual DOM)
- **More consistent** performance (O(1) vs O(n) complexity)

## Understanding the Results

### React-Ink Performance

```
State Change → Re-render Component → Generate VDOM →
Diff 100 nodes → Update changed nodes
```

Time complexity: **O(n)** where n = number of items

### Solid-Ink Performance

```
Signal Change → Notify subscribers (5 items) →
Update 5 nodes directly
```

Time complexity: **O(1)** for each signal change

### Why Solid-Ink is Faster

1. **No component re-render**: Component function runs once
2. **No VDOM generation**: No intermediate representation needed
3. **No diffing**: Direct updates to changed nodes only
4. **Fine-grained tracking**: Each item independently reactive

## Customizing Benchmarks

Edit the constants in the benchmark files:

```typescript
const ITEM_COUNT = 100;      // Number of list items
const UPDATE_INTERVAL = 100; // Time between updates (ms)
const DURATION = 10000;      // Total benchmark duration (ms)
```

Try these scenarios:
- **More items** (500-1000): Solid-Ink advantage increases
- **Faster updates** (50ms): Tests render loop efficiency
- **Fewer updates** (1-2): Tests best-case scenarios
