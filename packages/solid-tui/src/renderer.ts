import Yoga from 'yoga-layout';
import ansiEscapes from 'ansi-escapes';

type YogaNode = ReturnType<typeof Yoga.Node.create>;

export interface DOMNode {
  type: 'element' | 'text';
  tagName?: string;
  textContent?: string;
  yogaNode?: YogaNode;
  children: DOMNode[];
  parent?: DOMNode;
  props: Record<string, any>;
  style: {
    width?: number | string;
    height?: number | string;
    minWidth?: number;
    minHeight?: number;
    maxWidth?: number;
    maxHeight?: number;
    padding?: number;
    paddingLeft?: number;
    paddingRight?: number;
    paddingTop?: number;
    paddingBottom?: number;
    margin?: number;
    marginLeft?: number;
    marginRight?: number;
    marginTop?: number;
    marginBottom?: number;
    flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
    justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
    alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
    flexGrow?: number;
    flexShrink?: number;
    flexBasis?: number | string;
    display?: 'flex' | 'none';
  };
}

export class Renderer {
  private root: DOMNode;
  private yoga: typeof Yoga;
  private output: NodeJS.WriteStream;
  private previousOutput: string = '';

  constructor(output: NodeJS.WriteStream = process.stdout) {
    this.output = output;
    this.yoga = Yoga;
    this.root = this.createElement('root');
  }

  createElement(type: string): DOMNode {
    const yogaNode = this.yoga.Node.create();
    return {
      type: 'element',
      tagName: type,
      yogaNode,
      children: [],
      props: {},
      style: {},
    };
  }

  createTextNode(text: string): DOMNode {
    return {
      type: 'text',
      textContent: text,
      children: [],
      props: {},
      style: {},
    };
  }

  appendChild(parent: DOMNode, child: DOMNode) {
    child.parent = parent;
    parent.children.push(child);

    if (parent.yogaNode && child.yogaNode) {
      parent.yogaNode.insertChild(child.yogaNode, parent.yogaNode.getChildCount());
    }
  }

  insertBefore(parent: DOMNode, child: DOMNode, beforeChild: DOMNode) {
    child.parent = parent;
    const index = parent.children.indexOf(beforeChild);
    if (index !== -1) {
      parent.children.splice(index, 0, child);
      if (parent.yogaNode && child.yogaNode) {
        parent.yogaNode.insertChild(child.yogaNode, index);
      }
    }
  }

  removeChild(parent: DOMNode, child: DOMNode) {
    const index = parent.children.indexOf(child);
    if (index !== -1) {
      parent.children.splice(index, 1);
      if (parent.yogaNode && child.yogaNode) {
        parent.yogaNode.removeChild(child.yogaNode);
      }
      child.parent = undefined;
    }
  }

  setTextContent(node: DOMNode, text: string) {
    node.textContent = text;
  }

  setProperty(node: DOMNode, key: string, value: any) {
    if (key.startsWith('style:')) {
      const styleKey = key.slice(6);
      this.applyStyle(node, styleKey, value);
    } else {
      node.props[key] = value;
    }
  }

