import { Box, Text } from '@sylphx/solid-tui';
import { For, createMemo } from 'solid-js';
import { marked } from 'marked';
import { SyntaxHighlight } from './SyntaxHighlight.jsx';

export interface MarkdownProps {
  children: string;
  syntaxTheme?: 'dark' | 'light';
}

export function Markdown(props: MarkdownProps) {
  const { children, syntaxTheme = 'dark' } = props;

  const tokens = createMemo(() => {
    const parsed = marked.lexer(children);
    return parsed;
  });

  const renderToken = (token: any, index: number): any => {
    switch (token.type) {
      case 'heading':
        return (
          <Box marginTop={index > 0 ? 1 : 0}>
            <Text bold color={token.depth === 1 ? 'blue' : token.depth === 2 ? 'cyan' : 'white'}>
              {'#'.repeat(token.depth)} {token.text}
            </Text>
          </Box>
        );

      case 'paragraph':
        return (
          <Box marginTop={index > 0 ? 1 : 0}>
            <Text>{token.text}</Text>
          </Box>
        );

      case 'code':
        return (
          <Box marginTop={index > 0 ? 1 : 0} marginBottom={1}>
            <SyntaxHighlight
              code={token.text}
              language={token.lang || 'javascript'}
              theme={syntaxTheme}
            />
          </Box>
        );

      case 'blockquote':
        return (
          <Box marginTop={index > 0 ? 1 : 0}>
            <Text dim>│ </Text>
            <Text dim>{token.text}</Text>
          </Box>
        );

      case 'list':
        return (
          <Box flexDirection="column" marginTop={index > 0 ? 1 : 0}>
            <For each={token.items}>
              {(item: any, i) => (
                <Box>
                  <Text>
                    {token.ordered ? `${(token.start || 1) + i()}. ` : '• '}
                    {item.text}
                  </Text>
                </Box>
              )}
            </For>
          </Box>
        );

      case 'hr':
        return (
          <Box marginTop={1} marginBottom={1}>
            <Text dim>{'─'.repeat(50)}</Text>
          </Box>
        );

      case 'html':
        // Skip HTML tags in terminal
        return null;

      case 'space':
        return <Box marginTop={1} />;

      case 'table':
        return (
          <Box flexDirection="column" marginTop={index > 0 ? 1 : 0}>
            {/* Header */}
            <Box>
              <For each={token.header}>
                {(cell: any) => (
                  <Text bold>{cell.text.padEnd(20, ' ')}</Text>
                )}
              </For>
            </Box>
            {/* Separator */}
            <Text dim>{'─'.repeat(token.header.length * 20)}</Text>
            {/* Rows */}
            <For each={token.rows}>
              {(row: any) => (
                <Box>
                  <For each={row}>
                    {(cell: any) => (
                      <Text>{cell.text.padEnd(20, ' ')}</Text>
                    )}
                  </For>
                </Box>
              )}
            </For>
          </Box>
        );

      default:
        if (token.text) {
          return <Text>{token.text}</Text>;
        }
        return null;
    }
  };

  return (
    <Box flexDirection="column">
      <For each={tokens()}>
        {(token, index) => renderToken(token, index())}
      </For>
    </Box>
  );
}
