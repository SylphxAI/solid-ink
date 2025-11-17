import { describe, it, expect, vi } from 'vitest';
import { render } from '@sylphx/solid-tui/testing';
import { ConfirmInput } from '../src/ConfirmInput.jsx';

describe('ConfirmInput', () => {
  it('renders with placeholder', () => {
    const { lastFrame } = render(() => <ConfirmInput placeholder="Yes/No?" />);
    expect(lastFrame()).toContain('Yes/No?');
  });

  it('returns true for "y" when isChecked is true', () => {
    const onSubmit = vi.fn();
    const { stdin } = render(() => <ConfirmInput isChecked onSubmit={onSubmit} />);

    stdin.write('y');
    stdin.write('\r');

    expect(onSubmit).toHaveBeenCalledWith(true);
  });

  it('returns true for "yes" when isChecked is true', () => {
    const onSubmit = vi.fn();
    const { stdin } = render(() => <ConfirmInput isChecked onSubmit={onSubmit} />);

    stdin.write('yes');
    stdin.write('\r');

    expect(onSubmit).toHaveBeenCalledWith(true);
  });

  it('returns false for "n" when isChecked is true', () => {
    const onSubmit = vi.fn();
    const { stdin } = render(() => <ConfirmInput isChecked onSubmit={onSubmit} />);

    stdin.write('n');
    stdin.write('\r');

    expect(onSubmit).toHaveBeenCalledWith(false);
  });

  it('returns false for "no" when isChecked is true', () => {
    const onSubmit = vi.fn();
    const { stdin } = render(() => <ConfirmInput isChecked onSubmit={onSubmit} />);

    stdin.write('no');
    stdin.write('\r');

    expect(onSubmit).toHaveBeenCalledWith(false);
  });

  it('returns true for empty input when isChecked is true', () => {
    const onSubmit = vi.fn();
    const { stdin } = render(() => <ConfirmInput isChecked onSubmit={onSubmit} />);

    stdin.write('\r');

    expect(onSubmit).toHaveBeenCalledWith(true);
  });

  it('returns false for empty input when isChecked is false', () => {
    const onSubmit = vi.fn();
    const { stdin } = render(() => <ConfirmInput isChecked={false} onSubmit={onSubmit} />);

    stdin.write('\r');

    expect(onSubmit).toHaveBeenCalledWith(false);
  });

  it('is case insensitive for yes', () => {
    const onSubmit = vi.fn();
    const { stdin } = render(() => <ConfirmInput isChecked onSubmit={onSubmit} />);

    stdin.write('YES');
    stdin.write('\r');

    expect(onSubmit).toHaveBeenCalledWith(true);
  });

  it('is case insensitive for no', () => {
    const onSubmit = vi.fn();
    const { stdin } = render(() => <ConfirmInput isChecked onSubmit={onSubmit} />);

    stdin.write('NO');
    stdin.write('\r');

    expect(onSubmit).toHaveBeenCalledWith(false);
  });

  it('trims whitespace from input', () => {
    const onSubmit = vi.fn();
    const { stdin } = render(() => <ConfirmInput isChecked onSubmit={onSubmit} />);

    stdin.write('  y  ');
    stdin.write('\r');

    expect(onSubmit).toHaveBeenCalledWith(true);
  });

  it('calls onChange with input value', () => {
    const onChange = vi.fn();
    const { stdin } = render(() => <ConfirmInput onChange={onChange} />);

    stdin.write('y');

    expect(onChange).toHaveBeenCalledWith('y');
  });

  it('handles invalid input with default', () => {
    const onSubmit = vi.fn();
    const { stdin } = render(() => <ConfirmInput isChecked onSubmit={onSubmit} />);

    stdin.write('invalid');
    stdin.write('\r');

    expect(onSubmit).toHaveBeenCalledWith(true);
  });

  it('passes through TextInput props', () => {
    const { lastFrame } = render(() => (
      <ConfirmInput placeholder="Confirm?" showCursor mask="*" />
    ));

    const frame = lastFrame();
    expect(frame).toContain('Confirm?');
  });
});
