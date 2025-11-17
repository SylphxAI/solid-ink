import { createSignal, onCleanup } from 'solid-js';
import { Text, type TextProps } from './Text.js';

export interface SpinnerProps extends Omit<TextProps, 'children'> {
  type?: 'dots' | 'line' | 'arc' | 'arrow';
}

const SPINNER_FRAMES = {
  dots: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'],
  line: ['-', '\\', '|', '/'],
  arc: ['◜', '◠', '◝', '◞', '◡', '◟'],
  arrow: ['←', '↖', '↑', '↗', '→', '↘', '↓', '↙'],
};

export function Spinner(props: SpinnerProps) {
  const type = props.type || 'dots';
  const frames = SPINNER_FRAMES[type];
  const [frame, setFrame] = createSignal(0);

  const interval = setInterval(() => {
    setFrame((f) => (f + 1) % frames.length);
  }, 80);

  onCleanup(() => clearInterval(interval));

  return <Text {...props}>{frames[frame()]}</Text>;
}
