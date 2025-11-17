import { type JSX, children as resolveChildren } from 'solid-js';

export interface TransformProps {
  transform: (children: string) => string;
  children: JSX.Element;
}

export function Transform(props: TransformProps): JSX.Element {
  const resolved = resolveChildren(() => props.children);

  return () => {
    const childText = String(resolved() || '');
    return props.transform(childText);
  };
}
