import { JSX, createEffect } from 'solid-js';
import { Renderer } from './renderer.js';
import { createSolidInkRenderer } from './reconciler.js';
import { AppProvider, AppContext } from './hooks/useApp.js';
import { FocusProvider } from './hooks/useFocus.js';
import cliCursor from 'cli-cursor';

export interface RenderOptions {
  output?: NodeJS.WriteStream;
  exitOnCtrlC?: boolean;
}

export function render(
  component: () => JSX.Element,
  options: RenderOptions = {}
): () => void {
  const { output = process.stdout, exitOnCtrlC = true } = options;

  // Hide cursor
  cliCursor.hide(output);

  // Create renderer
  const renderer = new Renderer(output);
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

  // Mount component wrapped with providers
  solidRenderer.render(
    () => (
      <AppProvider value={appContext}>
        <FocusProvider>{component()}</FocusProvider>
      </AppProvider>
    ),
    renderer.getRoot()
  );

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
