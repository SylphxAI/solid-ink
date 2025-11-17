import { render } from '@sylphx/solid-tui/testing';
import { describe, expect, it, vi } from 'vitest';
import { QuickSearchInput } from '../src/QuickSearchInput.jsx';

describe('QuickSearchInput', () => {
  const items = [
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Angular', value: 'angular' },
    { label: 'Svelte', value: 'svelte' },
  ];

  it('renders with placeholder when query is empty', () => {
    const { lastFrame } = render(() => QuickSearchInput({ items, placeholder: 'Search...' }));
    const frame = lastFrame();
    expect(frame).toContain('Search...');
  });

  it('filters items based on query', () => {
    const { stdin, lastFrame } = render(() => QuickSearchInput({ items }));

    stdin.write('re');
    const frame = lastFrame();
    expect(frame).toBeDefined();
  });

  it('calls onChange when query changes', () => {
    const onChange = vi.fn();
    const { stdin } = render(() => QuickSearchInput({ items, onChange }));

    stdin.write('r');
    expect(onChange).toHaveBeenCalledWith('r');
  });

  it('calls onSelect when Enter is pressed', () => {
    const onSelect = vi.fn();
    const { stdin } = render(() => QuickSearchInput({ items, onSelect }));

    stdin.write('\r');
    expect(onSelect).toHaveBeenCalledWith(items[0]);
  });

  it('handles typing characters', () => {
    const onChange = vi.fn();
    const { stdin } = render(() => QuickSearchInput({ items, onChange }));

    stdin.write('r');
    stdin.write('e');

    expect(onChange).toHaveBeenCalledWith('r');
    expect(onChange).toHaveBeenCalledWith('re');
  });

  it('handles backspace to delete characters', () => {
    const onChange = vi.fn();
    const { stdin } = render(() => QuickSearchInput({ items, onChange }));

    stdin.write('r');
    stdin.write('e');
    stdin.write('\x7f');

    expect(onChange).toHaveBeenCalledWith('r');
  });

  it('navigates down with down arrow', () => {
    const onHighlight = vi.fn();
    const { stdin } = render(() => QuickSearchInput({ items, onHighlight }));

    stdin.write('\x1b[B');
    expect(onHighlight).toHaveBeenCalledWith(items[1]);
  });

  it('navigates up with up arrow', () => {
    const onHighlight = vi.fn();
    const { stdin } = render(() => QuickSearchInput({ items, onHighlight }));

    stdin.write('\x1b[B');
    stdin.write('\x1b[A');
    expect(onHighlight).toHaveBeenCalledWith(items[0]);
  });

  it('shows "No results found" when no items match', () => {
    const { stdin, lastFrame } = render(() => QuickSearchInput({ items }));

    stdin.write('xyz');
    const frame = lastFrame();
    expect(frame).toContain('No results');
  });

  it('respects caseSensitive prop', () => {
    const { stdin, lastFrame } = render(() => QuickSearchInput({ items, caseSensitive: true }));

    stdin.write('REACT');
    const frame = lastFrame();
    expect(frame).toBeDefined();
  });

  it('respects limit prop', () => {
    const manyItems = Array.from({ length: 10 }, (_, i) => ({
      label: `Item ${i + 1}`,
      value: `item${i + 1}`,
    }));

    const { lastFrame } = render(() => QuickSearchInput({ items: manyItems, limit: 3 }));
    const frame = lastFrame();
    expect(frame).toBeDefined();
  });

  it('respects isFocused prop', () => {
    const onChange = vi.fn();
    const { stdin } = render(() => QuickSearchInput({ items, isFocused: false, onChange }));

    stdin.write('a');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('handles left arrow to move cursor', () => {
    const { stdin, lastFrame } = render(() => QuickSearchInput({ items }));

    stdin.write('test');
    stdin.write('\x1b[D');
    const frame = lastFrame();
    expect(frame).toBeDefined();
  });

  it('handles right arrow to move cursor', () => {
    const { stdin, lastFrame } = render(() => QuickSearchInput({ items }));

    stdin.write('test');
    stdin.write('\x1b[D');
    stdin.write('\x1b[C');
    const frame = lastFrame();
    expect(frame).toBeDefined();
  });

  it('handles delete key', () => {
    const onChange = vi.fn();
    const { stdin } = render(() => QuickSearchInput({ items, onChange }));

    stdin.write('test');
    stdin.write('\x1b[D\x1b[D\x1b[D\x1b[D');
    stdin.write('\x1b[3~');

    expect(onChange).toHaveBeenCalled();
  });
});
