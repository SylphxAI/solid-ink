import { Text, Box } from '@sylphx/solid-tui';
import figlet from 'figlet';
import { createMemo, For } from 'solid-js';

export interface BigTextProps {
  children: string;
  font?: string;
  align?: 'left' | 'center' | 'right';
  color?: string;
}

export function BigText(props: BigTextProps) {
  const {
    children,
    font = 'Standard',
    align = 'left',
    color,
  } = props;

  const rendered = createMemo(() => {
    try {
      return figlet.textSync(children, {
        font: font as any,
        horizontalLayout: 'default',
        verticalLayout: 'default',
      });
    } catch (e) {
      // If font is not supported, use default
      return figlet.textSync(children, {
        font: 'Standard',
        horizontalLayout: 'default',
        verticalLayout: 'default',
      });
    }
  });

  const lines = createMemo(() => {
    return rendered().split('\n');
  });

  const maxWidth = createMemo(() => {
    return Math.max(...lines().map((line) => line.length));
  });

  const alignLine = (line: string) => {
    const width = maxWidth();
    const padding = width - line.length;

    if (align === 'center') {
      const leftPad = Math.floor(padding / 2);
      const rightPad = padding - leftPad;
      return ' '.repeat(leftPad) + line + ' '.repeat(rightPad);
    }

    if (align === 'right') {
      return ' '.repeat(padding) + line;
    }

    return line;
  };

  return (
    <Box flexDirection="column">
      <For each={lines()}>
        {(line) => <Text color={color}>{alignLine(line)}</Text>}
      </For>
    </Box>
  );
}
