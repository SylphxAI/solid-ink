import { useApp } from './useApp.jsx';

export function useStdin(): NodeJS.ReadStream {
  return useApp().stdin;
}
