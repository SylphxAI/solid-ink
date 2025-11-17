import { beforeEach, describe, expect, it } from 'vitest';
import { Renderer } from '../src/renderer.js';

describe('Renderer Extended', () => {
  let renderer: Renderer;
  let mockStream: any;

  beforeEach(() => {
    mockStream = {
      columns: 80,
      rows: 24,
      write: () => {},
    };
    renderer = new Renderer(mockStream);
  });

  describe('Layout and rendering', () => {
    it('sets text content on text nodes', () => {
      const textNode = renderer.createTextNode('initial');
      renderer.setTextContent(textNode, 'updated');
      expect(textNode.textContent).toBe('updated');
    });

    it('sets properties on nodes', () => {
      const node = renderer.createElement('box');
      renderer.setProperty(node, 'style:width', 100);
      expect(node.style.width).toBe(100);

      renderer.setProperty(node, 'style:flexDirection', 'column');
      expect(node.style.flexDirection).toBe('column');
    });

    it('appends children', () => {
      const parent = renderer.createElement('box');
      const child1 = renderer.createTextNode('child1');
      const child2 = renderer.createTextNode('child2');

      renderer.appendChild(parent, child1);
      renderer.appendChild(parent, child2);

      expect(parent.children).toContain(child1);
      expect(parent.children).toContain(child2);
      expect(parent.children.length).toBe(2);
    });

    it('inserts before anchor', () => {
      const parent = renderer.createElement('box');
      const child1 = renderer.createTextNode('child1');
      const child2 = renderer.createTextNode('child2');
      const child3 = renderer.createTextNode('child3');

      renderer.appendChild(parent, child1);
      renderer.appendChild(parent, child3);
      renderer.insertBefore(parent, child2, child3);

      expect(parent.children[0]).toBe(child1);
      expect(parent.children[1]).toBe(child2);
      expect(parent.children[2]).toBe(child3);
    });

    it('removes child', () => {
      const parent = renderer.createElement('box');
      const child = renderer.createTextNode('child');

      renderer.appendChild(parent, child);
      expect(parent.children).toContain(child);

      renderer.removeChild(parent, child);
      expect(parent.children).not.toContain(child);
      expect(child.parent).toBeUndefined();
    });

    it('handles text nodes', () => {
      const textNode = renderer.createTextNode('test');
      expect(textNode.type).toBe('text');
      expect(textNode.textContent).toBe('test');
      expect(textNode.children).toEqual([]);
    });

    it('handles box elements', () => {
      const box = renderer.createElement('box');
      expect(box.type).toBe('element');
      expect(box.tagName).toBe('box');
      expect(box.style).toBeDefined();
      expect(box.yogaNode).toBeDefined();
    });

    it('calculates layout', () => {
      const root = renderer.getRoot();
      const box = renderer.createElement('box');
      const text = renderer.createTextNode('Hello');

      renderer.appendChild(root, box);
      renderer.appendChild(box, text);
      renderer.setProperty(box, 'style:width', 100);
      renderer.setProperty(box, 'style:height', 50);

      renderer.render();

      expect(box.yogaNode.getComputedWidth()).toBeGreaterThan(0);
    });

    it('handles padding props', () => {
      const box = renderer.createElement('box');

      renderer.setProperty(box, 'style:padding', 2);
      expect(box.style.padding).toBe(2);

      renderer.setProperty(box, 'style:paddingX', 3);
      expect(box.style.paddingX).toBe(3);

      renderer.setProperty(box, 'style:paddingY', 4);
      expect(box.style.paddingY).toBe(4);

      renderer.setProperty(box, 'style:paddingTop', 1);
      expect(box.style.paddingTop).toBe(1);

      renderer.setProperty(box, 'style:paddingBottom', 1);
      expect(box.style.paddingBottom).toBe(1);

      renderer.setProperty(box, 'style:paddingLeft', 1);
      expect(box.style.paddingLeft).toBe(1);

      renderer.setProperty(box, 'style:paddingRight', 1);
      expect(box.style.paddingRight).toBe(1);
    });

    it('handles margin props', () => {
      const box = renderer.createElement('box');

      renderer.setProperty(box, 'style:margin', 2);
      expect(box.style.margin).toBe(2);

      renderer.setProperty(box, 'style:marginX', 3);
      expect(box.style.marginX).toBe(3);

      renderer.setProperty(box, 'style:marginY', 4);
      expect(box.style.marginY).toBe(4);

      renderer.setProperty(box, 'style:marginTop', 1);
      expect(box.style.marginTop).toBe(1);

      renderer.setProperty(box, 'style:marginBottom', 1);
      expect(box.style.marginBottom).toBe(1);

      renderer.setProperty(box, 'style:marginLeft', 1);
      expect(box.style.marginLeft).toBe(1);

      renderer.setProperty(box, 'style:marginRight', 1);
      expect(box.style.marginRight).toBe(1);
    });

    it('handles flexbox props', () => {
      const box = renderer.createElement('box');

      renderer.setProperty(box, 'style:flexDirection', 'column');
      expect(box.style.flexDirection).toBe('column');

      renderer.setProperty(box, 'style:flexGrow', 1);
      expect(box.style.flexGrow).toBe(1);

      renderer.setProperty(box, 'style:flexShrink', 0);
      expect(box.style.flexShrink).toBe(0);

      renderer.setProperty(box, 'style:flexBasis', 'auto');
      expect(box.style.flexBasis).toBe('auto');

      renderer.setProperty(box, 'style:alignItems', 'center');
      expect(box.style.alignItems).toBe('center');

      renderer.setProperty(box, 'style:justifyContent', 'space-between');
      expect(box.style.justifyContent).toBe('space-between');

      renderer.setProperty(box, 'style:flexWrap', 'wrap');
      expect(box.style.flexWrap).toBe('wrap');
    });

    it('handles dimension props', () => {
      const box = renderer.createElement('box');

      renderer.setProperty(box, 'style:width', 100);
      expect(box.style.width).toBe(100);

      renderer.setProperty(box, 'style:height', 50);
      expect(box.style.height).toBe(50);

      renderer.setProperty(box, 'style:minWidth', 10);
      expect(box.style.minWidth).toBe(10);

      renderer.setProperty(box, 'style:minHeight', 5);
      expect(box.style.minHeight).toBe(5);

      renderer.setProperty(box, 'style:maxWidth', 200);
      expect(box.style.maxWidth).toBe(200);

      renderer.setProperty(box, 'style:maxHeight', 100);
      expect(box.style.maxHeight).toBe(100);
    });

    it('handles border props', () => {
      const box = renderer.createElement('box');

      renderer.setProperty(box, 'style:borderStyle', 'single');
      expect(box.style.borderStyle).toBe('single');

      renderer.setProperty(box, 'style:borderColor', 'red');
      expect(box.style.borderColor).toBe('red');
    });

    it('handles gap prop', () => {
      const box = renderer.createElement('box');

      renderer.setProperty(box, 'style:gap', 1);
      expect(box.style.gap).toBe(1);
    });

    it('handles text color props', () => {
      const text = renderer.createElement('text');

      renderer.setProperty(text, 'color', 'red');
      expect(text.props.color).toBe('red');

      renderer.setProperty(text, 'backgroundColor', 'blue');
      expect(text.props.backgroundColor).toBe('blue');
    });

    it('handles text style props', () => {
      const text = renderer.createElement('text');

      renderer.setProperty(text, 'bold', true);
      expect(text.props.bold).toBe(true);

      renderer.setProperty(text, 'italic', true);
      expect(text.props.italic).toBe(true);

      renderer.setProperty(text, 'underline', true);
      expect(text.props.underline).toBe(true);

      renderer.setProperty(text, 'strikethrough', true);
      expect(text.props.strikethrough).toBe(true);

      renderer.setProperty(text, 'inverse', true);
      expect(text.props.inverse).toBe(true);

      renderer.setProperty(text, 'dimColor', true);
      expect(text.props.dimColor).toBe(true);
    });

    it('handles style: prefixed properties', () => {
      const box = renderer.createElement('box');

      renderer.setProperty(box, 'style:width', 100);
      expect(box.style.width).toBe(100);

      renderer.setProperty(box, 'style:flexDirection', 'column');
      expect(box.style.flexDirection).toBe('column');
    });

    it('handles percentage values', () => {
      const box = renderer.createElement('box');

      renderer.setProperty(box, 'style:width', '50%');
      expect(box.style.width).toBe('50%');

      renderer.setProperty(box, 'style:height', '100%');
      expect(box.style.height).toBe('100%');
    });

    it('cleans up on cleanup', () => {
      const root = renderer.getRoot();
      const box = renderer.createElement('box');
      const text = renderer.createTextNode('test');

      renderer.appendChild(root, box);
      renderer.appendChild(box, text);

      expect(() => renderer.cleanup()).not.toThrow();
    });

    it('renders multiple frames', () => {
      const root = renderer.getRoot();
      const text = renderer.createTextNode('frame1');

      renderer.appendChild(root, text);
      renderer.render();

      renderer.setTextContent(text, 'frame2');
      renderer.render();

      expect(text.textContent).toBe('frame2');
    });

    it('handles text nodes with color function', () => {
      const root = renderer.getRoot();
      const box = renderer.createElement('box');
      const text = renderer.createElement('text');

      renderer.setTextContent(text, 'colored');
      renderer.setProperty(text, 'color', (str: string) => `\x1b[31m${str}\x1b[0m`);

      renderer.appendChild(root, box);
      renderer.appendChild(box, text);

      expect(() => renderer.render()).not.toThrow();
    });

    it('handles nodes without yogaNode', () => {
      const root = renderer.getRoot();
      const node: any = {
        type: 'custom',
        children: [],
        props: {},
        style: {},
      };

      renderer.appendChild(root, node);

      expect(() => renderer.render()).not.toThrow();
    });

    it('handles paddingX and paddingY', () => {
      const box = renderer.createElement('box');

      renderer.setProperty(box, 'style:paddingX', 2);
      expect(box.style.paddingX).toBe(2);

      renderer.setProperty(box, 'style:paddingY', 3);
      expect(box.style.paddingY).toBe(3);
    });

    it('handles marginX and marginY', () => {
      const box = renderer.createElement('box');

      renderer.setProperty(box, 'style:marginX', 2);
      expect(box.style.marginX).toBe(2);

      renderer.setProperty(box, 'style:marginY', 3);
      expect(box.style.marginY).toBe(3);
    });
  });
});