  private applyStyle(node: DOMNode, key: string, value: any) {
    node.style[key as keyof typeof node.style] = value;

    if (!node.yogaNode) return;

    const yoga = node.yogaNode;

    // Apply yoga layout styles
    switch (key) {
      case 'width':
        if (typeof value === 'number') yoga.setWidth(value);
        else if (value === 'auto') yoga.setWidthAuto();
        else if (typeof value === 'string' && value.endsWith('%')) {
          yoga.setWidthPercent(parseFloat(value));
        }
        break;
      case 'height':
        if (typeof value === 'number') yoga.setHeight(value);
        else if (value === 'auto') yoga.setHeightAuto();
        else if (typeof value === 'string' && value.endsWith('%')) {
          yoga.setHeightPercent(parseFloat(value));
        }
        break;
      case 'minWidth':
        yoga.setMinWidth(value);
        break;
      case 'minHeight':
        yoga.setMinHeight(value);
        break;
      case 'maxWidth':
        yoga.setMaxWidth(value);
        break;
      case 'maxHeight':
        yoga.setMaxHeight(value);
        break;
      case 'padding':
        yoga.setPadding(this.yoga.EDGE_ALL, value);
        break;
      case 'paddingLeft':
        yoga.setPadding(this.yoga.EDGE_LEFT, value);
        break;
      case 'paddingRight':
        yoga.setPadding(this.yoga.EDGE_RIGHT, value);
        break;
      case 'paddingTop':
        yoga.setPadding(this.yoga.EDGE_TOP, value);
        break;
      case 'paddingBottom':
        yoga.setPadding(this.yoga.EDGE_BOTTOM, value);
        break;
      case 'margin':
        yoga.setMargin(this.yoga.EDGE_ALL, value);
        break;
      case 'marginLeft':
        yoga.setMargin(this.yoga.EDGE_LEFT, value);
        break;
      case 'marginRight':
        yoga.setMargin(this.yoga.EDGE_RIGHT, value);
        break;
      case 'marginTop':
        yoga.setMargin(this.yoga.EDGE_TOP, value);
        break;
      case 'marginBottom':
        yoga.setMargin(this.yoga.EDGE_BOTTOM, value);
        break;
      case 'flexDirection':
        const directionMap = {
          row: this.yoga.FLEX_DIRECTION_ROW,
          column: this.yoga.FLEX_DIRECTION_COLUMN,
          'row-reverse': this.yoga.FLEX_DIRECTION_ROW_REVERSE,
          'column-reverse': this.yoga.FLEX_DIRECTION_COLUMN_REVERSE,
        };
        yoga.setFlexDirection(directionMap[value as keyof typeof directionMap]);
        break;
      case 'justifyContent':
        const justifyMap = {
          'flex-start': this.yoga.JUSTIFY_FLEX_START,
          center: this.yoga.JUSTIFY_CENTER,
          'flex-end': this.yoga.JUSTIFY_FLEX_END,
          'space-between': this.yoga.JUSTIFY_SPACE_BETWEEN,
          'space-around': this.yoga.JUSTIFY_SPACE_AROUND,
        };
        yoga.setJustifyContent(justifyMap[value as keyof typeof justifyMap]);
        break;
      case 'alignItems':
        const alignMap = {
          'flex-start': this.yoga.ALIGN_FLEX_START,
          center: this.yoga.ALIGN_CENTER,
          'flex-end': this.yoga.ALIGN_FLEX_END,
          stretch: this.yoga.ALIGN_STRETCH,
        };
        yoga.setAlignItems(alignMap[value as keyof typeof alignMap]);
        break;
      case 'flexGrow':
        yoga.setFlexGrow(value);
        break;
      case 'flexShrink':
        yoga.setFlexShrink(value);
        break;
      case 'display':
        yoga.setDisplay(value === 'none' ? this.yoga.DISPLAY_NONE : this.yoga.DISPLAY_FLEX);
        break;
    }
  }

  getRoot(): DOMNode {
    return this.root;
  }

  render() {
    if (!this.root.yogaNode) return;

    // Calculate layout
    const terminalWidth = this.output.columns || 80;
    const terminalHeight = this.output.rows || 24;

    this.root.yogaNode.setWidth(terminalWidth);
    this.root.yogaNode.setHeight(terminalHeight);
    this.root.yogaNode.calculateLayout(terminalWidth, terminalHeight, this.yoga.DIRECTION_LTR);

    // Render to string
    const output = this.renderNode(this.root, 0, 0);

    // Only update if changed (efficient!)
    if (output !== this.previousOutput) {
      this.output.write(ansiEscapes.clearScreen);
      this.output.write(ansiEscapes.cursorTo(0, 0));
      this.output.write(output);
      this.previousOutput = output;
    }
  }

  private renderNode(node: DOMNode, offsetX: number, offsetY: number): string {
    if (!node.yogaNode) {
      if (node.type === 'text') {
        return node.textContent || '';
      }
      return '';
    }

    const layout = node.yogaNode.getComputedLayout();
    const x = Math.round(offsetX + layout.left);
    const y = Math.round(offsetY + layout.top);

    let output = '';

    if (node.tagName === 'text' && node.textContent) {
      const color = node.props.color;
      let text = node.textContent;

      // Apply color if specified
      if (color && typeof color === 'function') {
        text = color(text);
      }

      output += ansiEscapes.cursorTo(x, y) + text;
    }

    // Render children
    for (const child of node.children) {
      output += this.renderNode(child, x, y);
    }

    return output;
  }

  cleanup() {
    if (this.root.yogaNode) {
      this.root.yogaNode.freeRecursive();
    }
  }
}
