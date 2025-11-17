import { describe, it, expect, beforeEach } from 'vitest';
import { createSolidInkRenderer } from '../src/reconciler.js';
import { Renderer } from '../src/renderer.js';

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

  it('creates elements', () => {
    const node = solidRenderer.createElement('box');
    expect(node).toBeDefined();
    expect(node.tagName).toBe('box');
  });

  it('creates text nodes', () => {
    const node = solidRenderer.createTextNode('test');
    expect(node).toBeDefined();
    expect(node.textContent).toBe('test');
  });

  it('replaces text content', () => {
    const node = solidRenderer.createTextNode('old');
    solidRenderer.replaceText(node, 'new');
    expect(node.textContent).toBe('new');
  });

  it('sets properties', () => {
    const node = solidRenderer.createElement('box');
    solidRenderer.setProperty(node, 'width', 100);
    expect(node.style.width).toBe(100);
  });

  it('inserts nodes', () => {
    const parent = solidRenderer.createElement('box');
    const child = solidRenderer.createElement('text');
    solidRenderer.insertNode(parent, child);
    expect(parent.children).toContain(child);
  });

  it('inserts nodes before anchor', () => {
    const parent = solidRenderer.createElement('box');
    const child1 = solidRenderer.createElement('text');
    const child2 = solidRenderer.createElement('text');

    solidRenderer.insertNode(parent, child1);
    solidRenderer.insertNode(parent, child2, child1);

    expect(parent.children[0]).toBe(child2);
    expect(parent.children[1]).toBe(child1);
  });

  it('removes nodes', () => {
    const parent = solidRenderer.createElement('box');
    const child = solidRenderer.createElement('text');

    solidRenderer.insertNode(parent, child);
    solidRenderer.removeNode(parent, child);

    expect(parent.children).not.toContain(child);
  });

  it('gets parent node', () => {
    const parent = solidRenderer.createElement('box');
    const child = solidRenderer.createElement('text');

    solidRenderer.insertNode(parent, child);
    const result = solidRenderer.getParentNode(child);

    expect(result).toBe(parent);
  });

  it('gets first child', () => {
    const parent = solidRenderer.createElement('box');
    const child1 = solidRenderer.createElement('text');
    const child2 = solidRenderer.createElement('text');

    solidRenderer.insertNode(parent, child1);
    solidRenderer.insertNode(parent, child2);

    const result = solidRenderer.getFirstChild(parent);
    expect(result).toBe(child1);
  });

  it('gets next sibling', () => {
    const parent = solidRenderer.createElement('box');
    const child1 = solidRenderer.createElement('text');
    const child2 = solidRenderer.createElement('text');

    solidRenderer.insertNode(parent, child1);
    solidRenderer.insertNode(parent, child2);

    const result = solidRenderer.getNextSibling(child1);
    expect(result).toBe(child2);
  });
});
