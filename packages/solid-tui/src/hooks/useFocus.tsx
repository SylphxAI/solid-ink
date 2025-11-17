import { type Accessor, createContext, onCleanup, useContext } from 'solid-js';

export interface FocusManager {
  register: (id: symbol) => void;
  unregister: (id: symbol) => void;
  focus: (id: symbol) => void;
  focusNext: () => void;
  focusPrevious: () => void;
  focusedId: Accessor<symbol | null>;
}

const FocusContext = createContext<FocusManager>();

// FocusProvider removed - we use global injection instead to avoid Bun JSX issues

export function useFocusManager(): FocusManager {
  // Try context first (for Node.js compatibility)
  const manager = useContext(FocusContext);
  if (manager) return manager;

  // Fall back to global (for Bun compatibility)
  const globalManager = (globalThis as any).__SOLID_TUI_FOCUS_MANAGER__;
  if (globalManager) return globalManager;

  throw new Error('useFocusManager must be used within FocusProvider');
}

export interface UseFocusOptions {
  autoFocus?: boolean;
  isActive?: boolean;
}

export function useFocus(options: UseFocusOptions = {}): { isFocused: Accessor<boolean> } {
  const { autoFocus = false, isActive = true } = options;
  const manager = useFocusManager();
  const id = Symbol('focus-id');

  const isFocused = () => manager.focusedId() === id;

  // Register immediately instead of waiting for onMount
  // This ensures focus works in both browser and universal renderer contexts
  if (isActive) {
    manager.register(id);
    if (autoFocus) {
      manager.focus(id);
    }
  }

  onCleanup(() => {
    if (isActive) {
      manager.unregister(id);
    }
  });

  return { isFocused };
}
