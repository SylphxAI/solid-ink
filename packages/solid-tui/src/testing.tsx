import { Writable } from 'node:stream';
import type { JSX } from 'solid-js';
import { type AppContext, AppProvider } from './hooks/useApp.js';
import { FocusProvider } from './hooks/useFocus.js';
import { createSolidInkRenderer } from './reconciler.js';
import { Renderer } from './renderer.js';

export interface RenderResult {
  lastFrame: () => string;
  frames: string[];
  stdin: MockStdin;
  rerender: (component: () => JSX.Element) => void;
  unmount: () => void;
}

class MockStdin {
  private listeners: Array<(data: Buffer) => void> = [];

  isTTY = true;

  setRawMode(_mode: boolean): void {
    // Mock implementation
  }

  on(event: string, handler: (data: Buffer) => void): void {
    if (event === 'data') {
      this.listeners.push(handler);
    }
  }

  off(event: string, handler: (data: Buffer) => void): void {
    if (event === 'data') {
      const index = this.listeners.indexOf(handler);
      if (index !== -1) {
        this.listeners.splice(index, 1);
      }
    }
  }

  write(data: string): void {
    const buffer = Buffer.from(data);
    for (const listener of this.listeners) {
      listener(buffer);
    }
  }

  emit(event: string, data: any): boolean {
    if (event === 'data') {
      this.write(data);
    }
    return true;
  }
}

class MockStream extends Writable {
  private chunks: string[] = [];
  public columns = 100;
  public rows = 30;

  _write(chunk: any, _encoding: string, callback: () => void): void {
    this.chunks.push(chunk.toString());
    callback();
  }

  lastFrame(): string {
    return this.chunks[this.chunks.length - 1] || '';
  }

  frames(): string[] {
    return [...this.chunks];
  }

  clear(): void {
    this.chunks = [];
  }
}

export function render(component: () => JSX.Element): RenderResult {
  const stdout = new MockStream();
  const stdin = new MockStdin();
  const stderr = new MockStream();

  const renderer = new Renderer(stdout as any);
  const solidRenderer = createSolidInkRenderer(renderer);

  let currentComponent = component;

  const appContext: AppContext = {
    exit: () => {
      // Do nothing in test environment
    },
    stdin: stdin as any,
    stdout: stdout as any,
    stderr: stderr as any,
  };

  const mount = (comp: () => JSX.Element) => {
    solidRenderer.render(
      () => (
        <AppProvider value={appContext}>
          <FocusProvider autoFocus={false}>{comp()}</FocusProvider>
        </AppProvider>
      ),
      renderer.getRoot(),
    );
    renderer.render();
  };

  mount(currentComponent);

  return {
    lastFrame: () => stdout.lastFrame(),
    frames: stdout.frames(),
    stdin,
    rerender: (newComponent: () => JSX.Element) => {
      currentComponent = newComponent;
      mount(currentComponent);
    },
    unmount: () => {
      renderer.cleanup();
    },
  };
}
