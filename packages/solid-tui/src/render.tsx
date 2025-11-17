import cliCursor from 'cli-cursor';
import { createEffect, createSignal, type JSX } from 'solid-js';
import { type AppContext } from './hooks/useApp.jsx';
import { createSolidInkRenderer, setGlobalRenderer } from './reconciler.js';
import { Renderer } from './renderer.js';

export interface RenderOptions {
  output?: NodeJS.WriteStream;
  exitOnCtrlC?: boolean;
}

export function render(component: () => JSX.Element, options: RenderOptions = {}): () => void {
  const { output = process.stdout, exitOnCtrlC = true } = options;

  // Hide cursor
  cliCursor.hide(output);

  // Create renderer
  const renderer = new Renderer(output);

  // Set global renderer for JSX runtime (Bun compatibility)
  setGlobalRenderer(renderer);

  const solidRenderer = createSolidInkRenderer(renderer);

  // Cleanup function
  let cleanupCalled = false;
  const cleanup = () => {
    if (cleanupCalled) return;
    cleanupCalled = true;

    if (rafId) {
      clearTimeout(rafId);
    }

    cliCursor.show(output);
    renderer.cleanup();

    if (process.stdin.isTTY) {
      process.stdin.setRawMode(false);
      process.stdin.off('data', handleCtrlC);
    }
  };

  // Create app context
  const appContext: AppContext = {
    exit: (error?: Error) => {
      cleanup();
      if (error) {
        console.error(error);
        process.exit(1);
      } else {
        process.exit(0);
      }
    },
    stdin: process.stdin,
    stdout: output,
    stderr: process.stderr,
  };

  // Mount component
  // NOTE: We inject context globally instead of using Context Providers
  // because Bun freezes the Provider component functions, causing
  // "object is not extensible" errors
  (globalThis as any).__SOLID_TUI_APP_CONTEXT__ = appContext;

  // Create and inject focus manager globally
  const [focusedId, setFocusedId] = createSignal<symbol | null>(null);
  const focusableIds: symbol[] = [];
  const focusManager = {
    register: (id: symbol) => {
      focusableIds.push(id);
      if (focusableIds.length === 1) {
        setFocusedId(id);
      }
    },
    unregister: (id: symbol) => {
      const index = focusableIds.indexOf(id);
      if (index !== -1) {
        focusableIds.splice(index, 1);
        if (focusedId() === id && focusableIds.length > 0) {
          setFocusedId(focusableIds[0]);
        }
      }
    },
    focus: (id: symbol) => {
      if (focusableIds.includes(id)) {
        setFocusedId(id);
      }
    },
    focusNext: () => {
      const currentIndex = focusableIds.indexOf(focusedId()!);
      const nextIndex = (currentIndex + 1) % focusableIds.length;
      if (focusableIds[nextIndex]) {
        setFocusedId(focusableIds[nextIndex]);
      }
    },
    focusPrevious: () => {
      const currentIndex = focusableIds.indexOf(focusedId()!);
      const prevIndex = currentIndex <= 0 ? focusableIds.length - 1 : currentIndex - 1;
      if (focusableIds[prevIndex]) {
        setFocusedId(focusableIds[prevIndex]);
      }
    },
    focusedId,
  };
  (globalThis as any).__SOLID_TUI_FOCUS_MANAGER__ = focusManager;

  solidRenderer.render(component, renderer.getRoot());

  // Setup automatic re-rendering on changes
  let rafId: NodeJS.Timeout | null = null;
  const scheduleRender = () => {
    if (rafId) return;
    rafId = setTimeout(() => {
      renderer.render();
      rafId = null;
    }, 16); // ~60fps
  };

  // Initial render
  createEffect(() => {
    scheduleRender();
  });

  // Handle Ctrl+C
  const handleCtrlC = (data: Buffer) => {
    if (data.toString() === '\x03') {
      cleanup();
      if (exitOnCtrlC) {
        process.exit(0);
      }
    }
  };

  if (exitOnCtrlC && process.stdin.isTTY) {
    process.stdin.setRawMode(true);
    process.stdin.on('data', handleCtrlC);
  }

  // Auto cleanup on process exit
  process.once('exit', cleanup);

  return cleanup;
}
