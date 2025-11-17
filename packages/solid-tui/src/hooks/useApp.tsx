import { createContext, useContext } from 'solid-js';

export interface AppContext {
  exit: (error?: Error) => void;
  stdin: NodeJS.ReadStream;
  stdout: NodeJS.WriteStream;
  stderr: NodeJS.WriteStream;
}

const AppCtx = createContext<AppContext>();

// AppProvider removed - we use global injection instead to avoid Bun JSX issues

export function useApp(): AppContext {
  // Try context first (for Node.js compatibility)
  const ctx = useContext(AppCtx);
  if (ctx) return ctx;

  // Fall back to global (for Bun compatibility)
  const globalCtx = (globalThis as any).__SOLID_TUI_APP_CONTEXT__;
  if (globalCtx) return globalCtx;

  throw new Error('useApp must be used within an App context');
}
