import { createSignal } from 'solid-js';
import { describe, expect, it, vi } from 'vitest';
import { render } from '../src/testing.js';

describe('Render', () => {
  describe('testing render function', () => {
    it('renders component and returns lastFrame', () => {
      const { lastFrame } = render(() => 'Hello World');
      expect(lastFrame()).toBeDefined();
    });

    it('captures frames', () => {
      const { frames } = render(() => 'Test');
      expect(frames).toBeDefined();
      expect(Array.isArray(frames)).toBe(true);
    });

    it('provides stdin mock', () => {
      const { stdin } = render(() => 'Test');
      expect(stdin).toBeDefined();
      expect(stdin.isTTY).toBe(true);
      expect(typeof stdin.setRawMode).toBe('function');
    });

    it('allows rerendering', () => {
      const { rerender, lastFrame } = render(() => 'First');
      expect(lastFrame()).toBeDefined();

      rerender(() => 'Second');
      expect(lastFrame()).toBeDefined();
    });

    it('allows unmounting', () => {
      const { unmount } = render(() => 'Test');
      expect(() => unmount()).not.toThrow();
    });

    it('simulates stdin input', () => {
      const { stdin } = render(() => 'Test');
      const listener = vi.fn();

      stdin.on('data', listener);
      stdin.write('test');

      expect(listener).toHaveBeenCalled();
    });

    it('removes stdin listeners', () => {
      const { stdin } = render(() => 'Test');
      const listener = vi.fn();

      stdin.on('data', listener);
      stdin.off('data', listener);
      stdin.write('test');

      expect(listener).not.toHaveBeenCalled();
    });

    it('renders reactive components', () => {
      const [count, setCount] = createSignal(0);
      const { lastFrame } = render(() => `Count: ${count()}`);

      const initial = lastFrame();
      setCount(1);
      const updated = lastFrame();

      expect(initial).toBeDefined();
      expect(updated).toBeDefined();
    });
  });

  describe('index exports', () => {
    it('exports main render function', async () => {
      const { render: mainRender } = await import('../src/index.js');
      expect(mainRender).toBeDefined();
      expect(typeof mainRender).toBe('function');
    });

    it('exports components', async () => {
      const { Box, Text, Spinner, Newline, Spacer, Static, Transform } = await import(
        '../src/index.js'
      );
      expect(Box).toBeDefined();
      expect(Text).toBeDefined();
      expect(Spinner).toBeDefined();
      expect(Newline).toBeDefined();
      expect(Spacer).toBeDefined();
      expect(Static).toBeDefined();
      expect(Transform).toBeDefined();
    });

    it('exports hooks', async () => {
      const { useApp, useStdin, useStdout, useStderr, useInput, useFocus, useFocusManager } =
        await import('../src/index.js');
      expect(useApp).toBeDefined();
      expect(useStdin).toBeDefined();
      expect(useStdout).toBeDefined();
      expect(useStderr).toBeDefined();
      expect(useInput).toBeDefined();
      expect(useFocus).toBeDefined();
      expect(useFocusManager).toBeDefined();
    });
  });
});
