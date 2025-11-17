# Architecture

## Overview

Solid-TUI is a terminal UI renderer that leverages SolidJS's fine-grained reactivity system to achieve optimal performance without virtual DOM overhead.

## Core Components

### 1. Renderer (`src/renderer.ts`)

The low-level renderer that manages terminal output and layout calculations.

**Responsibilities:**
- Create and manage DOM-like node tree
- Apply Yoga layout for flexbox calculations
- Render nodes to ANSI terminal output
- Efficiently diff output (only redraw when changed)

**Key Design:**
- Each node has a corresponding Yoga node for layout
- Text nodes don't have Yoga nodes (leaf nodes)
- Layout calculated on every render (~60fps)
- Output diffed with previous to minimize terminal writes

### 2. Reconciler (`src/reconciler.ts`)

Bridge between SolidJS's universal renderer and our terminal renderer.

**Responsibilities:**
- Map SolidJS operations to terminal node operations
- Handle createElement, createTextNode, insertNode, removeNode
- Provide tree navigation methods

**Key Design:**
- Uses `solid-js/universal` createRenderer API
- Stateless - just delegates to Renderer methods
- No reconciliation logic (SolidJS handles reactivity)

### 3. Render Entry (`src/render.ts`)

High-level API for mounting SolidJS components to terminal.

**Responsibilities:**
- Initialize renderer and reconciler
- Setup render loop (~60fps with requestAnimationFrame equivalent)
- Handle terminal lifecycle (cursor hiding, cleanup)
- Process input handling (Ctrl+C)

**Key Design:**
- Schedule renders with setTimeout (16ms ~60fps)
- Only schedule if not already scheduled (debounce)
- Fine-grained reactivity ensures only changed nodes trigger renders

## Data Flow

```
User Component (SolidJS)
        ↓
  Signal changes
        ↓
Fine-grained update (ONLY changed node)
        ↓
Universal Renderer
        ↓
Reconciler (map to terminal ops)
        ↓
Renderer (update node tree)
        ↓
Schedule render (debounced)
        ↓
Yoga layout calculation
        ↓
Render to string (ANSI)
        ↓
Diff with previous output
        ↓
Write to terminal (if changed)
```

## Performance Characteristics

### Fine-grained Reactivity

**React-Ink:**
```
Signal change → Component re-render → Reconcile entire tree → Diff nodes → Update
```

**Solid-TUI:**
```
Signal change → Update specific node → Schedule render → Only redraw changed output
```

### Example

```tsx
function List() {
  const [items] = createSignal([1, 2, 3, ...1000]);
  const [selected, setSelected] = createSignal(0);

  return (
    <For each={items()}>
      {(item, i) => (
        <Text bold={selected() === i()}>Item {item}</Text>
      )}
    </For>
  );
}
```

When `selected` changes:
- **React-Ink**: Re-renders List → Re-renders all 1000 items → Diffs 1000 nodes
- **Solid-TUI**: Updates 2 Text nodes (old selected + new selected)

## Layout System

Uses Yoga (Facebook's Flexbox implementation) for layout calculations.

### Node Types

1. **Container nodes** (Box):
   - Have Yoga nodes
   - Can have children
   - Support flexbox properties

2. **Text nodes**:
   - No Yoga nodes (sized by content)
   - Leaf nodes only
   - Rendered with ANSI codes for styling

### Layout Process

1. Set root dimensions (terminal width/height)
2. Apply styles to Yoga nodes
3. Calculate layout: `yogaNode.calculateLayout(width, height)`
4. Read computed layout: `getComputedLayout()`
5. Position text using ANSI escape codes

## Rendering Strategy

### Output Diffing

```typescript
render() {
  const output = this.renderNode(this.root, 0, 0);

  if (output !== this.previousOutput) {
    // Only write if changed
    this.output.write(ansiEscapes.clearScreen);
    this.output.write(output);
    this.previousOutput = output;
  }
}
```

**Optimization:** String comparison is fast, prevents unnecessary terminal writes.

### Render Scheduling

```typescript
const scheduleRender = () => {
  if (rafId) return; // Already scheduled
  rafId = setTimeout(() => {
    renderer.render();
    rafId = null;
  }, 16); // ~60fps
};
```

**Optimization:** Debounced rendering - multiple signal changes in one frame = one render.

## Component System

### Primitive Components

**Box** - Container with flexbox layout
- Maps props to Yoga style properties
- Uses `style:*` attributes for reconciler

**Text** - Styled text
- Uses chalk for colors and formatting
- Passes color function to renderer as prop

### Higher-level Components

**Spinner** - Animated spinner
- Uses `createSignal` + `setInterval` for frame updates
- Demonstrates fine-grained reactivity (only spinner updates)

**Spacer** - Flexible space
- Just `<Box flexGrow={1} />`

## Hooks

### useInput

- Sets stdin to raw mode
- Listens for data events
- Parses ANSI escape sequences to key objects
- Cleanup restores stdin mode

### useStdout

- Listens for terminal resize events
- Returns reactive signal with dimensions
- Cleanup removes listener

## Memory Management

### Yoga Nodes

Must be manually freed (C++ objects):

```typescript
cleanup() {
  if (this.root.yogaNode) {
    this.root.yogaNode.freeRecursive();
  }
}
```

Called on unmount to prevent memory leaks.

## Trade-offs

### Advantages

✅ **Performance**: Direct updates, no virtual DOM overhead
✅ **Bundle size**: No reconciler included
✅ **Predictable**: Explicit signal dependencies
✅ **DX**: Familiar SolidJS patterns

### Limitations

❌ **Full redraws**: Currently clears and redraws entire screen (could optimize to partial updates)
❌ **Limited primitives**: Only Box and Text (could add Input, Select, etc.)
❌ **No server-side**: Requires terminal (no string rendering mode)

## Future Optimizations

1. **Partial screen updates**: Track dirty regions, only redraw changed areas
2. **Layout caching**: Only recalculate layout when dimensions/styles change
3. **Incremental rendering**: Render large trees over multiple frames
4. **Virtual scrolling**: For long lists, only render visible items

## Comparison to React-Ink

| Aspect | Solid-TUI | React-Ink |
|--------|-----------|-----------|
| **Renderer** | Custom via solid-js/universal | react-reconciler |
| **Updates** | Fine-grained signals | Virtual DOM diffing |
| **Re-renders** | Only changed nodes | Entire affected tree |
| **Reconciliation** | SolidJS (compile-time) | React (runtime) |
| **Bundle** | ~50KB (compressed) | ~100KB (compressed) |
| **Layout** | Yoga (same) | Yoga |
| **Output** | ANSI (same) | ANSI |

## Key Insights

1. **SolidJS's universal renderer is powerful** - Easy to target any platform
2. **Fine-grained reactivity eliminates reconciliation** - Major performance win
3. **Layout is the bottleneck** - Yoga calculations dominate render time
4. **Terminal output is expensive** - Diffing output strings is critical
5. **Raw mode input is simple** - Just parse ANSI sequences

## Conclusion

Solid-TUI demonstrates that fine-grained reactivity can significantly improve terminal UI performance by eliminating virtual DOM overhead and reconciliation. The architecture is simple, leveraging SolidJS's compiler-based reactivity and Yoga's battle-tested layout engine.
