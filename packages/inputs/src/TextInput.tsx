import { Box, Text, useFocus, useInput } from '@sylphx/solid-tui';
import { createEffect, createSignal } from 'solid-js';

export interface TextInputProps {
  value?: string;
  placeholder?: string;
  focus?: boolean;
  showCursor?: boolean;
  highlightPastedText?: boolean;
  mask?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
}

export function TextInput(props: TextInputProps) {
  const {
    value = '',
    placeholder = '',
    focus = true,
    showCursor = true,
    mask,
    onChange,
    onSubmit,
  } = props;

  const [cursorOffset, setCursorOffset] = createSignal(value.length);
  const { isFocused } = useFocus({ isActive: focus });

  // ASSUMPTION: Cursor syncs with value length on external changes
  createEffect(() => {
    const newLength = value.length;
    if (cursorOffset() > newLength) {
      setCursorOffset(newLength);
    }
  });

  useInput(
    (input, key) => {
      if (key.return) {
        onSubmit?.(value);
        return;
      }

      if (key.leftArrow) {
        setCursorOffset(Math.max(0, cursorOffset() - 1));
        return;
      }

      if (key.rightArrow) {
        setCursorOffset(Math.min(value.length, cursorOffset() + 1));
        return;
      }

      if (key.backspace) {
        if (cursorOffset() > 0) {
          const newValue = value.slice(0, cursorOffset() - 1) + value.slice(cursorOffset());
          onChange?.(newValue);
          setCursorOffset(cursorOffset() - 1);
        }
        return;
      }

      if (key.delete) {
        if (cursorOffset() < value.length) {
          const newValue = value.slice(0, cursorOffset()) + value.slice(cursorOffset() + 1);
          onChange?.(newValue);
        }
        return;
      }

      // Ignore control characters
      if (key.ctrl || key.meta || key.escape || key.tab) {
        return;
      }

      // Regular character input
      const newValue = value.slice(0, cursorOffset()) + input + value.slice(cursorOffset());
      onChange?.(newValue);
      setCursorOffset(cursorOffset() + input.length);
    },
    { isActive: focus && isFocused() },
  );

  const renderValue = () => {
    if (value.length === 0 && placeholder) {
      return <Text dim>{placeholder}</Text>;
    }

    const displayValue = mask ? mask.repeat(value.length) : value;

    if (!showCursor || !isFocused()) {
      return <Text>{displayValue}</Text>;
    }

    // Render with cursor
    const before = displayValue.slice(0, cursorOffset());
    const char = displayValue[cursorOffset()] || ' ';
    const after = displayValue.slice(cursorOffset() + 1);

    return (
      <Text>
        {before}
        <Text color="bgWhite" bold>
          {char}
        </Text>
        {after}
      </Text>
    );
  };

  return <Box>{renderValue()}</Box>;
}
