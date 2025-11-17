import { useApp } from './useApp.js';

export function useStdin(): NodeJS.ReadStream {
  return useApp().stdin;
}
