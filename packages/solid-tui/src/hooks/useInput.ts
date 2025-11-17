import { onCleanup } from 'solid-js';

export type Key = {
  upArrow: boolean;
  downArrow: boolean;
  leftArrow: boolean;
  rightArrow: boolean;
  pageDown: boolean;
  pageUp: boolean;
  return: boolean;
  escape: boolean;
  ctrl: boolean;
  shift: boolean;
  tab: boolean;
  backspace: boolean;
  delete: boolean;
  meta: boolean;
};

export type InputHandler = (input: string, key: Key) => void;

const ESCAPE_SEQUENCES: Record<string, Partial<Key>> = {
  '\x1b[A': { upArrow: true },
  '\x1b[B': { downArrow: true },
  '\x1b[C': { rightArrow: true },
  '\x1b[D': { leftArrow: true },
  '\x1b[5~': { pageUp: true },
  '\x1b[6~': { pageDown: true },
  '\r': { return: true },
  '\x1b': { escape: true },
  '\t': { tab: true },
  '\x7f': { backspace: true },
  '\x1b[3~': { delete: true },
};

export function useInput(handler: InputHandler, options: { isActive?: boolean } = {}) {
  const { isActive = true } = options;

  const handleData = (data: Buffer) => {
    if (!isActive) return;

    const input = data.toString();

    // Parse key object
    const key: Key = {
      upArrow: false,
      downArrow: false,
      leftArrow: false,
      rightArrow: false,
      pageDown: false,
      pageUp: false,
      return: false,
      escape: false,
      ctrl: false,
      shift: false,
      tab: false,
      backspace: false,
      delete: false,
      meta: false,
    };

    // Check for escape sequences
    const escapeSequence = ESCAPE_SEQUENCES[input];
    if (escapeSequence) {
      Object.assign(key, escapeSequence);
    }

    // Check for ctrl combinations
    if (input.charCodeAt(0) <= 26) {
      key.ctrl = true;
    }

    handler(input, key);
  };

  if (process.stdin.isTTY) {
    const wasRaw = process.stdin.isRaw;
    process.stdin.setRawMode(true);
    process.stdin.on('data', handleData);

    onCleanup(() => {
      process.stdin.off('data', handleData);
      process.stdin.setRawMode(wasRaw);
    });
  }
}
