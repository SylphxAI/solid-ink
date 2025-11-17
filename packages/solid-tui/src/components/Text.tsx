import { JSX, children as resolveChildren } from 'solid-js';
import chalk from 'chalk';

export interface TextProps {
  children?: JSX.Element;
  color?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  dim?: boolean;
}

export function Text(props: TextProps) {
  const resolved = resolveChildren(() => props.children);

  const getColorFn = () => {
    let fn = chalk;

    if (props.bold) fn = fn.bold;
    if (props.italic) fn = fn.italic;
    if (props.underline) fn = fn.underline;
    if (props.strikethrough) fn = fn.strikethrough;
    if (props.dim) fn = fn.dim;

    if (props.color) {
      // Support hex colors or named colors
      if (props.color.startsWith('#')) {
        fn = fn.hex(props.color);
      } else {
        // @ts-ignore - dynamic color access
        fn = fn[props.color] || fn;
      }
    }

    return fn;
  };

  return <text color={getColorFn()}>{resolved()}</text>;
}
