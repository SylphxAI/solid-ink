import { describe, it, expect, beforeEach } from 'vitest';
import { Renderer } from '../src/renderer.js';

describe('Renderer', () => {
  let renderer: Renderer;

  beforeEach(() => {
    // Mock output stream
    const mockStream = {
      columns: 80,
      rows: 24,
      write: () => {},
    } as any;
    renderer = new Renderer(mockStream);
  });

  it('creates element nodes', () => {
    const node = renderer.createElement('box');
    expect(node.type).toBe('element');
    expect(node.tagName).toBe('box');
    expect(node.children).toEqual([]);
    expect(node.yogaNode).toBeDefined();
  });

  it('creates text nodes', () => {
    const node = renderer.createTextNode('Hello');
    expect(node.type).toBe('text');
    expect(node.textContent).toBe('Hello');
    expect(node.yogaNode).toBeUndefined();
  });

  it('appends children correctly', () => {
    const parent = renderer.createElement('box');
    const child = renderer.createElement('text');

    renderer.appendChild(parent, child);

    expect(parent.children).toContain(child);
    expect(child.parent).toBe(parent);
  });

  it('removes children correctly', () => {
    const parent = renderer.createElement('box');
    const child = renderer.createElement('text');

    renderer.appendChild(parent, child);
    renderer.removeChild(parent, child);

    expect(parent.children).not.toContain(child);
    expect(child.parent).toBeUndefined();
  });

  it('sets text content', () => {
    const node = renderer.createTextNode('Initial');
    renderer.setTextContent(node, 'Updated');
    expect(node.textContent).toBe('Updated');
  });

  it('applies style properties to yoga node', () => {
    const node = renderer.createElement('box');

    renderer.setProperty(node, 'style:width', 100);
    renderer.setProperty(node, 'style:height', 50);
    renderer.setProperty(node, 'style:padding', 10);

    expect(node.style.width).toBe(100);
    expect(node.style.height).toBe(50);
    expect(node.style.padding).toBe(10);
  });

  it('stores non-style properties', () => {
    const node = renderer.createElement('text');
    const colorFn = (text: string) => text;

    renderer.setProperty(node, 'color', colorFn);

    expect(node.props.color).toBe(colorFn);
  });
});
