import { useApp } from './useApp.jsx';

export function useStderr(): NodeJS.WriteStream {
  return useApp().stderr;
}
