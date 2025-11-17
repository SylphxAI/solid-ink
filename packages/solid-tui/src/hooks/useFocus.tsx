import { createContext, useContext, createSignal, onCleanup, Accessor } from 'solid-js';
import { useInput } from './useInput.js';

export interface FocusManager {
  register: (id: symbol) => void;
  unregister: (id: symbol) => void;
  focus: (id: symbol) => void;
  focusNext: () => void;
  focusPrevious: () => void;
  focusedId: Accessor<symbol | null>;
}

const FocusContext = createContext<FocusManager>();

export function FocusProvider(props: { children: any; autoFocus?: boolean }) {
  const { autoFocus = true } = props;
  const [focusedId, setFocusedId] = createSignal<symbol | null>(null);
  const focusableIds: symbol[] = [];

  const manager: FocusManager = {
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

  // Handle Tab/Shift+Tab navigation
  if (autoFocus) {
    useInput((_input, key) => {
      if (key.tab) {
        if (key.shift) {
          manager.focusPrevious();
        } else {
          manager.focusNext();
        }
      }
    });
  }

  return <FocusContext.Provider value={manager}>{props.children}</FocusContext.Provider>;
}

export function useFocusManager(): FocusManager {
  const manager = useContext(FocusContext);
  if (!manager) {
    throw new Error('useFocusManager must be used within FocusProvider');
  }
  return manager;
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
