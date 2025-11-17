import { render } from '@sylphx/solid-tui/testing';
import { createSignal } from 'solid-js';
import { describe, expect, it, vi } from 'vitest';
import { TextInput } from '../src/TextInput.jsx';

describe('TextInput', () => {
  it('renders with placeholder when value is empty', () => {
    const { lastFrame } = render(() => TextInput({ value: '', placeholder: 'Enter text...' }));
    expect(lastFrame()).toContain('Enter text...');
  });

  it('renders value when provided', () => {
    const { lastFrame } = render(() => <TextInput value="Hello" />);
    expect(lastFrame()).toContain('Hello');
  });

  it('displays cursor at end by default', () => {
    const { lastFrame } = render(() => <TextInput value="Test" showCursor />);
    const frame = lastFrame();
    expect(frame).toBeDefined();
  });

  it('masks value when mask prop is provided', () => {
    const { lastFrame } = render(() => <TextInput value="password" mask="*" />);
    expect(lastFrame()).toContain('********');
    expect(lastFrame()).not.toContain('password');
  });

  it('calls onChange when typing', () => {
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

  it('calls onSubmit when Enter is pressed', () => {
    const onSubmit = vi.fn();
    const { stdin } = render(() => <TextInput value="test" onSubmit={onSubmit} />);

    stdin.write('\r');
    expect(onSubmit).toHaveBeenCalledWith('test');
  });

  it('handles backspace to delete characters', () => {
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

  it('handles left arrow to move cursor', () => {
    const { stdin, lastFrame } = render(() => <TextInput value="test" showCursor />);

    stdin.write('\x1b[D'); // Left arrow
    const frame = lastFrame();
    expect(frame).toBeDefined();
  });

  it('handles right arrow to move cursor', () => {
    const { stdin, lastFrame } = render(() => <TextInput value="test" showCursor />);

    stdin.write('\x1b[C'); // Right arrow
    const frame = lastFrame();
    expect(frame).toBeDefined();
  });

  it('handles delete key', () => {
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

    // Move cursor to beginning
    stdin.write('\x1b[D\x1b[D\x1b[D');
    // Press delete
    stdin.write('\x1b[3~');

    expect(onChange).toHaveBeenCalled();
  });

  it('inserts character at cursor position', () => {
    const onChange = vi.fn();
    const [value, setValue] = createSignal('ac');

    const { stdin } = render(() => (
      <TextInput
        value={value()}
        onChange={(val) => {
          setValue(val);
          onChange(val);
        }}
      />
    ));

    // Move cursor left one position
    stdin.write('\x1b[D');
    // Type 'b'
    stdin.write('b');

    expect(onChange).toHaveBeenCalledWith('abc');
  });

  it('respects focus prop', () => {
    const onChange = vi.fn();
    const { stdin } = render(() => <TextInput value="" focus={false} onChange={onChange} />);

    stdin.write('a');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('hides cursor when showCursor is false', () => {
    const { lastFrame } = render(() => <TextInput value="test" showCursor={false} />);
    const frame = lastFrame();
    expect(frame).toContain('test');
  });
});
