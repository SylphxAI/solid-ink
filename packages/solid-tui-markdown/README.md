# @sylphx/solid-tui-markdown

> Markdown rendering and syntax highlighting for terminal applications

[![npm version](https://img.shields.io/npm/v/@sylphx/solid-tui-markdown.svg)](https://www.npmjs.com/package/@sylphx/solid-tui-markdown)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Full-featured markdown rendering and code syntax highlighting for [Solid-TUI](https://github.com/SylphxAI/solid-tui) terminal applications. Powered by [marked.js](https://marked.js.org/) and [highlight.js](https://highlightjs.org/).

## 📦 Installation

```bash
npm install @sylphx/solid-tui-markdown solid-js @sylphx/solid-tui
```

## 🎯 Components

### Markdown

Complete markdown renderer with support for headers, code blocks, lists, tables, blockquotes, and more.

**Supported Features:**
- **Headers** (h1-h6) with color coding
- **Code blocks** with syntax highlighting
- **Lists** (ordered and unordered)
- **Blockquotes**
- **Horizontal rules**
- **Tables**
- **Emphasis** (bold, italic)
- **Links** (text display)
- **Inline code**

**Props:**
- `children: string` - Markdown content to render

**Example:**
```tsx
import { render, Box } from '@sylphx/solid-tui';
import { Markdown } from '@sylphx/solid-tui-markdown';

function App() {
  const markdown = `# Getting Started

Welcome to **Solid-TUI**! This is a *powerful* terminal UI framework.

## Features

- Fine-grained reactivity
- No Virtual DOM
- Blazing fast performance

## Code Example

\`\`\`typescript
import { render, Text } from '@sylphx/solid-tui';

function App() {
  return <Text color="green">Hello, World!</Text>;
}

render(<App />);
\`\`\`

## Installation

1. Install dependencies
2. Import components
3. Start building

> **Note:** Requires Node.js 18+

---

Happy coding!`;

  return <Markdown>{markdown}</Markdown>;
}

render(<App />);
```

**Rendering Details:**
- **H1**: Blue, bold
- **H2**: Cyan, bold
- **H3-H6**: White, bold
- **Code blocks**: Syntax highlighted (via SyntaxHighlight component)
- **Lists**: Bullet points (•) or numbers with proper indentation
- **Blockquotes**: Dimmed text with "│" prefix
- **Tables**: Formatted with borders and alignment
- **Horizontal rules**: Dimmed line separator

### SyntaxHighlight

Code syntax highlighter with support for 190+ programming languages.

**Features:**
- 190+ language support via highlight.js
- Auto-detection mode
- Line numbers
- Dark/light themes
- Color-coded tokens (keywords, strings, comments, etc.)

**Props:**
- `code: string` - Code to highlight
- `language?: string` - Language name (default: 'javascript')
- `theme?: 'dark' | 'light'` - Color theme (default: 'dark')
- `showLineNumbers?: boolean` - Show line numbers (default: true)

**Example:**
```tsx
import { SyntaxHighlight } from '@sylphx/solid-tui-markdown';

function CodeViewer() {
  const code = `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const result = fibonacci(10);
console.log('Result:', result);`;

  return (
    <Box flexDirection="column">
      <Text bold>JavaScript Example:</Text>
      <SyntaxHighlight code={code} language="javascript" />

      <Box marginTop={2}>
        <Text bold>Without Line Numbers:</Text>
      </Box>
      <SyntaxHighlight
        code={code}
        language="javascript"
        showLineNumbers={false}
      />
    </Box>
  );
}
```

**Supported Languages:**
Over 190 languages including:
- **JavaScript** / **TypeScript** / **JSX** / **TSX**
- **Python** / **Ruby** / **PHP** / **Go** / **Rust**
- **Java** / **C** / **C++** / **C#**
- **HTML** / **CSS** / **SCSS** / **JSON** / **YAML** / **XML**
- **Bash** / **Shell** / **PowerShell**
- **SQL** / **GraphQL**
- **Markdown** / **LaTeX**
- And many more...

Set `language="auto"` for automatic language detection.

## 🎨 Color Themes

### Dark Theme (default)
- **Keywords**: Magenta
- **Strings**: Green
- **Numbers**: Yellow
- **Comments**: Dimmed
- **Functions**: Blue
- **Classes**: Cyan

### Light Theme
Same color scheme with adjusted defaults for light terminal backgrounds.

## 📖 Usage Examples

### Rendering README files

```tsx
import { readFileSync } from 'fs';
import { Markdown } from '@sylphx/solid-tui-markdown';

function ReadmeViewer() {
  const readme = readFileSync('./README.md', 'utf-8');
  return <Markdown>{readme}</Markdown>;
}
```

### Documentation viewer

```tsx
function DocsViewer() {
  const [currentDoc, setCurrentDoc] = createSignal('intro');

  const docs = {
    intro: `# Introduction\n\nWelcome to the docs...`,
    api: `# API Reference\n\n## Functions\n\n...`,
  };

  return (
    <Box flexDirection="column">
      <Box>
        <Button onClick={() => setCurrentDoc('intro')}>Intro</Button>
        <Button onClick={() => setCurrentDoc('api')}>API</Button>
      </Box>
      <Markdown>{docs[currentDoc()]}</Markdown>
    </Box>
  );
}
```

### Code snippet display

```tsx
function SnippetGallery() {
  const snippets = [
    { name: 'Hello World', code: 'console.log("Hello!");', lang: 'javascript' },
    { name: 'Fibonacci', code: 'def fib(n):\n  ...', lang: 'python' },
  ];

  return (
    <Box flexDirection="column">
      <For each={snippets}>
        {(snippet) => (
          <Box flexDirection="column" marginBottom={2}>
            <Text bold>{snippet.name}</Text>
            <SyntaxHighlight code={snippet.code} language={snippet.lang} />
          </Box>
        )}
      </For>
    </Box>
  );
}
```

## 🎨 Examples

Run the included examples:

```bash
npm run example:markdown  # Markdown demo
npm run example:syntax    # SyntaxHighlight demo
```

## 🔧 Development

```bash
# Build package
npm run build

# Run tests
npm test

# Watch mode
npm run dev
```

## 📚 Dependencies

- [marked](https://marked.js.org/) - Fast markdown parser
- [highlight.js](https://highlightjs.org/) - Syntax highlighting engine

## 📖 API Reference

See [TypeScript definitions](./src/index.ts) for complete API documentation.

## 🤝 Contributing

Contributions are welcome! Please read the [Contributing Guide](../../CONTRIBUTING.md) for details.

## 📄 License

MIT © [SylphxAI](https://github.com/SylphxAI)

## 🔗 Links

- [Solid-TUI Documentation](https://solid-tui.sylphx.com)
- [GitHub Repository](https://github.com/SylphxAI/solid-tui)
- [Report Issues](https://github.com/SylphxAI/solid-tui/issues)
