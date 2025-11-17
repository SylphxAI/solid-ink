import { createRenderer } from 'solid-js/universal';
import {
  createComponent as solidCreateComponent,
  mergeProps as solidMergeProps,
  createRenderEffect as solidEffect,
  createMemo as solidMemo,
} from 'solid-js';
import type { DOMNode, Renderer } from './renderer.js';

// Global renderer instance for JSX runtime
let globalRenderer: Renderer | null = null;

export function setGlobalRenderer(renderer: Renderer) {
  globalRenderer = renderer;
}

function getRenderer(): Renderer {
  if (!globalRenderer) {
    throw new Error('Renderer not initialized. This should not happen.');
  }
  return globalRenderer;
}

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

// Export functions for JSX runtime (used by babel-preset-solid with generate: "universal")
export function createElement(type: string): DOMNode {
  return getRenderer().createElement(type);
}

export function createTextNode(value: string): DOMNode {
  return getRenderer().createTextNode(value);
}

export function insertNode(parent: DOMNode, node: DOMNode, anchor?: DOMNode) {
  const renderer = getRenderer();
  if (anchor) {
    renderer.insertBefore(parent, node, anchor);
  } else {
    renderer.appendChild(parent, node);
  }
}

export function setProp(node: DOMNode, key: string, value: any) {
  getRenderer().setProperty(node, key, value);
}

// Custom spread function for terminal renderer
export function spread(node: DOMNode, props: any = {}, _isSVG?: boolean, skipChildren?: boolean) {
  const renderer = getRenderer();
  solidEffect(() => {
    for (const key in props) {
      const value = props[key];
      if (key === 'ref') {
        if (typeof value === 'function') value(node);
        else value.current = node;
      } else if (key === 'children') {
        if (!skipChildren) {
          insert(node, value);
        }
      } else {
        renderer.setProperty(node, key, value);
      }
    }
  });
}

// Custom insert function for terminal renderer
export function insert(parent: DOMNode, accessor: any, marker?: any, _init?: any) {
  const renderer = getRenderer();

  if (typeof accessor !== 'function') {
    // Static content
    if (accessor == null || accessor === false || accessor === true) return;

    if (typeof accessor === 'string' || typeof accessor === 'number') {
      const textNode = renderer.createTextNode(String(accessor));
      renderer.appendChild(parent, textNode);
      return;
    }

    if (Array.isArray(accessor)) {
      for (let i = 0; i < accessor.length; i++) {
        insert(parent, accessor[i], marker);
      }
      return;
    }

    // DOMNode
    renderer.appendChild(parent, accessor);
    return;
  }

  // Reactive content
  solidEffect(() => {
    const value = accessor();
    if (value == null || value === false || value === true) return;

    if (typeof value === 'string' || typeof value === 'number') {
      const textNode = renderer.createTextNode(String(value));
      renderer.appendChild(parent, textNode);
      return;
    }

    if (Array.isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        insert(parent, value[i], marker);
      }
      return;
    }

    renderer.appendChild(parent, value);
  });
}

// Re-export SolidJS utilities
export { solidCreateComponent as createComponent, solidMergeProps as mergeProps, solidEffect as effect, solidMemo as memo };

// _render function for template support
export function _render(code: any) {
  return typeof code === 'function' ? code() : code;
}
