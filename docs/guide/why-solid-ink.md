# Why Solid-Ink?

## The Problem with React-Ink

React-Ink is great, but it inherits React's Virtual DOM overhead:

```tsx
function List() {
  const [selected, setSelected] = useState(0);

  // This entire function re-runs on every state change
  return (
    <Box>
      {items.map((item, i) => (
        <Text bold={selected === i}>{item}</Text>
      ))}
    </Box>
  );
}
```

**What happens when `selected` changes:**

1. Component function re-executes
2. New Virtual DOM generated for all items
3. Reconciler diffs all items
4. Updates the 2 changed items (old and new selection)

For 1000 items, this means **checking 1000 nodes** to update **2 nodes**.

## The Solid-Ink Approach

Solid-Ink uses fine-grained reactivity:

```tsx
function List() {
  const [selected, setSelected] = createSignal(0);

  // This function runs only ONCE
  return (
    <Box>
      <For each={items}>
        {(item, i) => (
          <Text bold={selected() === i()}>{item}</Text>
        )}
      </For>
    </Box>
  );
}
```

**What happens when `selected` changes:**

1. Signal notifies subscribers
2. Only the 2 affected `<Text>` components update
3. Direct node updates, no diffing

For 1000 items with 1 change: **Update 2 nodes**. That's it.

## Performance Comparison

### Benchmark Results

Test: 100 items, 5 random updates every 100ms for 10 seconds

| Metric | React-Ink | Solid-Ink | Improvement |
|--------|-----------|-----------|-------------|
| Avg Update Time | 12.5ms | 2.8ms | **4.5x faster** |
| Memory Usage | 8.2MB | 3.5MB | **57% less** |
| Bundle Size | 98KB | 52KB | **47% smaller** |

[See full benchmark →](/benchmark)

### Scaling Behavior

As the number of items increases:

```
React-Ink:  O(n) - checks all items
Solid-Ink:  O(1) - updates only changed items
```

With 1000 items:
- React-Ink: ~50ms per update
- Solid-Ink: ~3ms per update

**~16x faster** at scale.

## Architecture Benefits

### No Virtual DOM

**React-Ink:**
```
State → Component → VDOM → Diff → Real Nodes
        (overhead)  (copy) (slow)
```

**Solid-Ink:**
```
Signal → Real Nodes
         (direct)
```

### Compile-time Optimization

SolidJS's compiler analyzes your code:

```tsx
// You write:
<Text>{count()}</Text>

// Compiler generates:
const _el = createTextNode();
createEffect(() => {
  _el.textContent = count();
});
```

Dependencies tracked at **compile time**, not runtime.

### Memory Efficiency

**React-Ink stores:**
- Real node tree
- Virtual DOM tree
- Fiber tree (internal)

**Solid-Ink stores:**
- Real node tree
- Lightweight dependency graph

**Result:** 40-60% less memory usage

## Developer Experience

### Predictable Updates

**React:** Any state change can trigger re-render
```tsx
// Hard to predict what updates
const [a, setA] = useState(0);
const [b, setB] = useState(0);
```

**Solid:** Explicit dependencies
```tsx
// Clear what depends on what
const [a, setA] = createSignal(0);
const [b, setB] = createSignal(0);
```

### No Re-render Bugs

Common React issues don't exist:

```tsx
// React: Stale closures, requires useCallback
const handleClick = useCallback(() => {
  doSomething(count);
}, [count]);

// Solid: Always fresh, no hooks needed
const handleClick = () => {
  doSomething(count());
};
```

### Simple Mental Model

**React:** Think in re-renders
- When does this update?
- What's in the dependency array?
- Do I need useMemo/useCallback?

**Solid:** Think in data flow
- Signal changes
- Effects run
- Done

## Real-world Benefits

### 1. Smoother Animations

60 FPS = 16ms per frame

- React-Ink: 10-15ms updates → drops frames
- Solid-Ink: 2-3ms updates → smooth as butter

### 2. Lower CPU Usage

Less work = less CPU:

```
React-Ink: 15-20% CPU (100 items)
Solid-Ink: 5-8% CPU (100 items)
```

Better battery life, lower system load.

### 3. Handles More Data

With 5000 items:

- React-Ink: Noticeably laggy
- Solid-Ink: Still responsive

### 4. Smaller Bundle

- Smaller downloads
- Faster startup
- Less memory overhead

## When to Use Solid-Ink

### Perfect For:

✅ **Data-heavy UIs** - Tables, lists, dashboards
✅ **Real-time updates** - Live data, metrics, logs
✅ **Performance-critical** - Large datasets, high update frequency
✅ **Battery-conscious** - Long-running processes, server apps

### Also Great For:

- Interactive prompts
- Progress indicators
- Build tools
- Dev servers
- Any CLI application

## Migration from React-Ink

Similar API makes migration easy:

```tsx
// React-Ink
import { useState } from 'react';
const [state, setState] = useState(0);

// Solid-Ink
import { createSignal } from 'solid-js';
const [state, setState] = createSignal(0);
// Just add () when reading: state()
```

Main differences:
- `useState` → `createSignal`
- `useEffect` → `createEffect`
- Read signals: `count()` not `count`
- `<For>` instead of `.map()`

[See migration guide →](/guide/migration)

## Conclusion

Solid-Ink brings SolidJS's performance to terminal UIs:

- **3-5x faster** updates
- **40-60% less** memory
- **50% smaller** bundle
- **Simpler** mental model

Try it in your next CLI project!

[Get Started →](/guide/getting-started)
