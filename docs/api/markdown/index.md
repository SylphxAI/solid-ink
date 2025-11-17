# Markdown

Markdown rendering and syntax highlighting for terminal applications.

## Package

```bash
npm install @sylphx/solid-tui-markdown
```

## Components

### [Markdown](/api/markdown/markdown)

Full-featured markdown renderer.

```tsx
<Markdown>{`
# Heading

This is **bold** and *italic* text.

\`\`\`javascript
console.log('Hello');
\`\`\`

- List item 1
- List item 2
`}</Markdown>
```

**Features:**
- Headers (h1-h6)
- Code blocks with syntax highlighting
- Lists (ordered/unordered)
- Blockquotes
- Tables
- Horizontal rules
- Emphasis (bold, italic)

---

### [SyntaxHighlight](/api/markdown/syntax-highlight)

Code syntax highlighter with 190+ languages.

```tsx
<SyntaxHighlight
  code={code}
  language="typescript"
  theme="dark"
  showLineNumbers
/>
```

**Features:**
- 190+ programming languages
- Auto-detection mode
- Dark/light themes
- Line numbers
- Color-coded tokens

---

## Supported Languages

**Popular Languages:**
- JavaScript, TypeScript, JSX, TSX
- Python, Ruby, PHP, Go, Rust
- Java, C, C++, C#
- HTML, CSS, SCSS, JSON, YAML, XML
- Bash, Shell, PowerShell
- SQL, GraphQL
- Markdown, LaTeX

Set `language="auto"` for automatic detection.

## Color Themes

### Dark Theme (default)
- **Keywords**: Magenta
- **Strings**: Green
- **Numbers**: Yellow
- **Comments**: Dimmed
- **Functions**: Blue
- **Classes**: Cyan

### Light Theme
Same colors, optimized for light backgrounds.

## Examples

### Documentation Viewer

```tsx
import { render, Box } from '@sylphx/solid-tui';
import { Markdown } from '@sylphx/solid-tui-markdown';
import { readFileSync } from 'fs';

function DocsViewer() {
  const readme = readFileSync('./README.md', 'utf-8');

  return (
    <Box padding={1}>
      <Markdown>{readme}</Markdown>
    </Box>
  );
}

render(<DocsViewer />);
```

### Code Snippet Display

```tsx
import { render, Box, Text } from '@sylphx/solid-tui';
import { SyntaxHighlight } from '@sylphx/solid-tui-markdown';

function CodeViewer() {
  const code = `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}`;

  return (
    <Box flexDirection="column">
      <Text bold>Fibonacci Function</Text>
      <Box marginTop={1}>
        <SyntaxHighlight
          code={code}
          language="javascript"
          showLineNumbers
        />
      </Box>
    </Box>
  );
}

render(<CodeViewer />);
```

### Interactive Docs

```tsx
import { createSignal, For } from 'solid-js';
import { render, Box, Text } from '@sylphx/solid-tui';
import { Markdown, SyntaxHighlight } from '@sylphx/solid-tui-markdown';
import { SelectInput } from '@sylphx/solid-tui-inputs';

function InteractiveDocs() {
  const docs = {
    intro: `# Introduction\n\nWelcome to the docs...`,
    api: `# API Reference\n\n## Functions\n\n...`,
    examples: `# Examples\n\n\`\`\`tsx\n...\n\`\`\``,
  };

  const [currentDoc, setCurrentDoc] = createSignal('intro');

  return (
    <Box flexDirection="column">
      <SelectInput
        items={[
          { label: 'Introduction', value: 'intro' },
          { label: 'API Reference', value: 'api' },
          { label: 'Examples', value: 'examples' },
        ]}
        onSelect={(item) => setCurrentDoc(item.value)}
      />

      <Box marginTop={2}>
        <Markdown>{docs[currentDoc()]}</Markdown>
      </Box>
    </Box>
  );
}

render(<InteractiveDocs />);
```

## Dependencies

- [marked](https://marked.js.org/) - Fast markdown parser
- [highlight.js](https://highlightjs.org/) - Syntax highlighting

## Learn More

- [Getting Started](/guide/getting-started)
- [Examples](/examples/)
