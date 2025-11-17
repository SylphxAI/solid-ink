import { createContext, useContext } from 'solid-js';

export interface AppContext {
  exit: (error?: Error) => void;
  stdin: NodeJS.ReadStream;
  stdout: NodeJS.WriteStream;
  stderr: NodeJS.WriteStream;
}

const AppCtx = createContext<AppContext>();

export function AppProvider(props: { value: AppContext; children: any }) {
  return <AppCtx.Provider value={props.value}>{props.children}</AppCtx.Provider>;
}

export function useApp(): AppContext {
  const ctx = useContext(AppCtx);
  if (!ctx) {
    throw new Error('useApp must be used within an App context');
  }
  return ctx;
}
