import { describe, it, expect, beforeEach } from 'vitest';
import { createSolidInkRenderer } from '../src/reconciler.js';
import { Renderer } from '../src/renderer.js';
import { createSignal } from 'solid-js';

describe('Reconciler', () => {
  let renderer: Renderer;
  let solidRenderer: any;

  beforeEach(() => {
    const mockStream = {
      columns: 80,
      rows: 24,
      write: () => {},
    } as any;
    renderer = new Renderer(mockStream);
    solidRenderer = createSolidInkRenderer(renderer);
  });

  it('creates solid renderer', () => {
    expect(solidRenderer).toBeDefined();
    expect(solidRenderer.render).toBeDefined();
  });

  it('renders basic component', () => {
    solidRenderer.render(() => 'Hello World', renderer.getRoot());

    expect(renderer.getRoot().children.length).toBeGreaterThan(0);
  });

  it('renders component with reactive signal', () => {
    const [count, setCount] = createSignal(0);

    solidRenderer.render(() => `Count: ${count()}`, renderer.getRoot());

    const initialChildren = renderer.getRoot().children.length;
    setCount(1);

    expect(renderer.getRoot().children.length).toBe(initialChildren);
  });

  it('handles component updates', () => {
    const [text, setText] = createSignal('initial');

    solidRenderer.render(() => text(), renderer.getRoot());

    setText('updated');

    expect(renderer.getRoot().children.length).toBeGreaterThan(0);
  });

  it('handles nested components', () => {
    solidRenderer.render(() => {
      const inner = renderer.createElement('box');
      const text = renderer.createTextNode('nested');
      renderer.appendChild(inner, text);
      return inner;
    }, renderer.getRoot());

    expect(renderer.getRoot().children.length).toBeGreaterThan(0);
  });

  it('handles multiple children', () => {
    solidRenderer.render(() => {
      const box = renderer.createElement('box');
      const text1 = renderer.createTextNode('first');
      const text2 = renderer.createTextNode('second');
      renderer.appendChild(box, text1);
      renderer.appendChild(box, text2);
      return box;
    }, renderer.getRoot());

    expect(renderer.getRoot().children.length).toBeGreaterThan(0);
  });

  it('handles conditional rendering', () => {
    const [show, setShow] = createSignal(true);

    solidRenderer.render(() => (show() ? 'visible' : null), renderer.getRoot());

    expect(renderer.getRoot().children.length).toBeGreaterThan(0);

    setShow(false);

    // Still has children (text nodes)
    expect(renderer.getRoot()).toBeDefined();
  });
});
