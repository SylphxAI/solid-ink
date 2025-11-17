# Testing

Learn how to test your Solid-TUI components using Vitest.

## Setup

All Solid-TUI packages come with Vitest pre-configured. No additional setup required.

## Testing Utilities

Import the `render` function from `@sylphx/solid-tui/testing`:

```typescript
import { render } from '@sylphx/solid-tui/testing';
import { Text } from '@sylphx/solid-tui';

const { lastFrame, stdin } = render(() => <Text>Hello</Text>);
expect(lastFrame()).toContain('Hello');
```

### API

```typescript
interface RenderResult {
  lastFrame: () => string;       // Get the last rendered frame
  frames: string[];              // All rendered frames
  stdin: MockStdin;              // Mock stdin for input simulation
  rerender: (component) => void; // Re-render with new component
  unmount: () => void;           // Cleanup
}
```

## Basic Component Test

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

## Testing Reactive Components

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

## Simulating Keyboard Input

Use `stdin.write()` to simulate keyboard input:

```typescript
import { vi } from 'vitest';
import { TextInput } from '@sylphx/solid-tui-inputs';

it('handles typing', () => {
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

  stdin.write('hello');
  expect(onChange).toHaveBeenCalledWith('hello');
});
```

### Special Keys

```typescript
// Arrow keys
stdin.write('\x1b[A');  // Up
stdin.write('\x1b[B');  // Down
stdin.write('\x1b[D');  // Left
stdin.write('\x1b[C');  // Right

// Control keys
stdin.write('\r');      // Enter
stdin.write('\x1b');    // Escape
stdin.write('\t');      // Tab
stdin.write('\x7f');    // Backspace
stdin.write('\x1b[3~'); // Delete
```

## Testing Input Components

```typescript
import { SelectInput } from '@sylphx/solid-tui-inputs';

it('allows selecting item with Enter', () => {
  const onSelect = vi.fn();
  const { stdin } = render(() => (
    <SelectInput
      items={[
        { label: 'Item 1', value: 1 },
        { label: 'Item 2', value: 2 },
      ]}
      onSelect={onSelect}
    />
  ));

  stdin.write('\r'); // Enter
  expect(onSelect).toHaveBeenCalled();
});
```

## Running Tests

```bash
# Run all tests
npm test

# Watch mode
npm test -- --watch

# Coverage report
npm run test:coverage
```

## Best Practices

### 1. Test User Interactions

Focus on how users interact with your components:

```typescript
it('allows user to submit form', () => {
  const onSubmit = vi.fn();
  const { stdin } = render(() => (
    <TextInput value="test" onSubmit={onSubmit} />
  ));

  stdin.write('\r'); // User presses Enter
  expect(onSubmit).toHaveBeenCalledWith('test');
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

### 3. Test Focus Behavior

```typescript
it('does not respond when unfocused', () => {
  const onChange = vi.fn();
  const { stdin } = render(() => (
    <TextInput value="" focus={false} onChange={onChange} />
  ));

  stdin.write('a');
  expect(onChange).not.toHaveBeenCalled();
});
```

## Complete Example

```typescript
import { describe, it, expect, vi } from 'vitest';
import { createSignal } from 'solid-js';
import { render } from '@sylphx/solid-tui/testing';
import { TextInput } from '@sylphx/solid-tui-inputs';

describe('TextInput', () => {
  describe('rendering', () => {
    it('shows placeholder when empty', () => {
      const { lastFrame } = render(() => (
        <TextInput value="" placeholder="Enter text..." />
      ));
      expect(lastFrame()).toContain('Enter text...');
    });

    it('masks password', () => {
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
  });
});
```

## Learn More

For comprehensive testing documentation, see [TESTING.md](https://github.com/SylphxAI/solid-tui/blob/main/TESTING.md) in the repository.

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [SolidJS Testing Guide](https://www.solidjs.com/guides/testing)
- [Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)
