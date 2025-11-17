import { createSignal, onCleanup } from 'solid-js';

export interface StdoutDimensions {
  columns: number;
  rows: number;
}

export function useStdout(stream: NodeJS.WriteStream = process.stdout) {
  const [dimensions, setDimensions] = createSignal<StdoutDimensions>({
    columns: stream.columns || 80,
    rows: stream.rows || 24,
  });

  const handleResize = () => {
    setDimensions({
      columns: stream.columns || 80,
      rows: stream.rows || 24,
    });
  };

  stream.on('resize', handleResize);

  onCleanup(() => {
    stream.off('resize', handleResize);
  });

  return dimensions;
}
