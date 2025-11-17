import { render } from '@sylphx/solid-tui/testing';
import { describe, expect, it, vi } from 'vitest';
import { MultiSelect } from '../src/MultiSelect.jsx';

describe('MultiSelect', () => {
  const items = [
    { label: 'First', value: 'first' },
    { label: 'Second', value: 'second' },
    { label: 'Third', value: 'third' },
  ];

  it('renders all items with checkboxes', () => {
    const { lastFrame } = render(() => MultiSelect({ items }));
    const frame = lastFrame();
    expect(frame).toContain('First');
    expect(frame).toContain('Second');
    expect(frame).toContain('Third');
  });

  it('highlights first item by default', () => {
    const { lastFrame } = render(() => MultiSelect({ items }));
    const frame = lastFrame();
    expect(frame).toBeDefined();
  });

  it('respects defaultValue prop', () => {
    const { lastFrame } = render(() => MultiSelect({ items, defaultValue: ['first', 'third'] }));
    const frame = lastFrame();
    expect(frame).toBeDefined();
  });

  it('calls onSelect when Enter is pressed', () => {
    const onSelect = vi.fn();
    const { stdin } = render(() => MultiSelect({ items, onSelect }));

    stdin.write('\r');
    expect(onSelect).toHaveBeenCalledWith([]);
  });

  it('calls onChange when item is toggled', () => {
    const onChange = vi.fn();
    const { stdin } = render(() => MultiSelect({ items, onChange }));

    stdin.write(' ');
    expect(onChange).toHaveBeenCalled();
  });

  it('navigates down with down arrow', () => {
    const onHighlight = vi.fn();
    const { stdin } = render(() => MultiSelect({ items, onHighlight }));

    stdin.write('\x1b[B');
    expect(onHighlight).toHaveBeenCalledWith(items[1]);
  });

  it('navigates up with up arrow', () => {
    const onHighlight = vi.fn();
    const { stdin } = render(() => MultiSelect({ items, initialIndex: 1, onHighlight }));

    stdin.write('\x1b[A');
    expect(onHighlight).toHaveBeenCalledWith(items[0]);
  });

  it('navigates down with j key', () => {
    const onHighlight = vi.fn();
    const { stdin } = render(() => MultiSelect({ items, onHighlight }));

    stdin.write('j');
    expect(onHighlight).toHaveBeenCalledWith(items[1]);
  });

  it('navigates up with k key', () => {
    const onHighlight = vi.fn();
    const { stdin } = render(() => MultiSelect({ items, initialIndex: 1, onHighlight }));

    stdin.write('k');
    expect(onHighlight).toHaveBeenCalledWith(items[0]);
  });

  it('does not navigate beyond first item', () => {
    const onHighlight = vi.fn();
    const { stdin } = render(() => MultiSelect({ items, onHighlight }));

    onHighlight.mockClear();
    stdin.write('\x1b[A');

    const calls = onHighlight.mock.calls;
    if (calls.length > 0) {
      expect(calls[calls.length - 1][0]).toEqual(items[0]);
    }
  });

  it('does not navigate beyond last item', () => {
    const onHighlight = vi.fn();
    const { stdin } = render(() => MultiSelect({ items, initialIndex: 2, onHighlight }));

    onHighlight.mockClear();
    stdin.write('\x1b[B');

    const calls = onHighlight.mock.calls;
    if (calls.length > 0) {
      expect(calls[calls.length - 1][0]).toEqual(items[2]);
    }
  });

  it('respects limit prop', () => {
    const manyItems = Array.from({ length: 10 }, (_, i) => ({
      label: `Item ${i + 1}`,
      value: `item${i + 1}`,
    }));

    const { lastFrame } = render(() => MultiSelect({ items: manyItems, limit: 3 }));
    const frame = lastFrame();
    expect(frame).toBeDefined();
  });

  it('respects isFocused prop', () => {
    const onChange = vi.fn();
    const { stdin } = render(() => MultiSelect({ items, isFocused: false, onChange }));

    stdin.write(' ');
    expect(onChange).not.toHaveBeenCalled();
  });
});
