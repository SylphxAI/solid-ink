# Testing Guide

Complete guide to testing Solid-TUI components using Vitest and the testing utilities.

## 📋 Table of Contents

- [Setup](#setup)
- [Testing Utilities](#testing-utilities)
- [Writing Tests](#writing-tests)
- [Keyboard Input Simulation](#keyboard-input-simulation)
- [Best Practices](#best-practices)
- [Examples](#examples)

## Setup

### Install Dependencies

All packages already include the necessary testing dependencies:

```json
{
  "devDependencies": {
    "vitest": "^1.0.0",
    "@vitest/coverage-v8": "^1.6.1",
    "vite-plugin-solid": "^2.11.10"
  }
}
```

### Vitest Configuration

Each package has a `vitest.config.ts`:

```typescript
import { defineConfig } from 'vitest/config';
import solid from 'vite-plugin-solid';

export default defineConfig({
  plugins: [
    solid({
      solid: {
        generate: 'universal',  // Required for terminal rendering
      },
    }),
  ],
  resolve: {
    conditions: ['node'],
  },
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/*.test.{ts,tsx}', 'src/index.ts'],
    },
  },
});
```

## Testing Utilities

### `render(component)`

Main testing function from `@sylphx/solid-tui/testing`.

**Returns:**
```typescript
interface RenderResult {
  lastFrame: () => string;       // Get the last rendered frame
  frames: string[];              // All rendered frames
  stdin: MockStdin;              // Mock stdin for input simulation
  rerender: (component) => void; // Re-render with new component
  unmount: () => void;           // Cleanup
}
```

**Example:**
```typescript
import { render } from '@sylphx/solid-tui/testing';
import { Text } from '@sylphx/solid-tui';

const { lastFrame, stdin } = render(() => <Text>Hello</Text>);
expect(lastFrame()).toContain('Hello');
```

### MockStdin

Simulated stdin for testing keyboard input.

**Methods:**
- `write(data: string)` - Simulate keyboard input
- `on(event, handler)` - Listen to data events
- `off(event, handler)` - Remove event listener
- `emit(event, data)` - Emit events

**Properties:**
- `isTTY: boolean` - Always `true` in tests
- `setRawMode(mode: boolean)` - Mock implementation

## Writing Tests

### Basic Component Test

```typescript
import { describe, it, expect } from 'vitest';
import { render } from '@sylphx/solid-tui/testing';
import { Text } from '@sylphx/solid-tui';

describe('MyComponent', () => {
  it('renders text', () => {
    const { lastFrame } = render(() => <Text>Hello World</Text>);
    expect(lastFrame()).toContain('Hello World');
  });
});
```

### Reactive Component Test

```typescript
import { createSignal } from 'solid-js';

it('updates when signal changes', () => {
  const [count, setCount] = createSignal(0);
  const { lastFrame } = render(() => <Text>Count: {count()}</Text>);

  expect(lastFrame()).toContain('Count: 0');

  setCount(5);
  expect(lastFrame()).toContain('Count: 5');
});
```

### Props Test

```typescript
it('applies color prop', () => {
  const { lastFrame } = render(() => <Text color="red">Error</Text>);
  const frame = lastFrame();
  expect(frame).toBeDefined();
  // Frame contains ANSI color codes
});
```

### Callback Test

```typescript
import { vi } from 'vitest';

it('calls onChange when value changes', () => {
  const onChange = vi.fn();
  const [value, setValue] = createSignal('');

  const { stdin } = render(() => (
    <TextInput
      value={value()}
      onChange={(val) => {
        setValue(val);
        onChange(val);
      }}
    />
  ));

  stdin.write('a');
  expect(onChange).toHaveBeenCalledWith('a');
});
```

## Keyboard Input Simulation

### Special Key Codes

```typescript
// Arrow keys
stdin.write('\x1b[A');  // Up arrow
stdin.write('\x1b[B');  // Down arrow
stdin.write('\x1b[D');  // Left arrow
stdin.write('\x1b[C');  // Right arrow

// Control keys
stdin.write('\r');      // Enter
stdin.write('\x1b');    // Escape
stdin.write('\t');      // Tab
stdin.write('\x7f');    // Backspace
stdin.write('\x1b[3~'); // Delete

// Home/End
stdin.write('\x1b[H');  // Home
stdin.write('\x1b[F');  // End

// Page Up/Down
stdin.write('\x1b[5~'); // Page Up
stdin.write('\x1b[6~'); // Page Down

// Regular characters
stdin.write('a');       // Letter 'a'
stdin.write(' ');       // Space
stdin.write('123');     // Multiple characters
```

### Input Test Examples

```typescript
it('handles Enter key', () => {
  const onSubmit = vi.fn();
  const { stdin } = render(() => (
    <TextInput value="test" onSubmit={onSubmit} />
  ));

  stdin.write('\r');
  expect(onSubmit).toHaveBeenCalledWith('test');
});

it('handles arrow navigation', () => {
  const [selected, setSelected] = createSignal(0);
  const { stdin } = render(() => (
    <SelectInput
      items={[
        { label: 'A', value: 'a' },
        { label: 'B', value: 'b' },
      ]}
      onHighlight={(item) => setSelected(/* ... */)}
    />
  ));

  stdin.write('\x1b[B'); // Down arrow
  // Verify selection changed
});

it('handles typing characters', () => {
  const [value, setValue] = createSignal('');
  const { stdin } = render(() => (
    <TextInput value={value()} onChange={setValue} />
  ));

  stdin.write('hello');
  expect(value()).toBe('hello');
});
```

## Best Practices

### 1. Test User Interactions

```typescript
it('allows user to select item', () => {
  const onSelect = vi.fn();
  const { stdin } = render(() => (
    <SelectInput
      items={[{ label: 'Item 1', value: 1 }]}
      onSelect={onSelect}
    />
  ));

  stdin.write('\r'); // Enter to select
  expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({
    value: 1
  }));
});
```

### 2. Test Edge Cases

```typescript
it('handles empty value', () => {
  const { lastFrame } = render(() => <TextInput value="" />);
  expect(lastFrame()).toBeDefined();
});

it('handles very long text', () => {
  const longText = 'a'.repeat(1000);
  const { lastFrame } = render(() => <Text>{longText}</Text>);
  expect(lastFrame()).toContain(longText);
});
```

### 3. Test Accessibility

```typescript
it('respects focus prop', () => {
  const onChange = vi.fn();
  const { stdin } = render(() => (
    <TextInput value="" focus={false} onChange={onChange} />
  ));

  stdin.write('a');
  expect(onChange).not.toHaveBeenCalled(); // Unfocused = no input
});
```

### 4. Test Error States

```typescript
it('shows error message when validation fails', () => {
  const { lastFrame } = render(() => (
    <TextInput
      value="invalid"
      error="Invalid input"
    />
  ));

  expect(lastFrame()).toContain('Invalid input');
});
```

### 5. Clean Up

```typescript
it('cleans up on unmount', () => {
  const { unmount } = render(() => <MyComponent />);
  expect(() => unmount()).not.toThrow();
});
```

## Examples

### Complete Component Test Suite

```typescript
import { describe, it, expect, vi } from 'vitest';
import { createSignal } from 'solid-js';
import { render } from '@sylphx/solid-tui/testing';
import { TextInput } from '@sylphx/solid-tui-inputs';

describe('TextInput', () => {
  describe('rendering', () => {
    it('renders placeholder when empty', () => {
      const { lastFrame } = render(() => (
        <TextInput value="" placeholder="Enter text..." />
      ));
      expect(lastFrame()).toContain('Enter text...');
    });

    it('renders value when provided', () => {
      const { lastFrame } = render(() => <TextInput value="Hello" />);
      expect(lastFrame()).toContain('Hello');
    });

    it('masks value when mask prop is set', () => {
      const { lastFrame } = render(() => (
        <TextInput value="password" mask="*" />
      ));
      expect(lastFrame()).toContain('********');
      expect(lastFrame()).not.toContain('password');
    });
  });

  describe('keyboard interaction', () => {
    it('adds characters on typing', () => {
      const onChange = vi.fn();
      const [value, setValue] = createSignal('');

      const { stdin } = render(() => (
        <TextInput
          value={value()}
          onChange={(val) => {
            setValue(val);
            onChange(val);
          }}
        />
      ));

      stdin.write('abc');
      expect(onChange).toHaveBeenLastCalledWith('abc');
    });

    it('removes character on backspace', () => {
      const onChange = vi.fn();
      const [value, setValue] = createSignal('abc');

      const { stdin } = render(() => (
        <TextInput
          value={value()}
          onChange={(val) => {
            setValue(val);
            onChange(val);
          }}
        />
      ));

      stdin.write('\x7f'); // Backspace
      expect(onChange).toHaveBeenCalledWith('ab');
    });

    it('submits on Enter', () => {
      const onSubmit = vi.fn();
      const { stdin } = render(() => (
        <TextInput value="test" onSubmit={onSubmit} />
      ));

      stdin.write('\r');
      expect(onSubmit).toHaveBeenCalledWith('test');
    });

    it('moves cursor with arrow keys', () => {
      const { stdin, lastFrame } = render(() => (
        <TextInput value="test" showCursor />
      ));

      stdin.write('\x1b[D'); // Left arrow
      const frame = lastFrame();
      expect(frame).toBeDefined();
    });
  });

  describe('focus behavior', () => {
    it('does not respond to input when unfocused', () => {
      const onChange = vi.fn();
      const { stdin } = render(() => (
        <TextInput value="" focus={false} onChange={onChange} />
      ));

      stdin.write('a');
      expect(onChange).not.toHaveBeenCalled();
    });

    it('responds to input when focused', () => {
      const onChange = vi.fn();
      const [value, setValue] = createSignal('');

      const { stdin } = render(() => (
        <TextInput
          value={value()}
          focus={true}
          onChange={(val) => {
            setValue(val);
            onChange(val);
          }}
        />
      ));

      stdin.write('a');
      expect(onChange).toHaveBeenCalled();
    });
  });

  describe('edge cases', () => {
    it('handles empty value', () => {
      const { lastFrame } = render(() => <TextInput value="" />);
      expect(lastFrame()).toBeDefined();
    });

    it('handles cursor at start', () => {
      const { stdin } = render(() => <TextInput value="test" />);

      // Move cursor to start
      stdin.write('\x1b[D\x1b[D\x1b[D\x1b[D');
      // Should not crash
    });

    it('handles cursor at end', () => {
      const { stdin } = render(() => <TextInput value="test" />);

      // Try to move cursor beyond end
      stdin.write('\x1b[C\x1b[C\x1b[C');
      // Should not crash
    });
  });
});
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- TextInput.test.tsx

# Run tests matching pattern
npm test -- --grep "keyboard"
```

## Coverage

Generate coverage report:

```bash
npm run test:coverage
```

View coverage in browser:
```bash
open coverage/index.html
```

**Coverage targets:**
- Critical paths: 100%
- Business logic: 80%+
- Edge cases: All tested

## Common Patterns

### Testing Layout Components

```typescript
it('renders children in column layout', () => {
  const { lastFrame } = render(() => (
    <Box flexDirection="column">
      <Text>Line 1</Text>
      <Text>Line 2</Text>
    </Box>
  ));

  const frame = lastFrame();
  expect(frame).toContain('Line 1');
  expect(frame).toContain('Line 2');
});
```

### Testing Visual Effects

```typescript
it('applies gradient to text', () => {
  const { lastFrame } = render(() => (
    <Gradient name="rainbow">Test</Gradient>
  ));

  const frame = lastFrame();
  expect(frame).toContain('Test');
  // Gradient adds ANSI color codes
});
```

### Testing Data Visualization

```typescript
it('renders bar chart', () => {
  const data = [
    { label: 'A', value: 10 },
    { label: 'B', value: 20 },
  ];

  const { lastFrame } = render(() => (
    <Chart data={data} type="bar" />
  ));

  const frame = lastFrame();
  expect(frame).toContain('A');
  expect(frame).toContain('B');
  expect(frame).toContain('█'); // Bar character
});
```

## Troubleshooting

### Tests not updating reactively

Ensure you're using signals correctly:
```typescript
// ❌ Wrong
const value = 'test';
<TextInput value={value} />

// ✅ Correct
const [value, setValue] = createSignal('test');
<TextInput value={value()} />
```

### Mock stdin not working

Verify you're using the returned stdin:
```typescript
// ❌ Wrong
process.stdin.write('a');

// ✅ Correct
const { stdin } = render(/* ... */);
stdin.write('a');
```

### ANSI codes in output

Terminal output includes ANSI escape codes for colors and formatting. Use string contains checks:
```typescript
expect(lastFrame()).toContain('text');
// Not: expect(lastFrame()).toBe('text');
```

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [SolidJS Testing](https://www.solidjs.com/guides/testing)
- [ANSI Escape Codes](https://en.wikipedia.org/wiki/ANSI_escape_code)
- [Testing Library Principles](https://testing-library.com/docs/guiding-principles/)

---

For package-specific testing examples, see:
- [solid-tui tests](./packages/solid-tui/test/)
- [solid-tui-inputs tests](./packages/inputs/test/)
