import { render } from '@sylphx/solid-tui';
import { Markdown } from '../src/Markdown.jsx';
import { Box } from '@sylphx/solid-tui';

function MarkdownDemo() {
  const markdown = `# Markdown Demo

This is a **bold** and *italic* text example.

## Code Block

\`\`\`javascript
function hello() {
  console.log('Hello, World!');
}
\`\`\`

## Lists

### Unordered List
- First item
- Second item
- Third item

### Ordered List
1. First step
2. Second step
3. Third step

## Blockquote

> This is a blockquote.
> It can span multiple lines.

## Horizontal Rule

---

## Conclusion

Markdown rendering in the terminal!`;

  return (
    <Box>
      <Markdown>{markdown}</Markdown>
    </Box>
  );
}

render(<MarkdownDemo />);
