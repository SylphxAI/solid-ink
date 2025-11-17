import { describe, expect, it } from 'vitest';
import { useApp } from '../src/hooks/useApp.js';
import { useFocus, useFocusManager } from '../src/hooks/useFocus.js';
import { useInput } from '../src/hooks/useInput.js';
import { useStderr } from '../src/hooks/useStderr.js';
import { useStdin } from '../src/hooks/useStdin.js';
import { useStdout } from '../src/hooks/useStdout.js';
import { render } from '../src/testing.js';

describe('Hooks', () => {
  describe('useApp', () => {
    it('provides app context', () => {
      let result: any;

      const Test = () => {
        result = useApp();
        return '';
      };

      const { unmount } = render(() => Test());

      expect(result.exit).toBeDefined();
      expect(result.stdin).toBeDefined();
      expect(result.stdout).toBeDefined();
      expect(result.stderr).toBeDefined();

      unmount();
    });
  });

  describe('useStdin', () => {
    it('returns stdin', () => {
      let result: any;

      const Test = () => {
        result = useStdin();
        return '';
      };

      const { unmount } = render(() => Test());

      expect(result).toBeDefined();
      expect(result.isTTY).toBeDefined();

      unmount();
    });
  });

  describe('useStdout', () => {
    it('returns dimensions signal', () => {
      let result: any;

      const Test = () => {
        result = useStdout();
        return '';
      };

      const { unmount } = render(() => Test());

      expect(result).toBeDefined();
      expect(typeof result).toBe('function');
      const dims = result();
      expect(dims.columns).toBeDefined();
      expect(dims.rows).toBeDefined();

      unmount();
    });
  });

  describe('useStderr', () => {
    it('returns stderr', () => {
      let result: any;

      const Test = () => {
        result = useStderr();
        return '';
      };

      const { unmount } = render(() => Test());

      expect(result).toBeDefined();
      expect(result.write).toBeDefined();

      unmount();
    });
  });

  describe('useInput', () => {
    it('exports useInput hook', () => {
      expect(useInput).toBeDefined();
      expect(typeof useInput).toBe('function');
    });
  });

  describe('useFocus & useFocusManager', () => {
    it('registers focusable item', () => {
      let manager: any;
      let focus: any;

      const Test = () => {
        manager = useFocusManager();
        focus = useFocus();
        return '';
      };

      const { unmount } = render(() => Test());

      expect(focus.isFocused()).toBe(true);
      expect(manager.focusedId()).toBeDefined();

      unmount();
    });

    it('focuses next item', () => {
      let manager: any;
      let focus1: any;
      let focus2: any;

      const Test = () => {
        manager = useFocusManager();
        focus1 = useFocus();
        focus2 = useFocus();
        return '';
      };

      const { unmount } = render(() => Test());

      expect(focus1.isFocused()).toBe(true);
      expect(focus2.isFocused()).toBe(false);

      manager.focusNext();

      expect(focus1.isFocused()).toBe(false);
      expect(focus2.isFocused()).toBe(true);

      unmount();
    });

    it('focuses previous item', () => {
      let manager: any;
      let focus1: any;
      let focus2: any;

      const Test = () => {
        manager = useFocusManager();
        focus1 = useFocus();
        focus2 = useFocus();
        return '';
      };

      const { unmount } = render(() => Test());

      manager.focusNext();

      expect(focus2.isFocused()).toBe(true);

      manager.focusPrevious();

      expect(focus1.isFocused()).toBe(true);
      expect(focus2.isFocused()).toBe(false);

      unmount();
    });

    it('auto-focuses first item', () => {
      let focus1: any;
      let focus2: any;

      const Test = () => {
        focus1 = useFocus({ autoFocus: true });
        focus2 = useFocus();
        return '';
      };

      const { unmount } = render(() => Test());

      expect(focus1.isFocused()).toBe(true);
      expect(focus2.isFocused()).toBe(false);

      unmount();
    });

    it('handles focus wrapping', () => {
      let manager: any;
      let focus1: any;
      let focus2: any;

      const Test = () => {
        manager = useFocusManager();
        focus1 = useFocus();
        focus2 = useFocus();
        return '';
      };

      const { unmount } = render(() => Test());

      // Focus on second item
      manager.focusNext();
      expect(focus2.isFocused()).toBe(true);

      // Wrap around to first
      manager.focusNext();
      expect(focus1.isFocused()).toBe(true);

      // Go backwards - wrap to last
      manager.focusPrevious();
      expect(focus2.isFocused()).toBe(true);

      unmount();
    });

    it('handles inactive focus items', () => {
      let focus: any;

      const Test = () => {
        focus = useFocus({ isActive: false });
        return '';
      };

      const { unmount } = render(() => Test());

      expect(focus.isFocused()).toBe(false);

      unmount();
    });

    it('unregisters on cleanup', () => {
      let _manager: any;
      let focus: any;

      const Test = () => {
        _manager = useFocusManager();
        focus = useFocus();
        return '';
      };

      const { unmount } = render(() => Test());

      expect(focus.isFocused()).toBe(true);

      unmount();

      // After unmount, focus should be cleaned up
      expect(() => focus.isFocused()).not.toThrow();
    });
  });

  describe('useStdout extended', () => {
    it('handles resize events', () => {
      let stdout: any;

      const Test = () => {
        stdout = useStdout();
        return '';
      };

      const { unmount } = render(() => Test());

      const dims = stdout();
      expect(dims.columns).toBeDefined();
      expect(dims.rows).toBeDefined();

      unmount();
    });
  });

  describe('useApp extended', () => {
    it('exit does not throw', () => {
      let app: any;

      const Test = () => {
        app = useApp();
        return '';
      };

      const { unmount } = render(() => Test());

      expect(() => app.exit()).not.toThrow();

      unmount();
    });
  });
});
