import { Box, render, Text } from '@sylphx/solid-tui';
import { SyntaxHighlight } from '../src/SyntaxHighlight.jsx';

function SyntaxHighlightDemo() {
  const jsCode = `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const result = fibonacci(10);
console.log('Result:', result);`;

  const tsCode = `interface User {
  name: string;
  age: number;
  email?: string;
}

const user: User = {
  name: 'Alice',
  age: 28
};`;

  return (
    <Box flexDirection="column">
      <Text bold>JavaScript Code:</Text>
      <Box marginTop={1}>
        <SyntaxHighlight code={jsCode} language="javascript" />
      </Box>

      <Box marginTop={2}>
        <Text bold>TypeScript Code:</Text>
      </Box>
      <Box marginTop={1}>
        <SyntaxHighlight code={tsCode} language="typescript" />
      </Box>

      <Box marginTop={2}>
        <Text bold>Without Line Numbers:</Text>
      </Box>
      <Box marginTop={1}>
        <SyntaxHighlight code={jsCode} language="javascript" showLineNumbers={false} />
      </Box>
    </Box>
  );
}

render(<SyntaxHighlightDemo />);
