import { useApp } from './useApp.js';

export function useStderr(): NodeJS.WriteStream {
  return useApp().stderr;
}
