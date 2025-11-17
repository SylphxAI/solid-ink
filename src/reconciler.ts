import { createRenderer } from 'solid-js/universal';
import { Renderer, DOMNode } from './renderer.js';

export function createSolidInkRenderer(renderer: Renderer) {
  return createRenderer<DOMNode>({
    createElement(type: string): DOMNode {
      return renderer.createElement(type);
    },

    createTextNode(value: string): DOMNode {
      return renderer.createTextNode(value);
    },

    replaceText(node: DOMNode, value: string) {
      renderer.setTextContent(node, value);
    },

    setProperty(node: DOMNode, key: string, value: any) {
      renderer.setProperty(node, key, value);
    },

    insertNode(parent: DOMNode, node: DOMNode, anchor?: DOMNode) {
      if (anchor) {
        renderer.insertBefore(parent, node, anchor);
      } else {
        renderer.appendChild(parent, node);
      }
    },

    removeNode(parent: DOMNode, node: DOMNode) {
      renderer.removeChild(parent, node);
    },

    getParentNode(node: DOMNode): DOMNode | undefined {
      return node.parent;
    },

    getFirstChild(node: DOMNode): DOMNode | undefined {
      return node.children[0];
    },

    getNextSibling(node: DOMNode): DOMNode | undefined {
      if (!node.parent) return undefined;
      const index = node.parent.children.indexOf(node);
      return node.parent.children[index + 1];
    },

    isTextNode(node: DOMNode): boolean {
      return node.type === 'text';
    },
  });
}
