import { Box, Text } from '@sylphx/solid-tui';
import type { JSX } from 'solid-js';

export interface TitledBoxProps {
  title?: string;
  children?: JSX.Element;
  borderStyle?: 'single' | 'double' | 'round' | 'bold' | 'classic';
  borderColor?: string;
  titleColor?: string;
  padding?: number;
  width?: number;
}

const BORDER_STYLES = {
  single: {
    topLeft: '┌',
    topRight: '┐',
    bottomLeft: '└',
    bottomRight: '┘',
    horizontal: '─',
    vertical: '│',
  },
  double: {
    topLeft: '╔',
    topRight: '╗',
    bottomLeft: '╚',
    bottomRight: '╝',
    horizontal: '═',
    vertical: '║',
  },
  round: {
    topLeft: '╭',
    topRight: '╮',
    bottomLeft: '╰',
    bottomRight: '╯',
    horizontal: '─',
    vertical: '│',
  },
  bold: {
    topLeft: '┏',
    topRight: '┓',
    bottomLeft: '┗',
    bottomRight: '┛',
    horizontal: '━',
    vertical: '┃',
  },
  classic: {
    topLeft: '+',
    topRight: '+',
    bottomLeft: '+',
    bottomRight: '+',
    horizontal: '-',
    vertical: '|',
  },
};

export function TitledBox(props: TitledBoxProps) {
  const {
    title,
    children,
    borderStyle = 'single',
    borderColor = 'white',
    titleColor,
    padding = 1,
    width = 50,
  } = props;

  const border = BORDER_STYLES[borderStyle];
  const innerWidth = width - 2; // Account for left and right borders

  const renderTopBorder = () => {
    if (!title) {
      return (
        <Text color={borderColor}>
          {border.topLeft}
          {border.horizontal.repeat(innerWidth)}
          {border.topRight}
        </Text>
      );
    }

    const titleWithPadding = ` ${title} `;
    const titleLength = titleWithPadding.length;
    const remainingWidth = innerWidth - titleLength;
    const leftWidth = 1;
    const rightWidth = remainingWidth - leftWidth;

    return (
      <Box>
        <Text color={borderColor}>{border.topLeft}</Text>
        <Text color={borderColor}>{border.horizontal.repeat(leftWidth)}</Text>
        <Text color={titleColor || borderColor} bold>
          {titleWithPadding}
        </Text>
        <Text color={borderColor}>{border.horizontal.repeat(Math.max(0, rightWidth))}</Text>
        <Text color={borderColor}>{border.topRight}</Text>
      </Box>
    );
  };

  const renderBottomBorder = () => {
    return (
      <Text color={borderColor}>
        {border.bottomLeft}
        {border.horizontal.repeat(innerWidth)}
        {border.bottomRight}
      </Text>
    );
  };

  return (
    <Box flexDirection="column">
      {renderTopBorder()}
      <Box>
        <Text color={borderColor}>{border.vertical}</Text>
        <Box paddingLeft={padding} paddingRight={padding}>
          {children}
        </Box>
        <Text color={borderColor}>{border.vertical}</Text>
      </Box>
      {renderBottomBorder()}
    </Box>
  );
}
