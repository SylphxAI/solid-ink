import { For, type JSX } from 'solid-js';

export interface StaticProps<T> {
  items: readonly T[];
  children: (item: T, index: number) => JSX.Element;
  style?: any;
}

/**
 * Static component for rendering large lists efficiently.
 * Unlike regular components, Static items are rendered once and never updated.
 * This is useful for logs, command history, etc.
 */
export function Static<T>(props: StaticProps<T>): JSX.Element {
  return (
    <box flexDirection="column" {...props.style}>
      <For each={props.items as T[]}>{(item, index) => props.children(item, index())}</For>
    </box>
  );
}
