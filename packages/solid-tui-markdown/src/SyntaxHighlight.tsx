import { Box, Text } from '@sylphx/solid-tui';
import hljs from 'highlight.js';
import { createMemo, For } from 'solid-js';

export interface SyntaxHighlightProps {
  code: string;
  language?: string;
  theme?: 'dark' | 'light';
  showLineNumbers?: boolean;
}

// Color mapping for terminal
const THEME_COLORS = {
  dark: {
    keyword: 'magenta',
    string: 'green',
    number: 'yellow',
    comment: 'dim',
    function: 'blue',
    class: 'cyan',
    variable: 'white',
    operator: 'white',
    default: 'white',
  },
  light: {
    keyword: 'magenta',
    string: 'green',
    number: 'yellow',
    comment: 'dim',
    function: 'blue',
    class: 'cyan',
    variable: 'black',
    operator: 'black',
    default: 'black',
  },
};

export function SyntaxHighlight(props: SyntaxHighlightProps) {
  const { code, language = 'javascript', theme = 'dark', showLineNumbers = true } = props;

  const colors = THEME_COLORS[theme];

  const highlighted = createMemo(() => {
    try {
      if (language === 'auto') {
        return hljs.highlightAuto(code);
      }
      return hljs.highlight(code, { language });
    } catch (_e) {
      // If language is not supported, return plain text
      return { value: code, language: 'plaintext' };
    }
  });

  const lines = createMemo(() => {
    return highlighted().value.split('\n');
  });

  const renderToken = (text: string, className?: string) => {
    if (!className) {
      return <Text color={colors.default}>{text}</Text>;
    }

    // Map hljs classes to colors
    if (className.includes('keyword') || className.includes('built_in')) {
      return <Text color={colors.keyword}>{text}</Text>;
    }
    if (className.includes('string')) {
      return <Text color={colors.string}>{text}</Text>;
    }
    if (className.includes('number')) {
      return <Text color={colors.number}>{text}</Text>;
    }
    if (className.includes('comment')) {
      return <Text color={colors.comment}>{text}</Text>;
    }
    if (className.includes('function') || className.includes('title')) {
      return <Text color={colors.function}>{text}</Text>;
    }
    if (className.includes('class')) {
      return <Text color={colors.class}>{text}</Text>;
    }
    if (className.includes('variable')) {
      return <Text color={colors.variable}>{text}</Text>;
    }

    return <Text color={colors.default}>{text}</Text>;
  };

  const parseLine = (line: string) => {
    // Simple HTML tag parser for highlight.js output
    const regex = /<span class="([^"]*)">(.*?)<\/span>|([^<]+)/g;
    const tokens: { text: string; className?: string }[] = [];
    let match;

    while ((match = regex.exec(line)) !== null) {
      if (match[1]) {
        // Tagged token
        tokens.push({ text: match[2], className: match[1] });
      } else if (match[3]) {
        // Plain text
        tokens.push({ text: match[3] });
      }
    }

    return tokens;
  };

  const maxLineNumberWidth = createMemo(() => {
    return String(lines().length).length;
  });

  return (
    <Box flexDirection="column">
      <For each={lines()}>
        {(line, index) => (
          <Box>
            {showLineNumbers && (
              <Text dim>
                {String(index() + 1).padStart(maxLineNumberWidth(), ' ')}
                {'  '}
              </Text>
            )}
            <Box>
              <For each={parseLine(line)}>
                {(token) => renderToken(token.text, token.className)}
              </For>
            </Box>
          </Box>
        )}
      </For>
    </Box>
  );
}
