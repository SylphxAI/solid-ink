import { describe, it, expect, vi } from 'vitest';
import { render } from '@sylphx/solid-tui/testing';
import { SelectInput } from '../src/SelectInput.jsx';

describe('SelectInput', () => {
  const items = [
    { label: 'First', value: 'first' },
    { label: 'Second', value: 'second' },
    { label: 'Third', value: 'third' },
  ];

  it('renders all items', () => {
    const { lastFrame } = render(() => <SelectInput items={items} />);
    const frame = lastFrame();
    expect(frame).toContain('First');
    expect(frame).toContain('Second');
    expect(frame).toContain('Third');
  });

  it('highlights first item by default', () => {
    const { lastFrame } = render(() => <SelectInput items={items} />);
    const frame = lastFrame();
    expect(frame).toBeDefined();
  });

  it('respects initialIndex prop', () => {
    const { lastFrame } = render(() => <SelectInput items={items} initialIndex={1} />);
    const frame = lastFrame();
    expect(frame).toBeDefined();
  });

  it('calls onSelect when Enter is pressed', () => {
    const onSelect = vi.fn();
    const { stdin } = render(() => <SelectInput items={items} onSelect={onSelect} />);

    stdin.write('\r');
    expect(onSelect).toHaveBeenCalledWith(items[0]);
  });

  it('calls onHighlight when item is highlighted', () => {
    const onHighlight = vi.fn();
    render(() => <SelectInput items={items} onHighlight={onHighlight} />);

    expect(onHighlight).toHaveBeenCalledWith(items[0]);
  });

  it('navigates down with down arrow', () => {
    const onHighlight = vi.fn();
    const { stdin } = render(() => <SelectInput items={items} onHighlight={onHighlight} />);

    onHighlight.mockClear();
    stdin.write('\x1b[B'); // Down arrow

    expect(onHighlight).toHaveBeenCalledWith(items[1]);
  });

  it('navigates up with up arrow', () => {
    const onHighlight = vi.fn();
    const { stdin } = render(() => (
      <SelectInput items={items} initialIndex={1} onHighlight={onHighlight} />
    ));

    onHighlight.mockClear();
    stdin.write('\x1b[A'); // Up arrow

    expect(onHighlight).toHaveBeenCalledWith(items[0]);
  });

  it('navigates down with j key', () => {
    const onHighlight = vi.fn();
    const { stdin } = render(() => <SelectInput items={items} onHighlight={onHighlight} />);

    onHighlight.mockClear();
    stdin.write('j');

    expect(onHighlight).toHaveBeenCalledWith(items[1]);
  });

  it('navigates up with k key', () => {
    const onHighlight = vi.fn();
    const { stdin } = render(() => (
      <SelectInput items={items} initialIndex={1} onHighlight={onHighlight} />
    ));

    onHighlight.mockClear();
    stdin.write('k');

    expect(onHighlight).toHaveBeenCalledWith(items[0]);
  });

  it('selects item with number key', () => {
    const onSelect = vi.fn();
    const { stdin } = render(() => <SelectInput items={items} onSelect={onSelect} />);

    stdin.write('2');

    expect(onSelect).toHaveBeenCalledWith(items[1]);
  });

  it('does not navigate beyond first item', () => {
    const onHighlight = vi.fn();
    const { stdin } = render(() => <SelectInput items={items} onHighlight={onHighlight} />);

    onHighlight.mockClear();
    stdin.write('\x1b[A'); // Up arrow at first item

    expect(onHighlight).toHaveBeenCalledWith(items[0]);
  });

  it('does not navigate beyond last item', () => {
    const onHighlight = vi.fn();
    const { stdin } = render(() => (
      <SelectInput items={items} initialIndex={2} onHighlight={onHighlight} />
    ));

    onHighlight.mockClear();
    stdin.write('\x1b[B'); // Down arrow at last item

    expect(onHighlight).toHaveBeenCalledWith(items[2]);
  });

  it('respects limit prop', () => {
    const manyItems = Array.from({ length: 10 }, (_, i) => ({
      label: `Item ${i + 1}`,
      value: i + 1,
    }));

    const { lastFrame } = render(() => <SelectInput items={manyItems} limit={5} />);
    const frame = lastFrame();

    expect(frame).toContain('Item 1');
    expect(frame).toContain('Item 5');
    expect(frame).not.toContain('Item 6');
  });

  it('respects isFocused prop', () => {
    const onSelect = vi.fn();
    const { stdin } = render(() => <SelectInput items={items} isFocused={false} onSelect={onSelect} />);

    stdin.write('\r');
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('uses custom indicator component', () => {
    const CustomIndicator = (props: { isSelected: boolean }) => (
      <>{props.isSelected ? '[X]' : '[ ]'}</>
    );

    const { lastFrame } = render(() => (
      <SelectInput items={items} indicatorComponent={CustomIndicator} />
    ));
    const frame = lastFrame();

    expect(frame).toContain('[X]');
    expect(frame).toContain('[ ]');
  });

  it('handles empty items array', () => {
    const { lastFrame } = render(() => <SelectInput items={[]} />);
    expect(lastFrame()).toBeDefined();
  });
});
